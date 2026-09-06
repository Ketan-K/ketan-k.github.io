import React, { useState } from 'react';
import { useGitHubRepos } from '../../hooks/useGitHubRepos';
import { RefreshCw, ExternalLink } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { TechBadge } from '../common/TechBadge';
import './Repos.css';

interface SelectedReposProps {
  showControls?: boolean;
  defaultLimit?: number;
  title?: string;
  subtitle?: string;
}

export const SelectedRepos: React.FC<SelectedReposProps> = ({
  showControls = true,
  defaultLimit = 4,
  title = 'Open Source & Live Demos',
  subtitle = 'Curated public repositories, real-time WebRTC utilities, and performance benchmarks with verified public deployments.'
}) => {
  const [showAll, setShowAll] = useState<boolean>(false);

  const {
    repos,
    loading,
    isLive,
    lastFetched,
    refetch,
    filterType,
    setFilterType,
    selectedLanguage,
    setSelectedLanguage,
    languages
  } = useGitHubRepos('Ketan-K');

  const displayedRepos = showAll ? repos : repos.slice(0, defaultLimit);
  const hasMore = repos.length > defaultLimit;

  return (
    <section className="content-section" id="github">
      <div className="section-header-row">
        <div className="repo-section-title-wrap">
          <h2 className="section-heading" style={{ margin: 0 }}>{title}</h2>
          {isLive && (
            <span className="repo-live-sync-indicator font-mono" title={`Synced from GitHub API at ${lastFetched?.toLocaleTimeString()}`}>
              <span className="telemetry-dot-live" />
              <span>Live Sync</span>
            </span>
          )}
        </div>

        <div className="repo-header-actions">
          <button
            type="button"
            className="repo-sync-btn font-mono"
            onClick={refetch}
            disabled={loading}
            title="Sync latest metadata from GitHub REST API"
          >
            <RefreshCw size={11} className={loading ? 'spinning' : ''} />
            <span>{loading ? 'Syncing...' : 'Sync'}</span>
          </button>
          <a
            href="https://github.com/Ketan-K"
            target="_blank"
            rel="noopener noreferrer"
            className="link-subtle"
            title="Open Ketan-K GitHub profile"
          >
            GitHub (@Ketan-K) →
          </a>
        </div>
      </div>

      {subtitle && (
        <p className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          {subtitle}
        </p>
      )}

      {showControls && (
        <div className="tag-filter-bar repo-filter-bar">
          <button
            type="button"
            className={`tag-btn ${filterType === 'all' && selectedLanguage === 'all' ? 'tag-btn-active' : ''}`}
            onClick={() => {
              setFilterType('all');
              setSelectedLanguage('all');
            }}
          >
            All Repos ({repos.length})
          </button>

          <button
            type="button"
            className={`tag-btn ${filterType === 'featured' ? 'tag-btn-active' : ''}`}
            onClick={() => setFilterType(filterType === 'featured' ? 'all' : 'featured')}
          >
            <span className="live-pill-dot" />
            Verified Demos
          </button>

          {languages
            .filter((l) => l !== 'all')
            .map((lang) => (
              <button
                key={lang}
                type="button"
                className={`tag-btn ${selectedLanguage === lang ? 'tag-btn-active' : ''}`}
                onClick={() => setSelectedLanguage(selectedLanguage === lang ? 'all' : lang)}
              >
                {lang}
              </button>
            ))}
        </div>
      )}

      {/* Repository Items List */}
      <div className="item-list" style={{ marginTop: 'var(--space-2)' }}>
        {loading && repos.length === 0 ? (
          [1, 2, 3, 4].map((i) => (
            <div key={i} className="item-row skeleton-row">
              <div className="skeleton-line" style={{ width: '40%', height: '14px', marginBottom: '8px' }} />
              <div className="skeleton-line" style={{ width: '85%', height: '12px', marginBottom: '6px' }} />
              <div className="skeleton-line" style={{ width: '30%', height: '10px' }} />
            </div>
          ))
        ) : (
          displayedRepos.map((repo) => (
            <div key={repo.name} className="item-row repo-item-row">
              <div className="item-row-header repo-header-layout">
                <div className="repo-title-cluster">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="item-title font-mono repo-link-title"
                    title={`View ${repo.name} on GitHub`}
                  >
                    {repo.name}
                    <GithubIcon size={13} className="repo-gh-mark" />
                  </a>

                  <div className="item-meta">
                    <span
                      className="repo-lang-indicator"
                      style={{ '--lang-color': repo.languageColor } as React.CSSProperties}
                    >
                      {repo.language}
                    </span>
                    <span>·</span>
                    <span>{repo.status}</span>
                  </div>
                </div>

                <div className="repo-actions-inline font-mono">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="repo-inline-btn"
                    title={`Open source code for ${repo.name} on GitHub`}
                  >
                    <GithubIcon size={12} />
                    <span>Code</span>
                    <ExternalLink size={10} />
                  </a>

                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="repo-inline-btn repo-inline-btn-demo"
                      title={`Launch working live demo: ${repo.homepage}`}
                    >
                      <span className="live-demo-dot" />
                      <span>Live Demo</span>
                      <ExternalLink size={10} />
                    </a>
                  )}
                </div>
              </div>

              <div className="item-summary">{repo.description}</div>

              {repo.tags && repo.tags.length > 0 && (
                <div className="repo-tags-row">
                  <div className="item-tags">
                    {repo.tags.map((t) => (
                      <TechBadge key={t} name={t} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer / Show More */}
      {hasMore && (
        <div className="repo-show-more-row">
          <button
            type="button"
            className="link-subtle"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? '↑ Show Fewer Repositories' : `↓ Show All Repositories (${repos.length})`}
          </button>
        </div>
      )}
    </section>
  );
};
