import React from 'react';
import { Terminal, Mail, ArrowUp, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import './Footer.css';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resumeUrl = './resume/Ketan-Katore-Resume.pdf';

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-meta">
          <div className="footer-brand">
            <Terminal size={16} className="footer-brand-icon" />
            <span className="footer-brand-title">Ketan Katore</span>
            <span className="footer-brand-role">— Senior Software Engineer (Real-Time & Full-Stack)</span>
          </div>
          <p className="footer-tagline">
            Engineered with React 19, TypeScript, and modern CSS. Fast, accessible, and grounded in production evidence.
          </p>
        </div>

        <div className="footer-links">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="View Resume PDF in new tab"
          >
            <FileText size={14} />
            <span>Resume</span>
          </a>
          <a
            href="https://github.com/Ketan-K"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="GitHub profile"
          >
            <GithubIcon size={14} />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/ketan-k"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={14} />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:ketankatore.9@gmail.com"
            className="footer-link"
            aria-label="Email Ketan Katore"
          >
            <Mail size={14} />
            <span>Email</span>
          </a>
          <button
            onClick={scrollToTop}
            className="footer-top-btn"
            aria-label="Scroll to top of page"
          >
            <ArrowUp size={14} />
            <span>Top</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
