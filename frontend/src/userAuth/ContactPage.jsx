import React from 'react';
import Navbar from '../components/Navbar';
import cartoonImage from '../items/logo2.png'; // Import the cartoon image
import '../userAuth/PageStyles.css'; // Correct import for common page styles

const ContactPage = () => {
  const name = 'Rishi Bharadwaj';
  const email = 'rishi.bcbs@gmail.com';
  const phone = '6360584334';

  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content" style={{ fontSize: '18px' }}>
        
        <img src={cartoonImage} alt="ChatMATE Logo" className="cartoon-image" style={{ width: '120px', height: 'auto' }} />
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Whether you have questions about our services, need assistance, or just want to give feedback, feel free to reach out to us. You can contact us via email at <a href={`mailto:${email}`} className="link">{email}</a>
          , phone at {phone}.
        </p>
        <div className="contact-details" style={{ fontSize: '18px' }}>
          <p>Name: {name}</p>
          <p>Email: <a href={`mailto:${email}`} className="link">{email}</a></p>
          <p>Phone: {phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
