import React, { useState } from 'react';
import { Network, Terminal } from 'lucide-react';
import './WebRtc.css';

interface WebRtcTopic {
  id: string;
  name: string;
  category: 'Signaling & Discovery' | 'NAT Traversal' | 'Transport & Media' | 'Selective Forwarding & Codecs';
  shortDesc: string;
  explanation: string;
  engineeringTip: string;
  rfc: string;
}

const webrtcTopics: WebRtcTopic[] = [
  {
    id: 'signaling',
    name: 'Signaling Plane',
    category: 'Signaling & Discovery',
    shortDesc: 'Out-of-band SDP exchange & session negotiation.',
    explanation:
      'WebRTC deliberately does not define a signaling protocol. Sockets or HTTP/2 are used to exchange Session Description Protocol (SDP) offers and answers containing media codecs, transport parameters, and encryption keys (DTLS/SRTP).',
    engineeringTip: 'Implement the "Perfect Negotiation" state machine to eliminate glare race conditions when peers renegotiate simultaneously.',
    rfc: 'RFC 8829'
  },
  {
    id: 'ice',
    name: 'ICE Framework',
    category: 'NAT Traversal',
    shortDesc: 'Incremental gathering of local, reflexive, and relay endpoints.',
    explanation:
      'Interactive Connectivity Establishment pairs candidate addresses across peers and performs STUN connectivity checks in priority order to establish the lowest-latency viable binding.',
    engineeringTip: 'Always use Trickle ICE to send candidates over signaling as they are discovered instead of blocking on full collection.',
    rfc: 'RFC 8445'
  },
  {
    id: 'stun',
    name: 'STUN Protocol',
    category: 'NAT Traversal',
    shortDesc: 'NAT discovery of public WAN IP & mapped port.',
    explanation:
      'Session Traversal Utilities for NAT allows endpoints behind NATs to query a public STUN server to discover their public-facing IP and mapped port bindings for direct P2P hole punching.',
    engineeringTip: 'STUN accounts for ~85% of successful P2P connections on consumer residential networks.',
    rfc: 'RFC 8489'
  },
  {
    id: 'turn',
    name: 'TURN Relays',
    category: 'NAT Traversal',
    shortDesc: 'Encrypted relay fallback for symmetric enterprise NATs.',
    explanation:
      'Traversal Using Relays around NAT provides cloud relay servers that forward encrypted media packets when direct UDP hole punching fails due to symmetric firewall port mappings.',
    engineeringTip: 'Provision dual UDP and TLS-wrapped TCP TURN listeners on port 443 to bypass restrictive corporate egress proxies.',
    rfc: 'RFC 8656'
  },
  {
    id: 'rtp',
    name: 'RTP (Real-time Transport)',
    category: 'Transport & Media',
    shortDesc: 'Packetized audio and video payload framing over UDP.',
    explanation:
      'Real-time Transport Protocol delivers audio (Opus) and video (VP8/VP9/AV1/H.264) payloads with timestamping, sequence numbering, and jitter compensation headers over SRTP encryption.',
    engineeringTip: 'SRTP payload encryption has virtually zero CPU penalty in modern browsers thanks to AES-GCM hardware acceleration.',
    rfc: 'RFC 3550'
  },
  {
    id: 'rtcp',
    name: 'RTCP Feedback & Telemetry',
    category: 'Transport & Media',
    shortDesc: 'Continuous QoS monitoring, receiver reports, and PLI/NACKs.',
    explanation:
      'Real-time Control Protocol transmits Receiver Reports (RR), packet loss counters, Round-Trip Time (RTT) estimates, Picture Loss Indications (PLI), and negative acknowledgments (NACK) to enable adaptive bitrate.',
    engineeringTip: 'Parse client getStats() RTCP metrics to downgrade video resolution before socket buffer bloat triggers audio drops.',
    rfc: 'RFC 3550'
  },
  {
    id: 'sfu',
    name: 'Selective Forwarding Unit (SFU)',
    category: 'Selective Forwarding & Codecs',
    shortDesc: 'Server topology terminating RTP and forwarding streams.',
    explanation:
      'Unlike MCUs (Multipoint Control Units) which transcode video in software, an SFU acts as a high-performance packet router, receiving one uplink video stream from a publisher and selectively forwarding it to downstream subscribers.',
    engineeringTip: 'SFU architectures scale O(N) client egress compared to O(N²) for full-mesh peer configurations.',
    rfc: 'RFC 7667'
  },
  {
    id: 'simulcast',
    name: 'Simulcast Streams',
    category: 'Selective Forwarding & Codecs',
    shortDesc: 'Multi-layer encoding (High/Med/Low) sent by client.',
    explanation:
      'Client encodes video into multiple spatial resolutions simultaneously (e.g. 1080p, 720p, 360p). The SFU forwards the optimal layer to each participant based on their current downlink bandwidth budget.',
    engineeringTip: 'Simulcast avoids server transcoding overhead while ensuring participants on mobile networks do not stall desktop clients.',
    rfc: 'RFC 8853'
  },
  {
    id: 'svc',
    name: 'SVC (Scalable Video Coding)',
    category: 'Selective Forwarding & Codecs',
    shortDesc: 'Single stream with layered temporal and spatial substreams.',
    explanation:
      'VP9 and AV1 support Scalable Video Coding where a single bitstream contains base layers and optional enhancement layers. An SFU can drop enhancement packets without breaking the base decoding stream.',
    engineeringTip: 'SVC provides superior compression density over Simulcast for VP9/AV1 codecs when hardware acceleration is available.',
    rfc: 'RFC 6190'
  }
];

