// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../items/logo2.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <div className="logo-container">
        <Link to="/">
          <img src={logo2} alt="Logo" className="logo" />
        </Link>
      </div>
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">About</Link>
          </li>
          <li className="nav-item">
            <Link to="/services" className="nav-link">Services</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">Contact</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
