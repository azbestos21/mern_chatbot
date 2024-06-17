// src/userAuth/AboutPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import '../userAuth/PageStyles.css'; // Correct import for common page styles

const AboutPage = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <h1>About Us</h1>
        <p>
          Welcome to ChatMATE! We are dedicated to providing personalized assistance and support through our smart chatbot platform. Our mission is to revolutionize communication and make it more accessible and efficient for everyone.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
