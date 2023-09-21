import React, { useState, useEffect } from 'react';
//import axios from 'axios';

function AccountantDashboard() {
  const [cashHoldings, setCashHoldings] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    // Fetch cash holdings for all ACCOUNTANTS from the backend
    // Update `cashHoldings` state
    // ++++++ ALSO ++++++
    // Fetch the name of the ACCOUNTANT from the backend
    // Update `name` state
  }, []);

  const collectCash = (supervisorID) => {
    // Collect the cash from the specified Supervisor
    // Update `cashHoldings` state
  };

  return (
    <div>
      <h1>Accountant Dashboard</h1>
      <h2>Welcome {name}!</h2>
      <ul>
        {cashHoldings.map(holding => (
          <li key={holding.supervisorID}>
            Supervisor ID: {holding.supervisorID}, Cash Holding: €{holding.amount}
            <button onClick={() => collectCash(holding.supervisorID)}>Collect</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AccountantDashboard;
