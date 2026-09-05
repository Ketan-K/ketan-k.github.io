import React, { useState } from 'react';
import { SystemNode } from '../../types';
import { Cpu, Server, Database, Radio, Globe, Shield, Activity } from 'lucide-react';
import './Hero.css';

const systemNodes: SystemNode[] = [
  {
    id: 'browser',
    label: 'Browser Client',
    category: 'client',
    role: 'Client Runtime',
    description: 'React SPA maintaining local reactive state, optimistic UI mutation caches, and full-duplex WebSocket / WebRTC connections.',
    simulatedMetric: 'DOM Frame Budget: 16.6ms · Web Worker Active'
  },
  {
    id: 'ws-gateway',
    label: 'API / Realtime Gateway',
    category: 'gateway',
    role: 'Connection & Routing Hub',
    description: 'Stateless Node.js gateway handling HTTP REST, SSE streams, and high-concurrency WebSocket framing with token validation.',
    simulatedMetric: 'Active Sockets: 4,820 · p99 Handshake: 18ms'
  },
  {
    id: 'redis',
    label: 'Redis Pub/Sub & Cache',
    category: 'storage',
    role: 'Ephemeral Coordination',
    description: 'In-memory pub/sub message bus for inter-instance broadcast, distributed room presences with TTL leases, and L2 query cache.',
    simulatedMetric: 'Pub/Sub Latency: 0.8ms · Memory: 64MB'
  },
  {
    id: 'db',
    label: 'PostgreSQL Database',
    category: 'storage',
    role: 'Authoritative Durable State',
    description: 'Relational data store with connection pooling, ACID transaction guarantees, and read-replica routing for persistent records.',
    simulatedMetric: 'Query p95: 14ms · Connection Pool: 85% free'
  },
  {
    id: 'signaling',
    label: 'WebRTC Signaling',
    category: 'network',
    role: 'Session Negotiation',
    description: 'SDP offer/answer exchange, ICE candidate trickle protocol, and room membership coordination over secure WebSockets.',
    simulatedMetric: 'SDP Exchange: 42ms · Trickle ICE: Enabled'
  },
  {
    id: 'stun-turn',
    label: 'STUN / TURN Relays',
    category: 'network',
    role: 'NAT Traversal Layer',
    description: 'STUN resolves public IP/port bindings behind NATs; TURN provides reliable encrypted UDP/TCP media relays for symmetric firewalls.',
    simulatedMetric: 'Direct P2P: 84% · TURN Fallback: 16%'
  },
  {
    id: 'sfu',
    label: 'Selective Forwarding Unit (SFU)',
    category: 'media',
    role: 'Multi-Party Media Routing',
    description: 'High-throughput selective forwarding server terminating RTP streams and forwarding video layers based on downlink bandwidth.',
    simulatedMetric: 'Forwarding Jitter: 2.1ms · Simulcast: 3-Layer'
  }
];

