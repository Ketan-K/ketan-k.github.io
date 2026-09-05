import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Laptop, Menu, X } from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Work', path: '/work' },
    { label: 'Systems', path: '/systems' },
    { label: 'AI Lab', path: '/ai' },
    { label: 'Writing', path: '/writing' },
    { label: 'About', path: '/about' },
    { label: 'Resume', path: '/resume' },
  ];

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand identity */}
        <Link to="/" className="navbar-brand">
          <span className="navbar-name">Ketan Katore</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="navbar-nav desktop-only" aria-label="Main Navigation">
          <ul className="navbar-links">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Control & Mobile Menu Toggle */}
        <div className="navbar-right">
          {/* Theme Selector Button & Dropdown */}
          <div className="theme-selector-wrap">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={() => setThemeMenuOpen(!themeMenuOpen)}
              aria-label={`Toggle theme (currently ${theme})`}
              title={`Theme: ${theme}`}
            >
              {theme === 'system' ? (
                <Laptop size={15} />
              ) : resolvedTheme === 'dark' ? (
                <Moon size={15} />
              ) : (
                <Sun size={15} />
              )}
            </button>

            {themeMenuOpen && (
              <>
                <div
                  className="theme-backdrop"
                  onClick={() => setThemeMenuOpen(false)}
                />
                <div className="theme-dropdown font-mono">
                  <button
                    type="button"
                    className={`theme-option ${theme === 'system' ? 'theme-option-active' : ''}`}
                    onClick={() => {
                      setTheme('system');
                      setThemeMenuOpen(false);
                    }}
                  >
                    <Laptop size={13} />
                    <span>System</span>
                  </button>
                  <button
                    type="button"
                    className={`theme-option ${theme === 'light' ? 'theme-option-active' : ''}`}
                    onClick={() => {
                      setTheme('light');
                      setThemeMenuOpen(false);
                    }}
                  >
                    <Sun size={13} />
                    <span>Light</span>
                  </button>
                  <button
                    type="button"
                    className={`theme-option ${theme === 'dark' ? 'theme-option-active' : ''}`}
                    onClick={() => {
                      setTheme('dark');
                      setThemeMenuOpen(false);
                    }}
                  >
                    <Moon size={13} />
                    <span>Dark</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            type="button"
            className="mobile-toggle mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer mobile-only">
          <nav className="mobile-drawer-nav font-mono">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? 'mobile-nav-link-active' : ''}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
