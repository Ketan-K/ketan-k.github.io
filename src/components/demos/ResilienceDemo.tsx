import React, { useState } from 'react';
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react';
import './Demos.css';

type NetworkCondition = 'excellent' | 'good' | 'poor' | 'offline';

interface ConditionConfig {
  label: string;
  latency: string;
  packetLoss: string;
  wsState: 'CONNECTED' | 'DEGRADED' | 'RECONNECTING' | 'OFFLINE_BUFFERING';
  retryPolicy: string;
  offlineQueueLength: number;
  description: string;
}

const conditions: Record<NetworkCondition, ConditionConfig> = {
  excellent: {
    label: 'Fiber / LAN (Optimal)',
    latency: '12ms',
    packetLoss: '0.0%',
    wsState: 'CONNECTED',
    retryPolicy: 'Idle (Healthy Keepalive 25s)',
    offlineQueueLength: 0,
    description: 'Direct low-jitter connection. Real-time state synchronization is instantaneous with 0ms optimistic delay.'
  },
  good: {
    label: '4G / Wi-Fi (Standard)',
    latency: '45ms',
    packetLoss: '0.8%',
    wsState: 'CONNECTED',
    retryPolicy: 'Jitter tolerance enabled',
    offlineQueueLength: 0,
    description: 'Minor latency fluctuations handled smoothly by WebSocket heartbeat buffer and client-side message queue.'
  },
  poor: {
    label: 'Congested 3G / High Jitter',
    latency: '340ms',
    packetLoss: '18.4%',
    wsState: 'DEGRADED',
    retryPolicy: 'Active Heartbeat Probing (5s)',
    offlineQueueLength: 3,
    description: 'Heavy packet loss detected. System downgrades video resolution, throttles presence broadcasts, and acknowledges dropped frames.'
  },
  offline: {
    label: 'Network Severed / Offline',
    latency: '∞ (No route)',
    packetLoss: '100%',
    wsState: 'OFFLINE_BUFFERING',
    retryPolicy: 'Exponential Backoff: 1s, 2s, 4s, 8s (Full Jitter)',
    offlineQueueLength: 7,
    description: 'Socket closed. Client intercepts user actions into an indexedDB offline delta queue, initiating jittered auto-reconnects until online.'
  }
};

export const ResilienceDemo: React.FC = () => {
  const [activeCondition, setActiveCondition] = useState<NetworkCondition>('poor');

  const cfg = conditions[activeCondition];

  const handleConditionChange = (cond: NetworkCondition) => {
    setActiveCondition(cond);
  };

  const getStatusBadge = (state: ConditionConfig['wsState']) => {
    switch (state) {
      case 'CONNECTED':
        return <span className="badge badge-emerald">SOCKET: CONNECTED</span>;
      case 'DEGRADED':
        return <span className="badge badge-amber">SOCKET: DEGRADED</span>;
      case 'RECONNECTING':
      case 'OFFLINE_BUFFERING':
        return <span className="badge badge-simulated">SOCKET: DISCONNECTED (BUFFERING)</span>;
    }
  };

  return (
    <div className="demo-card">
      <div className="demo-header">
        <div className="demo-title-group">
          <span className="demo-code font-mono">DEMO F</span>
          <h4 className="demo-title">Failure Resilience & Offline Queue State Machine</h4>
        </div>
        <span className="badge badge-simulated">SIMULATED FAULT INJECTION</span>
      </div>

      <p className="demo-explainer">
        Inject simulated network degradation and severed connections to observe how the client-side state machine buffers mutations and gracefully recovers.
      </p>

      {/* Condition Switcher */}
      <div className="resilience-condition-bar font-mono">
        <span className="condition-bar-label">FAULT INJECTION:</span>
        <button
          type="button"
          className={`condition-btn ${activeCondition === 'excellent' ? 'condition-btn-active' : ''}`}
          onClick={() => handleConditionChange('excellent')}
        >
          <Wifi size={13} />
          <span>Optimal</span>
        </button>
        <button
          type="button"
          className={`condition-btn ${activeCondition === 'good' ? 'condition-btn-active' : ''}`}
          onClick={() => handleConditionChange('good')}
        >
          <Wifi size={13} />
          <span>Standard</span>
        </button>
        <button
          type="button"
          className={`condition-btn ${activeCondition === 'poor' ? 'condition-btn-active condition-btn-warn' : ''}`}
          onClick={() => handleConditionChange('poor')}
        >
          <AlertTriangle size={13} />
          <span>Degraded (Poor)</span>
        </button>
        <button
          type="button"
          className={`condition-btn ${activeCondition === 'offline' ? 'condition-btn-active condition-btn-danger' : ''}`}
          onClick={() => handleConditionChange('offline')}
        >
          <WifiOff size={13} />
          <span>Severed (Offline)</span>
        </button>
      </div>

      {/* State Machine Transition Flow */}
      <div className="state-machine-track font-mono">
        <div className={`sm-node ${activeCondition === 'excellent' || activeCondition === 'good' ? 'sm-node-active' : ''}`}>
          [1] Connected (Healthy)
        </div>
        <div className="sm-arrow">──►</div>
        <div className={`sm-node ${activeCondition === 'poor' ? 'sm-node-active-amber' : ''}`}>
          [2] Degraded (Packet Drop)
        </div>
        <div className="sm-arrow">──►</div>
        <div className={`sm-node ${activeCondition === 'offline' ? 'sm-node-active-rose' : ''}`}>
          [3] Offline Buffer (Backoff)
        </div>
        <div className="sm-arrow">──►</div>
        <div className="sm-node">
          [4] Auto-Reconcile Sync
        </div>
      </div>

      {/* Telemetry Grid */}
      <div className="resilience-dashboard-grid font-mono">
        <div className="r-metric-tile">
          <span className="r-label">CONNECTION STATE</span>
          <div className="r-val">{getStatusBadge(cfg.wsState)}</div>
        </div>

        <div className="r-metric-tile">
          <span className="r-label">ROUND-TRIP LATENCY</span>
          <span className="r-val">{cfg.latency}</span>
        </div>

        <div className="r-metric-tile">
          <span className="r-label">PACKET LOSS ESTIMATE</span>
          <span className="r-val">{cfg.packetLoss}</span>
        </div>

        <div className="r-metric-tile">
          <span className="r-label">OFFLINE MUTATION QUEUE</span>
          <span className="r-val">{cfg.offlineQueueLength} pending events</span>
        </div>
      </div>

      {/* Detailed Strategy Panel */}
      <div className="resilience-strategy-box">
        <div className="strategy-header font-mono">
          <span className="strategy-title">ACTIVE RECOVERY & DEGRADATION POLICY</span>
          <span className="badge">{cfg.label}</span>
        </div>
        <p className="strategy-desc">{cfg.description}</p>
        <div className="strategy-backoff font-mono">
          <span className="backoff-label">RETRY ALGORITHM:</span>
          <span className="backoff-policy">{cfg.retryPolicy}</span>
        </div>
      </div>
    </div>
  );
};
