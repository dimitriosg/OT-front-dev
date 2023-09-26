/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import './css/DeveloperDashboard.css';
import OrdersSection from '../pages/OrdersSection.js';
import { useNavigate } from 'react-router-dom';
import { switchRoleAndNavigate } from './dashFunctions/roleSwitcher.js';

const DeveloperDashboard = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');

  const [orders, setOrders] = useState([]);  // Define orders here if it's supposed to be a state variable

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSwitchRole = () => {
      switchRoleAndNavigate(selectedRole, navigate);
  };
  
  return (
    <div className="developer-dashboard">
      <h1>Welcome, {userName}!</h1>
      <p>You have the role of Developer</p>
      <hr />
      <h2>Tools:</h2>
      {/* ...other code */}

      {/* Buttons for functions in extraFunctions.js and funcSOS.js */}
      {/* Example button: */}
      <button onClick={() => { /* Call the appropriate function */ }}>
        Execute Function 1
      </button>
      {/* ...other buttons */}

      <select value={selectedRole} onChange={handleRoleChange}>
                <option value="" disabled>Select role</option>
                <option value="admin">Admin</option>
                <option value="accountant">Accountant</option>
                <option value="cashier">Cashier</option>
                <option value="waiter">Waiter</option>
      </select>
      <button onClick={handleSwitchRole}>
                Switch Role
      </button>
    </div>
    
  );
};

export default DeveloperDashboard;
