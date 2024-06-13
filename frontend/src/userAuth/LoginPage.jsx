import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

    // Form validation
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

      // Store the token and redirect to the dashboard
      localStorage.setItem('token', response.data.token);
      setLoading(false);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);

      // Handle different types of errors
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
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
    </div>
  );
};

export default LoginPage;
