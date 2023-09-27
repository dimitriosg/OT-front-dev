/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/DeveloperDashboard.css';
import OrdersSection from '../pages/OrdersSection.js';
import RoleSwitcher from '../components/RoleSwitcher';
import '../styles/DashboardStyles.css';  // Import the styles
import 'bootstrap/dist/css/bootstrap.min.css';

const DeveloperDashboard = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('');
  const [originalRole, setOriginalRole] = useState(localStorage.getItem('role'));
  const [hasSwitchedRole, setHasSwitchedRole] = useState(false);
  const userName = localStorage.getItem('userName');

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleApplyRole = () => {
    if (selectedRole) {
      RoleSwitcher(selectedRole, navigate);
      setHasSwitchedRole(true);
    }
  };

  const handleRevertRole = () => {
    if (hasSwitchedRole) {
      RoleSwitcher(originalRole, navigate);
      setHasSwitchedRole(false);
    }
  };

  return (
    <div className="developer-dashboard">
      <div className="d-flex justify-content-between p-2">
        <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
        <button onClick={() => localStorage.clear()} className="btn btn-danger">Logout</button>
      </div>

      <h1>Welcome, {userName}!</h1>
      <p>You have the role of Developer</p>

      <hr />
      <RoleSwitcher />
      <hr />
      
    </div>
  );
};

export default DeveloperDashboard;
