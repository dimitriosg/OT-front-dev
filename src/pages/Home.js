// /frontend/src/pages/Home.js

import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Order Taker</h1>
      <p>Your one-stop solution for seamless order management.</p>
      <a href="/login" className="login-link">Log In</a>
    </div>
  );
};

export default Home;
