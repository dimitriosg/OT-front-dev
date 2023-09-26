/* eslint-disable no-unused-vars */
// src/AppRoutes.js
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import RouteComponents from './components/RouteComponents.js';

import Home from './pages/Home.js';
import Login from './pages/Login-demo.js'; // Login page (for now)

import WaiterDashboard from './dashboard/WaiterDashboard.js';
import CashierDashboard from './dashboard/CashierDashboard.js';
import AccountantDashboard from './dashboard/AccountantDashboard.js';
import AdminDashboard from './dashboard/AdminDashboard.js';
import DeveloperDashboard from './dashboard/DeveloperDashboard.js';

import RoleBasedWrapper from './components/RoleBased/RoleBasedWrapper.js';

const AppRoutes = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard/WaiterDashboard"
          element={
            <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['waiter']}>
              <WaiterDashboard />
            </RoleBasedWrapper>
          }
        />
        <Route
          path="/dashboard/CashierDashboard"
          element={
            <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['cashier']}>
              <CashierDashboard />
            </RoleBasedWrapper>
          }
        />
                <Route
          path="/dashboard/AccountantDashboard"
          element={
            <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['accountant']}>
              <AccountantDashboard />
            </RoleBasedWrapper>
          }
        />
        <Route
          path="/dashboard/AdminDashboard"
          element={
            <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleBasedWrapper>
          }
        />
        <Route
          path="/dashboard/DeveloperDashboard"
          element={
            <RoleBasedWrapper role={localStorage.getItem('role')} allowedRoles={['developer']}>
              <DeveloperDashboard />
            </RoleBasedWrapper>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
