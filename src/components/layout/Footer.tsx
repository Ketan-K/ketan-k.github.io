import React from 'react';
import { Link } from 'react-router-dom';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import './Footer.css';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top-row">
          <div className="footer-meta">
            <div className="footer-brand">
              <span className="footer-brand-title">Ketan Katore</span>
              <span className="footer-brand-role">· Full-Stack & Real-Time Engineer</span>
            </div>
            <p className="footer-tagline">
              Pune, India · 6+ Years Experience · M.Sc. Scientific Computing
            </p>
          </div>

          <button
            onClick={scrollToTop}
            className="footer-top-btn"
            aria-label="Scroll to top of page"
          >
            ↑ Top
          </button>
        </div>

        <div className="footer-nav">
          <Link to="/" className="footer-link">Index</Link>
          <Link to="/work" className="footer-link">Work</Link>
          <Link to="/experience" className="footer-link">Experience</Link>
          <Link to="/systems" className="footer-link">Systems</Link>
          <Link to="/ai" className="footer-link">AI Lab</Link>
          <Link to="/writing" className="footer-link">Writing</Link>
          <Link to="/about" className="footer-link">About</Link>
          <Link to="/resume" className="footer-link">Resume</Link>
        </div>

        <div className="footer-links">
          <a
            href="https://github.com/Ketan-K"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="GitHub profile"
          >
            <GithubIcon size={13} />
            <span>GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/ketan-k"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="LinkedIn profile"
          >
            <LinkedinIcon size={13} />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:ketankatore.9@gmail.com"
            className="footer-social-link"
            aria-label="Email Ketan Katore"
          >
            <span>ketankatore.9@gmail.com</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
