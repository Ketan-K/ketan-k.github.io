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
            <span>08 / TECHNICAL ARSENAL & PROOF LAYER</span>
          </div>
          <h2 className="section-title">Core Technologies Connected to Real Work</h2>
          <p className="section-subtitle">
            Every technology listed below is mapped directly to production systems, enterprise platforms (~20,000 DAU), or research prototypes I have engineered.
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
                      <div className="item-top-row">
                        <span className="item-name">{item.name}</span>
                        {item.experienceYears && (
                          <span className="item-exp-badge">{item.experienceYears}</span>
                        )}
                      </div>
                      <span className="item-context">{item.context}</span>
                      
                      {item.usedIn && item.usedIn.length > 0 && (
                        <div className="item-proof-row">
                          <span className="proof-label">APPLIED IN:</span>
                          <div className="proof-tags">
                            {item.usedIn.map((u, uIdx) => (
                              <span key={uIdx} className="proof-pill">
                                {u}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
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
