import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css'; // Import the CSS styles used for LoginPage
import Navbar from '../components/Navbar'; 
import chatCartoonImage from '../items/logo2.png';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/register', {
        username,
        email,
        password,
        confirmPassword
      });
      console.log(response.data);
      setLoading(false);
      setSuccessMessage('User registered successfully. Please check your email for verification.'); // Set success message
    } catch (error) {
      console.error(error);
      setLoading(false);

      // Check if the error response is from validation errors
      if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        setError(validationErrors.map(err => err.msg).join(', '));
      } else if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <>
      <Navbar /> {/* Include the Navbar component */}
      <div className="login-container">
        <img src={chatCartoonImage} alt="Chat Cartoon" className="login-image" style={{ width: '120px', height: 'auto' }} />
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
          {successMessage && <p className="success-message">{successMessage}</p>} {/* Render success message */}
        </form>
        <div className="register-link">
          <p>Already registered? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
