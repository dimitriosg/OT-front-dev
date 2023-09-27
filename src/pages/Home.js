// /frontend/src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const isLoggedIn = localStorage.getItem('token') ? true : false;
  const userRole = localStorage.getItem('role');
  
  const dashboardPath = `/dashboard/${userRole}Dashboard`;


  return (
    <div className="home-container">
      {isLoggedIn && userRole && (
        <Link to={dashboardPath} className="btn btn-primary m-2">Go To Dashboard</Link>
      )}

      <h1>Welcome to Order Taker</h1>
      <p>Your one-stop solution for seamless order management.</p>
       {!isLoggedIn && (
        <Link to="/login" className="btn btn-primary m-2">Log In</Link>
      )}
    </div>
  );
};

export default Home;
