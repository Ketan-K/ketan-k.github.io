import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { aiExperiments } from '../content/ailab';
import { AiExperiment } from '../types';
import { TechBadge } from '../components/common/TechBadge';
import { CheckCircle2, FlaskConical, Cpu } from 'lucide-react';
import './pages.css';

export const AiPage: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'production' | 'experimental'>('all');

  const filteredExperiments = aiExperiments.filter((exp: AiExperiment) => {
    if (filter === 'production') return exp.classification === 'Professional Production Feature';
    if (filter === 'experimental') return exp.classification !== 'Professional Production Feature';
    return true;
  });

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <span>AI Lab</span>
        </div>
        <h1 className="page-title">AI Engineering & Experimental Systems</h1>
        <p className="page-subtitle">
          Grounded in production computer vision and real-time WebRTC media pipelines — exploring LLM streaming velocity, sub-500ms voice gateways, and sandboxed agent runtimes.
        </p>
      </header>

      {/* Engineering Linework Callout */}
      <div className="foundation-banner">
        <div className="foundation-badge font-mono">
          <Cpu size={14} />
          <span>ENGINEERING FOUNDATION</span>
        </div>
        <p className="foundation-text">
          The AI Lab is grounded in my real-time WebRTC, client-side computer vision (Google MediaPipe, Banuba SDK), and low-latency distributed systems engineering experience.
        </p>
      </div>

      {/* AI Systems & Experiments List */}
      <section className="content-section">
        <div className="section-header-row" style={{ flexWrap: 'wrap', gap: 'var(--space-2)' }}>
          <div>
            <h2 className="section-heading" style={{ margin: 0 }}>Systems, Prototypes & Research</h2>
            <p className="prose" style={{ marginTop: 'var(--space-1)', marginBottom: 0 }}>
              Production vision integrations alongside active low-latency streaming experiments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="tag-filter-bar" style={{ margin: 0 }}>
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`tag-btn ${filter === 'all' ? 'tag-btn-active' : ''}`}
            >
              All Work ({aiExperiments.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('production')}
              className={`tag-btn ${filter === 'production' ? 'tag-btn-active' : ''}`}
            >
              Production ML
            </button>
            <button
              type="button"
              onClick={() => setFilter('experimental')}
              className={`tag-btn ${filter === 'experimental' ? 'tag-btn-active' : ''}`}
            >
              Prototypes & Experiments
            </button>
          </div>
        </div>

        <div className="item-list" style={{ marginTop: 'var(--space-6)' }}>
          {filteredExperiments.map((exp: AiExperiment) => {
            const isProd = exp.classification === 'Professional Production Feature';

            return (
              <article key={exp.id} className="ai-experiment-card">
                <div className="ai-card-top">
                  <div className="ai-card-title-group">
                    <Link to={`/ai/${exp.id}`} className="ai-card-title-link">
                      <h3 className="ai-card-title">{exp.title}</h3>
                      <span className="row-arrow">→</span>
                    </Link>
                    <span className="ai-card-problem">{exp.problem}</span>
                  </div>

                  <div className="ai-card-status-wrap">
                    <span className={`badge ${isProd ? 'badge-emerald' : 'badge-accent'}`}>
                      {isProd ? <CheckCircle2 size={12} style={{ marginRight: 4 }} /> : <FlaskConical size={12} style={{ marginRight: 4 }} />}
                      {exp.classification}
                    </span>
                    <span className="ai-category-tag font-mono">{exp.category}</span>
                  </div>
                </div>

                {/* Foundation Context */}
                <div className="ai-foundation-snippet">
                  <span className="ai-foundation-label font-mono">Engineering Context:</span>
                  <p className="ai-foundation-text">{exp.foundationContext}</p>
                </div>

                {/* Cross-Link if related to project or system */}
                {(exp.relatedProjectSlug || exp.relatedSystemUrl) && (
                  <div className="ai-crosslink-row">
                    {exp.relatedProjectSlug && (
                      <Link to={`/work/${exp.relatedProjectSlug}`} className="ai-crosslink-item">
                        <span>Related Project: {exp.relatedProjectTitle}</span>
                        <span className="row-arrow">↗</span>
                      </Link>
                    )}
                    {exp.relatedSystemUrl && (
                      <Link to={exp.relatedSystemUrl} className="ai-crosslink-item">
                        <span>Related System: {exp.relatedSystemLabel || 'Systems Architecture'}</span>
                        <span className="row-arrow">→</span>
                      </Link>
                    )}
                  </div>
                )}

                <div className="item-tags" style={{ marginTop: 'var(--space-3)' }}>
                  {exp.technologies.map((t: string) => (
                    <TechBadge key={t} name={t} />
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="page-nav-footer">
        <Link to="/systems" className="link-subtle">
          ← Explore Systems Architecture
        </Link>
        <Link to="/work" className="link-subtle">
          Explore Production Case Studies →
        </Link>
      </div>
    </div>
  );
};
