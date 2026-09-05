import React, { useState } from 'react';
import './Demos.css';

type ConnectionPath = 'direct' | 'stun' | 'turn';

interface PathMetrics {
  mode: ConnectionPath;
  label: string;
  candidateType: 'host' | 'srflx' | 'relay';
  latencyMs: number;
  packetLossPct: number;
  bitrateKbps: number;
  protocol: string;
  iceState: 'connected' | 'completed';
  description: string;
}

const pathConfigs: Record<ConnectionPath, PathMetrics> = {
  direct: {
    mode: 'direct',
    label: 'Direct Host (P2P LAN)',
    candidateType: 'host',
    latencyMs: 8,
    packetLossPct: 0.1,
    bitrateKbps: 3400,
    protocol: 'UDP / SRTP (Direct Bind)',
    iceState: 'completed',
    description: 'Both peers share the same local network subnet or have publicly routable IPs. Zero intermediate servers involved for media transport.'
  },
  stun: {
    mode: 'stun',
    label: 'STUN Reflexive (P2P WAN)',
    candidateType: 'srflx',
    latencyMs: 38,
    packetLossPct: 0.8,
    bitrateKbps: 2850,
    protocol: 'UDP / SRTP (NAT Hole Punching)',
    iceState: 'completed',
    description: 'STUN server discovers the public WAN IP/Port mapped by NAT routers. Once candidates are exchanged, peers stream media directly P2P.'
  },
  turn: {
    mode: 'turn',
    label: 'TURN Relay (Symmetric NAT Fallback)',
    candidateType: 'relay',
    latencyMs: 94,
    packetLossPct: 1.4,
    bitrateKbps: 1950,
    protocol: 'TLS / TCP / UDP (Relayed via TURN)',
    iceState: 'connected',
    description: 'When symmetric enterprise firewalls prohibit direct UDP hole punching, media packets are relayed through a TURN server over secure TLS/TCP.'
  }
};

export const WebRtcTopologyDemo: React.FC = () => {
  const [selectedPath, setSelectedPath] = useState<ConnectionPath>('stun');
  const [inspectedConcept, setInspectedConcept] = useState<string | null>('ice');

  const activeMetrics = pathConfigs[selectedPath];

  return (
    <div className="demo-card">
      <div className="demo-header">
        <div className="demo-title-group">
          <span className="demo-code font-mono">DEMO C</span>
          <h4 className="demo-title">WebRTC ICE & NAT Traversal Topology</h4>
        </div>
        <span className="badge badge-simulated">SIMULATED NETWORK STATS</span>
      </div>

      <p className="demo-explainer">
        Simulate different WebRTC NAT traversal candidates (Host, Server Reflexive, and Relay) and inspect the impact on round-trip latency and throughput.
      </p>

      {/* Path Selector Tabs */}
      <div className="webrtc-mode-selector font-mono">
        <button
          type="button"
          className={`path-select-btn ${selectedPath === 'direct' ? 'path-select-active' : ''}`}
          onClick={() => setSelectedPath('direct')}
        >
          <span>Host Candidate (Direct)</span>
        </button>
        <button
          type="button"
          className={`path-select-btn ${selectedPath === 'stun' ? 'path-select-active' : ''}`}
          onClick={() => setSelectedPath('stun')}
        >
          <span>STUN (srflx P2P)</span>
        </button>
        <button
          type="button"
          className={`path-select-btn ${selectedPath === 'turn' ? 'path-select-active' : ''}`}
          onClick={() => setSelectedPath('turn')}
        >
          <span>TURN (relay fallback)</span>
        </button>
      </div>

      {/* Visual Topology Diagram */}
      <div className="webrtc-visual-board">
        <div className="board-peer">
          <div className="peer-box">
            <span className="peer-title font-mono">Peer A (Client)</span>
            <span className="peer-ip font-mono">192.168.1.14</span>
          </div>
        </div>

        <div className="board-center-route">
          <div className="route-indicator font-mono">
            {selectedPath === 'direct' && <span className="route-tag route-tag-green">Direct LAN Socket</span>}
            {selectedPath === 'stun' && <span className="route-tag route-tag-blue">STUN Bind: 72.14.201.8:54120</span>}
            {selectedPath === 'turn' && <span className="route-tag route-tag-amber">TURN Relay: turn.global.net:3478</span>}
          </div>
          <div className="route-line-wrap">
            <div className={`route-line route-line-${selectedPath}`}></div>
          </div>
        </div>

        <div className="board-peer">
          <div className="peer-box">
            <span className="peer-title font-mono">Peer B (Remote)</span>
            <span className="peer-ip font-mono">10.0.4.92</span>
          </div>
        </div>
      </div>

      {/* Live Simulated Telemetry Dashboard */}
      <div className="telemetry-dashboard-grid font-mono">
        <div className="telemetry-metric-tile">
          <span className="tile-label">CANDIDATE TYPE</span>
          <span className="tile-val tile-val-highlight">{activeMetrics.candidateType.toUpperCase()}</span>
        </div>

        <div className="telemetry-metric-tile">
          <span className="tile-label">ESTIMATED RTT</span>
          <span className="tile-val">{activeMetrics.latencyMs} ms</span>
        </div>

        <div className="telemetry-metric-tile">
          <span className="tile-label">PACKET LOSS</span>
          <span className="tile-val">{activeMetrics.packetLossPct}%</span>
        </div>

        <div className="telemetry-metric-tile">
          <span className="tile-label">MEDIA BITRATE</span>
          <span className="tile-val">{activeMetrics.bitrateKbps} kbps</span>
        </div>
      </div>

      {/* Interactive Concept Glossary */}
      <div className="webrtc-concept-explainer">
        <div className="concept-tags font-mono">
          <span className="concept-label">TECHNICAL CONCEPTS:</span>
          <button
            type="button"
            className={`concept-pill ${inspectedConcept === 'ice' ? 'concept-pill-active' : ''}`}
            onClick={() => setInspectedConcept('ice')}
          >
            ICE Framework
          </button>
          <button
            type="button"
            className={`concept-pill ${inspectedConcept === 'stun' ? 'concept-pill-active' : ''}`}
            onClick={() => setInspectedConcept('stun')}
          >
            STUN Protocol
          </button>
          <button
            type="button"
            className={`concept-pill ${inspectedConcept === 'turn' ? 'concept-pill-active' : ''}`}
            onClick={() => setInspectedConcept('turn')}
          >
            TURN Relaying
          </button>
        </div>

        <div className="concept-detail-box">
          {inspectedConcept === 'ice' && (
            <p>
              <strong>Interactive Connectivity Establishment (ICE):</strong> Systematic framework RFC 8445 that collects local host addresses, reflexive public mappings (STUN), and relay endpoints (TURN) to perform connectivity checks and establish the lowest-latency viable path.
            </p>
          )}
          {inspectedConcept === 'stun' && (
            <p>
              <strong>Session Traversal Utilities for NAT (STUN):</strong> Lightweight request-response protocol allowing a client behind a router to discover its external public IP and port binding, enabling direct peer-to-peer UDP streams for non-symmetric NATs.
            </p>
          )}
          {inspectedConcept === 'turn' && (
            <p>
              <strong>Traversal Using Relays around NAT (TURN):</strong> High-reliability fallback server providing a dedicated cloud relay when symmetric NATs or corporate enterprise firewalls strictly block direct peer-to-peer UDP packet traversal.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
