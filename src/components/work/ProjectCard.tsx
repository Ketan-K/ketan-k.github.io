import React, { useState } from 'react';
import { Project } from '../../types';
import { ChevronDown, ChevronUp, ExternalLink, Layers, AlertTriangle, Lightbulb, Cpu, CheckCircle2, ShieldCheck } from 'lucide-react';
import { GithubIcon } from '../common/Icons';
import { PrincipleNodeGraph } from '../systems/PrincipleNodeGraph';
import './Work.css';

interface ProjectCardProps {
  project: Project;
  defaultExpanded?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [activeTab, setActiveTab] = useState<'architecture' | 'engineering' | 'challenges' | 'learnings'>('architecture');

  return (
    <article className={`project-item ${isExpanded ? 'project-item-expanded' : ''}`}>
      {/* Project Header Bar */}
      <div className="project-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="project-number font-mono">{project.number}</div>

        <div className="project-summary-block">
          <div className="project-title-row">
            <h3 className="project-title">{project.title}</h3>
            <div className="project-type-badge font-mono">
              <ShieldCheck size={11} className="badge-icon-verified" />
              <span>{project.projectType}</span>
            </div>
            <div className="project-role-badge font-mono">{project.role}</div>
          </div>

          <div className="project-context-row font-mono">
            <span className="context-label">CONTEXT:</span>
            <span className="context-val">{project.clientOrContext}</span>
          </div>

          <p className="project-tagline">{project.tagline}</p>

          <div className="project-tech-tags">
            {project.technologies.map((tech) => (
              <span key={tech} className="badge">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="project-expand-action">
          <button
            type="button"
            className="project-toggle-btn font-mono"
            aria-expanded={isExpanded}
            aria-label={isExpanded ? 'Collapse project details' : 'Expand project deep-dive'}
          >
            <span>{isExpanded ? 'Hide Details' : 'Deep-Dive'}</span>
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* Expanded Deep-Dive Panel */}
      {isExpanded && (
        <div className="project-details">
          {/* Problem Statement Banner */}
          <div className="project-problem-box">
            <span className="problem-label font-mono">PROBLEM STATEMENT</span>
            <p className="problem-text">{project.problem}</p>
          </div>

          {/* Deep-Dive Navigation Tabs */}
          <div className="project-tab-bar">
            <button
              type="button"
              className={`project-tab ${activeTab === 'architecture' ? 'project-tab-active' : ''}`}
              onClick={() => setActiveTab('architecture')}
            >
              <Layers size={14} />
              <span>Technical Architecture</span>
            </button>
            <button
              type="button"
              className={`project-tab ${activeTab === 'engineering' ? 'project-tab-active' : ''}`}
              onClick={() => setActiveTab('engineering')}
            >
              <Cpu size={14} />
              <span>Engineering Decisions</span>
            </button>
            <button
              type="button"
              className={`project-tab ${activeTab === 'challenges' ? 'project-tab-active' : ''}`}
              onClick={() => setActiveTab('challenges')}
            >
              <AlertTriangle size={14} />
              <span>Challenges & Edge Cases</span>
            </button>
            <button
              type="button"
              className={`project-tab ${activeTab === 'learnings' ? 'project-tab-active' : ''}`}
              onClick={() => setActiveTab('learnings')}
            >
              <Lightbulb size={14} />
              <span>What I Learned</span>
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="project-tab-content">
            {/* Architecture Tab */}
            {activeTab === 'architecture' && (
              <div className="tab-pane">
                <p className="tab-description">{project.architecture.description}</p>
                {project.architecture.flow ? (
                  <PrincipleNodeGraph flow={project.architecture.flow} />
                ) : (
                  <div className="ascii-diagram">
                    {project.architecture.diagram}
                  </div>
                )}
                <div className="architecture-highlights">
                  <span className="highlights-title font-mono">CORE ARCHITECTURAL HIGHLIGHTS:</span>
                  <ul className="highlights-list">
                    {project.architecture.highlights.map((h, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} className="highlight-icon" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Engineering Decisions Tab */}
            {activeTab === 'engineering' && (
              <div className="tab-pane">
                <div className="decisions-grid">
                  {project.engineeringDecisions.map((dec, idx) => (
                    <div key={idx} className="decision-card">
                      <h4 className="decision-title font-mono">
                        <span className="decision-idx">0{idx + 1}.</span> {dec.title}
                      </h4>
                      <p className="decision-body">{dec.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges Tab */}
            {activeTab === 'challenges' && (
              <div className="tab-pane">
                <div className="challenges-grid">
                  {project.challenges.map((ch, idx) => (
                    <div key={idx} className="challenge-card">
                      <h4 className="challenge-title font-mono">
                        <AlertTriangle size={15} className="challenge-icon" />
                        <span>{ch.title}</span>
                      </h4>
                      <p className="challenge-body">{ch.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* What I Learned Tab */}
            {activeTab === 'learnings' && (
              <div className="tab-pane learnings-pane">
                <blockquote className="learnings-quote font-mono">
                  "{project.whatILearned}"
                </blockquote>
              </div>
            )}
          </div>

          {/* Project Footer Links */}
          <div className="project-footer-links">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm"
              >
                <GithubIcon size={14} />
                <span>View Repository</span>
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm"
              >
                <ExternalLink size={14} />
                <span>Live Demonstration</span>
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  );
};
