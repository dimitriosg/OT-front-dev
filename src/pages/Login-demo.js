/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 
import '../styles/Login.css';  // Import the CSS 

const BACKEND_URL="https://order-taker-back-5416a0177bda.herokuapp.com";

// Create an axios instance with the base URL and withCredentials set to true
const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

const Login = () => { 
  const navigate = useNavigate(); 
  const role = localStorage.getItem('role');

  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [forgotEmail, setForgotEmail] = useState(''); 
  const [forgotRole, setForgotRole] = useState(''); 
  const [showForgotPassword, setShowForgotPassword] = useState(false); 
  const [logoutSuccess, setLogoutSuccess] = useState(false); 

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('loggedOut')) {
      setLogoutSuccess(true);
    }
  }, []);

  const handleLogin = async () => { 
    setLoading(true); 
    setError(null); 

    try { 
      const response = await api.post('/api/users/authenticate', { 
        email, 
        password, 
      }); 
      console.log('Response:', response);  // Log the response 

      const token = response.data.token; 
      localStorage.setItem('token', token); 
      localStorage.setItem('role', response.data.role); 
      localStorage.setItem('userName', response.data.name);  // Store the user's name

      setLoading(false); 
      console.log('Logged in successfully'); 
      console.log('Role:', response.data.role);

      // Redirect based on role
      switch(response.data.role) {
        case 'admin':
            navigate('/dashboard/AdminDashboard');
            break;
        case 'accountant':
            navigate('/dashboard/AccountantDashboard');
            break;
        case 'developer':
            navigate('/dashboard/DeveloperDashboard');
            break;
        case 'cashier':
            navigate('/dashboard/CashierDashboard');
            break;
        case 'waiter':
            navigate('/dashboard/WaiterDashboard');
            break;
        default:
            setError('Unrecognized role. Unable to redirect to dashboard.');
            navigate('/');  // Default redirection if role is not recognized
      }


    } catch (error) { 
      setLoading(false); 
      setError('Invalid credentials or error logging in.'); 
      console.log('Error during login', error); 
    } 
  }; 

  const handleForgotPassword = async () => { 
    try { 
      await api.post('/forgot-password', { 
        email: forgotEmail, 
        role: forgotRole, 
      }); 
      alert('If the information is correct and if approved, an email will be sent with instructions on how to reset the password. You can also contact your admin directly if you need a faster response.'); 
    } catch (error) { 
      console.log('Error during forgot password', error); 
    } 
  }; 

  const handleGoToDashboard = () => {
    switch(role) {
        case 'admin':
            navigate('/dashboard/AdminDashboard');
            break;
        case 'accountant':
            navigate('/dashboard/AccountantDashboard');
            break;
        case 'developer':
            navigate('/dashboard/DeveloperDashboard');
            break;
        case 'cashier':
            navigate('/dashboard/CashierDashboard');
            break;
        case 'waiter':
            navigate('/dashboard/WaiterDashboard');
            break;
        default:
            setError('Unrecognized role. Unable to redirect to dashboard.');
            break;
    }
};

  // Call this function whenever an Admin or Developer switches roles
  const switchRoleAndNavigate = (newRole) => {
    const currentRole = localStorage.getItem('role');

    // Check if the function is called by an Admin or Developer
    if (currentRole !== 'admin' && currentRole !== 'developer') {
      console.error('Permission denied: Only Admins and Developers can switch roles.');
      return;  // Exit the function if not an Admin or Developer
    }

    // Check if an Admin is trying to switch to Developer
    if (currentRole === 'admin' && newRole === 'developer') {
      console.error('Permission denied: Admins cannot switch to Developer role.');
      return;  // Exit the function if an Admin is trying to switch to Developer
    }

    // Temporarily update the role in the local storage or in the state
    localStorage.setItem('role', newRole);

    // Navigate to the respective dashboard based on the new role
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
            navigate('/');  // Default redirection if role is not recognized
    }
};

  return (
    <div className="login-container">
      <button className="back-button" onClick={() => navigate('/')}>Back</button>

      {logoutSuccess && <p>Successful logout</p>}
      {role && (
        <button onClick={handleGoToDashboard}>Go to Dashboard</button>
      )}

      { !showForgotPassword ? ( 
        <div className="login-form">
          {/* Logo */}
          <img src={`${process.env.PUBLIC_URL}/imavrithalassa_logo.jpg`} alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
        
          {/* Login form */}
          <h1>Login</h1>
          {error && <p className="error-text">{error}</p>}
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <label>
              Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      ) : (
        <div className="forgot-password-section">
          <h2>Forgot Password?</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleForgotPassword(); }}>
            <label>
              Email:
              <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} />
            </label>
            <br />
            <label>
              Role:
              <input type="text" value={forgotRole} onChange={(e) => setForgotRole(e.target.value)} />
            </label>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      <button onClick={() => setShowForgotPassword(!showForgotPassword)}>
        {showForgotPassword ? 'Back to Login' : 'Forgot Password?'}
      </button>
    </div>
  );
}; 

export default Login;