export const HeroSystemDiagram: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('ws-gateway');
  const [activeMode, setActiveMode] = useState<'realtime' | 'webrtc'>('realtime');

  const activeNode = systemNodes.find((n) => n.id === activeNodeId) || systemNodes[1];

  return (
    <div className="tech-frame hero-diagram-frame">
      <div className="tech-frame-header">
        <div className="diagram-header-left">
          <span className="diagram-pulse"></span>
          <span className="diagram-title">SYSTEM ARCHITECTURE TOPOLOGY</span>
          <span className="badge badge-simulated">SIMULATED DATA</span>
        </div>
        <div className="diagram-mode-toggles">
          <button
            type="button"
            className={`mode-btn ${activeMode === 'realtime' ? 'mode-btn-active' : ''}`}
            onClick={() => {
              setActiveMode('realtime');
              setActiveNodeId('ws-gateway');
            }}
          >
            Real-Time / API Flow
          </button>
          <button
            type="button"
            className={`mode-btn ${activeMode === 'webrtc' ? 'mode-btn-active' : ''}`}
            onClick={() => {
              setActiveMode('webrtc');
              setActiveNodeId('sfu');
            }}
          >
            WebRTC Media Flow
          </button>
        </div>
      </div>

      <div className="hero-diagram-body">
        {/* Interactive Architecture Flow Diagram */}
        <div className="diagram-canvas">
          {activeMode === 'realtime' ? (
            <div className="topology-grid topology-realtime">
              {/* Row 1: Client */}
              <div className="topology-row topology-center">
                <button
                  type="button"
                  className={`node-card ${activeNodeId === 'browser' ? 'node-card-active' : ''}`}
                  onClick={() => setActiveNodeId('browser')}
                >
                  <div className="node-icon"><Globe size={16} /></div>
                  <div className="node-content">
                    <span className="node-label">Browser Client</span>
                    <span className="node-sub">React · Optimistic UI</span>
                  </div>
                </button>
              </div>

              {/* Protocol Link */}
              <div className="protocol-link">
                <span className="protocol-line"></span>
                <span className="protocol-tag">HTTPS / WSS (TLS 1.3)</span>
              </div>

              {/* Row 2: Gateway */}
              <div className="topology-row topology-center">
                <button
                  type="button"
                  className={`node-card ${activeNodeId === 'ws-gateway' ? 'node-card-active' : ''}`}
                  onClick={() => setActiveNodeId('ws-gateway')}
                >
                  <div className="node-icon"><Server size={16} /></div>
                  <div className="node-content">
                    <span className="node-label">API / Realtime Gateway</span>
                    <span className="node-sub">Node.js · WebSockets · Auth</span>
                  </div>
                </button>
              </div>

              {/* Fork Link */}
              <div className="protocol-fork">
                <div className="fork-arm">
                  <span className="protocol-tag">Pub/Sub & Presence</span>
                </div>
                <div className="fork-arm">
                  <span className="protocol-tag">Durable Mutations</span>
                </div>
              </div>

              {/* Row 3: Storage */}
              <div className="topology-row topology-split">
                <button
                  type="button"
                  className={`node-card ${activeNodeId === 'redis' ? 'node-card-active' : ''}`}
                  onClick={() => setActiveNodeId('redis')}
                >
                  <div className="node-icon"><Radio size={16} /></div>
                  <div className="node-content">
                    <span className="node-label">Redis</span>
                    <span className="node-sub">Pub/Sub · Ephemeral State</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`node-card ${activeNodeId === 'db' ? 'node-card-active' : ''}`}
                  onClick={() => setActiveNodeId('db')}
                >
                  <div className="node-icon"><Database size={16} /></div>
                  <div className="node-content">
                    <span className="node-label">PostgreSQL</span>
                    <span className="node-sub">ACID · Replicas · Relational</span>
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="topology-grid topology-webrtc">
              {/* Row 1: Peers */}
              <div className="topology-row topology-split">
                <button
                  type="button"
                  className={`node-card ${activeNodeId === 'browser' ? 'node-card-active' : ''}`}
                  onClick={() => setActiveNodeId('browser')}
                >
                  <div className="node-icon"><Globe size={16} /></div>
                  <div className="node-content">
                    <span className="node-label">Browser Peer A</span>
                    <span className="node-sub">Capture & RTCPeerConnection</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`node-card ${activeNodeId === 'signaling' ? 'node-card-active' : ''}`}
                  onClick={() => setActiveNodeId('signaling')}
                >
                  <div className="node-icon"><Activity size={16} /></div>
                  <div className="node-content">
                    <span className="node-label">Signaling Server</span>
                    <span className="node-sub">SDP Offer/Answer · Trickle</span>
                  </div>
                </button>
              </div>

              {/* Protocol Link */}
              <div className="protocol-link">
                <span className="protocol-line"></span>
                <span className="protocol-tag">ICE Candidate Gathering</span>
              </div>

              {/* Row 2: NAT Traversal */}
              <div className="topology-row topology-center">
                <button
                  type="button"
                  className={`node-card ${activeNodeId === 'stun-turn' ? 'node-card-active' : ''}`}
                  onClick={() => setActiveNodeId('stun-turn')}
                >
                  <div className="node-icon"><Shield size={16} /></div>
                  <div className="node-content">
                    <span className="node-label">STUN / TURN Relays</span>
                    <span className="node-sub">NAT Traversal & UDP Relay</span>
                  </div>
                </button>
              </div>

              {/* Protocol Link */}
              <div className="protocol-link">
                <span className="protocol-line"></span>
                <span className="protocol-tag">RTP / SRTP Media Stream</span>
              </div>

              {/* Row 3: SFU */}
              <div className="topology-row topology-center">
                <button
                  type="button"
                  className={`node-card ${activeNodeId === 'sfu' ? 'node-card-active' : ''}`}
                  onClick={() => setActiveNodeId('sfu')}
                >
                  <div className="node-icon"><Cpu size={16} /></div>
                  <div className="node-content">
                    <span className="node-label">Media SFU Engine</span>
                    <span className="node-sub">Selective Forwarding · Simulcast</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Node Inspection Panel */}
        <div className="node-inspector">
          <div className="inspector-header">
            <span className="inspector-title">{activeNode.label}</span>
            <span className="badge badge-cyan">{activeNode.role}</span>
          </div>

          <p className="inspector-description">{activeNode.description}</p>

          <div className="inspector-metric-box">
            <span className="metric-label">SIMULATED TELEMETRY:</span>
            <span className="metric-value font-mono">{activeNode.simulatedMetric}</span>
          </div>

          <div className="inspector-prompt font-mono">
            Click any node in the topology above to inspect architectural role and telemetry.
          </div>
        </div>
      </div>
    </div>
  );
};
