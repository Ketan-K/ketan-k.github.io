import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { educationHistory } from '../content/education';
import { techStackCategories } from '../content/techstack';
import { useGitHubRepos } from '../hooks/useGitHubRepos';
import { RefreshCw, Star, GitFork, ChevronDown, ChevronUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/common/Icons';
import { EducationItem, TechStackCategory, GitHubRepo } from '../types';
import { TechBadge } from '../components/common/TechBadge';
import './pages.css';

export const AboutPage: React.FC = () => {
  const { repos, loading, isLive, lastFetched, refetch } = useGitHubRepos('Ketan-K');
  const [showAllRepos, setShowAllRepos] = useState<boolean>(false);
  const defaultRepoLimit = 4;
  const displayedRepos = showAllRepos ? repos : repos.slice(0, defaultRepoLimit);
  const hasMore = repos.length > defaultRepoLimit;

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <span>About</span>
        </div>
        <h1 className="page-title">About & Engineering Philosophy</h1>
        <p className="page-subtitle">
          Senior Full-Stack Engineer with an academic background in Scientific Computing, specialized in real-time media, distributed systems, and modern AI engineering.
        </p>
      </header>

      {/* Bio / Background */}
      <section className="content-section">
        <h2 className="section-heading">Background</h2>
        <div className="prose">
          <p>
            I am a Full-Stack Software Engineer with 6+ years of experience designing and scaling low-latency real-time platforms, WebRTC communication architectures, and high-throughput backend services.
          </p>
          <p>
            My engineering journey is grounded in mathematical modeling, computational algorithms, and systems-level thinking from my Master’s degree in Scientific Computing at Savitribai Phule Pune University. I apply this foundation to reason about complex distributed race conditions, packet jitter buffers, memory locality, and concurrent data pipelines.
          </p>
          <p>
            Throughout my career at Spring Computing Technologies, Humation, and OneGreenDiary, I have built enterprise videoconferencing clients servicing thousands of enterprise users, real-time NFT auction distribution engines, and mission-critical cloud reporting servers.
          </p>
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Education & Scientific Foundation */}
      <section className="content-section">
        <h2 className="section-heading">Scientific Foundation & Education</h2>

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

      <hr className="editorial-divider" />

      {/* Technical Skills & Tooling */}
      <section className="content-section">
        <h2 className="section-heading">Technical Skills & Tooling</h2>
        <p className="prose">
          Domain expertise, real-time protocols, backend runtimes, and distributed infrastructure applied across production systems.
        </p>

        <div className="skills-spec-list">
          {techStackCategories.map((cat: TechStackCategory, idx: number) => (
            <div key={idx} className="skills-spec-row">
              <div className="skills-spec-category">
                <span className="skills-spec-name">{cat.category}</span>
                <span className="skills-spec-count">{cat.items.length} tools</span>
              </div>
              <div className="skills-spec-items">
                {cat.items.map((item, iIdx) => (
                  <div key={iIdx} className="skills-spec-item">
                    <TechBadge name={item.name} />
                    {item.experienceYears && (
                      <span className="skills-spec-exp">({item.experienceYears})</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Open Source Repositories */}
      <section className="content-section">
        <div className="section-header-row" style={{ marginBottom: 'var(--space-3)' }}>
          <h2 className="section-heading" style={{ margin: 0 }}>Public Repositories</h2>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              <span className={isLive ? 'live-pulse-dot' : 'static-pulse-dot'} />
              {isLive ? 'Live GitHub Sync' : 'Static Fallback'}
              {lastFetched && ` · ${lastFetched.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            </span>
            <button
              type="button"
              onClick={refetch}
              disabled={loading}
              className="repos-refresh-btn"
              title="Sync latest repos from GitHub"
            >
              <RefreshCw size={11} className={loading ? 'spinning' : ''} />
              <span>{loading ? 'Syncing...' : 'Sync'}</span>
            </button>
          </div>
        </div>
        <p className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          Live repositories, developer tools, and WebRTC experiments synced directly from GitHub.
        </p>

        <div className="item-list">
          {displayedRepos.map((repo: GitHubRepo) => (
            <a key={repo.name} href={repo.url} target="_blank" rel="noopener noreferrer" className="item-row">
              <div className="item-row-header">
                <span className="item-title">
                  {repo.name}
                  <span className="row-arrow">↗</span>
                </span>
                <span className="item-meta" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    <span className="lang-color-dot" style={{ backgroundColor: repo.languageColor }} />
                    {repo.language}
                  </span>
                  {typeof repo.stars === 'number' && repo.stars > 0 && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                      <Star size={11} /> {repo.stars}
                    </span>
                  )}
                  {typeof repo.forks === 'number' && repo.forks > 0 && (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
                      <GitFork size={11} /> {repo.forks}
                    </span>
                  )}
                  <span>· {repo.status}</span>
                </span>
              </div>
              <div className="item-summary">{repo.description}</div>
              {repo.tags && repo.tags.length > 0 && (
                <div className="item-tags">
                  {repo.tags.map((t: string) => (
                    <TechBadge key={t} name={t} />
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>

        {hasMore && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
            <button
              type="button"
              className="repos-toggle-btn"
              onClick={() => setShowAllRepos((prev) => !prev)}
            >
              {showAllRepos ? (
                <>
                  <ChevronUp size={14} />
                  <span>Show Top {defaultRepoLimit} Only</span>
                </>
              ) : (
                <>
                  <ChevronDown size={14} />
                  <span>Show All ({repos.length} Repositories)</span>
                </>
              )}
            </button>
          </div>
        )}
      </section>

      <hr className="editorial-divider" />

      {/* Contact & Profiles */}
      <section className="content-section">
        <h2 className="section-heading">Contact & Profiles</h2>
        <div className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          <p>
            I am always open to discussing distributed architectures, real-time media engineering, AI platform challenges, or high-impact senior engineering roles.
          </p>
        </div>

        <div className="home-actions">
          <a href="mailto:ketankatore.9@gmail.com" className="btn btn-primary">
            ketankatore.9@gmail.com
          </a>
          <a href="https://github.com/Ketan-K" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <GithubIcon size={13} />
            GitHub
          </a>
          <a href="https://linkedin.com/in/ketan-k" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <LinkedinIcon size={13} />
            LinkedIn
          </a>
          <Link to="/resume" className="btn btn-ghost">
            View Resume →
          </Link>
        </div>
      </section>
    </div>
  );
};
