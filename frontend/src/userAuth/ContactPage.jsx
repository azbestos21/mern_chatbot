// src/userAuth/ContactPage.jsx
import React from 'react';
import Navbar from '../components/Navbar';
import '../userAuth/PageStyles.css'; // Correct import for common page styles

const ContactPage = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Whether you have questions about our services, need assistance, or just want to give feedback, feel free to reach out to us. You can contact us via email, phone, or our social media channels.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;
