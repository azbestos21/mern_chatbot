import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // Import the CSS styles used for LoginPage
import Navbar from '../components/Navbar'; // Import the Navbar component

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    // Form validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill out all fields');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
      });
      console.log(response.data);
      setLoading(false);
      // Handle registration success (e.g., show a message, redirect to login)
    } catch (error) {
      console.error(error);
      setError('An error occurred. Please try again later.');
      setLoading(false);
      // Handle registration failure
    }
  };

  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
      <div className="login-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="login-input"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="login-input"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="login-input"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="login-input"
          />
          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Loading...' : 'Register'}
          </button>
          {error && <p className="error-message">{error}</p>}
        </form>
        <div className="register-link">
          <p>Already registered? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
