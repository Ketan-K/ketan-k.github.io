import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { aiExperiments } from '../content/ailab';
import { AiExperiment } from '../types';
import { TechBadge } from '../components/common/TechBadge';
import { Cpu, CheckCircle2, FlaskConical } from 'lucide-react';
import './pages.css';

export const AiExperimentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const exp: AiExperiment | undefined = aiExperiments.find((e: AiExperiment) => e.id === id);

  if (!exp) {
    return <Navigate to="/ai" replace />;
  }

  const isProd = exp.classification === 'Professional Production Feature';

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <Link to="/ai">AI Lab</Link>
          <span>/</span>
          <span>{exp.id}</span>
        </div>
        <h1 className="page-title">{exp.title}</h1>
        <p className="page-subtitle">{exp.problem}</p>

        {/* Metadata Grid */}
        <div className="meta-grid">
          <div className="meta-item">
            <span className="meta-label">Classification</span>
            <span className="meta-value" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {isProd ? <CheckCircle2 size={14} color="var(--emerald-400)" /> : <FlaskConical size={14} color="var(--accent)" />}
              {exp.classification}
            </span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Domain</span>
            <span className="meta-value">{exp.category}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Maturity Status</span>
            <span className="meta-value">{exp.status}</span>
          </div>
        </div>
      </header>

      {/* Engineering Foundation Callout */}
      <section className="content-section">
        <div className="grounding-card" style={{ marginTop: 0 }}>
          <div className="grounding-header font-mono">
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Cpu size={14} />
              <span className="grounding-label">ENGINEERING FOUNDATION & LINUX</span>
            </div>
            <span className="grounding-context-tag">How this connects to Ketan's experience</span>
          </div>
          <p className="grounding-app-text">{exp.foundationContext}</p>

          {(exp.relatedProjectSlug || exp.relatedSystemUrl) && (
            <div className="grounding-footer">
              <div className="grounding-links">
                {exp.relatedProjectSlug && (
                  <Link to={`/work/${exp.relatedProjectSlug}`} className="grounding-link">
                    <span>Explore Associated Project: {exp.relatedProjectTitle || exp.relatedProjectSlug}</span>
                    <span className="row-arrow">↗</span>
                  </Link>
                )}
                {exp.relatedSystemUrl && (
                  <Link to={exp.relatedSystemUrl} className="grounding-link">
                    <span>Explore Systems Architecture: {exp.relatedSystemLabel || 'Systems'}</span>
                    <span className="row-arrow">→</span>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* What Happened */}
      <section className="content-section">
        <h2 className="section-heading">
          {isProd ? 'Production Architecture & Implementation' : 'Experimental Results & Architecture'}
        </h2>
        <div className="prose">
          <p>{exp.whatHappened}</p>
        </div>
      </section>

      {/* What I Learned */}
      <section className="content-section">
        <h2 className="section-heading">Key Takeaways & Lessons</h2>
        <div className="insight-box">
          <p>{exp.whatILearned}</p>
        </div>
      </section>

      {/* Technologies */}
      <section className="content-section">
        <h2 className="section-heading">Technologies</h2>
        <div className="item-tags">
          {exp.technologies.map((t: string) => (
            <TechBadge key={t} name={t} variant="accent" />
          ))}
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="page-nav-footer">
        <Link to="/ai" className="link-subtle">
          ← Back to AI Lab
        </Link>
        <Link to="/systems" className="link-subtle">
          Explore Systems Architecture →
        </Link>
      </div>
    </div>
  );
};
