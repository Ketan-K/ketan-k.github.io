import React, { useState } from 'react';
import { useGitHubRepos } from '../../hooks/useGitHubRepos';
import { ExternalLink, Code2, RefreshCw, Star, GitFork, ChevronDown, ChevronUp, Globe } from 'lucide-react';
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
  defaultLimit = 6,
  title = 'Public Repositories & Working Demos',
  subtitle = 'Curated open source repositories, real-time WebRTC tools, and systems benchmarks. Verified live deployments linked directly.'
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
    <section className="section" id="github">
      <div className="container">
        <div className="section-header">
          <div className="section-label font-mono">
            <Code2 size={14} />
            <span>04 / OPEN SOURCE & LIVE DEMOS</span>
          </div>
          <h2 className="section-title">{title}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>

        {showControls && (
          <div className="repos-header-controls">
            <div className="repos-api-status">
              <span className={isLive ? 'live-pulse-dot' : 'static-pulse-dot'} />
              <span>
                {isLive ? 'Live GitHub Sync (Ketan-K)' : 'Cached / Static Snapshot'}
                {lastFetched && ` · ${lastFetched.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              </span>
            </div>

            <button
              type="button"
              className="repos-refresh-btn"
              onClick={refetch}
              disabled={loading}
              title="Sync latest repository telemetry from GitHub REST API"
            >
              <RefreshCw size={12} className={loading ? 'spinning' : ''} />
              <span>{loading ? 'Fetching API...' : 'Sync from GitHub'}</span>
            </button>
          </div>
        )}

        {showControls && (
          <div className="repos-filter-bar">
            <button
              type="button"
              className={`repos-filter-chip ${filterType === 'all' && selectedLanguage === 'all' ? 'active' : ''}`}
              onClick={() => {
                setFilterType('all');
                setSelectedLanguage('all');
              }}
            >
              All Curated ({repos.length})
            </button>
            <button
              type="button"
              className={`repos-filter-chip ${filterType === 'featured' ? 'active' : ''}`}
              onClick={() => setFilterType(filterType === 'featured' ? 'all' : 'featured')}
            >
              Verified Live Demos
            </button>

            {languages
              .filter((l) => l !== 'all')
              .map((lang) => (
                <button
                  key={lang}
                  type="button"
                  className={`repos-filter-chip ${selectedLanguage === lang ? 'active' : ''}`}
                  onClick={() => setSelectedLanguage(selectedLanguage === lang ? 'all' : lang)}
                >
                  {lang}
                </button>
              ))}
          </div>
        )}

        {loading && repos.length === 0 ? (
          <div className="repos-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="repo-card-skeleton">
                <div className="skeleton-line skeleton-title" />
                <div className="skeleton-line skeleton-desc-1" />
                <div className="skeleton-line skeleton-desc-2" />
                <div className="skeleton-line skeleton-footer" />
              </div>
            ))}
          </div>
        ) : (
          <div className="repos-grid">
            {displayedRepos.map((repo) => (
              <div key={repo.name} className="repo-card">
                <div className="repo-card-top font-mono">
                  <div className="repo-title-row">
                    <Code2 size={16} className="repo-icon" />
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="repo-name-link"
                      title={`View ${repo.name} on GitHub`}
                    >
                      {repo.name}
                    </a>
                  </div>
                  <div className="repo-meta-badges">
                    {repo.homepage && (
                      <span className="repo-live-indicator" title="Verified public live deployment available">
                        <span className="live-demo-dot" />
                        <span>Live Demo</span>
                      </span>
                    )}
                    <span className="badge">{repo.status}</span>
                  </div>
                </div>

                <p className="repo-desc">{repo.description}</p>

                {repo.tags && repo.tags.length > 0 && (
                  <div className="repo-tags-row">
                    {repo.tags.slice(0, 4).map((t) => (
                      <TechBadge key={t} name={t} />
                    ))}
                  </div>
                )}

                <div className="repo-footer font-mono">
                  <div className="repo-stats-col">
                    <div className="repo-lang-row">
                      <span
                        className="lang-color-dot"
                        style={{ backgroundColor: repo.languageColor }}
                      />
                      <span className="lang-name">{repo.language}</span>
                    </div>

                    <div className="repo-metrics">
                      {typeof repo.stars === 'number' && repo.stars > 0 && (
                        <span className="repo-metric-item" title={`${repo.stars} stars on GitHub`}>
                          <Star size={11} />
                          {repo.stars}
                        </span>
                      )}
                      {typeof repo.forks === 'number' && repo.forks > 0 && (
                        <span className="repo-metric-item" title={`${repo.forks} forks on GitHub`}>
                          <GitFork size={11} />
                          {repo.forks}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="repo-actions-col">
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="repo-action-link repo-code-link"
                      title={`Open ${repo.name} source code on GitHub`}
                    >
                      <GithubIcon size={13} />
                      <span>Code</span>
                    </a>

                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="repo-action-link repo-demo-link"
                        title={`Launch verified live demo: ${repo.homepage}`}
                      >
                        <Globe size={13} />
                        <span>Live Demo</span>
                        <ExternalLink size={11} className="action-arrow" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="repos-cta">
          {hasMore && (
            <button
              type="button"
              className="repos-toggle-btn"
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? (
                <>
                  <ChevronUp size={14} />
                  <span>Show Top {defaultLimit} Only</span>
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  <span>Show All ({repos.length} Repositories)</span>
                </>
              )}
            </button>
          )}

          <a
            href="https://github.com/Ketan-K"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <GithubIcon size={15} />
            <span>GitHub Profile (@Ketan-K)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
