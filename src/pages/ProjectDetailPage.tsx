import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../content/projects';
import { Project } from '../types';
import './pages.css';

export const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const project: Project | undefined = projects.find((p: Project) => p.id === id);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <Link to="/work">Work</Link>
          <span>/</span>
          <span>{project.id}</span>
        </div>
        <h1 className="page-title">{project.title}</h1>
        <p className="page-subtitle">{project.tagline}</p>

        {/* Metadata Grid */}
        <div className="meta-grid">
          <div className="meta-item">
            <span className="meta-label">Role</span>
            <span className="meta-value">{project.role}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Context</span>
            <span className="meta-value">{project.clientOrContext}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Category</span>
            <span className="meta-value">{project.projectType}</span>
          </div>
        </div>
      </header>

      {/* Problem & Motivation */}
      <section className="content-section">
        <h2 className="section-heading">The Engineering Challenge</h2>
        <div className="prose">
          <p>{project.problem}</p>
        </div>
      </section>

      {/* Architecture Blueprint */}
      <section className="content-section">
        <h2 className="section-heading">System Topology & Data Flow</h2>
        <div className="blueprint-box">
          {project.architecture.diagram}
        </div>
        <div className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          <p>{project.architecture.description}</p>
        </div>

        <ul className="prose">
          {project.architecture.highlights.map((h: string, idx: number) => (
            <li key={idx}><strong>{h}</strong></li>
          ))}
        </ul>
      </section>

      {/* Engineering Decisions */}
      <section className="content-section">
        <h2 className="section-heading">Key Engineering Decisions</h2>
        <div className="prose">
          <ul>
            {project.engineeringDecisions.map((dec: { title: string; description: string }, idx: number) => (
              <li key={idx} style={{ marginBottom: 'var(--space-3)' }}>
                <strong>{dec.title}:</strong> {dec.description}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Technical Challenges */}
      <section className="content-section">
        <h2 className="section-heading">Challenges & Solutions</h2>
        <div className="item-list">
          {project.challenges.map((c: { title: string; description: string }, idx: number) => (
            <div key={idx} className="item-row" style={{ cursor: 'default' }}>
              <div className="item-title" style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-1)' }}>
                {c.title}
              </div>
              <div className="item-summary">{c.description}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What I Learned */}
      <section className="content-section">
        <h2 className="section-heading">Lessons Learned & Retrospective</h2>
        <div className="insight-box">
          <p>{project.whatILearned}</p>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="content-section">
        <h2 className="section-heading">Technologies</h2>
        <div className="item-tags">
          {project.technologies.map((tech: string) => (
            <span key={tech} className="badge badge-accent">{tech}</span>
          ))}
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="page-nav-footer">
        <Link to="/work" className="link-subtle">
          ← Back to all projects
        </Link>
        <Link to="/systems" className="link-subtle">
          Explore Systems Architecture →
        </Link>
      </div>
    </div>
  );
};
