import React, {lazy, Suspense, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';
//import axios from 'axios';

// Lazy loads
const Home = lazy(() => import('./pages/Home.js'));
const Login = lazy(() => import('./pages/Login.js'));

// Lazy load the Dashboard components
const WaiterDashboard = lazy(() => import('./dashboard/WaiterDashboard.js'));
const SupervisorDashboard = lazy(() => import('./dashboard/SupervisorDashboard.js'));
const AccountantDashboard = lazy(() => import('./dashboard/AccountantDashboard.js'));
const AdminDashboard = lazy(() => import('./dashboard/AdminDashboard.js'));
const DeveloperDashboard = lazy(() => import('./dashboard/DeveloperDashboard.js'));

// Create a socket connection to the backend
const socket = io('http://localhost:4000');  // Replace with your backend URL

// Add a request interceptor
function RoleBasedWrapper({ role, allowedRoles, children }) {
  return (
    allowedRoles.includes(role) ? children : <div>Access Denied</div>
  );
}

function RedirectBasedOnRole() {
  const role = localStorage.getItem('role');
  const navigate = useNavigate();

  useEffect(() => {
    if (role) {
      navigate(`/dashboard/${role}`);
    }
  }, [role, navigate]);

  return null;
}

function App() {
  const [orders, setOrders] = useState([]); // State to keep track of orders
  const role = localStorage.getItem('role');

  useEffect(() => {
    // Listen for new orders
    socket.on('newOrder', (newOrder) => {
      console.log('New order received:', newOrder);
      // Update the UI accordingly
      setOrders(prevOrders => [...prevOrders, newOrder]); // Add the new order to the orders state
    });

    // Listen for order status changes
    socket.on('orderStatusChanged', (updatedOrder) => {
      console.log('Order status changed:', updatedOrder);
      setOrders(prevOrders => prevOrders.map(order =>
        order.orderID === updatedOrder.orderID ? updatedOrder : order
      )); // Update the status of the matching order
    });

    return () => {
      // Cleanup
      socket.off('newOrder');
      socket.off('orderStatusChanged');
    };
  }, []);

  return (
    <Router>
      <div>
        {/* Add your navigation links here, if any */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

            {/* Waiter Dash */}
            <Route path="/dashboard/waiter" element={
              <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['waiter']}>
                <WaiterDashboard />
              </RoleBasedWrapper>
            } />

            {/* SUP Dash */}
            <Route path="/dashboard/supervisor" element={
              <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['supervisor']}>
                <SupervisorDashboard />
              </RoleBasedWrapper>
            } />

            {/* ACC Dash */}
            <Route path="/dashboard/accountant" element={
              <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['accountant']}>
                <AccountantDashboard />
              </RoleBasedWrapper>
            } />

            {/* ADM Dash */}
            <Route path="/dashboard/admin" element={
              <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleBasedWrapper>
            } />

            {/* DEV Dash */}
            <Route path="/dashboard/developer" element={
              <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['developer']}>
                <DeveloperDashboard />
              </RoleBasedWrapper>
            } />

          </Routes>
        </Suspense>
        {/* Add a 404 Not Found route or a default route here, if needed */}
      </div>

      {role && ( // Only display Orders if a role is set (i.e., the user is logged in)
        <div>
          <h1>Orders</h1>
          <ul>
            {orders.map(order => (
              <li key={order.orderID}>
                Order ID: {order.orderID}, Status: {order.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Router>
  );
}

export default App;
