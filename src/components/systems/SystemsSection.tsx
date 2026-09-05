import React, { useState } from 'react';
import { systemPrinciples } from '../../content/systems';
import { Terminal, Shield, Database, Activity, Box, Radio, CheckCircle2 } from 'lucide-react';
import './Systems.css';

export const SystemsSection: React.FC = () => {
  const [activePrincipleId, setActivePrincipleId] = useState<string>(systemPrinciples[0].id);

  const activePrinciple = systemPrinciples.find((p) => p.id === activePrincipleId) || systemPrinciples[0];

  const getPrincipleIcon = (index: number) => {
    switch (index) {
      case 0:
        return Shield;
      case 1:
        return Database;
      case 2:
        return Activity;
      case 3:
        return Box;
      case 4:
        return Radio;
      default:
        return Terminal;
    }
  };

  return (
    <section className="section" id="systems">
      <div className="container">
        <div className="section-header">
          <div className="section-label font-mono">
            <Terminal size={14} />
            <span>03 / SYSTEMS THINKING</span>
          </div>
          <h2 className="section-title">How I Think About Systems</h2>
          <p className="section-subtitle">
            Reliable distributed applications are built on disciplined constraints. Here are the core architectural principles that govern every system I design.
          </p>
        </div>

        {/* Systems Split View */}
        <div className="systems-layout">
          {/* Principles Sidebar List */}
          <div className="principles-menu">
            {systemPrinciples.map((principle, idx) => {
              const Icon = getPrincipleIcon(idx);
              const isActive = principle.id === activePrincipleId;
              return (
                <button
                  key={principle.id}
                  type="button"
                  className={`principle-card ${isActive ? 'principle-card-active' : ''}`}
                  onClick={() => setActivePrincipleId(principle.id)}
                >
                  <div className="principle-card-header">
                    <span className="principle-num font-mono">{principle.number}</span>
                    <Icon size={16} className="principle-icon" />
                  </div>
                  <h4 className="principle-card-title">{principle.title}</h4>
                  <p className="principle-card-sub">{principle.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* Active Principle Deep-Dive Frame */}
          <div className="principle-detail-frame tech-frame">
            <div className="tech-frame-header">
              <span className="font-mono">PRINCIPLE_{activePrinciple.number} // ARCHITECTURAL CONTRACT</span>
              <span className="badge badge-cyan">{activePrinciple.title}</span>
            </div>

            <div className="tech-frame-body principle-detail-body">
              <div className="detail-hero">
                <h3 className="detail-title">{activePrinciple.title}</h3>
                <div className="detail-subtitle font-mono">{activePrinciple.subtitle}</div>
              </div>

              <p className="detail-description">{activePrinciple.description}</p>

              <div className="detail-diagram-box">
                <div className="diagram-box-label font-mono">SYSTEM INTERACTION BLUEPRINT:</div>
                <div className="ascii-diagram">
                  {activePrinciple.diagram}
                </div>
              </div>

              <div className="detail-takeaway">
                <CheckCircle2 size={16} className="takeaway-icon" />
                <div className="takeaway-content">
                  <span className="takeaway-label font-mono">CORE TAKEAWAY:</span>
                  <p className="takeaway-text">{activePrinciple.keyTakeaway}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
