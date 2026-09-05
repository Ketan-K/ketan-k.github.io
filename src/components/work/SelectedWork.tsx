import React from 'react';
import { projects } from '../../content/projects';
import { ProjectCard } from './ProjectCard';
import { Layers } from 'lucide-react';
import './Work.css';

export const SelectedWork: React.FC = () => {
  return (
    <section className="section" id="work">
      <div className="container">
        <div className="section-header">
          <div className="section-label font-mono">
            <Layers size={14} />
            <span>01 / SELECTED WORK</span>
          </div>
          <h2 className="section-title">Production Systems & Real-Time Architectures</h2>
          <p className="section-subtitle">
            Curated selection of end-to-end systems I have designed and engineered. Each project reflects real technical decisions, distributed edge-cases, and architecture tradeoffs.
          </p>
        </div>

        <div className="projects-list">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              defaultExpanded={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
