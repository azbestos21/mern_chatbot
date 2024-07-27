import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './PageStyles.css';
import Navbar from '../components/Navbar'; // Import the Navbar component

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    if (!username || !password) {
      setError('Please enter username and password');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });
      console.log(response.data);

      localStorage.setItem('token', response.data.token);
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <Navbar /> {/* Include the Navbar component */}
      <div className="page-content">
        <h1 className="main-heading">Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="login-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
          />
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Loading...' : 'Login'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="register-link">
          <p>New user? <Link to="/register">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
