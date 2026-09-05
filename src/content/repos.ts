import { GitHubRepo } from '../types';

export const selectedRepos: GitHubRepo[] = [
  {
    name: 'webrtc-sfu-mesh-gateway',
    description: 'A TypeScript & Node.js real-time media gateway with dynamic P2P/SFU switching, ICE trickle signaling, and RTCP bandwidth adaptation.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    status: 'Active',
    url: 'https://github.com/ketan-k',
    tags: ['WebRTC', 'Node.js', 'WebSockets', 'SFU', 'Redis']
  },
  {
    name: 'realtime-presence-cluster',
    description: 'Horizontally scalable WebSocket cluster with Redis Pub/Sub backplane, 100ms presence delta batching, and heartbeat liveness pruning.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    status: 'Active',
    url: 'https://github.com/ketan-k',
    tags: ['WebSockets', 'Redis', 'Distributed Systems', 'Cluster']
  },
  {
    name: 'streaming-llm-token-profiler',
    description: 'Lightweight client-side telemetry tool measuring Time-to-First-Token (TTFT), token generation velocity, and chunk jitter for AI streams.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    status: 'Active',
    url: 'https://github.com/ketan-k',
    tags: ['AI / LLM', 'SSE', 'Telemetry', 'React']
  },
  {
    name: 'singleflight-cache-router',
    description: 'In-process request deduplication (singleflight) and tiered L1 (LRU) / L2 (Redis) caching library for Node.js API services.',
    language: 'TypeScript',
    languageColor: '#3178c6',
    status: 'Maintained',
    url: 'https://github.com/ketan-k',
    tags: ['Backend', 'Caching', 'Redis', 'Performance']
  }
];
