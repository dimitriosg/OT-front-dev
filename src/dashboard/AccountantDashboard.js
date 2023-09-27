/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutButton from '../components/LogoutButton';


const BACKEND_URL = "https://order-taker-back-5416a0177bda.herokuapp.com";

function AccountantDashboard() {
  const [cashHoldings, setCashHoldings] = useState([]);
  const [name, setName] = useState('');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    // Fetch the name of the ACC from the backend
    axios.get(`${BACKEND_URL}/api/dashboard/acc/details`, { withCredentials: true })
      .then(response => {
        setName(response.data.name);
      })
      .catch(error => {
        console.error('Error fetching acc name:', error);
      });

    // Fetch cash holdings for all ACCs from the backend
    axios.get(`${BACKEND_URL}/api/dashboard/data`, { withCredentials: true })
      .then(response => {
        setCashHoldings(response.data.cashHoldings);
      })
      .catch(error => {
        console.error('Error fetching cash holdings:', error);
      });
  }, []);

  const collectCash = (cashierID) => {
    // Collect the cash from the specified Cashier
    axios.post(`${BACKEND_URL}/api/dashboard/acc/update-cash-holding`, { cashierID }, { withCredentials: true })
      .then(response => {
        // Update `cashHoldings` state with the updated data from the backend
        setCashHoldings(response.data.cashHoldings);
      })
      .catch(error => {
        console.error('Error collecting cash:', error);
      });
  };

  return (
    <div>
      <LogoutButton />
      <h1>Accountant Dashboard</h1>
      <h2>Welcome {name}!</h2>
      <ul>
        {cashHoldings.map(holding => (
          <li key={holding.cashierID}>
            Cashier ID: {holding.cashierID}, Cash Holding: €{holding.amount}
            <button onClick={() => collectCash(holding.cashierID)}>Collect</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountantDashboard;
