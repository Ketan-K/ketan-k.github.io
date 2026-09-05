import React from 'react';
import { Mail, ArrowDownRight, FileText, Download, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../common/Icons';
import { HeroSystemDiagram } from './HeroSystemDiagram';
import './Hero.css';

export const Hero: React.FC = () => {
  const resumeUrl = './resume/Ketan-Katore-Resume.pdf';

  return (
    <section className="hero-section" id="hero">
      <div className="container hero-container">
        {/* Editorial Tech Title Block */}
        <div className="hero-content">
          <div className="hero-meta font-mono">
            <span className="hero-meta-name">KETAN KATORE</span>
            <span className="hero-meta-divider">/</span>
            <span className="hero-meta-title">SENIOR SOFTWARE ENGINEER</span>
            <span className="hero-meta-divider">/</span>
            <span className="hero-meta-exp">6+ YEARS EXPERIENCE</span>
          </div>

          <h1 className="hero-headline">
            I build real-time products<br />
            and the systems behind them.
          </h1>

          <div className="hero-subtext">
            <p className="hero-summary">
              Specializing in high-scale WebRTC architectures (~20,000 DAU), distributed backend services, and robust full-stack applications with deep resilience engineering.
            </p>
          </div>

          <div className="hero-focus-tags">
            <span className="focus-tag font-mono">WebRTC</span>
            <span className="focus-bullet">·</span>
            <span className="focus-tag font-mono">Real-Time Systems</span>
            <span className="focus-bullet">·</span>
            <span className="focus-tag font-mono">TypeScript</span>
            <span className="focus-bullet">·</span>
            <span className="focus-tag font-mono">Node.js</span>
            <span className="focus-bullet">·</span>
            <span className="focus-tag font-mono">Angular / React</span>
            <span className="focus-bullet">·</span>
            <span className="focus-tag font-mono">Distributed Backends</span>
          </div>

          {/* Direct Actions & Resume Controls */}
          <div className="hero-actions">
            <a
              href="https://github.com/Ketan-K"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              aria-label="View Ketan Katore GitHub profile"
            >
              <GithubIcon size={15} />
              <span>GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/ketan-k"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              aria-label="View Ketan Katore LinkedIn profile"
            >
              <LinkedinIcon size={15} />
              <span>LinkedIn</span>
            </a>

            <a
              href="mailto:ketankatore.9@gmail.com"
              className="btn"
              aria-label="Send email to Ketan Katore"
            >
              <Mail size={15} />
              <span>Email</span>
            </a>

            {/* Understated Resume Actions */}
            <div className="hero-resume-group">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-resume"
                aria-label="View Ketan Katore Resume PDF in new browser tab"
              >
                <FileText size={15} />
                <span>View Resume</span>
                <ExternalLink size={12} className="btn-icon-subtle" />
              </a>

              <a
                href={resumeUrl}
                download="Ketan-Katore-Resume.pdf"
                className="btn btn-resume-download"
                aria-label="Download Ketan Katore Resume PDF file"
                title="Download original PDF (Ketan-Katore-Resume.pdf)"
              >
                <Download size={14} />
                <span>PDF</span>
              </a>
            </div>

            <a
              href="#work"
              className="hero-link-work font-mono"
            >
              <span>Explore Selected Work</span>
              <ArrowDownRight size={15} />
            </a>
          </div>
        </div>

        {/* Hero Interactive System Architecture Visualizer */}
        <div className="hero-visualization">
          <HeroSystemDiagram />
        </div>
      </div>
    </section>
  );
};
