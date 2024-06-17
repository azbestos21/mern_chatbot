// src/userAuth/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../userAuth/PageStyles.css'; // Correct import for common page styles

const HomePage = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <h1>Welcome to ChatMATE</h1>
        <p>
          ChatMATE is a smart chatbot platform that provides personalized assistance and support.
          Join us today to experience the future of communication!
        </p>
        <Link to="/login" className="login-link">Continue with ChatMATE</Link>
      </div>
    </div>
  );
};

export default HomePage;
