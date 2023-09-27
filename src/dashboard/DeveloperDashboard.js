/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import './css/DeveloperDashboard.css';
import OrdersSection from '../pages/OrdersSection.js';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../components/RoleSwitcher';
import LogoutButton from '../components/LogoutButton';
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
      <LogoutButton />
      <RoleSwitcher />
      <h1>Welcome, {userName}!</h1>
      <p>You have the role of Developer</p>
      <hr />
    </div>
    
  );
};

export default DeveloperDashboard;
