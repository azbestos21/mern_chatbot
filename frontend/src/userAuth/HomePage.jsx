import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import Navbar from '../components/Navbar';
import '../userAuth/PageStyles.css'; // Correct import for common page styles

const HomePage = () => {
  return (
    <div className="page-container">
      <Navbar />
      <div className="page-content">
        <h1 className="main-heading">Welcome to HealthMATE</h1>
        <Carousel showThumbs={false} showStatus={false} showArrows autoPlay interval={5000} infiniteLoop>
          <div className="carousel-item">
            <p className="health-tip">Stay hydrated by drinking at least 8 cups of water a day.</p>
          </div>
          <div className="carousel-item">
            <p className="health-tip">Get at least 30 minutes of exercise most days of the week.</p>
          </div>
          <div className="carousel-item">
            <p className="health-tip">Eat a balanced diet with a variety of fruits and vegetables.</p>
          </div>
        </Carousel>
        <p className="main-paragraph">
          Welcome to HealthMATE, your intelligent health assistant powered by ChatGPT! HealthMATE leverages <span className="bold-text">advanced capabilities</span> to offer <span className="bold-text">personalized health advice and support</span>. Join us today to experience how <span className="bold-text">cutting-edge AI technology</span> meets your healthcare needs seamlessly.
        </p>
        <p className="main-paragraph">
          Whether it's <span className="bold-text">answering health-related questions</span>, <span className="bold-text">providing medical recommendations</span>, or engaging in meaningful conversations about your well-being, HealthMATE is here to make your interactions <span className="bold-text">smarter and more efficient</span>. Explore the possibilities with HealthMATE and discover the next level of <span className="bold-text">conversational AI in healthcare</span>!
        </p>
        <Link to="/login" className="login-link">Continue with HealthMATE</Link>
      </div>
    </div>
  );
};

export default HomePage;
