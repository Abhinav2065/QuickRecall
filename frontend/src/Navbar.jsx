import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './assets/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo/Brand - positioned to the left */}
        <div className="navbar-brand">
          <span className="logo-text">QuickRecall</span>
        </div>

        {/* Mobile menu button */}
        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation items */}
        <div className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <div className="navbar-start">
            <a href="#features" className="navbar-item">Ai Flashcards</a>
            <a href="#careers" className="navbar-item">Quizzes</a>
          </div>
          
          <div className="navbar-end">
            <Link to='/get-started' className="navbar-item cta-button" >Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;