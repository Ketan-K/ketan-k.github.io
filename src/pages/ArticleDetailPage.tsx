import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { engineeringNotes } from '../content/writing';
import { EngineeringNote } from '../types';
import { TechBadge } from '../components/common/TechBadge';
import './pages.css';

export const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const article: EngineeringNote | undefined = engineeringNotes.find(
    (a: EngineeringNote) => a.id === id || a.slug === id
  );

  if (!article) {
    return <Navigate to="/writing" replace />;
  }

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <Link to="/writing">Writing</Link>
          <span>/</span>
          <span>{article.id}</span>
        </div>
        <h1 className="page-title">{article.title}</h1>
        <p className="page-subtitle">{article.summary}</p>

        {/* Metadata Grid */}
        <div className="meta-grid">
          <div className="meta-item">
            <span className="meta-label">Published</span>
            <span className="meta-value">{article.date}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Reading Time</span>
            <span className="meta-value">{article.readTime}</span>
          </div>
          <div className="meta-item">
            <span className="meta-label">Topic</span>
            <span className="meta-value">{article.tags[0]}</span>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="content-section prose" style={{ maxWidth: '68ch' }}>
        <p>
          {article.summary}
        </p>
        
        <h2>Architectural Analysis & Design Patterns</h2>
        <p>
          Real-time distributed systems demand strict adherence to protocol contracts and deterministic state transition handlers. When architecting systems at scale, engineers must account for asymmetric network latency, partial network partitioning, and client-side device sleep cycles.
        </p>

        <div className="insight-box">
          <p>
            <strong>Core takeaway:</strong> Minimize unacknowledged inflight state by keeping mutation contracts strictly idempotent and tracking sequence deltas via monotonic clocks.
          </p>
        </div>

        <h2>Production Implementation Lessons</h2>
        <p>
          In high-volume deployments across corporate firewalls and multi-region clusters, standard telemetry often misses edge micro-stalls. Implementing end-to-end active probing combined with statistical percentile histograms (P95/P99) provides the necessary visibility into anomalous packet loss and socket queue buildups.
        </p>

        <div className="item-tags" style={{ marginTop: 'var(--space-6)' }}>
          {article.tags.map((t: string) => (
            <TechBadge key={t} name={t} variant="accent" />
          ))}
        </div>
      </article>

      {/* Navigation Footer */}
      <div className="page-nav-footer">
        <Link to="/writing" className="link-subtle">
          ← Back to all writing
        </Link>
        <Link to="/work" className="link-subtle">
          View Production Systems →
        </Link>
      </div>
    </div>
  );
};
