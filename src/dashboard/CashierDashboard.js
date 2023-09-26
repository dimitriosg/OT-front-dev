/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
// import axios from 'axios'; // Uncomment this line if you'll use axios

function CashierDashboard() {
  const [cashHolding, setCashHolding] = useState(null);
  const [name, setName] = useState('');
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    // Fetch the current cash holding and the name of the cashier from the backend
    // Update `cashHolding` and `name` state
    // Assume we have a function fetchCashierDetails() that returns the necessary data
    // fetchCashierDetails().then(data => {
    //   setCashHolding(data.cashHolding);
    //   setName(data.name);
    // });
  }, []);

  const updateCashHolding = (newAmount) => {
    // Update the cash holding in the backend
    // Update `cashHolding` state
    // Assume we have a function updateCashHoldingInBackend() that updates the backend
    // updateCashHoldingInBackend(newAmount).then(updatedCashHolding => {
    //   setCashHolding(updatedCashHolding);
    // });
  };

  const notifyAccountant = () => {
    // Notify the Accountant to collect the cash
    // Reset `cashHolding` amount to zero
    // Assume we have a function notifyAccountantInBackend() that notifies the accountant and resets the cash holding
    // notifyAccountantInBackend().then(() => {
    //   setCashHolding({ amount: 0 });
    // });
  };

  return (
    <div>
      <h1>Cashier Dashboard</h1>
      <h2>Welcome {name}!</h2>
      <p>Current Cash Holding: €{cashHolding?.amount || 0}</p>
      <button onClick={() => updateCashHolding(cashHolding.amount + 100)}>Add €100</button>
      <button onClick={notifyAccountant}>Notify Accountant</button>
    </div>
  );
}

export default CashierDashboard;
