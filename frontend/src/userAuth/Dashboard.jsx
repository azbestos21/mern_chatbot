import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Dashboard.module.css'; // Import the CSS module

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]); // State to store chat messages

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
        // Add the user's message to the chat history
        setMessages(prevMessages => [...prevMessages, { role: 'user', content: query }]);
        setQuery(''); // Clear the input field

        const response = await axios.post('http://localhost:5000/api/users/chat', { query }, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Add the AI's response to the chat history
        setMessages(prevMessages => [...prevMessages, { role: 'assistant', content: response.data.answer }]);
      } catch (err) {
        console.error('Error fetching chat response:', err);
        setError('Error fetching chat response');
      }
    }
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.userInfo}>
        {userData && (
          <>
            <p>Username: {userData.username}</p>
            <p>Email: {userData.email}</p>
            <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          </>
        )}
      </div>
      <h1>Welcome</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData ? (
        <div className={styles.chatContainer}>
          <h2>Interact with ChatMate</h2>
          <div className={styles.chatHistory}>
            {messages.map((message, index) => (
              <div key={index} className={message.role === 'user' ? styles.userMessage : styles.assistantMessage}>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleChatSubmit} className={styles.chatForm}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask a question"
              className={styles.chatInput}
            />
            <button type="submit" className={styles.sendButton}>Send</button>
          </form>
        </div>
      ) : (
        !error && <p>Loading user data...</p>
      )}
    </div>
  );
};

export default Dashboard;
