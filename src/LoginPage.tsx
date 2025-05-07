import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const LogIn = async () => {
    console.log("Login attempt with:", email, password);
    try {
      const response = await fetch('/database/users.json');
      const data = await response.json();
      console.log("Loaded users data:", data);

      const user = data.users.find(
          (user: any) => user.email === email && user.password === password
      );

      if (user) {
        console.log("Login successful:", user);
        localStorage.setItem('userEmail', user.email);
        navigate('/dashboard');
      } else {
        console.warn("Invalid credentials");
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error("Error loading user data:", err);
      setError("Failed to load user data");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and password required');
      return;
    }
    setError('');
    LogIn();
  };

  return (
      <div className="login-bg">
        <div className="login-card">
          <div className="login-card-header">
          <span className="login-card-qr">
            Scan QR code to login <span className="login-qr-icon">&#128273;</span>
          </span>
          </div>
          <h2 className="login-title">Login to Blocksign Wallet</h2>

          <form className="login-form" onSubmit={handleSubmit}>
            <label className="login-label">Email or Wallet ID</label>
            <input
                className={`login-input${error ? ' login-input-error' : ''}`}
                type="text"
                id="login-input"
                placeholder="Enter your email or wallet ID"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="username"
            />
            {error && <div className="login-error">{error}</div>}

            <label className="login-label">Password</label>
            <div className="login-password-wrapper">
              <input
                  className="login-input"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  id="password-input"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  autoComplete="current-password"
              />
              <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setShowPassword(s => !s)}
                  tabIndex={-1}
              >
              <span role="img" aria-label="Show password">
                {showPassword ? '🙈' : '👁️'}
              </span>
              </button>
            </div>

            <button className="login-continue-btn" type="submit">Continue</button>
          </form>

          <button className="login-forgot-btn">Forgot password?</button>
          <div className="login-recovery-link">Login with 12 word recovery phrase</div>
        </div>
      </div>
  );
};

export default LoginPage;
