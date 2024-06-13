import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const history = useHistory();

  useEffect(() => {
    // Optional: Redirect user if already logged in (based on token or authentication state)
    // Example:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   history.push('/dashboard');
    // }
  }, [history]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password,
      });
      console.log(response.data);
      // Handle login success (e.g., store token, redirect to another page)
      localStorage.setItem('token', response.data.token);
      setLoading(false);
      history.push('/dashboard'); // Redirect to dashboard or any other page
    } catch (error) {
      console.error(error);
      // Handle login failure
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Login'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
