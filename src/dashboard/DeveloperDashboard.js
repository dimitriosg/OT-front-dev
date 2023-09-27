/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/DeveloperDashboard.css';
import OrdersSection from '../pages/OrdersSection.js';
import RoleSwitcher from '../components/RoleSwitcher';
import '../styles/DashboardStyles.css';  // Import the styles


const DeveloperDashboard = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const userName = localStorage.getItem('userName');

  const [orders, setOrders] = useState([]);  // Define orders here if it's supposed to be a state variable

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleSwitchRole = () => {
      switchRoleAndNavigate(selectedRole, navigate);
  };
  
  return (
    <div className="developer-dashboard">
      <div className="d-flex justify-content-between p-2">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
        <button onClick={() => localStorage.clear()} className="btn btn-danger">Logout</button>
      </div>
      <RoleSwitcher navigate={navigate} />
      <h1>Welcome, {userName}!</h1>
      <p>You have the role of Developer</p>
      <hr />
    </div>
    
  );
};

export default DeveloperDashboard;
