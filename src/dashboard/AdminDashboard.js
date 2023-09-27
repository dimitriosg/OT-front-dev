// src/dashboard/AdminDashboard.js

import React, { useState } from 'react';
import RoleSwitcher from '../components/RoleSwitcher';
import LogoutButton from '../components/LogoutButton';
import '../styles/DashboardStyles.css';  // Import the styles



const AdminDashboard = () => {
    const userName = localStorage.getItem('userName');
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div className="admin-dashboard">
            <LogoutButton />
            <RoleSwitcher />
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
