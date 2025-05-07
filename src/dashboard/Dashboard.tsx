import React, { useEffect, useState } from 'react';
import './Dashboard.css';

interface UserProfile {
  documents: Document;
  name: string;
  email: string;
  avatar: string;
  documentsCount: number;
  recentSignatures: number;
  pendingDocuments: number;
  completedDocuments: number;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    console.log("Reading email from localStorage:", userEmail);

    if (!userEmail) {
      setError('No user logged in.');
      return;
    }

    fetch('/database/users.json')
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch users');
          return response.json();
        })
        .then(data => {
          console.log("Fetched users:", data.users);
          const matchedUser = data.users.find((u: any) => u.email === userEmail);
          if (!matchedUser) throw new Error('User not found');
          setUser(matchedUser);
        })
        .catch(err => {
          console.error("Dashboard error:", err);
          setError('Failed to load user data.');
        });
  }, []);

  if (error) return <div className="dashboard-error">{error}</div>;
  if (!user) return <div className="dashboard-loading">Loading...</div>;
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0 && user) {
      const newDoc: Document = {
        id: Date.now().toString(),
        name: files[0].name,
        type: files[0].name.split('.').pop()?.toUpperCase() || 'Unknown',
        size: `${(files[0].size / (1024 * 1024)).toFixed(1)} MB`,
        lastModified: 'Just now',
        status: 'pending'
      };

      setUser({
        ...user,
        documents: [newDoc, ...user.documents],
        documentsCount: user.documentsCount + 1,
        pendingDocuments: user.pendingDocuments + 1
      });
    }
  };


  return (
      <div className="dashboard">
        {/* Sidebar and header same as before... */}
        {/* Use user fields dynamically */}
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
                {user.documents.map((doc: { id: React.Key | null | undefined; type: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; name: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; size: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; lastModified: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; status: string; }) => (
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
          </div>
        </main>
      </div>
  );
};

export default Dashboard;
