import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import './Dashboard.css';
import sandyAvatar from '../photos/sandu.jpg';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  documentsCount: number;
  recentSignatures: number;
  pendingDocuments: number;
  completedDocuments: number;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: sandyAvatar,
    documentsCount: 15,
    recentSignatures: 8,
    pendingDocuments: 3,
    completedDocuments: 12
  });

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="logo" onClick={() => navigate('/')} role="button" tabIndex={0}>
          <h2>DockSign</h2>
        </div>
        <ul className="nav-links">
          <li 
            className={location.pathname === '/dashboard' ? 'active' : ''}
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </li>
          <li 
            className={location.pathname === '/dashboard/documents' ? 'active' : ''}
            onClick={() => navigate('/dashboard/documents')}
          >
            Documents
          </li>
          <li>Signatures</li>
          <li>Templates</li>
          <li
            className={location.pathname === '/dashboard/settings' ? 'active' : ''}
            onClick={() => navigate('/dashboard/settings')}
          >
            Settings
          </li>
        </ul>
      </nav>

      <main className="main-content">
        {location.pathname === '/dashboard' ? (
          <>
            <header className="header">
              <div className="search-bar">
                <input type="text" placeholder="Search documents..." />
              </div>
              <div className="user-profile">
                <span>{user.name}</span>
                <img src={user.avatar} alt={user.name} className="avatar" />
              </div>
            </header>

            <div className="welcome-section">
              <h1>Welcome back, {user.name}!</h1>
              <p>Here's what's happening with your documents today.</p>
            </div>

            <div className="dashboard-grid">
              <div className="stat-card">
                <h3>Total Documents</h3>
                <p className="stat-number">{user.documentsCount}</p>
                <span className="trend positive">+2 new this week</span>
              </div>

              <div className="stat-card">
                <h3>Recent Signatures</h3>
                <p className="stat-number">{user.recentSignatures}</p>
                <span className="trend positive">+3 this week</span>
              </div>

              <div className="stat-card">
                <h3>Pending Documents</h3>
                <p className="stat-number">{user.pendingDocuments}</p>
                <span className="trend neutral">Needs attention</span>
              </div>

              <div className="stat-card">
                <h3>Completed</h3>
                <p className="stat-number">{user.completedDocuments}</p>
                <span className="trend positive">All signed</span>
              </div>
            </div>

            <div className="dashboard-sections">
              <div className="section recent-documents">
                <h3>Recent Documents</h3>
                <div className="document-list">
                  <div className="document-item">
                    <div className="document-icon">📄</div>
                    <div className="document-info">
                      <h4>Contract Agreement</h4>
                      <p>Last modified: 2 hours ago</p>
                    </div>
                    <button className="sign-button">Sign Now</button>
                  </div>
                  <div className="document-item">
                    <div className="document-icon">📄</div>
                    <div className="document-info">
                      <h4>NDA Document</h4>
                      <p>Last modified: 1 day ago</p>
                    </div>
                    <button className="sign-button">Sign Now</button>
                  </div>
                  <div className="document-item">
                    <div className="document-icon">📄</div>
                    <div className="document-info">
                      <h4>Project Proposal</h4>
                      <p>Last modified: 2 days ago</p>
                    </div>
                    <button className="sign-button">Sign Now</button>
                  </div>
                </div>
              </div>

              <div className="section quick-actions">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button className="action-button">
                    <span className="icon">📤</span>
                    Upload Document
                  </button>
                  <button className="action-button">
                    <span className="icon">✍️</span>
                    New Signature
                  </button>
                  <button className="action-button">
                    <span className="icon">📝</span>
                    Create Template
                  </button>
                  <button className="action-button">
                    <span className="icon">👥</span>
                    Share Document
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default Dashboard; 