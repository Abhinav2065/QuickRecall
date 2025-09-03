import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h1 className="dashboard-title">Study Dashboard</h1>
        <p className="dashboard-subtitle">Choose your study tool</p>
        
        <div className="dashboard-cards">
          {/* Chat Card */}
          <Link to="/chat" className="dashboard-card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.97 48.97 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
                <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.83.157l2.5-3.285V7.5z" />
              </svg>
            </div>
            <h3>AI Study Chat</h3>
            <p>This feature currently does not work, this will be added soon!</p>
            <div className="card-cta">Currently Unavailable</div>
          </Link>
          
          {/* Flashnotes Card */}
          <Link to="/flashnotes" className="dashboard-card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z" />
                <path fillRule="evenodd" d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </div>
            <h3>Create Flashnotes</h3>
            <p>Transform your content into concise, study-ready flashcards instantly</p>
            <div className="card-cta">Create Notes →</div>
          </Link>
          
          {/* AI Quizzes Card */}
          <Link to="/quizzes" className="dashboard-card">
            <div className="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z" clipRule="evenodd" />
              </svg>
            </div>
            <h3>Create AI Quizzes</h3>
            <p>Generate custom quizzes based on your study materials to test your knowledge</p>
            <div className="card-cta">Create Quiz →</div>
          </Link>
        </div>
        
        <div className="dashboard-footer">
          <p>Need help getting started? <Link to="/guide">Check our tutorial</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;