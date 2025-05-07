import React, { useState } from 'react';
import './Dashboard.css';

interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  documentsCount: number;
  recentSignatures: number;
  pendingDocuments: number;
  completedDocuments: number;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  status: 'pending' | 'signed' | 'completed';
}

const Dashboard: React.FC = () => {
  const [user] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://via.placeholder.com/40',
    documentsCount: 15,
    recentSignatures: 8,
    pendingDocuments: 3,
    completedDocuments: 12
  });

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Contract Agreement.pdf',
      type: 'PDF',
      size: '2.4 MB',
      lastModified: '2 hours ago',
      status: 'pending'
    },
    {
      id: '2',
      name: 'NDA Document.pdf',
      type: 'PDF',
      size: '1.8 MB',
      lastModified: '1 day ago',
      status: 'signed'
    },
    {
      id: '3',
      name: 'Project Proposal.docx',
      type: 'DOCX',
      size: '3.2 MB',
      lastModified: '2 days ago',
      status: 'completed'
    }
  ]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: files[0].name,
        type: files[0].name.split('.').pop()?.toUpperCase() || 'Unknown',
        size: `${(files[0].size / (1024 * 1024)).toFixed(1)} MB`,
        lastModified: 'Just now',
        status: 'pending'
      };
      setDocuments([newDocument, ...documents]);
    }
  };

  return (
    <div className="dashboard">
      <nav className="sidebar">
        <div className="logo">
          <h2>DockSign</h2>
        </div>
        <ul className="nav-links">
          <li className="active">Dashboard</li>
          <li>Documents</li>
          <li>Signatures</li>
          <li>Templates</li>
          <li>Settings</li>
        </ul>
      </nav>

      <main className="main-content">
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
          <div className="section documents-section">
            <div className="section-header">
              <h3>My Documents</h3>
              <div className="upload-container">
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx"
                />
                <label htmlFor="file-upload" className="upload-button">
                  <span className="icon">📤</span>
                  Upload Document
                </label>
              </div>
            </div>
            <div className="document-list">
              {documents.map((doc) => (
                <div key={doc.id} className="document-item">
                  <div className="document-icon">
                    {doc.type === 'PDF' ? '📄' : '📝'}
                  </div>
                  <div className="document-info">
                    <h4>{doc.name}</h4>
                    <p>{doc.type} • {doc.size} • {doc.lastModified}</p>
                  </div>
                  <div className="document-actions">
                    <span className={`status-badge ${doc.status}`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                    <button className="sign-button">Sign Now</button>
                  </div>
                </div>
              ))}
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
      </main>
    </div>
  );
};

export default Dashboard; 