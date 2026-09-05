import React from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../content/projects';
import { experienceHistory } from '../content/experience';
import { aiExperiments } from '../content/ailab';
import { engineeringNotes } from '../content/writing';
import { Project, ExperienceItem, AiExperiment, EngineeringNote } from '../types';
import './pages.css';

export const HomePage: React.FC = () => {
  const featuredProjects: Project[] = projects.slice(0, 3);
  const recentWriting: EngineeringNote[] = engineeringNotes.slice(0, 3);
  const featuredAi: AiExperiment[] = aiExperiments.slice(0, 2);

  return (
    <div className="page-container">
      {/* Editorial Hero */}
      <header className="page-header home-hero">
        <div className="page-breadcrumb">
          <span>Index</span>
          <span>/</span>
          <span>Full-Stack & Real-Time Systems</span>
        </div>
        <h1 className="home-headline">
          Building resilient real-time media systems, WebRTC backends, and full-stack platforms.
        </h1>
        <p className="home-subheadline">
          Senior Full-Stack Engineer with 6+ years architecting low-latency communication engines,
          distributed event streams, high-concurrency microservices, and experimental AI systems.
        </p>
        <div className="home-actions">
          <Link to="/work" className="btn btn-primary">
            Explore Work
          </Link>
          <Link to="/systems" className="btn btn-outline">
            Systems & Simulators
          </Link>
          <Link to="/resume" className="btn btn-ghost">
            Resume · PDF
          </Link>
        </div>
      </header>

      <hr className="editorial-divider" />

      {/* Systems & Architecture */}
      <section className="content-section">
        <div className="section-header-row">
          <h2 className="section-heading" style={{ margin: 0 }}>Systems & Architecture</h2>
          <Link to="/systems" className="link-subtle">
            Overview →
          </Link>
        </div>
        <p className="prose" style={{ marginBottom: 'var(--space-6)' }}>
          Technical explorations, protocol specifications, and interactive simulators for real-time media and distributed backend architectures.
        </p>

        <div className="subsystem-grid">
          <Link to="/systems/webrtc" className="subsystem-card">
            <div>
              <h3>WebRTC & Real-Time Media</h3>
              <p>
                ICE candidate routing, SFU vs MCU topology models, jitter buffers, adaptive bitrate algorithms, and packet loss recovery simulators.
              </p>
            </div>
            <span className="action-link">Open WebRTC Deep Dive →</span>
          </Link>

          <Link to="/systems/full-stack" className="subsystem-card">
            <div>
              <h3>Full-Stack & Distributed Backend</h3>
              <p>
                Request lifecycle pipelines, high-throughput Redis event buses, multi-tier caching architectures, and concurrency benchmarks.
              </p>
            </div>
            <span className="action-link">Open Full-Stack Blueprints →</span>
          </Link>
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Selected Work */}
      <section className="content-section">
        <div className="section-header-row">
          <h2 className="section-heading" style={{ margin: 0 }}>Selected Work</h2>
          <Link to="/work" className="link-subtle">
            All projects ({projects.length}) →
          </Link>
        </div>

        <div className="item-list">
          {featuredProjects.map((p: Project) => (
            <Link key={p.id} to={`/work/${p.id}`} className="item-row">
              <div className="item-row-header">
                <span className="item-title">
                  {p.title}
                  <span className="row-arrow">→</span>
                </span>
                <span className="item-meta">{p.projectType}</span>
              </div>
              <div className="item-summary">{p.tagline}</div>
              <div className="item-tags">
                <span className="badge badge-accent">{p.role}</span>
                {p.technologies.slice(0, 3).map((t: string) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Experience */}
      <section className="content-section">
        <div className="section-header-row">
          <h2 className="section-heading" style={{ margin: 0 }}>Experience</h2>
          <Link to="/experience" className="link-subtle">
            Full history ({experienceHistory.length}) →
          </Link>
        </div>

        <div className="item-list">
          {experienceHistory.map((exp: ExperienceItem) => (
            <div key={exp.company + exp.period} className="item-row" style={{ cursor: 'default' }}>
              <div className="item-row-header">
                <span className="item-title">{exp.role} · {exp.company}</span>
                <span className="item-meta">{exp.period}</span>
              </div>
              <div className="item-summary">{exp.tagline}</div>
              <div className="item-tags">
                <span className="badge">{exp.location}</span>
                {exp.scaleMetrics && (
                  <span className="badge badge-accent">{exp.scaleMetrics}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* AI Lab */}
      <section className="content-section">
        <div className="section-header-row">
          <h2 className="section-heading" style={{ margin: 0 }}>AI Lab</h2>
          <Link to="/ai" className="link-subtle">
            All experiments ({aiExperiments.length}) →
          </Link>
        </div>

        <div className="item-list">
          {featuredAi.map((exp: AiExperiment) => (
            <Link key={exp.id} to={`/ai/${exp.id}`} className="item-row">
              <div className="item-row-header">
                <span className="item-title">
                  {exp.title}
                  <span className="row-arrow">→</span>
                </span>
                <span className="item-meta">{exp.status}</span>
              </div>
              <div className="item-summary">{exp.problem}</div>
              <div className="item-tags">
                {exp.technologies.slice(0, 3).map((t: string) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Writing */}
      <section className="content-section">
        <div className="section-header-row">
          <h2 className="section-heading" style={{ margin: 0 }}>Writing</h2>
          <Link to="/writing" className="link-subtle">
            All articles ({engineeringNotes.length}) →
          </Link>
        </div>

        <div className="item-list">
          {recentWriting.map((w: EngineeringNote) => (
            <Link key={w.id} to={`/writing/${w.id}`} className="item-row">
              <div className="item-row-header">
                <span className="item-title">
                  {w.title}
                  <span className="row-arrow">→</span>
                </span>
                <span className="item-meta">{w.date} · {w.readTime}</span>
              </div>
              <div className="item-summary">{w.summary}</div>
              <div className="item-tags">
                {w.tags.map((t: string) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
