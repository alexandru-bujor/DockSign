import React, { useState } from 'react';
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

const Documents: React.FC = () => {
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
    <div className="documents-page">
      <div className="documents-header">
        <h1>My Documents</h1>
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

      <div className="documents-grid">
        {documents.map((doc) => (
          <div key={doc.id} className="document-card">
            <div className="document-header">
              <div className="document-icon">
                {doc.type === 'PDF' ? '📄' : '📝'}
              </div>
              <div className="document-actions">
                <button 
                  className="action-button verify"
                  onClick={() => handleVerify(doc)}
                >
                  <span className="icon">🔍</span>
                  Verify
                </button>
                <button 
                  className="action-button delete"
                  onClick={() => handleDelete(doc.id)}
                >
                  <span className="icon">🗑️</span>
                  Delete
                </button>
              </div>
            </div>
            <div className="document-info">
              <h3>{doc.name}</h3>
              <p className="document-meta">
                {doc.type} • {doc.size} • {doc.lastModified}
              </p>
              <div className="document-hash">
                <span className="hash-label">Hash:</span>
                <code>{doc.hash}</code>
              </div>
              <div className={`verification-status ${doc.status}`}>
                <span className="icon">
                  {doc.blockchainVerified ? '✅' : '⚠️'}
                </span>
                {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
              </div>
            </div>
          </div>
        ))}
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
    </div>
  );
};

export default Documents; 