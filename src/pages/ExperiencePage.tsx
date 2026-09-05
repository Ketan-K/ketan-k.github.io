import React from 'react';
import { Link } from 'react-router-dom';
import { experienceHistory } from '../content/experience';
import { educationHistory } from '../content/education';
import { ExperienceItem, EducationItem } from '../types';
import { TechBadge } from '../components/common/TechBadge';
import './pages.css';

export const ExperiencePage: React.FC = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <span>Experience</span>
        </div>
        <h1 className="page-title">Career Experience & Engineering Roles</h1>
        <p className="page-subtitle">
          6+ years building real-time communications platforms, microservices backends, unified communication clients, and scalable cloud architectures.
        </p>
      </header>

      {/* Experience Timeline */}
      <section className="content-section">
        <div className="item-list">
          {experienceHistory.map((role: ExperienceItem) => (
            <div key={role.company + role.period} style={{ padding: 'var(--space-6) 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                <h2 style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                  {role.role}
                  <span style={{ color: 'var(--accent)', fontWeight: 500, marginLeft: 'var(--space-2)' }}>
                    @ {role.company}
                  </span>
                </h2>
                <span className="item-meta">{role.period} · {role.location}</span>
              </div>

              <p className="item-summary" style={{ fontSize: 'var(--text-base)', margin: 'var(--space-3) 0 var(--space-4)' }}>
                {role.tagline}
              </p>

              {role.scaleMetrics && (
                <div style={{ marginBottom: 'var(--space-4)' }}>
                  <div className="badge badge-accent">
                    Scale: {role.scaleMetrics}
                  </div>
                </div>
              )}

              {/* Responsibilities and Accomplishments */}
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <ul style={{ paddingLeft: 'var(--space-4)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                  {role.achievements.map((ach: string, i: number) => (
                    <li key={i} style={{ marginBottom: 'var(--space-1)' }}>{ach}</li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="item-tags">
                {role.technologies.map((tech: string) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education & Academic Foundation */}
      <section className="content-section" style={{ marginTop: 'var(--space-8)' }}>
        <h2 className="section-heading">Education</h2>
        
        <div className="item-list">
          {educationHistory.map((edu: EducationItem, idx: number) => (
            <div key={idx} className="item-row" style={{ cursor: 'default' }}>
              <div className="item-row-header">
                <span className="item-title">{edu.degree}</span>
                <span className="item-meta">{edu.year}</span>
              </div>
              <div className="item-summary">
                <strong>{edu.institution}</strong> · {edu.location}
              </div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                Focus: {edu.focus}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
