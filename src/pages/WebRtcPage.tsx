import React from 'react';
import { Link } from 'react-router-dom';
import { WebRtcTopologyDemo } from '../components/demos/WebRtcTopologyDemo';
import { ResilienceDemo } from '../components/demos/ResilienceDemo';
import './pages.css';

export const WebRtcPage: React.FC = () => {
  return (
    <div className="page-container">
      <header className="page-header">
        <div className="page-breadcrumb">
          <Link to="/">Index</Link>
          <span>/</span>
          <Link to="/systems">Systems</Link>
          <span>/</span>
          <span>WebRTC</span>
        </div>
        <h1 className="page-title">WebRTC & Real-Time Media Architecture</h1>
        <p className="page-subtitle">
          In-depth architectural analysis of sub-100ms real-time communications, ICE NAT traversal, SFU packet routing, congestion control, and jitter management.
        </p>
      </header>

      {/* Overview Grid */}
      <div className="meta-grid">
        <div className="meta-item">
          <span className="meta-label">Signaling</span>
          <span className="meta-value">WebSocket / JSON-RPC</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Transport</span>
          <span className="meta-value">SRTP / DTLS / UDP</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">NAT Traversal</span>
          <span className="meta-value">STUN (RFC 5389) / TURN (RFC 5766)</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Target Latency</span>
          <span className="meta-value">&lt; 150ms Glass-to-Glass</span>
        </div>
      </div>

      {/* Interactive Demo C: WebRTC ICE Topology */}
      <section className="content-section">
        <div className="section-label">Interactive Simulator 01</div>
        <h2 className="section-heading">ICE Candidate Gathering & Routing Simulator</h2>
        <p className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          Simulate how WebRTC establishes peer connectivity across symmetric NATs, STUN server reflexivity, and TURN relay allocation.
        </p>

        <div className="demo-embed-wrapper">
          <div className="demo-embed-header">
            <span className="demo-embed-title">Demo C · WebRTC ICE Topology & Traversal Engine</span>
            <span className="demo-embed-badge">LIVE SIMULATOR</span>
          </div>
          <WebRtcTopologyDemo />
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Architectural Deep Dive */}
      <section className="content-section">
        <div className="section-label">Media Topologies</div>
        <h2 className="section-heading">Mesh vs SFU vs MCU Architecture</h2>
        <div className="prose">
          <p>
            Choosing the correct media plane topology dictates bandwidth scalability, client CPU utilization, and end-to-end latency:
          </p>
        </div>

        <div className="blueprint-box">
{`+-----------------------------------------------------------------------------+
|                          WEBRTC TOPOLOGY TRADEOFFS                          |
+-----------------------------------------------------------------------------+
| Topology | Client Uplink | Client Downlink | Server Transcode | Latency   | Max Users |
+----------+---------------+-----------------+------------------+-----------+-----------+
| Mesh     | N-1 streams   | N-1 streams     | None (0 CPU)     | Lowest    | ~4-6      |
| SFU      | 1 stream      | N-1 streams     | None (RTP Router)| ~10-20ms  | ~50-500   |
| MCU      | 1 stream      | 1 mixed stream  | Full Transcoding | ~80-150ms | ~1000+    |
+-----------------------------------------------------------------------------+`}
        </div>

        <div className="insight-box">
          <p>
            <strong>Production Standard:</strong> Selective Forwarding Units (SFUs) like mediasoup, Janus, or LiveKit offer the ideal balance for enterprise video conferencing. The SFU receives one simulcast stream (High/Med/Low) from each publisher and routes packet streams without transcoding, preserving end-to-end encryption and minimizing server CPU overhead.
          </p>
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Interactive Demo F: Network Resilience & Packet Recovery */}
      <section className="content-section">
        <div className="section-label">Interactive Simulator 02</div>
        <h2 className="section-heading">Network Resilience & Packet Loss Recovery</h2>
        <p className="prose" style={{ marginBottom: 'var(--space-4)' }}>
          Test how adaptive bitrate (GCC), NACK packet retransmission, Forward Error Correction (RED/ULPFEC), and keyframe generation (PLI/FIR) recover video streams under harsh network degradation.
        </p>

        <div className="demo-embed-wrapper">
          <div className="demo-embed-header">
            <span className="demo-embed-title">Demo F · Network Resilience & Packet Loss Engine</span>
            <span className="demo-embed-badge">LIVE SIMULATOR</span>
          </div>
          <ResilienceDemo />
        </div>
      </section>

      <hr className="editorial-divider" />

      {/* Protocols and RFC Matrix */}
      <section className="content-section">
        <div className="section-label">Specifications</div>
        <h2 className="section-heading">IETF / W3C Protocol Standards</h2>

        <div className="spec-table-container">
          <table className="spec-table">
            <thead>
              <tr>
                <th>Protocol / RFC</th>
                <th>Layer</th>
                <th>Purpose in WebRTC</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="mono">RFC 8829 (JSEP)</td>
                <td>Signaling / State</td>
                <td>Javascript Session Establishment Protocol for Offer/Answer SDP state machine.</td>
              </tr>
              <tr>
                <td className="mono">RFC 8445 (ICE)</td>
                <td>Connectivity</td>
                <td>Interactive Connectivity Establishment across NATs and firewalls.</td>
              </tr>
              <tr>
                <td className="mono">RFC 3711 (SRTP)</td>
                <td>Media Security</td>
                <td>Secure Real-Time Transport Protocol providing payload encryption and replay protection.</td>
              </tr>
              <tr>
                <td className="mono">RFC 5764 (DTLS-SRTP)</td>
                <td>Key Exchange</td>
                <td>Datagram TLS handshake over UDP for deriving SRTP master keys without out-of-band signaling.</td>
              </tr>
              <tr>
                <td className="mono">RFC 4585 (AVPF)</td>
                <td>RTCP Feedback</td>
                <td>Extended RTP feedback profiles enabling NACK, PLI, and FIR feedback in &lt; 50ms.</td>
              </tr>
              <tr>
                <td className="mono">RFC 8888 (Congestion)</td>
                <td>Bandwidth Estimation</td>
                <td>RTP Control Protocol (RTCP) feedback for Congestion Control (Google Congestion Control).</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Navigation Footer */}
      <div className="page-nav-footer">
        <Link to="/systems" className="link-subtle">
          ← Systems Overview
        </Link>
        <Link to="/systems/full-stack" className="link-subtle">
          Full-Stack & Backend Systems →
        </Link>
      </div>
    </div>
  );
};
