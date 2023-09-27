// frontend/src/components/RoleSwitcher.js

export const RoleSwitcher = (newRole, navigate) => {
    const currentRole = localStorage.getItem('role');

    if (currentRole !== 'admin' && currentRole !== 'developer') {
        console.error('Permission denied: Only Admins and Developers can switch roles.');
        return;
    }

    if (currentRole === 'admin' && newRole === 'developer') {
        console.error('Permission denied: Admins cannot switch to Developer role.');
        return;
    }

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

export default RoleSwitcher;
