import React from 'react';
import {
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Radio,
  Layers,
  Database
} from 'lucide-react';
import './PrincipleNodeGraph.css';

interface PrincipleNodeGraphProps {
  principleId: string;
  rawAscii?: string;
}

export const PrincipleNodeGraph: React.FC<PrincipleNodeGraphProps> = ({ principleId, rawAscii }) => {
  switch (principleId) {
    case 'design-for-failure':
      return (
        <div className="principle-visual-graph-wrapper">
          <div className="flow-graph-container">
            <div className="flow-seq-row">
              <div className="flow-node flow-node-warning font-mono">
                <AlertTriangle size={13} className="node-icon-warn" />
                <span>Network Drop</span>
              </div>
              <div className="flow-arrow-h font-mono">
                <ArrowRight size={14} />
              </div>
              <div className="flow-node font-mono">
                <span>Queue Local Operations</span>
              </div>
            </div>

            <div className="flow-arrow-v font-mono">
              <ArrowDown size={14} />
            </div>

            <div className="flow-seq-col">
              <div className="flow-node font-mono">
                <span>Exponential Backoff + Jitter</span>
              </div>

              <div className="flow-arrow-v font-mono">
                <ArrowDown size={14} />
              </div>

              <div className="flow-node font-mono">
                <span>Auto-Reconnect Handshake</span>
              </div>

              <div className="flow-arrow-v font-mono">
                <ArrowDown size={14} />
              </div>

              <div className="flow-seq-row">
                <div className="flow-node font-mono">
                  <span>Replay Delta Log</span>
                </div>
                <div className="flow-arrow-h font-mono">
                  <ArrowRight size={14} />
                </div>
                <div className="flow-node flow-node-success font-mono">
                  <CheckCircle2 size={13} className="node-icon-success" />
                  <span>State Synchronized</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'keep-state-intentional':
      return (
        <div className="principle-visual-graph-wrapper">
          <div className="flow-tree-container">
            <div className="tree-root-box font-mono">
              <Layers size={14} />
              <span>State Classification</span>
            </div>

            <div className="tree-branches">
              <div className="tree-branch-item">
                <div className="branch-label font-mono">
                  <span className="branch-connector font-mono">├──</span>
                  <span className="branch-type">Ephemeral / Realtime</span>
                  <ArrowRight size={13} className="branch-arrow" />
                </div>
                <div className="flow-node flow-node-accent font-mono">
                  <span>Redis Keys with TTL / In-Memory PubSub</span>
                </div>
              </div>

              <div className="tree-branch-item">
                <div className="branch-label font-mono">
                  <span className="branch-connector font-mono">├──</span>
                  <span className="branch-type">Durable / Authoritative</span>
                  <ArrowRight size={13} className="branch-arrow" />
                </div>
                <div className="flow-node flow-node-primary font-mono">
                  <Database size={13} />
                  <span>PostgreSQL / Relational DB</span>
                </div>
              </div>

              <div className="tree-branch-item">
                <div className="branch-label font-mono">
                  <span className="branch-connector font-mono">└──</span>
                  <span className="branch-type">Transient / Reactive</span>
                  <ArrowRight size={13} className="branch-arrow" />
                </div>
                <div className="flow-node font-mono">
                  <span>Client Signals / State Machine</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'observe-what-matters':
      return (
        <div className="principle-visual-graph-wrapper">
          <div className="flow-pipeline-container">
            <div className="pipeline-origin font-mono">
              <Radio size={14} />
              <span>Client Request / WS Event</span>
            </div>

            <div className="pipeline-steps-rail">
              <div className="pipeline-step-item font-mono">
                <span className="step-bullet">01</span>
                <div className="pipeline-step-box">
                  <span className="step-title">Trace ID Tagged</span>
                  <span className="step-note">Distributed context propagated on ingress</span>
                </div>
              </div>

              <div className="pipeline-step-item font-mono">
                <span className="step-bullet">02</span>
                <div className="pipeline-step-box">
                  <span className="step-title">Gateway Transit Time (p95 / p99)</span>
                  <span className="step-note">Ingress proxy & TLS termination timing</span>
                </div>
              </div>

              <div className="pipeline-step-item font-mono">
                <span className="step-bullet">03</span>
                <div className="pipeline-step-box">
                  <span className="step-title">DB / Cache Execution Profiling</span>
                  <span className="step-note">L1/L2 cache hit vs storage serialization</span>
                </div>
              </div>

              <div className="pipeline-step-item font-mono">
                <span className="step-bullet step-bullet-last">04</span>
                <div className="pipeline-step-box pipeline-step-final">
                  <span className="step-title">Client Render Time Telemetry</span>
                  <span className="step-note">End-to-end user-perceived SLA trace</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

    case 'complexity-has-a-cost':
      return (
        <div className="principle-visual-graph-wrapper">
          <div className="flow-decision-container">
            <div className="decision-node-top font-mono">
              <div className="decision-node-badge">SIMPLICITY FIRST</div>
              <div className="decision-node-title">Single Clean Service + Redis</div>
            </div>

            <div className="decision-gate-wrap font-mono">
              <div className="decision-line-v" />
              <div className="decision-gate-tag">
                <span>(Only split when bottleneck is proven by p99 / CPU profile)</span>
              </div>
              <ArrowDown size={14} className="decision-arrow-v" />
            </div>

            <div className="decision-node-target font-mono">
              <span>Targeted Worker / Specialized Media SFU</span>
            </div>
          </div>
        </div>
      );

    case 'realtime-changes-the-rules':
      return (
        <div className="principle-visual-graph-wrapper">
          <div className="flow-graph-container">
            <div className="flow-seq-row">
              <div className="flow-node font-mono">
                <span>User Action</span>
              </div>
              <div className="flow-arrow-h font-mono">
                <ArrowRight size={14} />
              </div>
              <div className="flow-node flow-node-fast font-mono">
                <span className="speed-dot" />
                <span>Optimistic Local Apply (0ms)</span>
              </div>
            </div>

            <div className="flow-arrow-v font-mono">
              <ArrowDown size={14} />
            </div>

            <div className="flow-seq-col">
              <div className="flow-node font-mono">
                <span>Send Delta over WebSocket</span>
              </div>

              <div className="flow-arrow-v font-mono">
                <ArrowDown size={14} />
              </div>

              <div className="flow-node font-mono">
                <span>Server Authoritative Validation</span>
              </div>

              <div className="flow-arrow-v font-mono">
                <ArrowDown size={14} />
              </div>

              <div className="flow-node flow-node-success font-mono">
                <CheckCircle2 size={13} className="node-icon-success" />
                <span>Confirm / Rollback Reconcile</span>
              </div>
            </div>
          </div>
        </div>
      );

    default:
      return rawAscii ? <pre className="blueprint-box">{rawAscii}</pre> : null;
  }
};
