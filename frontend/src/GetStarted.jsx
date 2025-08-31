// components/GetStarted.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const GetStarted = () => {
  return (
    <div className="get-started-page">
      <header className="header">
        <Link to="/" className="logo">YourLogo</Link>
        <nav>
          <Link to="/">Home</Link>
        </nav>
      </header>
      
      <div className="get-started-content">
        <h1>Get Started with Our App</h1>
        <p>Start creating amazing study materials in just a few clicks!</p>
        
        <div className="signup-options">
          <div className="signup-card">
            <h3>Sign up with Email</h3>
            <form>
              <input type="email" placeholder="Your email" />
              <input type="password" placeholder="Create password" />
              <button type="submit">Create Account</button>
            </form>
          </div>
          
          <div className="signup-card">
            <h3>Sign up with Google</h3>
            <button className="google-btn">Continue with Google</button>
          </div>
        </div>
        
        <p className="login-link">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default GetStarted;