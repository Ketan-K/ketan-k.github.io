import { TechStackCategory } from '../types';

export const techStackCategories: TechStackCategory[] = [
  {
    category: 'LANGUAGES',
    description: 'Strongly typed and modern JavaScript ecosystems.',
    items: [
      { name: 'TypeScript', context: 'Primary language across frontend, backend, and distributed services.' },
      { name: 'JavaScript (ESNext)', context: 'Deep knowledge of event loop, microtasks, Web Workers, and DOM engines.' },
      { name: 'SQL', context: 'Relational query optimization, indexing strategies, transactions, and migrations.' },
      { name: 'HTML5 / CSS3', context: 'Semantic markup, accessibility (ARIA), modern CSS layouts, responsive architecture.' }
    ]
  },
  {
    category: 'REALTIME & NETWORKING',
    description: 'Core specialty in low-latency communication and protocols.',
    items: [
      { name: 'WebRTC', context: 'Signaling, ICE/STUN/TURN, RTCPeerConnection, DataChannels, media tracks, SFU basics.' },
      { name: 'WebSockets (ws)', context: 'High-concurrency servers, heartbeat liveness, protocol framing, multiplexing.' },
      { name: 'Server-Sent Events', context: 'Progressive token streaming, HTTP/2 multiplexing, auto-reconnection.' },
      { name: 'TCP / UDP / HTTP/2 / HTTP/3', context: 'Transport characteristics, congestion control, packet loss recovery.' }
    ]
  },
  {
    category: 'FRONTEND',
    description: 'Component architecture, state machines, and modern rendering.',
    items: [
      { name: 'React 19 / 18', context: 'Concurrent rendering, custom hooks, context architecture, optimistic mutations.' },
      { name: 'Vite / Build Tooling', context: 'ESM bundling, tree-shaking, code-splitting, asset optimization.' },
      { name: 'Modern CSS & Systems', context: 'Design tokens, CSS variables, container queries, CSS modules, minimal overhead.' },
      { name: 'Browser Performance', context: 'Core Web Vitals, memory profiling, frame rate budgeting, layout shift prevention.' }
    ]
  },
  {
    category: 'BACKEND & SERVERS',
    description: 'Scalable service architectures, API design, and asynchronous workers.',
    items: [
      { name: 'Node.js', context: 'Event loop tuning, stream pipelines, worker threads, async I/O.' },
      { name: 'Express / Fastify', context: 'High-throughput REST APIs, middleware pipelines, error handling.' },
      { name: 'API Gateway Design', context: 'Authentication, rate limiting, request validation, CORS, reverse proxying.' },
      { name: 'Async Task Queues', context: 'Job workers, retry policies, backpressure handling, DLQs.' }
    ]
  },
  {
    category: 'DATA & STORAGE',
    description: 'Durable and ephemeral state storage layers.',
    items: [
      { name: 'Redis', context: 'Pub/Sub, in-memory caching, TTL key leases, distributed locks, presence sets.' },
      { name: 'PostgreSQL', context: 'Relational schema design, ACID transactions, indexing, query profiling.' },
      { name: 'Tiered Caching', context: 'In-memory LRU L1, Redis L2, singleflight coalescing, cache stampede mitigation.' }
    ]
  },
  {
    category: 'AI & LLM SYSTEMS',
    description: 'Real-time integrations, streaming pipelines, and tool orchestration.',
    items: [
      { name: 'LLM Streaming APIs', context: 'Chunked SSE consumption, sub-200ms TTFT pipelines, client telemetry.' },
      { name: 'Function / Tool Calling', context: 'Structured JSON schema enforcement, incremental stream parsing, sandboxing.' },
      { name: 'Local Models & RAG', context: 'Ollama, vector embeddings, chunking strategies, retrieval evaluation.' }
    ]
  },
  {
    category: 'INFRASTRUCTURE & DEV',
    description: 'Containerization, CI/CD, and developer workflows.',
    items: [
      { name: 'Docker', context: 'Multi-stage container builds, local orchestration, service isolation.' },
      { name: 'Git & GitHub Actions', context: 'Automated CI/CD pipelines, release management, code review workflows.' },
      { name: 'Observability & Debugging', context: 'Structured JSON logging, telemetry tracing, Chrome DevTools, Wireshark.' }
    ]
  }
];
