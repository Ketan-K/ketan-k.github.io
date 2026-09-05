import React from 'react';
import { techStackCategories } from '../../content/techstack';
import { Cpu } from 'lucide-react';
import './TechStack.css';

export const TechStackGrid: React.FC = () => {
  return (
    <section className="section" id="stack">
      <div className="container">
        <div className="section-header">
          <div className="section-label font-mono">
            <Cpu size={14} />
            <span>08 / TECHNICAL ARSENAL</span>
          </div>
          <h2 className="section-title">Core Technologies & Systems Competencies</h2>
          <p className="section-subtitle">
            Organized by functional engineering domains. No arbitrary percentage bars; only practical technologies leveraged in production and high-scale architectures.
          </p>
        </div>

        <div className="stack-domain-grid">
          {techStackCategories.map((cat, idx) => (
            <div key={idx} className="stack-domain-card tech-frame">
              <div className="tech-frame-header">
                <span className="font-mono">{cat.category}</span>
                <span className="domain-count font-mono">{cat.items.length} TECHNOLOGIES</span>
              </div>

              <div className="tech-frame-body domain-body">
                <p className="domain-desc">{cat.description}</p>

                <div className="tech-items-list">
                  {cat.items.map((item, iIdx) => (
                    <div key={iIdx} className="tech-item-row font-mono">
                      <span className="item-name">{item.name}</span>
                      <span className="item-context">{item.context}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
