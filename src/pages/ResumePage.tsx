import React from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

export const ResumePage: React.FC = () => {
  const resumeUrl = './resume/Ketan-Katore-Resume.pdf';

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <span>Resume</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
          <div>
            <h1 className="page-title" style={{ marginBottom: 'var(--space-1)' }}>Resume</h1>
            <p className="page-subtitle">
              Canonical Curriculum Vitae for Ketan Katore · Senior Full-Stack & Real-Time Engineer
            </p>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <a
              href={resumeUrl}
              download="Ketan-Katore-Resume.pdf"
              className="btn btn-primary"
            >
              Download PDF
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Open in New Tab ↗
            </a>
          </div>
        </div>
      </header>

      {/* PDF Viewer Embed */}
      <div className="resume-viewer-container">
        <object
          data={resumeUrl}
          type="application/pdf"
          className="resume-frame"
          aria-label="Ketan Katore Resume PDF"
        >
          <div style={{ padding: 'var(--space-6)', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
              Your browser does not support embedded PDF viewing.
            </p>
            <a
              href={resumeUrl}
              download="Ketan-Katore-Resume.pdf"
              className="btn btn-primary"
            >
              Download Resume · PDF
            </a>
          </div>
        </object>
      </div>
    </div>
  );
};
