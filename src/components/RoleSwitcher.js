import React from 'react';

const RoleSwitcher = ({ newRole, navigate }) => {
    const currentRole = localStorage.getItem('role');

    if (currentRole !== 'admin' && currentRole !== 'developer') {
        console.error('Permission denied: Only Admins and Developers can switch roles.');
        return null;
    }

    if (currentRole === 'admin' && newRole === 'developer') {
        console.error('Permission denied: Admins cannot switch to Developer role.');
        return null;
    }

    const handleSwitchRole = () => {
        localStorage.setItem('role', newRole);

        switch (newRole) {
            case 'admin':
                navigate('/dashboard/AdminDashboard');
                break;
            case 'developer':
                navigate('/dashboard/DeveloperDashboard');
                break;
            case 'accountant':
                navigate('/dashboard/AccountantDashboard');
                break;
            case 'cashier':
                navigate('/dashboard/CashierDashboard');
                break;
            case 'waiter':
                navigate('/dashboard/WaiterDashboard');
                break;
            default:
                navigate('/');
        }
    };

    return (
        <div>
            <select value={newRole} onChange={(e) => handleSwitchRole(e.target.value)}>
                <option value="" disabled>Select role</option>
                <option value="admin">Admin</option>
                <option value="developer">Developer</option>
                <option value="accountant">Accountant</option>
                <option value="cashier">Cashier</option>
                <option value="waiter">Waiter</option>
            </select>
        </div>
    );
};

export default RoleSwitcher;
