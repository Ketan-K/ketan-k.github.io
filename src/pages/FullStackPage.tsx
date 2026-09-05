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

      {/* Interactive Request Lifecycle */}
      <section className="content-section">
        <h2 className="section-heading">Microsecond Request Lifecycle & Middleware Trace</h2>
        <p className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          Step through an incoming HTTPS request through Cloudflare Edge TLS termination, rate-limiting, JWT signature validation, application business logic, and PostgreSQL connection pool execution.
        </p>

        <div className="demo-embed-wrapper">
          <RequestLifecycleDemo />
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Interactive Real-Time Event Bus */}
      <section className="content-section">
        <h2 className="section-heading">High-Throughput Redis Event Stream & Pub/Sub Fan-Out</h2>
        <p className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          Simulate high-velocity financial or messaging event streams. Test fan-out backpressure, consumer group acknowledgment (XACK), and WebSocket client push performance.
        </p>

        <div className="demo-embed-wrapper">
          <RealtimeEventStreamDemo />
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Interactive Multi-Tier Caching */}
      <section className="content-section">
        <h2 className="section-heading">Tiered Caching Topology & Invalidation Mechanics</h2>
        <p className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          Inspect the performance difference between L1 In-Memory LRU Cache (&lt;1ms), L2 Distributed Redis Cache (~3ms), and Cold Disk DB queries (~45ms). Test write-through vs cache-aside invalidation patterns.
        </p>

        <div className="demo-embed-wrapper">
          <CacheTierDemo />
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Architecture Patterns Section */}
      <section className="content-section">
        <h2 className="section-heading">Microservices State Management & DB Connection Pools</h2>
        
        <div className="arch-flow-card">
          <div className="arch-flow-header font-mono">
            <span>DISTRIBUTED MICROSERVICES & STORAGE PIPELINE</span>
            <span>3 Invariant Tiers</span>
          </div>

          <div className="arch-tiers-grid">
            {/* Tier 1: Ingress & Edge Auth */}
            <div className="arch-tier-item">
              <div className="arch-tier-label font-mono">TIER 01 · INGRESS & EDGE</div>
              <div className="arch-tier-box">
                <div className="arch-node-title font-mono">API Gateway & Reverse Proxy</div>
                <div className="arch-node-desc">TLS/WSS Termination · Cloudflare Edge</div>
                <div className="arch-subnode font-mono">
                  <span className="arch-subnode-tag">Guard</span>
                  <span>Redis L1 Rate-Limiter & JWT Signature Auth</span>
                </div>
              </div>
            </div>

            {/* Tier 2: Microservice Compute & Event Stream */}
            <div className="arch-tier-item">
              <div className="arch-tier-label font-mono">TIER 02 · EVENT BUS & COMPUTE</div>
              <div className="arch-tier-box">
                <div className="arch-node-title font-mono">Stateless Service Workers (A · B · C)</div>
                <div className="arch-node-desc">Express / Go Microservice Instances</div>
                <div className="arch-subnode font-mono">
                  <span className="arch-subnode-tag">Bus</span>
                  <span>Redis Pub/Sub & Streams (<span className="mono">&lt; 2ms fan-out</span>)</span>
                </div>
              </div>
            </div>

            {/* Tier 3: Pooling & Persistence */}
            <div className="arch-tier-item">
              <div className="arch-tier-label font-mono">TIER 03 · POOLING & PERSISTENCE</div>
              <div className="arch-tier-box">
                <div className="arch-node-title font-mono">PgBouncer Connection Pool</div>
                <div className="arch-node-desc">Transaction Pooling · ~40 Max Physical DB Links</div>
                <div className="arch-subnode font-mono">
                  <span className="arch-subnode-tag">Durable</span>
                  <span>PostgreSQL Primary ──(WAL)──&gt; Read Replica</span>
                </div>
              </div>
            </div>
          </div>
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
