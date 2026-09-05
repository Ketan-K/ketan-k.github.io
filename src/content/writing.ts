import { EngineeringNote } from '../types';

export const engineeringNotes: EngineeringNote[] = [
  {
    id: 'webrtc-nat-traversal-ice',
    title: 'Demystifying WebRTC NAT Traversal: STUN, TURN, and Symmetric NATs',
    date: 'February 2026',
    readTime: '7 min read',
    summary:
      'Why 15% of peer connections fail STUN binding, how symmetric NATs allocate non-deterministic endpoint mappings, and how to architect cost-effective TURN relay fallbacks without incurring unnecessary relay bandwidth.',
    tags: ['WebRTC', 'Networking', 'NAT', 'ICE'],
    slug: 'webrtc-nat-traversal-ice'
  },
  {
    id: 'websocket-heartbeats-ghost-connections',
    title: 'Detecting Ghost WebSocket Connections: Heartbeats, TCP Keepalive & Zombie Pruning',
    date: 'January 2026',
    readTime: '6 min read',
    summary:
      'TCP half-open states can keep dead connections lingering on servers for hours. A breakdown of ping/pong protocol frames, client jittered reconnects, and ephemeral Redis presence leasing.',
    tags: ['WebSockets', 'Real-Time', 'Node.js', 'Distributed Systems'],
    slug: 'websocket-heartbeats-ghost-connections'
  },
  {
    id: 'streaming-llms-sse-vs-websockets',
    title: 'Streaming LLMs: Why Server-Sent Events (SSE) Beat WebSockets for Generative UI',
    date: 'November 2025',
    readTime: '5 min read',
    summary:
      'Comparing HTTP/2 multiplexed Server-Sent Events with WebSockets for LLM token streaming. Analyzing TTFT, proxy buffering traps (`X-Accel-Buffering`), and native browser reconnection semantics.',
    tags: ['AI / LLM', 'SSE', 'WebSockets', 'Frontend Architecture'],
    slug: 'streaming-llms-sse-vs-websockets'
  },
  {
    id: 'cache-stampede-singleflight',
    title: 'Defeating Cache Stampedes: Singleflight Request Coalescing in Node.js',
    date: 'September 2025',
    readTime: '5 min read',
    summary:
      'What happens when 500 concurrent requests miss an expired cache entry at the same millisecond? How to implement in-flight promise deduplication and probabilistic early cache refresh (XFetch).',
    tags: ['Backend', 'Caching', 'Redis', 'Performance'],
    slug: 'cache-stampede-singleflight'
  }
];
