import React from 'react';
import { Link } from 'react-router-dom';
import { engineeringNotes } from '../content/writing';
import { EngineeringNote } from '../types';
import { TechBadge } from '../components/common/TechBadge';
import './pages.css';

export const WritingPage: React.FC = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <span>Writing</span>
        </div>
        <h1 className="page-title">Technical Writing & Architecture Notes</h1>
        <p className="page-subtitle">
          Essays and engineering deep dives on real-time protocols, WebRTC media pipelines, distributed consensus, and AI token streaming.
        </p>
      </header>

      {/* Writing Index */}
      <div className="item-list">
        {engineeringNotes.map((article: EngineeringNote) => (
          <Link key={article.id} to={`/writing/${article.slug || article.id}`} className="item-row">
            <div className="item-row-header">
              <span className="item-title">
                {article.title}
                <span className="row-arrow">→</span>
              </span>
              <span className="item-meta">{article.date} · {article.readTime}</span>
            </div>
            <div className="item-summary">{article.summary}</div>
            <div className="item-tags">
              {article.tags.map((t: string) => (
                <TechBadge key={t} name={t} />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
