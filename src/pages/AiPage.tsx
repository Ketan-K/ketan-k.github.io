import React from 'react';
import { Link } from 'react-router-dom';
import { aiExperiments } from '../content/ailab';
import { AiExperiment } from '../types';
import { AiStreamingDemo } from '../components/demos/AiStreamingDemo';
import './pages.css';

export const AiPage: React.FC = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <span>AI Lab</span>
        </div>
        <h1 className="page-title">AI Engineering & Experimental Systems</h1>
        <p className="page-subtitle">
          LLM streaming optimizations, Time-To-First-Token profiling, local edge embeddings, retrieval-augmented generation (RAG) benchmarks, and agentic workflows.
        </p>
      </header>

      {/* Interactive Demo E: AI Token Streaming Profiler */}
      <section className="content-section">
        <h2 className="section-heading">LLM Token Streaming Profiler & TTFT Benchmark</h2>
        <p className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          Benchmark Time-To-First-Token (TTFT), tokens-per-second generation rates, memory allocation buffers, and Server-Sent Events (SSE) stream chunk parsing under variable prompt sizes.
        </p>

        <div className="demo-embed-wrapper">
          <div className="demo-embed-header">
            <span className="demo-embed-title">Demo E · LLM Token Streaming Profiler</span>
            <span className="demo-embed-badge">LIVE SIMULATOR</span>
          </div>
          <AiStreamingDemo />
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* AI Experiments List */}
      <section className="content-section">
        <h2 className="section-heading">AI Experiments & Benchmark Studies</h2>

        <div className="item-list">
          {aiExperiments.map((exp: AiExperiment) => (
            <Link key={exp.id} to={`/ai/${exp.id}`} className="item-row">
              <div className="item-row-header">
                <span className="item-title">
                  {exp.title}
                  <span className="row-arrow">→</span>
                </span>
                <span className="item-meta">{exp.status} · {exp.category}</span>
              </div>
              <div className="item-summary">{exp.problem}</div>

              <div className="item-tags" style={{ marginTop: 'var(--space-2)' }}>
                {exp.technologies.map((t: string) => (
                  <span key={t} className="badge">{t}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
