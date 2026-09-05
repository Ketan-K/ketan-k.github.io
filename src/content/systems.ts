import { SystemPrinciple } from '../types';

export const systemPrinciples: SystemPrinciple[] = [
  {
    id: 'design-for-failure',
    number: '01',
    title: 'Design for Failure',
    subtitle: 'Networks fail. Sockets drop. Services crash. Systems must degrade gracefully.',
    description:
      'Never assume network stability. Distributed and real-time systems must treat network drops, timeout cascades, and service crashes as routine operational states rather than edge-case exceptions. Build client-side queues, exponential jittered backoffs, and idempotent retry handlers into every connection.',
    diagram: `[Network Drop] ──> [Queue Local Operations]
                        │
                  [Exponential Backoff + Jitter]
                        │
                  [Auto-Reconnect Handshake]
                        │
                  [Replay Delta Log] ──> [State Synchronized]`,
    keyTakeaway: 'Resilience is not an afterthought; it is encoded in connection state machines and idempotent mutation contracts.'
  },
  {
    id: 'keep-state-intentional',
    number: '02',
    title: 'Keep State Intentional',
    subtitle: 'Not every state belongs in a database. Not every state belongs in the client.',
    description:
      'Distinguish clearly between durable source-of-truth state (PostgreSQL/Databases), fast ephemeral coordination state (Redis/Memory), and transient UI state (Client Component memory). Leaking transient presence into persistent storage creates database lock contention, while keeping critical state exclusively in client memory makes recovery impossible.',
    diagram: `[State Classification]
  ├── Ephemeral / Realtime ──> [Redis Keys with TTL / In-Memory PubSub]
  ├── Durable / Authoritative ──> [PostgreSQL / Relational DB]
  └── Transient / Reactive ──> [Client Signals / State Machine]`,
    keyTakeaway: 'Classify data lifespan before choosing storage. Ephemeral state must have strict TTL leases.'
  },
  {
    id: 'observe-what-matters',
    number: '03',
    title: 'Observe What Matters',
    subtitle: 'Averages lie. Measure p95/p99 latency, connection churn, and error budgets.',
    description:
      'Mean latency conceals catastrophic tail latency experienced by users on congested connections. Production observability requires tracing end-to-end request lifecycles, tracking WebSocket heartbeat misses, and monitoring p99 response times rather than relying on aggregate server CPU metrics.',
    diagram: `[Client Request / WS Event]
        │
        ├── Trace ID Tagged
        ├── Gateway Transit Time (p95 / p99)
        ├── DB / Cache Execution Profiling
        └── Client Render Time Telemetry`,
    keyTakeaway: 'Tail latency and packet drop rates dictate real-world user perception in real-time systems.'
  },
  {
    id: 'complexity-has-a-cost',
    number: '04',
    title: 'Complexity Has a Cost',
    subtitle: 'Introduce infrastructure because requirements demand it, not for aesthetic architecture.',
    description:
      'Every added microservice, message queue, or distributed coordinator introduces operational overhead, deployment synchronization hurdles, and failure boundaries. Default to well-structured monoliths and straightforward protocols until throughput or domain isolation strictly requires distributed boundaries.',
    diagram: `[Simplicity First]
  Single Clean Service + Redis
        │
        │ (Only split when bottleneck is proven)
        ▼
  Targeted Worker / Specialized Media SFU`,
    keyTakeaway: 'The most reliable piece of infrastructure is the one you never had to deploy or debug at 3 AM.'
  },
  {
    id: 'realtime-changes-the-rules',
    number: '05',
    title: 'Realtime Changes the Rules',
    subtitle: 'Latency and connectivity become direct product concerns, not background details.',
    description:
      'In traditional request-response systems, a 300ms delay is tolerable. In WebRTC voice/video and interactive collaborative canvases, 300ms causes conversational overlap and jarring desync. Engineering real-time systems requires strict bandwidth budgeting, delta compression, and optimistic client reconciliation.',
    diagram: `[User Action] ──> [Optimistic Local Apply (0ms)]
                           │
                  [Send Delta over WebSocket]
                           │
                  [Server Authoritative Validation]
                           │
                  [Confirm / Rollback Reconcile]`,
    keyTakeaway: 'Optimistic UI + authoritative server reconciliation is essential for instantaneous real-time interfaces.'
  }
];
