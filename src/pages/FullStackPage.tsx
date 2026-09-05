import React from 'react';
import { Link } from 'react-router-dom';
import { RequestLifecycleDemo } from '../components/demos/RequestLifecycleDemo';
import { RealtimeEventStreamDemo } from '../components/demos/RealtimeEventStreamDemo';
import { CacheTierDemo } from '../components/demos/CacheTierDemo';
import './pages.css';

export const FullStackPage: React.FC = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <Link to="/systems">Systems</Link>
          <span>/</span>
          <span>Full-Stack</span>
        </div>
        <h1 className="page-title">Full-Stack & Distributed Backend Architecture</h1>
        <p className="page-subtitle">
          Engineering high-concurrency microservices, multi-tier caching topologies, distributed Redis event buses, and sub-millisecond database pipelines.
        </p>
      </header>

      {/* Overview Grid */}
      <div className="meta-grid">
        <div className="meta-item">
          <span className="meta-label">Backend Runtime</span>
          <span className="meta-value">Node.js / Express / Go</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Event Broker</span>
          <span className="meta-value">Redis Streams / PubSub</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Persistence</span>
          <span className="meta-value">PostgreSQL / MongoDB / Redis</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">P99 Latency Target</span>
          <span className="meta-value">&lt; 45ms end-to-end</span>
        </div>
      </div>

      {/* Interactive Demo A: Request Lifecycle */}
      <section className="content-section">
        <div className="section-label">Interactive Simulator 01</div>
        <h2 className="section-heading">Microsecond Request Lifecycle & Middleware Trace</h2>
        <p className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          Step through an incoming HTTPS request through Cloudflare Edge TLS termination, rate-limiting, JWT signature validation, application business logic, and PostgreSQL connection pool execution.
        </p>

        <div className="demo-embed-wrapper">
          <div className="demo-embed-header">
            <span className="demo-embed-title">Demo A · Distributed Request Lifecycle Trace</span>
            <span className="demo-embed-badge">LIVE SIMULATOR</span>
          </div>
          <RequestLifecycleDemo />
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Interactive Demo B: Real-Time Event Bus */}
      <section className="content-section">
        <div className="section-label">Interactive Simulator 02</div>
        <h2 className="section-heading">High-Throughput Redis Event Stream & Pub/Sub Fan-Out</h2>
        <p className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          Simulate high-velocity financial or messaging event streams. Test fan-out backpressure, consumer group acknowledgment (XACK), and WebSocket client push performance.
        </p>

        <div className="demo-embed-wrapper">
          <div className="demo-embed-header">
            <span className="demo-embed-title">Demo B · Real-Time Event Bus & Fan-Out Simulator</span>
            <span className="demo-embed-badge">LIVE SIMULATOR</span>
          </div>
          <RealtimeEventStreamDemo />
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Interactive Demo D: Multi-Tier Caching */}
      <section className="content-section">
        <div className="section-label">Interactive Simulator 03</div>
        <h2 className="section-heading">Tiered Caching Topology & Invalidation Mechanics</h2>
        <p className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          Inspect the performance difference between L1 In-Memory LRU Cache (&lt;1ms), L2 Distributed Redis Cache (~3ms), and Cold Disk DB queries (~45ms). Test write-through vs cache-aside invalidation patterns.
        </p>

        <div className="demo-embed-wrapper">
          <div className="demo-embed-header">
            <span className="demo-embed-title">Demo D · Tiered Caching & Cache-Aside Invalidation</span>
            <span className="demo-embed-badge">LIVE SIMULATOR</span>
          </div>
          <CacheTierDemo />
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Architecture Patterns Section */}
      <section className="content-section">
        <div className="section-label">Patterns</div>
        <h2 className="section-heading">Microservices State Management & DB Connection Pools</h2>
        
        <div className="blueprint-box">
{`+-----------------------------------------------------------------------------+
|               DISTRIBUTED EVENT-DRIVEN MICROSERVICE TOPOLOGY                |
+-----------------------------------------------------------------------------+
|                                                                             |
|  [Client Web/App] ---(TLS/WSS)---> [API Gateway / Nginx Reverse Proxy]      |
|                                                  |                          |
|                     +----------------------------+                          |
|                     | Rate-Limit / JWT Auth (Redis L1)                      |
|                     v                                                       |
|        [Service Instance A] <======> [Redis Pub/Sub & Stream Bus]           |
|        [Service Instance B] <======>            ^                           |
|        [Service Instance C] <======>            |                           |
|                 |                               v                           |
|                 +---> [PgBouncer Pool] ---> [PostgreSQL Primary]            |
|                                                    | (Async Replication)    |
|                                                    v                        |
|                                             [PostgreSQL Replica]            |
+-----------------------------------------------------------------------------+`}
        </div>

        <div className="insight-box">
          <p>
            <strong>Key Insight:</strong> Never allow Node.js worker processes to open unbounded direct TCP connections to relational databases. Using PgBouncer in transaction pooling mode allows thousands of concurrent WebSockets to be serviced with a lean pool of ~30-50 physical database connections.
          </p>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="page-nav-footer">
        <Link to="/systems/webrtc" className="link-subtle">
          ← WebRTC & Real-Time Media
        </Link>
        <Link to="/ai" className="link-subtle">
          AI Lab & Experiments →
        </Link>
      </div>
    </div>
  );
};
