import React from 'react';
import { Link } from 'react-router-dom';
import { systemPrinciples } from '../content/systems';
import { SystemPrinciple } from '../types';
import { PrincipleNodeGraph } from '../components/systems/PrincipleNodeGraph';
import { CheckCircle2 } from 'lucide-react';
import './pages.css';

export const SystemsPage: React.FC = () => {
  return (
    <div className="page-container">
      {/* Page Header */}
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <span>Systems Architecture</span>
        </div>
        <h1 className="page-title">Systems Architecture & Design</h1>
        <p className="page-subtitle">
          Core engineering principles, real-time protocols, WebRTC media pipelines, and distributed backend designs built for resilience at scale.
        </p>
      </header>

      {/* Subsystem Navigation Cards */}
      <div className="subsystem-grid">
        <Link to="/systems/webrtc" className="subsystem-card">
          <div>
            <h3>WebRTC & Real-Time Media</h3>
            <p>
              Deep dive into ICE candidate gathering, STUN/TURN traversal, SFU vs MCU media routing topologies, jitter buffer sizing, and adaptive bitrate resilience simulators.
            </p>
          </div>
          <span className="action-link">Open WebRTC Deep Dive & Simulators →</span>
        </Link>

        <Link to="/systems/full-stack" className="subsystem-card">
          <div>
            <h3>Full-Stack & Distributed Backend</h3>
            <p>
              In-depth blueprints for request lifecycle optimization, Redis Pub/Sub event distribution, multi-tier cache invalidation strategies, and WebSocket state machines.
            </p>
          </div>
          <span className="action-link">Open Full-Stack Blueprints & Simulators →</span>
        </Link>
      </div>

      <hr className="editorial-divider" />

      {/* Core Architectural Principles */}
      <section className="content-section">
        <div className="section-header-row">
          <h2 className="section-heading" style={{ margin: 0 }}>Core Architectural Principles</h2>
          <span className="link-subtle" style={{ cursor: 'default' }}>
            5 Invariant Design Contracts
          </span>
        </div>
        <p className="prose" style={{ marginBottom: 'var(--space-6)' }}>
          Disciplined architectural constraints governing low-latency communication, distributed state partitioning, and graceful fault recovery.
        </p>

        <div className="item-list">
          {systemPrinciples.map((p: SystemPrinciple) => (
            <article key={p.id} className="system-principle-block">
              {/* Principle Header */}
              <div className="principle-header-row">
                <div className="principle-title-wrap">
                  <span className="principle-num-pill font-mono">{p.number}</span>
                  <h3 className="principle-title">{p.title}</h3>
                </div>
                <span className="principle-subtitle-tag font-mono">{p.subtitle}</span>
              </div>

              {/* Description Prose */}
              <p className="principle-prose">{p.description}</p>

              {/* Rendered Visual Node Graph Diagram */}
              <PrincipleNodeGraph principleId={p.id} rawAscii={p.diagram} />

              {/* Key Takeaway Callout */}
              <div className="insight-box principle-takeaway-box">
                <div className="takeaway-badge-wrap font-mono">
                  <CheckCircle2 size={14} className="takeaway-icon" />
                  <span className="takeaway-label">ARCHITECTURAL TAKEAWAY:</span>
                </div>
                <p className="takeaway-text">{p.keyTakeaway}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Page Nav Footer */}
      <div className="page-nav-footer">
        <Link to="/" className="link-subtle">
          ← Back to Index
        </Link>
        <Link to="/systems/webrtc" className="link-subtle">
          Explore WebRTC Media Deep Dive →
        </Link>
      </div>
    </div>
  );
};
