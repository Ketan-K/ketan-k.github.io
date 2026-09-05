import React from 'react';
import { experienceHistory } from '../../content/experience';
import { Briefcase, Calendar, MapPin, CheckCircle2, Activity } from 'lucide-react';
import './Experience.css';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header">
          <div className="section-label font-mono">
            <Briefcase size={14} />
            <span>07 / PROFESSIONAL EXPERIENCE</span>
          </div>
          <h2 className="section-title">6+ Years of Production Engineering</h2>
          <p className="section-subtitle">
            A comprehensive track record of designing, scaling, and maintaining mission-critical real-time applications, media streaming platforms, and distributed cloud services.
          </p>
        </div>

        <div className="experience-timeline">
          {experienceHistory.map((exp, idx) => (
            <article key={idx} className="timeline-item">
              <div className="timeline-marker font-mono">
                <span className="marker-dot"></span>
                <span className="marker-line"></span>
              </div>

              <div className="timeline-content-card">
                <div className="exp-card-top">
                  <div className="exp-role-group">
                    <h3 className="exp-role">{exp.role}</h3>
                    <div className="exp-company font-mono">{exp.company}</div>
                  </div>

                  <div className="exp-meta-badges font-mono">
                    <span className="badge">
                      <Calendar size={12} />
                      <span>{exp.period}</span>
                    </span>
                    <span className="badge">
                      <MapPin size={12} />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {exp.scaleMetrics && (
                  <div className="exp-scale-badge font-mono">
                    <Activity size={13} className="scale-icon" />
                    <span>{exp.scaleMetrics}</span>
                  </div>
                )}

                <p className="exp-tagline">{exp.tagline}</p>

                <div className="exp-achievements-list">
                  <span className="achievements-heading font-mono">KEY TECHNICAL CONTRIBUTIONS & OWNERSHIP:</span>
                  <ul className="achievements-items">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>
                        <CheckCircle2 size={14} className="ach-icon" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="exp-tech-tags">
                  {exp.technologies.map((t) => (
                    <span key={t} className="badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
