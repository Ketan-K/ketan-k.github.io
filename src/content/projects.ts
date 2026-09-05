import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'webrtc-sfu-mesh',
    number: '01',
    title: 'Real-Time WebRTC Media Gateway & Collaboration Engine',
    tagline: 'A low-latency media and signaling topology supporting selective forwarding, dynamic bitrate adaptation, and ephemeral room state.',
    role: 'Full-Stack Architecture & Real-Time Engineering',
    technologies: ['TypeScript', 'WebRTC', 'Node.js', 'WebSockets', 'Redis', 'React'],
    githubUrl: 'https://github.com/ketan-k',
    problem:
      'Full-mesh WebRTC degrades exponentially (O(N²) uplink/downlink) beyond 4 peers. Scaling to larger group sessions with disparate network conditions required an architecture that dynamically transitions between direct P2P mesh and selective forwarding while handling renegotiations seamlessly.',
    architecture: {
      description:
        'Client connects via WebSocket to a Node.js signaling cluster backed by Redis pub/sub for room discovery and ICE exchange. Media streams negotiate STUN/TURN for NAT traversal with fallback to a Selective Forwarding Unit (SFU) for multi-party bandwidth optimization.',
      diagram: `[Browser Peer A] ──(WS Signaling)──> [Signaling Cluster] ──(Pub/Sub)──> [Redis Room State]
       │                                     │
  (ICE / STUN / TURN)               (Session Coordination)
       │                                     │
       ▼                                     ▼
[WebRTC Peer-to-Peer] <───── fallback ─────> [Selective Forwarding Unit (SFU)]
       │                                     │
[Browser Peer B] <───────────────────────────┘`,
      highlights: [
        'Dynamic topology transition (P2P mesh under 4 peers → SFU routing for 4+)',
        'Signaling decoupled from media routing via Redis Pub/Sub backplane',
        'Asymmetric ICE candidate trickle handling to eliminate connection stalls',
        'Client-side RTCP receiver report parsing for adaptive bitrate hinting'
      ]
    },
    engineeringDecisions: [
      {
        title: 'Trickle ICE with Candidate Bundling',
        description:
          'Sent ICE candidates incrementally over WebSocket signaling rather than waiting for complete gathering, reducing initial time-to-first-frame by ~65% across cellular and restricted NAT connections.'
      },
      {
        title: 'Redis Pub/Sub Room State with Ephemeral Leases',
        description:
          'Represented active participants as key-value pairs with rolling 15s TTLs refreshed via WebSocket ping-pongs, eliminating zombie participants on unexpected socket disconnects without complex distributed consensus.'
      },
      {
        title: 'Client-Side RTCP Bandwidth Probing',
        description:
          'Monitored round-trip time (RTT) and packet loss via standard getStats() APIs to gracefully step down stream resolution before TCP/UDP congestion caused video freezing.'
      }
    ],
    challenges: [
      {
        title: 'Symmetric NAT Traversal & STUN Failures',
        description:
          'Enterprise firewalls with symmetric NAT assign random ports per destination. Handled by establishing automatic TURN relay fallbacks and prioritizing relay candidates when initial STUN binding requests timed out after 400ms.'
      },
      {
        title: 'Signaling Race Conditions During Glare',
        description:
          'When both peers initiate renegotiation simultaneously (glare), offers collided. Resolved using the "Perfect Negotiation" pattern with polite/impolite peer role assignment.'
      }
    ],
    whatILearned:
      'Real-time networking is fundamentally about state synchronization under unpredictable latency and packet loss. Handling edge-case state machine transitions (disconnects, renegotiation glare, NAT timeouts) is 80% of the engineering effort.'
  },
  {
    id: 'event-streaming-presence',
    number: '02',
    title: 'Distributed Event Streaming & Real-Time Presence Server',
    tagline: 'High-concurrency WebSocket cluster with Redis cluster pub/sub, heartbeat monitoring, and distributed user presence tracking.',
    role: 'Backend & Distributed Systems Design',
    technologies: ['Node.js', 'TypeScript', 'WebSockets', 'Redis Streams', 'Docker', 'React'],
    githubUrl: 'https://github.com/ketan-k',
    problem:
      'Single-node WebSocket servers cannot scale horizontally without shared state, while broadcasting global presence updates across thousands of concurrent clients risks generating an O(N) message storm that exhausts CPU and network bandwidth.',
    architecture: {
      description:
        'Stateless Node.js WebSocket gateway instances behind an L4/L7 load balancer with sticky sessions. Ephemeral presence is stored in Redis Hashes with delta broadcasts batched into 100ms throttle windows.',
      diagram: `[Client Fleet] ──(WSS with TLS)──> [Reverse Proxy / LB]
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
     [WS Gateway Node 1]                             [WS Gateway Node 2]
                  │                                               │
                  └───────────────> [Redis Cluster] <─────────────┘
                                  (Streams + Hashes)
                                          │
                                  [Worker Service]
                             (Batch Presence Deltas)`,
      highlights: [
        'Stateless WebSocket gateways allowing zero-downtime rolling deploys',
        '100ms delta-batching engine to turn O(N²) presence broadcasts into O(N) compressed updates',
        'Custom binary/JSON packet serializer with schema validation',
        'Automated zombie connection termination using synchronized heartbeat ticks'
      ]
    },
    engineeringDecisions: [
      {
        title: 'Throttled Delta Broadcasts over Full State Sync',
        description:
          'Instead of publishing full room participant rosters on every join/leave, the server collects presence changes into 100ms buckets and emits delta patches, reducing network egress by over 80% during surge events.'
      },
      {
        title: 'Liveness Heartbeats with Grace Periods',
        description:
          'Implemented server-initiated ping intervals (25s) with a 5s grace period. Sockets missing consecutive pongs are pruned and evicted from Redis immediately to prevent ghost presences.'
      }
    ],
    challenges: [
      {
        title: 'Connection Thundering Herd on Server Restart',
        description:
          'When an instance restarted, thousands of clients attempted instant reconnection, overwhelming the server. Fixed by enforcing client-side exponential backoff with full jitter.'
      }
    ],
    whatILearned:
      'At high concurrency, broadcast volume is the primary bottleneck. Batching, delta compression, and disciplined connection throttling protect infrastructure far better than just scaling instances.'
  },
  {
    id: 'ai-streaming-tool-gateway',
    number: '03',
    title: 'Autonomous AI Tool Execution & Streaming Proxy',
    tagline: 'An end-to-end streaming gateway connecting browser clients to LLMs with real-time token streaming, function calling sandboxes, and latency profiling.',
    role: 'Full-Stack & AI Systems Engineering',
    technologies: ['TypeScript', 'Node.js', 'Server-Sent Events', 'React', 'OpenAI/Anthropic API', 'Vite'],
    githubUrl: 'https://github.com/ketan-k',
    problem:
      'Standard HTTP request-response patterns result in high perceived latency when waiting for LLM completions and structured function executions. Users need instant visual feedback with progressive token delivery, tool invocation transparency, and resilient error recovery.',
    architecture: {
      description:
        'Browser opens a Server-Sent Events (SSE) or WebSocket stream to a Node.js streaming proxy. The proxy negotiates chunked transfer with the model provider, yields tokens progressively, intercepts function calls, runs sandboxed validation, and resumes generation.',
      diagram: `[Browser Client] ──(SSE / Fetch Stream)──> [Streaming Gateway]
                                                    │
                                  ┌─────────────────┴─────────────────┐
                                  ▼                                   ▼
                        [LLM Provider Stream]               [Tool Sandbox Runner]
                        (Chunked SSE / Delta)               (Validated Exec)
                                  │                                   │
                                  └───────────────┬───────────────────┘
                                                  ▼
                                       [Progressive Token Yield]
                                                  ▼
                                      [Interactive Stream UI]`,
      highlights: [
        'Sub-200ms Time-to-First-Token (TTFT) through immediate header flushing',
        'Streaming JSON parser capable of extracting structured tool arguments in-flight',
        'Telemetry pipeline tracking TTFT, tokens/sec, and token consumption in real time',
        'Automatic retry with exponential backoff on provider rate limits without dropping connection'
      ]
    },
    engineeringDecisions: [
      {
        title: 'Server-Sent Events (SSE) vs WebSockets for Monodirectional Streams',
        description:
          'Chose SSE with HTTP/2 multiplexing for generation streams because it provides native browser auto-reconnect, zero binary framing overhead, and seamless CDN/proxy compatibility.'
      },
      {
        title: 'Progressive Incremental JSON Token Extraction',
        description:
          'Constructed a resilient token accumulator that parses partial JSON payloads during tool calls, allowing the UI to render tool arguments (e.g. searching, executing) before completion.'
      }
    ],
    challenges: [
      {
        title: 'Buffer Truncation & Stream Stalls',
        description:
          'Network buffers between reverse proxies and clients occasionally held chunks until buffer filled. Resolved by explicitly setting `X-Accel-Buffering: no` and disabling gzip on streaming endpoints.'
      }
    ],
    whatILearned:
      'AI UX is fundamentally a streaming systems problem. Perceived responsiveness depends far more on Time-to-First-Token and smooth visual progress than total generation duration.'
  },
  {
    id: 'high-throughput-cache-api',
    number: '04',
    title: 'Multi-Tier Edge Cache & High-Throughput API Gateway',
    tagline: 'Tiered caching architecture combining in-memory L1 cache, Redis L2, and database query optimization with stampede protection.',
    role: 'Backend Engineering & Performance Optimization',
    technologies: ['TypeScript', 'Node.js', 'Redis', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/ketan-k',
    problem:
      'High-read traffic spikes on product metadata endpoints generated database lock contention and cache stampedes (dog-piling) when popular cache entries expired simultaneously.',
    architecture: {
      description:
        'Two-tier caching strategy: ultra-fast in-process LRU cache (L1, ~0.1ms) backed by distributed Redis (L2, ~2-4ms) and PostgreSQL with read-replicas. Employs singleflight request coalescing to prevent stampedes.',
      diagram: `[Incoming Request] ──> [API Gateway]
                              │
                    ┌─────────┴─────────┐
             [L1 Memory Cache]     (Miss)
                    │                   ▼
                 (Hit ~0.1ms)    [L2 Redis Cache]
                                        │
                                 ┌──────┴──────┐
                            (Hit ~3ms)      (Miss)
                                               ▼
                                    [Singleflight Lock]
                                               ▼
                                    [PostgreSQL Primary/Replica] (~40ms)`,
      highlights: [
        'Singleflight request coalescing (1 DB hit for 500 concurrent misses on same key)',
        'Probabilistic early expiration (XFetch algorithm) to refresh cache before expiry',
        'Tiered TTLs (L1: 15s, L2: 10min) to balance freshness with cluster memory limits',
        'Structured telemetry logging hit/miss ratios and p99 query latency'
      ]
    },
    engineeringDecisions: [
      {
        title: 'Singleflight Promise Deduplication',
        description:
          'Grouped identical in-flight cache misses onto a single shared database query promise, completely preventing database connection pool exhaustion during sudden cache invalidations.'
      },
      {
        title: 'Probabilistic Cache Refresh (XFetch)',
        description:
          'Recomputed cache entries ahead of time based on access frequency and compute cost, reducing p99 latency spikes during cache churn.'
      }
    ],
    challenges: [
      {
        title: 'Cache Invalidation Race Conditions',
        description:
          'Concurrent writes could cause stale cache writes after DB update. Solved by invalidating cache keys in transactional post-commit hooks and employing short TTL safety nets.'
      }
    ],
    whatILearned:
      'Caching without stampede protection is a liability under production spikes. Proper tiered caching requires explicit concurrency locks and probabilistic pre-fetching.'
  }
];
