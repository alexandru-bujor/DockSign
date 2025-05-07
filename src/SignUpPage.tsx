import React, { useState } from 'react';
import './LoginPage.css';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (value: string) => value.includes('@') && value.length > 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setError('Invalid Email');
    } else if (password.length < 6) {
      setError('Password must be at least 6 characters');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match');
    } else {
      setError('');
      // Handle sign up logic here
    }
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h2 className="login-title">Create your Blocksign Account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-label">Email</label>
          <input
            className={`login-input${error && error.includes('Email') ? ' login-input-error' : ''}`}
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="username"
          />
          <label className="login-label">Password</label>
          <div className="login-password-wrapper">
            <input
              className={`login-input${error && error.includes('Password') ? ' login-input-error' : ''}`}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              className="login-password-toggle"
              onClick={() => setShowPassword(s => !s)}
              tabIndex={-1}
            >
              <span role="img" aria-label="Show password">{showPassword ? '🙈' : '👁️'}</span>
            </button>
          </div>
          <label className="login-label">Confirm Password</label>
          <input
            className={`login-input${error && error.includes('match') ? ' login-input-error' : ''}`}
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            autoComplete="new-password"
          />
          {error && <div className="login-error">{error}</div>}
          <button className="login-continue-btn" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage; 