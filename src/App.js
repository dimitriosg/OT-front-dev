/* eslint-disable no-unused-vars */
// src/App.js
import React, { useEffect } from 'react';
import AppRoutes from './AppRoutes';
import store from './features/store.js';

import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout, resetLogoutSuccess, syncAuthState } from './slices/authSlice.js';


function App() {
    return (
      <Provider store={store}>
        <ReduxContent />
      </Provider>
    );
}

const ReduxContent = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  const logoutSuccess = useSelector((state) => state.auth.logoutSuccess);

  useEffect(() => {
      dispatch(syncAuthState());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
  );
}
  
export default App;
