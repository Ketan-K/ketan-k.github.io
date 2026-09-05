import React from 'react';
import { Link } from 'react-router-dom';
import './pages.css';

export const ResumePage: React.FC = () => {
  const resumePdfUrl = './resume/Ketan-Katore-Resume.pdf';
  // Open parameters: Fit horizontally (FitH), hide side navigation panes (navpanes=0)
  const resumeEmbedUrl = `${resumePdfUrl}#view=FitH&navpanes=0&toolbar=0`;

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
              href={resumePdfUrl}
              download="Ketan-Katore-Resume.pdf"
              className="btn btn-primary"
            >
              Download PDF
            </a>
            <a
              href={resumePdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Open in New Tab ↗
            </a>
          </div>
        </div>
      </header>

      {/* PDF Viewer Embed with Fit Horizontal and Hidden Navigation Pane */}
      <div className="resume-viewer-container">
        <iframe
          src={resumeEmbedUrl}
          title="Ketan Katore Resume PDF"
          className="resume-frame"
        >
          <p style={{ color: 'var(--text-secondary)', padding: 'var(--space-8)', textAlign: 'center' }}>
            Your browser does not support embedded PDF viewing.{' '}
            <a href={resumePdfUrl} download="Ketan-Katore-Resume.pdf" className="link-subtle">
              Download PDF directly
            </a>
          </p>
        </iframe>
      </div>
    </div>
  );
};
