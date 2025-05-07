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
      <div className="info-section" id="info-section">
        <div className="info-cards-grid">
          <div className="info-card animated-card">
            <div className="info-card-content">
              <h2>Search, manage, and analyze agreements with AI</h2>
              <p>Use AI to find agreements and terms quickly, receive agreement reminders, and access powerful insights from a central repository.</p>
              <a href="#info-section" className="info-card-link">Explore Navigator &rarr;</a>
            </div>
            <div className="info-card-image">
              <img src="https://placehold.co/320x120?text=Search+documents" alt="Search documents" />
            </div>
          </div>
          <div className="info-card animated-card">
            <div className="info-card-content">
              <h2>Send, sign, and track documents</h2>
              <p>Get signatures from anywhere, using almost any device. Finalize agreements faster with collaborative commenting, shared templates, and delivery in the apps your signers already use.</p>
              <a href="#" className="info-card-link">Explore eSignature &rarr;</a>
            </div>
            <div className="info-card-image">
              <img src="https://placehold.co/320x120?text=Sign+documents" alt="Sign documents" />
            </div>
          </div>
          <div className="info-card animated-card wide">
            <div className="info-card-content">
              <h2>Automate agreement processes</h2>
              <p>Build customized workflows that automate and accelerate the various steps in your agreement processes—no coding required.</p>
              <a href="#" className="info-card-link">Explore Maestro &rarr;</a>
            </div>
            <div className="info-card-image">
              <img src="https://placehold.co/320x120?text=Automate+processes" alt="Automate processes" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 