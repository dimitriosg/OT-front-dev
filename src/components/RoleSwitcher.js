/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const RoleSwitcher = () => {
    const navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState('');
    const [originalRole, setOriginalRole] = useState(localStorage.getItem('role'));
    const [hasSwitchedRole, setHasSwitchedRole] = useState(false);


    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleApplyRole = () => {
        if (selectedRole) {
            switchRoleAndNavigate(selectedRole, navigate);
            setHasSwitchedRole(true);
        }
    };

    const handleRevertRole = () => {
        if (hasSwitchedRole) {
            switchRoleAndNavigate(originalRole, navigate);
            setHasSwitchedRole(false);
        }
    };

    const switchRoleAndNavigate = (newRole, navigate) => {
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
            <select value={selectedRole} onChange={handleRoleChange} className="form-select m-2">
                <option value="" disabled>Select role</option>
                <option value="admin">Admin</option>
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

export default RoleSwitcher;
