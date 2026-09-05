import React, { useState, useEffect } from 'react';
import { Menu, X, Terminal } from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Demos', href: '#demos' },
    { label: 'Systems', href: '#systems' },
    { label: 'WebRTC', href: '#webrtc' },
    { label: 'AI Lab', href: '#ailab' },
    { label: 'Experience', href: '#experience' },
    { label: 'Writing', href: '#writing' },
    { label: 'About', href: '#about' },
  ];

  return (
    <header className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-inner">
        {/* Brand identity */}
        <a href="#" className="navbar-brand">
          <Terminal size={17} className="navbar-brand-icon" />
          <span className="navbar-brand-name">Ketan Katore</span>
          <span className="navbar-brand-role">Full-Stack</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-only" aria-label="Main Navigation">
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="nav-link">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Status Indicator & Contact Button */}
        <div className="navbar-actions desktop-only">
          <div className="status-badge" title="Actively considering high-impact full-stack and real-time roles">
            <span className="status-dot"></span>
            <span className="status-text">OPEN TO REMOTE OPPORTUNITIES</span>
          </div>
          <a
            href="mailto:ketankatore7@gmail.com"
            className="btn btn-primary btn-sm"
          >
            Contact
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="mobile-toggle mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer mobile-only">
          <div className="mobile-drawer-status">
            <span className="status-dot"></span>
            <span className="status-text">OPEN TO REMOTE OPPORTUNITIES</span>
          </div>
          <nav className="mobile-drawer-nav">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mobile-drawer-footer">
            <a
              href="mailto:ketankatore7@gmail.com"
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
