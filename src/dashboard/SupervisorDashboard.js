import React, { useState, useEffect } from 'react';
//import axios from 'axios';

function SupervisorDashboard() {
  const [cashHolding, setCashHolding] = useState(null);
  const [name, setName] = useState('');


  useEffect(() => {
    // Fetch the current cash holding from the backend
    // Update `cashHolding` state
    // ++++++ ALSO ++++++
    // Fetch the name of the supervisor from the backend
    // Update `name` state
  }, []);

  const updateCashHolding = (newAmount) => {
    // Update the cash holding in the backend
    // Update `cashHolding` state
  };

  const notifyAccountant = () => {
    // Notify the Accountant to collect the cash
    // Reset `cashHolding` amount to zero
  };

  return (
    <div>
      <h1>Supervisor Dashboard</h1>
      <h2>Welcome {name}!</h2>
      <p>Current Cash Holding: €{cashHolding?.amount || 0}</p>
      <button onClick={() => updateCashHolding(cashHolding.amount + 100)}>Add €100</button>
      <button onClick={notifyAccountant}>Notify Accountant</button>
    </div>
  );
}

export default SupervisorDashboard;
