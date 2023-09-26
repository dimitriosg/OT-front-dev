// src/dashboard/AdminDashboard.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { switchRoleAndNavigate } from './dashFunctions/roleSwitcher.js';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('');

    const [activeTab, setActiveTab] = useState('users');

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleSwitchRole = () => {
        switchRoleAndNavigate(selectedRole, navigate);
    };

    return (
        <div className="admin-dashboard">
            <h1>Welcome, {localStorage.getItem('userName')}!</h1>
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
