import React, { useRef, useState, useEffect } from 'react';
import './CheckPage.css';

const CheckPage: React.FC = () => {
  const [pdfFiles, setPdfFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [checkmarkAnimated, setCheckmarkAnimated] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const pdfs = files.filter(file => file.type === 'application/pdf');
    setPdfFiles(prev => [...prev, ...pdfs]);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files || []);
    const pdfs = files.filter(file => file.type === 'application/pdf');
    setPdfFiles(prev => [...prev, ...pdfs]);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleUploadAreaClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (pdfFiles.length > 0) {
      setCheckmarkAnimated(true);
      const timer = setTimeout(() => setCheckmarkAnimated(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [pdfFiles.length]);

  return (
    <div className="check-bg">
      <div className="check-container">
        <h1 className="check-title">Upload a pdf file</h1>
        <div className="check-stepper">
          <div className="check-step active">
            <span className="check-step-icon">
              <svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="20" fill="#7b61ff"/><path d="M20 10v14M20 24l-5-5m5 5l5-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="13" y="28" width="14" height="2" rx="1" fill="#fff"/></svg>
            </span>
          </div>
          <div className="check-step-line" />
          <div className="check-step">
            <span className={`check-step-icon done${pdfFiles.length > 0 ? ' green' : ''}${checkmarkAnimated ? ' animate' : ''}`}>
              <svg width="40" height="40" viewBox="0 0 40 40">
                <circle cx="20" cy="20" r="20" fill={pdfFiles.length > 0 ? '#22c55e' : '#bbb'} />
                <path d="M14 21l4 4 8-8" stroke={pdfFiles.length > 0 ? '#fff' : '#222'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </span>
          </div>
        </div>
        <div className="check-table">
          <div className="check-table-header">
            <div>#</div>
            <div>Nume</div>
            <div>Dimensiune</div>
          </div>
          <div className="check-table-body" style={{ minHeight: '120px' }}>
            {pdfFiles.length === 0 ? (
              <div
                className={`check-upload-area${dragActive ? ' drag-active' : ''}`}
                onClick={handleUploadAreaClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                tabIndex={0}
                role="button"
                aria-label="Selectați sau trageți fișiere PDF aici."
              >
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <span className="check-upload-icon">
                  <svg width="28" height="28" viewBox="0 0 28 28"><path d="M14 20V8M14 8l-5 5m5-5l5 5" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="6" y="22" width="16" height="2" rx="1" fill="#222"/></svg>
                </span>
                <span className="check-upload-text">Selectați sau trageți fișiere PDF aici.</span>
              </div>
            ) : (
              <>
                {pdfFiles.map((file, idx) => (
                  <div className="check-table-row" key={idx} style={{ display: 'grid', gridTemplateColumns: '60px 1fr 1fr 32px', padding: '0.7rem 1.2rem', borderBottom: '1px solid #eee', alignItems: 'center', position: 'relative' }}>
                    <div>{idx + 1}</div>
                    <div>{file.name}</div>
                    <div>{(file.size / 1024).toFixed(1)} KB</div>
                    <button
                      className="delete-file-btn"
                      title="Delete file"
                      onClick={() => setPdfFiles(pdfFiles.filter((_, i) => i !== idx))}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginLeft: 8 }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <line x1="5" y1="5" x2="15" y2="15" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
                        <line x1="15" y1="5" x2="5" y2="15" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {pdfFiles.length > 0 && (
          <div className="check-action-btns">
            <button className="check-action-btn">Check</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckPage; 