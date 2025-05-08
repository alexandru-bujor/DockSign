import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import './Hero.css';

const Home: React.FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('scrollToInfoSection')) {
      localStorage.removeItem('scrollToInfoSection');
      setTimeout(() => {
        const section = document.getElementById('info-section');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
          section.classList.add('highlight-info-section');
          setTimeout(() => section.classList.remove('highlight-info-section'), 1200);
        }
      }, 200);
    }
  }, []);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError(
        `Please include an '@' in the email address. '${email}' is missing an '@'.`
      );
    } else {
      setError('');
      // Handle successful signup here
    }
  };

  const handleDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className="home-bg">
      <div className="hero-colored-bg">
        <div className="hero-content-wrapper">
          <main className="hero hero-left">
            <h1>Step Into the Future of Digital Assets</h1>
            <p>Experience secure, fast, and easy documents transactions on a platform built for everyone.</p>
            <div className="hero-buttons">
              <form className="signup-form" onSubmit={handleSubmit} noValidate>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className={error ? 'input-error' : ''}
                    required
                  />
                  <button type="submit">Sign Up</button>
                </div>
                {error && (
                  <div className="email-error-tooltip">
                    <span className="error-icon">⚠️</span>
                    {error}
                  </div>
                )}
              </form>
              <button 
                className="dashboard-button"
                onClick={handleDashboardClick}
              >
                Go to Dashboard
              </button>
            </div>
          </main>
          <div className="hero-image-wrapper">
            <img src="/src/photos/smart-contract.gif" alt="Smart Contract Animation" className="hero-image no-bg" />
          </div>
        </div>
      </div>
              
    </div>
  );
};

export default Home; 