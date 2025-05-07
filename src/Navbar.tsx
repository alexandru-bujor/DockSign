import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToInfoSection = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname !== '/') {
      localStorage.setItem('scrollToInfoSection', 'true');
      navigate('/');
    } else {
      const section = document.getElementById('info-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        section.classList.add('highlight-info-section');
        setTimeout(() => section.classList.remove('highlight-info-section'), 1200);
      }
    }
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/src/photos/logo 3.png" alt="BlockSign Logo" className="navbar-logo-img" />
      </Link>
      <div className="navbar-spacer" />
      <button className="hamburger" onClick={() => setMenuOpen((open) => !open)} aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul className={`navbar-links${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)}>
        <li><Link to="/login">Sign</Link></li>
        <li><Link to="/check">Check</Link></li>
        <li><a href="#info-section" onClick={handleScrollToInfoSection}>Explorer</a></li>
        <li><Link to="/plans">Plans & Pricing</Link></li>
      </ul>
      <div className={`navbar-actions${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)}>
        <Link to="/login" className="login-btn">Log In</Link>
        <Link to="/signup" className="signup-btn">Sign Up</Link>
      </div>
      {menuOpen && <div className="navbar-backdrop" onClick={() => setMenuOpen(false)}></div>}
    </nav>
  );
};

export default Navbar;