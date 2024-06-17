import React from 'react';
import Navbar from '../components/Navbar';
import chatCartoonImage from '../items/logo2.png'; // Import the chat cartoon image
import '../userAuth/PageStyles.css'; // Correct import for common page styles

const AboutPage = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <div className="chat-cartoon-container">
          <img
            src={chatCartoonImage}
            alt="Chat Cartoon"
            className="chat-cartoon"
            style={{ width: '100px', height: 'auto' }} // Adjust the width and height as needed
          />
        </div>
        <h1 className="main-heading" style={{ fontSize: '3rem' }}>About Us</h1>
        <p className="main-paragraph" style={{ fontSize: '1.4rem' }}>
          Welcome to <span className="purple-text">ChatMATE</span>! We are dedicated to providing personalized assistance and support through our smart chatbot platform. Our mission is to revolutionize communication and make it more accessible and efficient for everyone.
        </p>
        <h2 className="sub-heading" style={{ fontSize: '2rem' }}>Our Technology</h2>
        <p className="sub-paragraph" style={{ fontSize: '1.2rem' }}>
          At <span className="purple-text">ChatMATE</span>, we leverage the cutting-edge capabilities of <span className="purple-text">ChatGPT's latest version, GPT-3.5 Turbo</span>, to power our intelligent chatbot companion. This allows us to deliver high-quality responses, engage in meaningful conversations.
        </p>
        <h2 className="sub-heading" style={{ fontSize: '2rem' }}>Our Vision</h2>
        <p className="sub-paragraph" style={{ fontSize: '1.2rem' }}>
          Our vision is to <span className="purple-text">transform the way people interact and communicate</span> by harnessing the power of AI. We strive to create a seamless and intuitive experience for our users, making everyday tasks simpler and more enjoyable.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
