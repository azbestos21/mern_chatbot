import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import chatCartoonImage from '../items/logo2.png'; // Import the chat cartoon image
import '../userAuth/PageStyles.css'; // Correct import for common page styles

const HomePage = () => {
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
        <h1 className="main-heading" style={{ fontSize: '3rem' }}>Welcome to ChatMATE</h1>
        <p className="main-paragraph" style={{ fontSize: '1.4rem' }}>
          Welcome to ChatMATE, your intelligent chatbot companion powered by ChatGPT! ChatMATE leverages <span className="purple-text">advanced capabilities</span> to offer <span className="purple-text">personalized assistance and support</span>. Join us today to experience <span className="purple-text">cutting-edge AI technology</span> meets your everyday needs seamlessly.
        </p>
        <p className="main-paragraph" style={{ fontSize: '1.4rem' }}>
          Whether it's <span className="purple-text">answering questions</span>, <span className="purple-text">providing recommendations</span>, or engaging in meaningful conversations, ChatMATE is here to make your interactions <span className="purple-text">smarter and more efficient</span>. Explore the possibilities with ChatMATE and discover the next level of <span className="purple-text"> conversational AI</span>!
        </p>
        <Link to="/login" className="login-link">Continue with ChatMATE</Link>
      </div>
    </div>
  );
};

export default HomePage;
