// /frontend/src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const isLoggedIn = localStorage.getItem('token') ? true : false;


  return (
    <div className="home-container">
      <div className="d-flex justify-content-start">
        <Link to="/" className="btn btn-secondary m-2">Back</Link>
      </div>
      <h1>Welcome to Order Taker</h1>
      <p>Your one-stop solution for seamless order management.</p>
      {isLoggedIn ? (
        <div>
          <Link to="/dashboard" className="btn btn-primary m-2">Go To Dashboard</Link>
          <button onClick={() => localStorage.clear()} className="btn btn-danger m-2">Logout</button>
        </div>
      ) : (
        <Link to="/login" className="btn btn-primary m-2">Log In</Link>
      )}
    </div>
  );
};

export default Home;
