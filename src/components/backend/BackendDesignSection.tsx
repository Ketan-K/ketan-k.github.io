import React, { useState } from 'react';
import { Server, Activity, Lock, Radio } from 'lucide-react';
import './Backend.css';

export const BackendDesignSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'auth' | 'events' | 'observability'>('auth');

  return (
    <section className="section" id="backend">
      <div className="container">
        <div className="section-header">
          <div className="section-label font-mono">
            <Server size={14} />
            <span>06 / BACKEND & DISTRIBUTED SYSTEMS</span>
          </div>
          <h2 className="section-title">Backend Architecture Blueprints</h2>
          <p className="section-subtitle">
            Reliable backend engineering revolves around stateless horizontal scaling, idempotent queue processing, and end-to-end telemetry.
          </p>
        </div>

        {/* Blueprint Navigation Tabs */}
        <div className="backend-tabs font-mono">
          <button
            type="button"
            className={`b-tab ${activeTab === 'auth' ? 'b-tab-active' : ''}`}
            onClick={() => setActiveTab('auth')}
          >
            <Lock size={14} />
            <span>Auth & Token Lifecycle</span>
          </button>
          <button
            type="button"
            className={`b-tab ${activeTab === 'events' ? 'b-tab-active' : ''}`}
            onClick={() => setActiveTab('events')}
          >
            <Radio size={14} />
            <span>Event-Driven Task Queues</span>
          </button>
          <button
            type="button"
            className={`b-tab ${activeTab === 'observability' ? 'b-tab-active' : ''}`}
            onClick={() => setActiveTab('observability')}
          >
            <Activity size={14} />
            <span>Full-Stack Observability</span>
          </button>
        </div>

        {/* Blueprint Viewer Frame */}
        <div className="blueprint-frame tech-frame">
          {activeTab === 'auth' && (
            <div className="blueprint-content">
              <div className="blueprint-meta">
                <h3 className="blueprint-title">Stateless Cryptographic JWT & Refresh Token Rotation</h3>
                <p className="blueprint-desc">
                  Short-lived access tokens (15m) validated without DB lookups at the edge API gateway, paired with single-use rotating refresh tokens stored in Redis with automatic breach detection (family revocation).
                </p>
              </div>

              <div className="ascii-diagram">
{`[Client Request] ──(Bearer JWT)──> [API Gateway]
                                          │
                        ┌─────────────────┴─────────────────┐
                 [Valid Signature]                  [Expired / Invalid]
                        │                                   ▼
                 [Pass Upstream]                  [401 Challenge]
                        │                                   ▼
                 [Execute Handler]             [Client /refresh Rotation]
                                                            │
                                                  [Redis Token Family Check]`}
              </div>

              <div className="blueprint-specs-grid font-mono">
                <div className="spec-item">
                  <span className="spec-label">ACCESS TOKEN:</span>
                  <span className="spec-val">Ed25519 Signed (15min TTL)</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">ROTATION POLICY:</span>
                  <span className="spec-val">Automatic Revocation on Token Reuse</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">GATEWAY OVERHEAD:</span>
                  <span className="spec-val">&lt;0.5ms Signature Verification</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="blueprint-content">
              <div className="blueprint-meta">
                <h3 className="blueprint-title">Asynchronous Worker Pipeline with Dead-Letter Queues</h3>
                <p className="blueprint-desc">
                  Separating synchronous user-facing HTTP handlers from resource-intensive background jobs (e.g. video processing, notification dispatch, database aggregates) via durable Redis Streams / BullMQ.
                </p>
              </div>

              <div className="ascii-diagram">
{`[API Ingress] ──(Fast Ack 202)──> [Client Response]
      │
      └──(Push Task)──> [Durable Redis Stream]
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
       [Worker Instance 1]           [Worker Instance 2]
                │                             │
          (Idempotent)                  (Idempotent)
                ▼                             ▼
       [Commit DB Mutation]          [Failed 3x Retry?]
                                              │
                                              ▼
                                    [Dead-Letter Queue (DLQ)]`}
              </div>

              <div className="blueprint-specs-grid font-mono">
                <div className="spec-item">
                  <span className="spec-label">INGRESS LATENCY:</span>
                  <span className="spec-val">12ms (Queue & Return 202)</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">RETRY POLICY:</span>
                  <span className="spec-val">3x Exponential Backoff + DLQ</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">CONCURRENCY:</span>
                  <span className="spec-val">Worker Pool with Rate-Limits</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'observability' && (
            <div className="blueprint-content">
              <div className="blueprint-meta">
                <h3 className="blueprint-title">End-to-End Distributed Tracing & Telemetry</h3>
                <p className="blueprint-desc">
                  Every inbound request and WebSocket connection is tagged with a trace identifier (\`x-trace-id\`) propagated across service boundaries to correlate structured JSON logs, p99 latency metrics, and error spans.
                </p>
              </div>

              <div className="ascii-diagram">
{`[Inbound Request] ──(x-trace-id: tr_8492)──> [Gateway Middleware]
                                                   │
                ┌──────────────────────────────────┼──────────────────────────────────┐
                ▼                                  ▼                                  ▼
         [Structured Logs]                 [Runtime Metrics]                   [Trace Spans]
       (JSON / Log Level)               (p95 / p99 / Req/sec)             (DB & External Timings)
                │                                  │                                  │
                └──────────────────────────────────┼──────────────────────────────────┘
                                                   ▼
                                        [Central Telemetry Engine]`}
              </div>

              <div className="blueprint-specs-grid font-mono">
                <div className="spec-item">
                  <span className="spec-label">TRACE PROPAGATION:</span>
                  <span className="spec-val">W3C Trace Context Header</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">LOG ENCODING:</span>
                  <span className="spec-val">Structured JSON with Trace ID</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">MONITORED TARGETS:</span>
                  <span className="spec-val">p99 Latency, Socket Drops, DB Pool</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
