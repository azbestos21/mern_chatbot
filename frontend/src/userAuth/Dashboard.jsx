import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data using the token
      axios.get('http://localhost:5000/api/users/userdetails', {
        headers: { Authorization: `Bearer ${token}` }, // Add Bearer token format
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        !error && <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
