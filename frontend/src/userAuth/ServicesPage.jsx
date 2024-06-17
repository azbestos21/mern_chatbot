// src/userAuth/ServicesPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import '../userAuth/PageStyles.css'; // Correct import for common page styles

const ServicesPage = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <h1>Our Services</h1>
        <p>
          At ChatMATE, we offer a range of services designed to enhance your communication experience. Our chatbot provides instant support and assistance, helping you with a variety of tasks and inquiries. Explore our services to see how we can help you.
        </p>
      </div>
    </div>
  );
};

export default ServicesPage;
