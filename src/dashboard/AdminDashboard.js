/* eslint-disable no-unused-vars */
// src/dashboard/AdminDashboard.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoleSwitcher from '../components/RoleSwitcher';
import '../styles/DashboardStyles.css';  // Import the styles
import 'bootstrap/dist/css/bootstrap.min.css';


const AdminDashboard = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem('userName');
    const [selectedRole, setSelectedRole] = useState('');
    const [originalRole, setOriginalRole] = useState(localStorage.getItem('role'));
    const [hasSwitchedRole, setHasSwitchedRole] = useState(false);
    const [activeTab, setActiveTab] = useState('users');

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

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="admin-dashboard">
            <div className="d-flex justify-content-between p-2">
                <button onClick={() => navigate(-1)} className="btn btn-secondary">Back</button>
                <button onClick={() => localStorage.clear()} className="btn btn-danger">Logout</button>
            </div>
            <RoleSwitcher navigate={navigate} />
            <h1>Welcome, {userName}!</h1>
            <div className="tabs">
                <button onClick={() => setActiveTab('users')}>Users</button>
                <button onClick={() => setActiveTab('menu')}>Menu</button>
                <button onClick={() => setActiveTab('orders')}>Orders</button>
            </div>
            <div className="tab-content">
                {activeTab === 'users' && <UsersTab />}
                {activeTab === 'menu' && <MenuTab />}
                {activeTab === 'orders' && <OrdersTab />}
            </div>

            <select value={selectedRole} onChange={handleRoleChange}>
                <option value="" disabled>Select role</option>
                <option value="developer">Developer</option>
                <option value="accountant">Accountant</option>
                <option value="cashier">Cashier</option>
                <option value="waiter">Waiter</option>
            </select>
            <button onClick={handleApplyRole} className="btn btn-success m-2">
                Apply
            </button>
            {hasSwitchedRole && (
                <button onClick={handleRevertRole} className="btn btn-warning m-2">
                Revert to Original Role
                </button>
            )}
        </div>
    );
};

const UsersTab = () => {
    return (
        <div className="users-tab">
            {/* Content for managing users */}
        </div>
    );
};

const MenuTab = () => {
    return (
        <div className="menu-tab">
            {/* Content for managing menu items */}
        </div>
    );
};

const OrdersTab = () => {
    return (
        <div className="orders-tab">
            {/* Content for managing orders */}
        </div>
    );
};

export default AdminDashboard;
