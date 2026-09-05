import React from 'react';
import { Link } from 'react-router-dom';
import { systemPrinciples } from '../content/systems';
import { SystemPrinciple } from '../types';
import './pages.css';

export const SystemsPage: React.FC = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <span>Systems</span>
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
            <div className="section-label" style={{ color: 'var(--accent)' }}>Subsystem 01</div>
            <h3>WebRTC & Real-Time Media</h3>
            <p>
              Deep dive into ICE candidate gathering, STUN/TURN traversal, SFU vs MCU media routing topologies, jitter buffer sizing, and adaptive bitrate resilience simulators.
            </p>
          </div>
          <span className="action-link">Open WebRTC Deep Dive & Simulators →</span>
        </Link>

        <Link to="/systems/full-stack" className="subsystem-card">
          <div>
            <div className="section-label" style={{ color: 'var(--accent)' }}>Subsystem 02</div>
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
        <div className="section-label">Engineering Philosophy</div>
        <h2 className="section-heading">Core Architectural Principles</h2>
        
        <div className="item-list">
          {systemPrinciples.map((p: SystemPrinciple) => (
            <div key={p.id} style={{ padding: 'var(--space-6) 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div className="item-row-header">
                <span className="item-title">{p.number}. {p.title}</span>
                <span className="item-meta">{p.subtitle}</span>
              </div>
              <p className="item-summary" style={{ fontSize: 'var(--text-base)', margin: 'var(--space-2) 0 var(--space-3)' }}>
                {p.description}
              </p>
              <div className="blueprint-box">
                {p.diagram}
              </div>
              <div className="insight-box" style={{ marginTop: 'var(--space-3)' }}>
                <p><strong>Takeaway:</strong> {p.keyTakeaway}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
