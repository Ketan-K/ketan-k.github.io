import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { aiExperiments } from '../content/ailab';
import { AiExperiment } from '../types';
import './pages.css';

export const AiExperimentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const exp: AiExperiment | undefined = aiExperiments.find((e: AiExperiment) => e.id === id);

  if (!exp) {
    return <Navigate to="/ai" replace />;
  }

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
            <span className="meta-label">Status</span>
            <span className="meta-value">{exp.status}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Category</span>
            <span className="meta-value">{exp.category}</span>
          </div>
        </div>
      </header>

      {/* What Happened */}
      <section className="content-section">
        <div className="section-label">Implementation & Findings</div>
        <h2 className="section-heading">Experimental Results & Architecture</h2>
        <div className="prose">
          <p>{exp.whatHappened}</p>
        </div>
      </section>

      {/* What I Learned */}
      <section className="content-section">
        <div className="section-label">Retrospective</div>
        <h2 className="section-heading">Key Takeaways & Lessons</h2>
        <div className="insight-box">
          <p>{exp.whatILearned}</p>
        </div>
      </section>

      {/* Technologies */}
      <section className="content-section">
        <div className="section-label">Technologies</div>
        <div className="item-tags">
          {exp.technologies.map((t: string) => (
            <span key={t} className="badge badge-accent">{t}</span>
          ))}
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="page-nav-footer">
        <Link to="/ai" className="link-subtle">
          ← Back to AI Lab
        </Link>
        <Link to="/writing" className="link-subtle">
          Read Technical Writing →
        </Link>
      </div>
    </div>
  );
};
