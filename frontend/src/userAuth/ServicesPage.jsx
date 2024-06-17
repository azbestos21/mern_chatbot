import React from 'react';
import Navbar from '../components/Navbar';
import chatCartoonImage from '../items/logo2.png'; // Import the chat cartoon image
import '../userAuth/PageStyles.css'; // Correct import for common page styles

const ServicesPage = () => {
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
        <h1 className="main-heading">Our Services</h1>
        <p className="main-paragraph">
          At ChatMATE, we offer a wide range of services tailored to enhance your <span className="purple-text">communication experience</span> and <span className="purple-text">streamline everyday tasks</span>. Below are some key services that ChatMATE offers:
        </p>
        <div className="service">
          <h2 className="sub-heading">1. Personalized Recommendations</h2>
          <p className="sub-paragraph">
            ChatMATE leverages AI technology to analyze your preferences and provide  <span className="purple-text">personalized recommendations</span>, whether it's suggesting products, articles, or services tailored to your interests.
          </p>
        </div>
        <div className="service">
          <h2 className="sub-heading">2. Customer Support</h2>
          <p className="sub-paragraph">
            Our chatbot is equipped to handle customer inquiries and support requests efficiently, offering <span className="purple-text">instant assistance</span> and <span className="purple-text">resolving common issues</span> without the need for human intervention.
          </p>
        </div>
        <div className="service">
          <h2 className="sub-heading">3. Task Automation</h2>
          <p className="sub-paragraph">
            ChatMATE can automate repetitive tasks, such as <span className="purple-text">scheduling appointments</span>, sending reminders, and managing to-do lists, allowing you to focus on more important matters.
          </p>
        </div>
        <div className="service">
          <h2 className="sub-heading">4. Information Retrieval</h2>
          <p className="sub-paragraph">
            Need quick access to information? ChatMATE can fetch data, answer questions, and provide insights on a <span className="purple-text">wide range of topics</span>, making information retrieval fast and hassle-free.
          </p>
        </div>
        {/* Add more services as needed */}
      </div>
    </div>
  );
};

export default ServicesPage;
