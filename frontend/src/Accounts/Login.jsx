// components/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/GetStarted.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/token/', {
        username: formData.username,
        password: formData.password,
      });
      // Store tokens in localStorage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      // Redirect to dashboard
      navigate('/dashboard'); // Adjust to your desired route
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Login failed. Please check your username or password.'
      );
    }
  };

  return (
    <div className="get-started-page">
      <div className="get-started-content">
        <h1>Welcome Back to QuickRecall.</h1>
        <p>Continue with your amazing study journey!</p>

        <div className="signup-options">
          <div className="signup-card">
            <h3>Login</h3>
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
                type="password"
                name="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="submit">Login</button>
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        </div>

        <p className="login-link">
          New Here? <Link to="/get-started">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;