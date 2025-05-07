import React, { useState, useMemo } from 'react';
import './Documents.css';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  status: 'pending' | 'verified' | 'unverified';
  hash?: string;
  blockchainVerified?: boolean;
}

type FolderType = 'all' | 'verified' | 'pending' | 'unverified';

interface Folder {
  id: FolderType;
  name: string;
  icon: string;
}

const folders: Folder[] = [
  { id: 'all', name: 'All Documents', icon: '📁' },
  { id: 'verified', name: 'Verified on Blockchain', icon: '✅' },
  { id: 'pending', name: 'Pending Verification', icon: '⏳' },
  { id: 'unverified', name: 'Unverified', icon: '⚠️' }
];

const Documents: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<FolderType>('all');
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Contract Agreement.pdf',
      type: 'PDF',
      size: '2.4 MB',
      lastModified: '2 hours ago',
      status: 'verified',
      hash: '0x1234...5678',
      blockchainVerified: true
    },
    {
      id: '2',
      name: 'NDA Document.pdf',
      type: 'PDF',
      size: '1.8 MB',
      lastModified: '1 day ago',
      status: 'unverified',
      hash: '0x8765...4321',
      blockchainVerified: false
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const filteredDocuments = useMemo(() => {
    return documents
      .filter(doc => {
        const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFolder = selectedFolder === 'all' || doc.status === selectedFolder;
        return matchesSearch && matchesFolder;
      });
  }, [documents, searchQuery, selectedFolder]);

  const documentCounts = useMemo(() => {
    return {
      all: documents.length,
      verified: documents.filter(doc => doc.status === 'verified').length,
      pending: documents.filter(doc => doc.status === 'pending').length,
      unverified: documents.filter(doc => doc.status === 'unverified').length,
    };
  }, [documents]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newDocument: Document = {
        id: Date.now().toString(),
        name: files[0].name,
        type: files[0].name.split('.').pop()?.toUpperCase() || 'Unknown',
        size: `${(files[0].size / (1024 * 1024)).toFixed(1)} MB`,
        lastModified: 'Just now',
        status: 'pending',
        hash: `0x${Math.random().toString(16).slice(2, 10)}...`,
        blockchainVerified: false
      };
      setDocuments([newDocument, ...documents]);
    }
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const handleVerify = (document: Document) => {
    setSelectedDocument(document);
    setShowVerificationModal(true);
  };

  const verifyOnBlockchain = () => {
    if (selectedDocument) {
      setDocuments(documents.map(doc => 
        doc.id === selectedDocument.id 
          ? { ...doc, status: 'verified', blockchainVerified: true }
          : doc
      ));
      setShowVerificationModal(false);
    }
  };

  return (
    <>
      <div className="documents-header">
        <h1>My Documents</h1>
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
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

      <div className="folders-section">
        <h2 className="section-title">
          <span className="icon">📂</span>
          Document Folders
        </h2>
        <div className="folders-grid">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`folder-card ${selectedFolder === folder.id ? 'active' : ''}`}
              onClick={() => setSelectedFolder(folder.id)}
            >
              <span className="folder-icon">{folder.icon}</span>
              <div className="folder-info">
                <div className="folder-name">{folder.name}</div>
                <div className="folder-count">
                  {documentCounts[folder.id]} documents
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="documents-section">
        <h2 className="section-title">
          <span className="icon">{folders.find(f => f.id === selectedFolder)?.icon}</span>
          {folders.find(f => f.id === selectedFolder)?.name}
        </h2>
        
        {filteredDocuments.length > 0 ? (
          <div className="documents-list">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="document-row">
                <div className="document-icon">
                  {doc.type === 'PDF' ? '📄' : '📝'}
                </div>
                <div className="document-info">
                  <div className="document-name">
                    <h3>{doc.name}</h3>
                    <p className="document-meta">
                      {doc.type} • {doc.size} • {doc.lastModified}
                    </p>
                  </div>
                  <div className="document-hash">
                    {doc.hash}
                  </div>
                  <div className={`verification-status ${doc.status}`}>
                    <span className="icon">
                      {doc.blockchainVerified ? '✅' : doc.status === 'pending' ? '⏳' : '⚠️'}
                    </span>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </div>
                </div>
                <div className="document-actions">
                  <button 
                    className="action-button verify"
                    onClick={() => handleVerify(doc)}
                  >
                    <span className="icon">🔍</span>
                    Verify
                  </button>
                  {doc.status !== 'verified' && (
                    <button 
                      className="action-button delete"
                      onClick={() => handleDelete(doc.id)}
                    >
                      <span className="icon">🗑️</span>
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">📂</div>
            <div className="empty-state-text">No documents found</div>
            <div className="empty-state-subtext">
              {searchQuery 
                ? "Try adjusting your search terms"
                : "Upload some documents to get started"}
            </div>
          </div>
        )}
      </div>

      {showVerificationModal && selectedDocument && (
        <div className="verification-modal">
          <div className="modal-content">
            <h2>Verify Document on Blockchain</h2>
            <div className="verification-details">
              <p><strong>Document:</strong> {selectedDocument.name}</p>
              <p><strong>Hash:</strong> {selectedDocument.hash}</p>
              <p><strong>Current Status:</strong> {selectedDocument.status}</p>
            </div>
            <div className="modal-actions">
              <button 
                className="verify-button"
                onClick={verifyOnBlockchain}
              >
                Verify on Blockchain
              </button>
              <button 
                className="cancel-button"
                onClick={() => setShowVerificationModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Documents; 