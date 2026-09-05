import React from 'react';
import { User, Sparkles, Network, Cpu, FileText, Download, ExternalLink } from 'lucide-react';
import './About.css';

export const AboutSection: React.FC = () => {
  const resumeUrl = './resume/Ketan-Katore-Resume.pdf';

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header">
          <div className="section-label font-mono">
            <User size={14} />
            <span>11 / ABOUT & PHILOSOPHY</span>
          </div>
          <h2 className="section-title">About Ketan Katore</h2>
          <p className="section-subtitle">
            Engineering philosophy, background, and current technical interests.
          </p>
        </div>

        <div className="about-grid">
          {/* Main Statement */}
          <div className="about-main-text">
            <p className="about-lead">
              I am a full-stack engineer focused on building real-time products and the distributed systems behind them.
            </p>

            <p>
              Over the past 5+ years, I have architected and operated production software across the entire stack — specializing in low-latency WebRTC topologies, WebSocket clusters, resilient API gateways, and modern web application frontends.
            </p>

            <p>
              I believe that software architecture should be driven by measurable operational constraints rather than vanity complexity. The best systems are fast, debuggable, resilient under network failure, and clear to reason about.
            </p>

            {/* Canonical Resume Action Block */}
            <div className="about-resume-box tech-frame">
              <div className="resume-box-header font-mono">
                <span className="resume-title">CANONICAL CURRICULUM VITAE</span>
                <span className="badge badge-cyan">PDF · 74 KB</span>
              </div>
              <div className="resume-box-body">
                <p className="resume-desc">
                  Detailed career history, architectural milestones, verified technologies, and educational background.
                </p>
                <div className="resume-actions-row">
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                    aria-label="Open Ketan Katore Resume in new browser tab"
                  >
                    <FileText size={15} />
                    <span>View Resume</span>
                    <ExternalLink size={13} />
                  </a>

                  <a
                    href={resumeUrl}
                    download="Ketan-Katore-Resume.pdf"
                    className="btn"
                    aria-label="Download original Ketan Katore Resume PDF"
                  >
                    <Download size={14} />
                    <span>Download PDF</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Current Focus Panel */}
          <div className="about-focus-frame tech-frame">
            <div className="tech-frame-header">
              <span className="font-mono">CURRENT EXPLORATIONS</span>
              <span className="badge badge-cyan">2026 ROADMAP</span>
            </div>

            <div className="tech-frame-body focus-body font-mono">
              <div className="focus-item">
                <Network size={15} className="focus-item-icon" />
                <div className="focus-item-text">
                  <span className="focus-title">Sub-500ms WebRTC AI Voice Agents</span>
                  <span className="focus-sub">Full-duplex audio with real-time interruption handling</span>
                </div>
              </div>

              <div className="focus-item">
                <Sparkles size={15} className="focus-item-icon" />
                <div className="focus-item-text">
                  <span className="focus-title">Incremental Structured JSON Parsers</span>
                  <span className="focus-sub">In-flight tool argument extraction during LLM token streaming</span>
                </div>
              </div>

              <div className="focus-item">
                <Cpu size={15} className="focus-item-icon" />
                <div className="focus-item-text">
                  <span className="focus-title">Local Models & Offline-First State</span>
                  <span className="focus-sub">Edge compute, WebGPU, and local vector embeddings</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