export const WebRtcDeepDive: React.FC = () => {
  const [activeTopicId, setActiveTopicId] = useState<string>('signaling');

  const activeTopic = webrtcTopics.find((t) => t.id === activeTopicId) || webrtcTopics[0];

  return (
    <section className="section" id="webrtc">
      <div className="container">
        <div className="section-header">
          <div className="section-label font-mono">
            <Network size={14} />
            <span>04 / REAL-TIME SYSTEMS & WEBRTC</span>
          </div>
          <h2 className="section-title">Where Networking Becomes Part of the Product</h2>
          <p className="section-subtitle">
            WebRTC is not just an API; it is a distributed state machine spanning NAT discovery, media packetization, adaptive bandwidth estimation, and selective forwarding.
          </p>
        </div>

        {/* Interactive Architecture Diagram */}
        <div className="webrtc-architecture-canvas">
          <div className="webrtc-topo-board font-mono">
            <div className="topo-signaling-bar">
              <span className="topo-tag">Signaling Server (WebSockets / SDP / Trickle ICE)</span>
            </div>
            <div className="topo-flow-row">
              <div className="topo-client-box">
                <span className="topo-box-title">Browser Peer A</span>
                <span className="topo-box-sub">Capture / SRTP</span>
              </div>
              <div className="topo-media-pipe">
                <span className="pipe-label">◄── Direct P2P / STUN ──►</span>
                <span className="pipe-sub">or SFU Media Routing</span>
              </div>
              <div className="topo-client-box">
                <span className="topo-box-title">Browser Peer B</span>
                <span className="topo-box-sub">Render / RTCP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol Interactive Matrix */}
        <div className="webrtc-matrix-layout">
          {/* Topic Pills Grid */}
          <div className="webrtc-topics-grid">
            {webrtcTopics.map((topic) => {
              const isActive = topic.id === activeTopicId;
              return (
                <button
                  key={topic.id}
                  type="button"
                  className={`webrtc-topic-card ${isActive ? 'webrtc-topic-active' : ''}`}
                  onClick={() => setActiveTopicId(topic.id)}
                >
                  <div className="topic-card-top font-mono">
                    <span className="topic-name">{topic.name}</span>
                    <span className="topic-rfc">{topic.rfc}</span>
                  </div>
                  <p className="topic-short">{topic.shortDesc}</p>
                </button>
              );
            })}
          </div>

          {/* Active Topic Detailed Notebook Card */}
          <div className="webrtc-notebook-frame tech-frame">
            <div className="tech-frame-header">
              <span className="font-mono">ENGINEERING NOTEBOOK // {activeTopic.rfc}</span>
              <span className="badge badge-cyan">{activeTopic.category}</span>
            </div>

            <div className="tech-frame-body notebook-body">
              <h3 className="notebook-title font-mono">{activeTopic.name}</h3>
              
              <div className="notebook-explanation">
                <p>{activeTopic.explanation}</p>
              </div>

              <div className="notebook-tip-box font-mono">
                <div className="tip-header">
                  <Terminal size={14} className="tip-icon" />
                  <span>PRODUCTION ENGINEERING LESSON:</span>
                </div>
                <p className="tip-text">{activeTopic.engineeringTip}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
