import React from 'react';
import { selectedRepos } from '../../content/repos';
import { ExternalLink, Code2 } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import './Repos.css';

export const SelectedRepos: React.FC = () => {
  return (
    <section className="section" id="github">
      <div className="container">
        <div className="section-header">
          <div className="section-label font-mono">
            <Code2 size={14} />
            <span>10 / OPEN SOURCE & CODE</span>
          </div>
          <h2 className="section-title">Selected Repositories</h2>
          <p className="section-subtitle">
            Hand-curated open-source projects, media gateways, and streaming tool implementations.
          </p>
        </div>

        <div className="repos-grid">
          {selectedRepos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-card"
            >
              <div className="repo-card-top font-mono">
                <div className="repo-title-row">
                  <Code2 size={16} className="repo-icon" />
                  <span className="repo-name">{repo.name}</span>
                </div>
                <ExternalLink size={14} className="repo-link-icon" />
              </div>

              <p className="repo-desc">{repo.description}</p>

              <div className="repo-footer font-mono">
                <div className="repo-lang-row">
                  <span
                    className="lang-color-dot"
                    style={{ backgroundColor: repo.languageColor }}
                  ></span>
                  <span className="lang-name">{repo.language}</span>
                </div>

                <span className="badge">{repo.status}</span>
              </div>
            </a>
          ))}
        </div>

        <div className="repos-cta">
          <a
            href="https://github.com/ketan-k"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <GithubIcon size={15} />
            <span>View All Repositories on GitHub (ketan-k)</span>
          </a>
        </div>
      </div>
    </section>
  );
};
