import { SystemPrinciple } from '../types';

export const systemPrinciples: SystemPrinciple[] = [
  {
    id: 'design-for-failure',
    number: '01',
    title: 'Design for Failure',
    subtitle: 'Networks fail. Sockets drop. Services crash. Systems must degrade gracefully.',
    description:
      'Never assume network stability. Distributed and real-time systems must treat network drops, timeout cascades, and service crashes as routine operational states rather than edge-case exceptions. Build client-side queues, exponential jittered backoffs, and idempotent retry handlers into every connection.',
    grounding: {
      roleContext: 'Senior Software Engineer @ Spring Computing Technologies',
      projectSlug: 'anymeeting-webrtc-conferencing',
      projectTitle: 'Intermedia AnyMeeting (~20,000 DAU)',
      systemDeepDiveUrl: '/systems/webrtc',
      systemDeepDiveLabel: 'WebRTC Resilience & ICE Restart Simulator',
      technologies: ['WebRTC', 'ICE Restart', 'STUN/TURN', 'getStats()', 'TypeScript'],
      concreteApplication:
        'Architected an automated ICE Restart state machine in AnyMeeting that detects socket freezes via getStats() telemetry and negotiates background candidate gathering and TURN relay failovers in <800ms without dropping active audio/video tracks.'
    },
    flow: {
      nodes: [
        { id: 'drop', label: 'Network Drop' },
        { id: 'queue', label: 'Queue Local Operations' },
        { id: 'backoff', label: 'Exponential Backoff + Jitter' },
        { id: 'reconnect', label: 'Auto-Reconnect Handshake' },
        { id: 'replay', label: 'Replay Delta Log' },
        { id: 'sync', label: 'State Synchronized' }
      ],
      edges: [
        ['drop', 'queue'],
        ['queue', 'backoff'],
        ['backoff', 'reconnect'],
        ['reconnect', 'replay'],
        ['replay', 'sync']
      ]
    },
    keyTakeaway: 'Resilience is not an afterthought; it is encoded in connection state machines and idempotent mutation contracts.'
  },
  {
    id: 'keep-state-intentional',
    number: '02',
    title: 'Keep State Intentional',
    subtitle: 'Not every state belongs in a database. Not every state belongs in the client.',
    description:
      'Distinguish clearly between durable source-of-truth state (PostgreSQL/Databases), fast ephemeral coordination state (Redis/Memory), and transient UI state (Client Component memory). Leaking transient presence into persistent storage creates database lock contention, while keeping critical state exclusively in client memory makes recovery impossible.',
    grounding: {
      roleContext: 'Software Engineer @ Spring Computing Technologies',
      projectSlug: 'zultys-zac-unified-communications',
      projectTitle: 'Zultys ZAC Unified Communications',
      systemDeepDiveUrl: '/systems/full-stack',
      systemDeepDiveLabel: 'Multi-Tier State & Redis Event Stream',
      technologies: ['Redis', 'RxJS', 'Node.js', 'SIP', 'PostgreSQL'],
      concreteApplication:
        'Isolated ephemeral PBX call parking, presence tracking, and device binding states into Redis with strict TTL leases and distributed locks, ensuring zero database lock contention while Angular clients synced state via RxJS streams.'
    },
    flow: {
      nodes: [
        { id: 'classification', label: 'State Classification' },
        { id: 'ephemeral', label: 'Ephemeral / Realtime', note: 'Redis Keys with TTL / In-Memory PubSub' },
        { id: 'durable', label: 'Durable / Authoritative', note: 'PostgreSQL / Relational DB' },
        { id: 'transient', label: 'Transient / Reactive', note: 'Client Signals / State Machine' }
      ],
      edges: [
        ['classification', 'ephemeral'],
        ['classification', 'durable'],
        ['classification', 'transient']
      ]
    },
    keyTakeaway: 'Classify data lifespan before choosing storage. Ephemeral state must have strict TTL leases.'
  },
  {
    id: 'observe-what-matters',
    number: '03',
    title: 'Observe What Matters',
    subtitle: 'Averages lie. Measure p95/p99 latency, connection churn, and error budgets.',
    description:
      'Mean latency conceals catastrophic tail latency experienced by users on congested connections. Production observability requires tracing end-to-end request lifecycles, tracking WebSocket heartbeat misses, and monitoring p99 response times rather than relying on aggregate server CPU metrics.',
    grounding: {
      roleContext: 'Senior Software Engineer @ Spring Computing Technologies',
      projectSlug: 'anymeeting-webrtc-conferencing',
      projectTitle: 'Intermedia AnyMeeting & FreeSWITCH Recording Layouts',
      systemDeepDiveUrl: '/systems/webrtc',
      systemDeepDiveLabel: 'Packet Loss & Jitter Recovery Diagnostics',
      technologies: ['getStats()', 'FreeSWITCH', 'RTCP Telemetry', 'WebRTC', 'Node.js'],
      concreteApplication:
        'Diagnosed real-world audio/video desync and packet loss spikes in multi-party meetings by hooking into client-side getStats() RTCP feedback, adjusting jitter buffer playout targets dynamically rather than relying on server-side utilization averages.'
    },
    flow: {
      nodes: [
        { id: 'request', label: 'Client Request / WS Event' },
        { id: 'trace', label: 'Trace ID Tagged', note: 'Distributed context propagated on ingress' },
        { id: 'gateway', label: 'Gateway Transit Time', note: 'p95 / p99 ingress & TLS termination timing' },
        { id: 'profiling', label: 'DB / Cache Profiling', note: 'L1/L2 cache hit vs storage serialization' },
        { id: 'client-sla', label: 'Client Render Time', note: 'End-to-end user-perceived SLA trace' }
      ],
      edges: [
        ['request', 'trace'],
        ['trace', 'gateway'],
        ['gateway', 'profiling'],
        ['profiling', 'client-sla']
      ]
    },
    keyTakeaway: 'Tail latency and packet drop rates dictate real-world user perception in real-time systems.'
  },
  {
    id: 'complexity-has-a-cost',
    number: '04',
    title: 'Complexity Has a Cost',
    subtitle: 'Introduce infrastructure because requirements demand it, not for aesthetic architecture.',
    description:
      'Every added microservice, message queue, or distributed coordinator introduces operational overhead, deployment synchronization hurdles, and failure boundaries. Default to well-structured monoliths and straightforward protocols until throughput or domain isolation strictly requires distributed boundaries.',
    grounding: {
      roleContext: 'Associate Software Engineer @ Humation & OneGreenDiary',
      projectSlug: 'cloud-pos-reporting-server',
      projectTitle: 'Cloud POS Reporting Server & NFT Auction Backend',
      systemDeepDiveUrl: '/systems/full-stack',
      systemDeepDiveLabel: 'Microservices & Database Connection Pooling',
      technologies: ['Node.js', 'MongoDB', 'Sails.js', 'MySQL', 'Worker Queues'],
      concreteApplication:
        'Refactored legacy architectures into clean domain-oriented Node.js services without premature distributed orchestration, isolating heavy PDF/Excel reporting into lean background worker pools while keeping front-counter POS checkout paths lightning-fast.'
    },
    flow: {
      nodes: [
        { id: 'service', label: 'Single Clean Service + Redis', note: 'Default architecture' },
        { id: 'specialized', label: 'Targeted Worker / Media SFU', note: 'Isolated failure boundary' }
      ],
      edges: [
        ['service', 'specialized', 'Only split when bottleneck is proven']
      ]
    },
    keyTakeaway: 'The most reliable piece of infrastructure is the one you never had to deploy or debug at 3 AM.'
  },
  {
    id: 'realtime-changes-the-rules',
    number: '05',
    title: 'Realtime Changes the Rules',
    subtitle: 'Latency and connectivity become direct product concerns, not background details.',
    description:
      'In traditional request-response systems, a 300ms delay is tolerable. In WebRTC voice/video and interactive collaborative canvases, 300ms causes conversational overlap and jarring desync. Engineering real-time systems requires strict bandwidth budgeting, delta compression, and optimistic client reconciliation.',
    grounding: {
      roleContext: 'Senior Software Engineer @ Spring Computing Technologies',
      projectSlug: 'anymeeting-webrtc-conferencing',
      projectTitle: 'Intermedia AnyMeeting (~20,000 DAU)',
      systemDeepDiveUrl: '/systems/webrtc',
      systemDeepDiveLabel: 'Sub-100ms WebRTC Media Architecture & SFU Topology',
      technologies: ['WebRTC', 'Adaptive Bitrate', 'MediaPipe', 'Socket.io', 'TypeScript'],
      concreteApplication:
        'Architected client-side WebRTC media processing and adaptive bitrate controls in AnyMeeting, balancing encoding parameters and frame rates against real-time network feedback to maintain glass-to-glass latency strictly within conversational budgets (<150ms).'
    },
    flow: {
      nodes: [
        { id: 'action', label: 'User Action' },
        { id: 'optimistic', label: 'Optimistic Local Apply (0ms)' },
        { id: 'ws', label: 'Send Delta over WebSocket' },
        { id: 'validation', label: 'Server Authoritative Validation' },
        { id: 'reconcile', label: 'Confirm / Rollback Reconcile' }
      ],
      edges: [
        ['action', 'optimistic'],
        ['optimistic', 'ws'],
        ['ws', 'validation'],
        ['validation', 'reconcile']
      ]
    },
    keyTakeaway: 'Optimistic UI + authoritative server reconciliation is essential for instantaneous real-time interfaces.'
  }
];
