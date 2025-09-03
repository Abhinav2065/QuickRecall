// components/GetStarted.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/GetStarted.css';

const GetStarted = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Print form data with quoted keys
    console.log('Form Data:', JSON.stringify(formData));
    if (formData.password !== formData.password2) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/api/register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
        first_name: formData.first_name || 'User', // Default if empty
        last_name: formData.last_name || 'User',
      });
      // Auto-login after registration
      const loginResponse = await axios.post('http://localhost:8000/api/token/', {
        username: formData.username,
        password: formData.password,
      });
      localStorage.setItem('access_token', loginResponse.data.access);
      localStorage.setItem('refresh_token', loginResponse.data.refresh);
      navigate('/'); // Adjust to your desired route
    } catch (err) {
      setError(
        err.response?.data?.username?.[0] ||
        err.response?.data?.email?.[0] ||
        'Registration failed. Please try again.'
      );
    }
  };

  return (
    <div className="get-started-page">
      <div className="get-started-content">
        <h1>Get Started with QuickRecall</h1>
        <p>Start creating amazing study materials in just a few clicks!</p>

        <div className="signup-options">
          <div className="signup-card">
            <h3>Sign up with Email</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Your username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password2"
                placeholder="Confirm password"
                value={formData.password2}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="first_name"
                placeholder="First name"
                value={formData.first_name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleChange}
              />
              <button type="submit">Create Account</button>
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        </div>

        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;