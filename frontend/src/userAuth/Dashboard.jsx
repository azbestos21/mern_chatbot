import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [chatResponse, setChatResponse] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/users/userdetails', {
        headers: { Authorization: `Bearer ${token}` },
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
    window.location.href = '/login';
  };

  const handleChatSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post('http://localhost:5000/api/users/chat', { query }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setChatResponse(response.data.answer);
      } catch (err) {
        console.error('Error fetching chat response:', err);
        setError('Error fetching chat response');
      }
    }
  };

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData ? (
        <div>
          <p>Username: {userData.username}</p>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout}>Logout</button>

          <h2>Chat with AI</h2>
          <form onSubmit={handleChatSubmit}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question"
            />
            <button type="submit">Send</button>
          </form>
          {chatResponse && (
            <div>
              <h3>Response:</h3>
              <p>{chatResponse}</p>
            </div>
          )}
        </div>
      ) : (
        !error && <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
