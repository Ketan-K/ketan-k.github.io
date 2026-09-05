import React, { useState } from 'react';
import { aiExperiments } from '../../content/ailab';
import { FlaskConical } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import './AiLab.css';

export const AiLabSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Realtime AI', 'LLM Systems', 'Developer Tools'];

  const filteredExperiments =
    selectedCategory === 'All'
      ? aiExperiments
      : aiExperiments.filter((exp) => exp.category === selectedCategory);

  return (
    <section className="section" id="ailab">
      <div className="container">
        <div className="section-header">
          <div className="section-label font-mono">
            <FlaskConical size={14} />
            <span>05 / AI SYSTEMS LAB</span>
          </div>
          <h2 className="section-title">Experiments at the Intersection of AI & Real-Time Systems</h2>
          <p className="section-subtitle">
            Exploring streaming inference, structured JSON grammar parsers, WebRTC voice pipelines, and sandboxed AI agent execution without marketing buzzwords.
          </p>
        </div>

        {/* Category Selector Filter */}
        <div className="ailab-category-bar font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`cat-pill ${selectedCategory === cat ? 'cat-pill-active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Experiments Grid */}
        <div className="ailab-grid">
          {filteredExperiments.map((exp) => (
            <article key={exp.id} className="ai-experiment-card">
              <div className="exp-card-header font-mono">
                <div className="exp-status-group">
                  <span className="badge badge-simulated">{exp.status.toUpperCase()}</span>
                  <span className="badge badge-cyan">{exp.category}</span>
                </div>
              </div>

              <h3 className="exp-card-title">{exp.title}</h3>

              <div className="exp-section">
                <span className="exp-section-label font-mono">PROBLEM / OBJECTIVE:</span>
                <p className="exp-section-text">{exp.problem}</p>
              </div>

              <div className="exp-section">
                <span className="exp-section-label font-mono">TECHNICAL OUTCOME:</span>
                <p className="exp-section-text">{exp.whatHappened}</p>
              </div>

              <div className="exp-learning-box font-mono">
                <span className="learning-label">KEY TAKEAWAY:</span>
                <p className="learning-text">{exp.whatILearned}</p>
              </div>

              <div className="exp-tech-row">
                {exp.technologies.map((tech) => (
                  <span key={tech} className="badge">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="exp-footer-links">
                {exp.codeUrl && (
                  <a
                    href={exp.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm"
                  >
                    <GithubIcon size={13} />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
