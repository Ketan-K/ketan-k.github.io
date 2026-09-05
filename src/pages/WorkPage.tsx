import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../content/projects';
import { Project } from '../types';
import './pages.css';

export const WorkPage: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const allTags: string[] = ['all', ...Array.from(new Set(projects.flatMap((p: Project) => p.technologies)))];

  const filteredProjects: Project[] = selectedTag === 'all'
    ? projects
    : projects.filter((p: Project) => p.technologies.includes(selectedTag));

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <span>Work</span>
        </div>
        <h1 className="page-title">Production Systems & Case Studies</h1>
        <p className="page-subtitle">
          In-depth architectural breakdowns of production WebRTC conferencing platforms, unified communication clients, real-time auction engines, and distributed reporting systems.
        </p>
      </header>

      {/* Filter Tags */}
      <div className="tag-filter-bar">
        {allTags.slice(0, 10).map((tag: string) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(tag)}
            className={`tag-btn ${selectedTag === tag ? 'tag-btn-active' : ''}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="item-list">
        {filteredProjects.map((p: Project) => (
          <Link key={p.id} to={`/work/${p.id}`} className="item-row">
            <div className="item-row-header">
              <span className="item-title">
                {p.title}
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', fontWeight: 400 }}>
                  ({p.clientOrContext})
                </span>
              </span>
              <span className="item-meta">{p.projectType}</span>
            </div>
            <div className="item-summary">{p.tagline}</div>
            
            <div className="item-tags" style={{ marginTop: 'var(--space-2)' }}>
              <span className="badge badge-accent">{p.role}</span>
              {p.technologies.map((t: string) => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
