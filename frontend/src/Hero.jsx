import React from 'react';
import { Link } from 'react-router-dom';
import './assets/Hero.css';

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-container">
        {/* Main headline */}
        <h1 className="hero-headline">
          Turn PDF Into Learning Material Instantly.
        </h1>
        
        {/* Subheadline */}
        <p className="hero-subheadline">
          Instantly create AI study guides, flashcards & quizzes
        </p>
        
        {/* CTA Button */}
        <div className="hero-cta-container">
          <Link to="/get-started" className="hero-cta-button">
            Get Started - It's Free →
          </Link>
        </div>
        
        {/* Stats section */}
        <div className="hero-stats">
          <p className="hero-stats-text">
            Save the hassel of preparing Notes and Flashcards!
          </p>
          <p className="hero-stats-text">
            Join us and save insane amount of time in your next study session.
          </p>
        </div>
      </div>
      
      {/* Video showcase section with shadow effect */}
      <div className="video-showcase">
        <div className="video-container">
          <div className="video-shadow-wrapper">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="demo-video"
            >
              <source src="/assets/vdo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-glow"></div>
          </div>
        </div>
        <p className="video-caption">See how our AI transforms your content into study materials</p>
      </div>
    </div>
  );
};

export default Hero;