// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if token is not present
      history.push('/login');
    } else {
      // Fetch user data using the token
      axios.get('http://localhost:5000/api/users/dashboard', {
        headers: { Authorization: token },
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        // Optional: Handle error and logout user
        // localStorage.removeItem('token');
        // history.push('/login');
      });
    }
  }, [history]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    history.push('/login');
  };

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {userData && (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
