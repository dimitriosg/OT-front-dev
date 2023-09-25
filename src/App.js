/* eslint-disable no-unused-vars */
import React, {lazy, Suspense, useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import './App.css';
import './pages/Home.js'
import axios from 'axios';

// Lazy loads
const Home = lazy(() => import('./pages/Home.js'));
const Login = lazy(() => import('./pages/Login-demo.js')); // default is Login.js

// Lazy load the Dashboard components
const WaiterDashboard = lazy(() => import('./dashboard/WaiterDashboard.js'));
const CashierDashboard = lazy(() => import('./dashboard/CashierDashboard.js'));
const AccountantDashboard = lazy(() => import('./dashboard/AccountantDashboard.js'));
const AdminDashboard = lazy(() => import('./dashboard/AdminDashboard.js'));
const DeveloperDashboard = lazy(() => import('./dashboard/DeveloperDashboard.js'));

// Create a socket connection to the backend (change the URL to your backend URL)
const socket = io("https://order-taker-back-5416a0177bda.herokuapp.com", {
  path: "/socket.io",
  reconnectionAttempts: 3,  // Attempt to reconnect 3 times before giving up
  reconnectionDelay: 1000,  // Start with a reconnection delay of 1 second
  reconnectionDelayMax: 5000,  // Maximum reconnection delay of 5 seconds
});

// Add a request interceptor
function RoleBasedWrapper({ role, allowedRoles, children }) {
  return (
    allowedRoles.includes(role) ? children : <div>Access Denied</div>
  );
}

// eslint-disable-next-line no-unused-vars
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

    // Error Handling
    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
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
            <Route path="/dashboard/WaiterDashboard" element={
              <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['waiter']}>
                <WaiterDashboard />
              </RoleBasedWrapper>
            } />

            {/* Cashier Dash */}
            <Route path="/dashboard/CashierDashboard" element={
              <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['cashier']}>
                <CashierDashboard />
              </RoleBasedWrapper>
            } />

            {/* ACC Dash */}
            <Route path="/dashboard/AccountantDashboard" element={
              <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['accountant']}>
                <AccountantDashboard />
              </RoleBasedWrapper>
            } />

            {/* ADM Dash */}
            <Route path="/dashboard/AdminDashboard" element={
              <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['admin']}>
                <AdminDashboard />
              </RoleBasedWrapper>
            } />

            {/* DEV Dash */}
            <Route path="/dashboard/DeveloperDashboard" element={
              <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['developer']}>
                <DeveloperDashboard />
              </RoleBasedWrapper>
            } />

          </Routes>
        </Suspense>
        {/* Add a 404 Not Found route or a default route here, if needed */}
      </div>
    </Router>
  );
}

export default App;
