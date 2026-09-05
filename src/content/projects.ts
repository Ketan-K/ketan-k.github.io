import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 'anymeeting-webrtc-conferencing',
    number: '01',
    title: 'Intermedia AnyMeeting — High-Scale WebRTC Video Conferencing',
    tagline: 'Production real-time communication platform serving ~20,000 daily active users with adaptive bitrate, ICE Restart, client-side ML video processing, and high connection resilience.',
    role: 'Senior Software Engineer',
    projectType: 'Production Enterprise System',
    clientOrContext: 'Spring Computing Technologies / Intermedia',
    technologies: ['TypeScript', 'WebRTC', 'Node.js', 'Google MediaPipe', 'Banuba SDK', 'FreeSWITCH', 'STUN/TURN', 'ICE Restart', 'getStats()'],
    problem:
      'Enterprise users across corporate firewalls, unstable networks, and varied endpoint environments experienced connection drops, peripheral hot-swapping stalls, and high server load during high-density multi-party video meetings.',
    architecture: {
      description:
        'Client-side media pipeline executing adaptive bitrate controls, client-side ML background segmentation, and hardware-accelerated video processing. Negotiates ICE restarts on network handovers with automatic TURN relay failovers.',
      diagram: `[Browser Client Media Pipeline] ──(WebRTC Media)──> [Selective Forwarding Unit]
             │                                                  │
    (Hardware Acceleration)                            (FreeSWITCH Recording)
             │                                                  │
   [Local GPU Backgrounds]                                      ▼
 (MediaPipe / Banuba WASM)                         [Composite Layout Renderer]
             │
      (ICE Restart Loop)
             ▼
 [STUN / TURN Relay Fallback]`,
      flow: {
        label: 'WEBRTC MEDIA & RESILIENCE PIPELINE',
        nodes: [
          { id: 'client', label: 'Browser Client Endpoint', note: 'Hardware capture & device management' },
          { id: 'ml-fx', label: 'Client GPU ML Segmentation', note: 'MediaPipe / Banuba WASM (<8ms)' },
          { id: 'ice-guard', label: 'ICE Restart State Machine', note: 'STUN / TURN relay fallback' },
          { id: 'sfu', label: 'Selective Forwarding Unit', note: 'Simulcast routing & adaptive bitrate' },
          { id: 'rec', label: 'FreeSWITCH Composite Recording', note: 'Dynamic audio/video tile layout' }
        ],
        edges: [
          ['client', 'ml-fx', 'Video capture'],
          ['ml-fx', 'ice-guard', 'Track processing'],
          ['ice-guard', 'sfu', 'SRTP / DTLS transport'],
          ['sfu', 'rec', 'RTP bridge']
        ]
      },
      highlights: [
        'Resilient ICE Restart state machine recovering dropped peer connections in <800ms',
        'Client-side ML virtual background segmentation via WebAssembly (Google MediaPipe & Banuba)',
        'Adaptive bitrate and substream selection driven by real-time getStats() RTCP telemetry',
        'Efficient client-side hardware offloading reducing server CPU overhead across diverse endpoints'
      ]
    },
    engineeringDecisions: [
      {
        title: 'State Machine Driven ICE Restart',
        description:
          'Constructed an automated ICE Restart state machine that detects TCP/UDP socket freezing via getStats() telemetry and renegotiates ICE candidates in background without terminating active audio/video tracks.'
      },
      {
        title: 'Adaptive Bitrate & Client Media Offloading',
        description:
          'Engineered client-side encoding controls and dynamic substream selection based on RTCP feedback, offloading intensive media processing and video effects to client hardware.'
      },
      {
        title: 'Hardware & Peripheral Hot-Swap Handler',
        description:
          'Built a fast device manager that listens to navigator.mediaDevices.ondevicechange events, gracefully transitioning audio/video streams to newly attached USB peripherals with zero stream recreation delay.'
      }
    ],
    challenges: [
      {
        title: 'Audio/Video Desync under High Jitter',
        description:
          'Network packet jitter caused occasional drift between audio and video frames. Resolved by fine-tuning jitter buffer playout targets and dynamically adjusting substream resolution when packet loss exceeded 8%.'
      },
      {
        title: 'FreeSWITCH Recording Layout Synchronization',
        description:
          'Meeting recordings occasionally had missing video tiles during mid-call renegotiations. Re-engineered FreeSWITCH recording layouts to dynamically listen for media state events and update canvas tiles in real time.'
      }
    ],
    whatILearned:
      'In high-scale enterprise WebRTC, real-world network resilience (ICE Restart, TURN relays, peripheral hot-swapping) and hardware heterogeneity matter just as much as server bandwidth capacity.'
  },
  {
    id: 'zultys-zac-unified-communications',
    number: '02',
    title: 'Zultys ZAC — Unified Communications & Janus Media Server',
    tagline: 'Enterprise telephony and business collaboration platform with horizontal Janus Media Server distribution, PBX call flows, and real-time state synchronization.',
    role: 'WebRTC & Full-Stack Developer',
    projectType: 'Production Enterprise System',
    clientOrContext: 'Spring Computing Technologies / Zultys',
    technologies: ['Angular', 'Node.js', 'TypeScript', 'Janus Media Server', 'WebSockets', 'SIP', 'Redis', 'RxJS', 'PBX'],
    problem:
      'Traditional enterprise PBX telephony hardware was siloed from browser clients. Scaling ad-hoc multi-party audio/video conferencing required horizontally distributing Janus media instances while keeping calling state in sync.',
    architecture: {
      description:
        'Angular web application connecting to a Node.js signaling and room management middleware that load-balances conference rooms across a distributed cluster of Janus Media Servers with Redis-backed state coordination.',
      diagram: `[Angular Web Client] ──(WSS Signaling)──> [Node.js Middleware Cluster]
             │                                          │
    (SIP / PBX Bridge)                         (Room Lifecycle / LB)
             │                                          │
             ▼                                          ▼
   [Enterprise PBX] ◄─── Call Control ────► [Janus Media Server Cluster]
(Park / Transfer / Bind)                     (SFU / Audio Mixing / Video)`,
      flow: {
        label: 'UNIFIED COMMUNICATIONS & JANUS TOPOLOGY',
        nodes: [
          { id: 'client', label: 'Angular Web Client', note: 'RxJS reactive streams & pre-call preview' },
          { id: 'middleware', label: 'Node.js Middleware Cluster', note: 'WebSocket signaling & room manager' },
          { id: 'redis-lock', label: 'Redis Distributed State', note: 'Park, transfer & device binding locks' },
          { id: 'janus-cluster', label: 'Janus Media Server Cluster', note: 'Horizontal SFU load distribution' },
          { id: 'pbx', label: 'Enterprise PBX Bridge', note: 'SIP telephony & call control' }
        ],
        edges: [
          ['client', 'middleware', 'WSS Signaling'],
          ['middleware', 'redis-lock', 'Atomic coordination'],
          ['middleware', 'janus-cluster', 'SFU room allocation'],
          ['janus-cluster', 'pbx', 'SIP audio gateway']
        ]
      },
      highlights: [
        'Horizontally scalable Node.js middleware managing Janus Media Server room lifecycles',
        'Integrated enterprise PBX features: Call Park, Call Transfer, Device Binding, and Presence',
        'Pre-call Video Preview Widget validating camera/microphone permissions and stream health',
        'State synchronization between Angular client and SIP signaling via RxJS streams'
      ]
    },
    engineeringDecisions: [
      {
        title: 'Janus Media Instance Load Distribution',
        description:
          'Implemented server-side load distribution across multiple Janus SFU instances based on active stream counts and CPU metrics, preventing single-node bottlenecks.'
      },
      {
        title: 'Pre-Flight Hardware Validation Widget',
        description:
          'Created a high-performance Angular video preview widget that verifies camera constraints, audio levels, and network connectivity before allowing users to join conference rooms.'
      }
    ],
    challenges: [
      {
        title: 'Call Parking & Device Binding State Desynchronization',
        description:
          'When users switched devices during active PBX calls, call states occasionally locked. Solved by introducing centralized Redis distributed locks and atomic state broadcast updates.'
      }
    ],
    whatILearned:
      'Bridging legacy enterprise PBX telephony protocols (SIP) with modern WebSockets and WebRTC requires strict isolation between media routing and signaling state machines.'
  },
  {
    id: 'nft-auction-realtime-engine',
    number: '03',
    title: 'NFT Marketplace & High-Concurrency Real-Time Auction Engine',
    tagline: 'Real-time bidding synchronization, modular Node.js backend architecture, and multi-currency cryptocurrency wallet transaction workflows.',
    role: 'Full-Stack Developer',
    projectType: 'Production Client Application',
    clientOrContext: 'Humation Limited',
    technologies: ['Node.js', 'Angular', 'MongoDB', 'Socket.io', 'JWT', 'Crypto Wallets (BTC, ETH, LTC)', 'REST APIs'],
    problem:
      'High-velocity bidding surges created database lock contention and race conditions where multiple bidders submitted identical bids within milliseconds.',
    architecture: {
      description:
        'Modular Node.js service architecture with Socket.io event buses for millisecond-latency bid broadcasting, backed by MongoDB atomic operations and multi-currency wallet integrations.',
      diagram: `[Bidding Client Fleet] ──(Socket.io)──> [Modular Node.js Gateway]
                                                  │
                                   ┌──────────────┴──────────────┐
                                   ▼                             ▼
                        [Atomic Bid Coordinator]      [Crypto Wallet Engine]
                          (MongoDB In-Memory)           (BTC / ETH / LTC APIs)
                                   │                             │
                                   └──────────────┬──────────────┘
                                                  ▼
                                        [Real-Time State Broadcast]`,
      flow: {
        label: 'REAL-TIME AUCTION & BIDDING PIPELINE',
        nodes: [
          { id: 'bidders', label: 'Bidding Client Fleet', note: 'High-concurrency browser clients' },
          { id: 'gateway', label: 'Socket.io Event Gateway', note: 'Sub-50ms fan-out & debouncing' },
          { id: 'coordinator', label: 'Atomic Bid Coordinator', note: 'Monotonic MongoDB sequence checks' },
          { id: 'wallets', label: 'Crypto Wallet Engine', note: 'BTC / ETH / LTC transaction locks' },
          { id: 'broadcast', label: 'Real-Time State Broadcast', note: 'Authoritative price state distribution' }
        ],
        edges: [
          ['bidders', 'gateway', 'Socket.io push'],
          ['gateway', 'coordinator', 'Atomic transaction'],
          ['coordinator', 'wallets', 'Balance verification'],
          ['coordinator', 'broadcast', 'Top-bid fanout']
        ]
      },
      highlights: [
        'Sub-50ms real-time auction synchronization across concurrent bidders',
        'Modularized legacy monolithic backend into clean domain-oriented services',
        'Secure multi-currency wallet deposit, balance locking, and withdrawal workflows',
        'Role-based JWT authentication and rate-limited transaction endpoints'
      ]
    },
    engineeringDecisions: [
      {
        title: 'Atomic Bid Serialization',
        description:
          'Enforced atomic conditional updates in MongoDB with monotonic bid sequence checks, ensuring that identical concurrent bids are deterministically ordered without double-acceptance.'
      }
    ],
    challenges: [
      {
        title: 'High-Concurrency Socket Fanout',
        description:
          'Broadcasting bid deltas to thousands of connected clients during final seconds of auctions created CPU spikes. Fixed by debouncing non-critical state updates and prioritizing top-bid broadcasts.'
      }
    ],
    whatILearned:
      'Real-time financial transactions require strict atomicity contracts. Socket delivery speed must be backed by deterministic backend state guards.'
  },
  {
    id: 'cloud-pos-reporting-server',
    number: '04',
    title: 'Cloud Point of Sale Ecosystem & Automated Analytics Server',
    tagline: 'End-to-end POS features, automated Excel/PDF sales reporting engine, licensing, and client onboarding workflows.',
    role: 'Associate Software Engineer',
    projectType: 'Production Backend Service',
    clientOrContext: 'OneGreenDiary Software Pvt. Ltd.',
    technologies: ['Angular', 'Node.js', 'Sails.js', 'MySQL', 'REST APIs', 'PDF/Excel Generators', 'HTML5/CSS3'],
    problem:
      'Enterprise retail clients needed high-throughput checkout processing alongside automated daily, weekly, and monthly consolidated sales analytics delivered in PDF and Excel formats.',
    architecture: {
      description:
        'Angular web POS interface integrated with a Sails.js / Node.js API server and dedicated background data aggregation workers generating scheduled reports from MySQL read tables.',
      diagram: `[Retail POS Client] ──(REST / JSON)──> [Sails.js API Layer]
                                             │
                              ┌──────────────┴──────────────┐
                              ▼                             ▼
                     [Checkout Transactions]       [Scheduled Reporting Server]
                          (MySQL ACID)              (Aggregation Worker Pool)
                                                            │
                                                            ▼
                                                   [Excel & PDF Generators]`,
      flow: {
        label: 'CLOUD POS & ASYNC REPORTING PIPELINE',
        nodes: [
          { id: 'pos', label: 'Retail POS Frontend', note: 'Angular checkout & offline caching' },
          { id: 'api', label: 'Sails.js API Layer', note: 'Low-latency checkout transactions' },
          { id: 'db', label: 'MySQL Primary Store', note: 'ACID transaction persistence' },
          { id: 'workers', label: 'Background Worker Pool', note: 'Decoupled data aggregation queues' },
          { id: 'export', label: 'Excel & PDF Generators', note: 'Streamed memory-safe reporting' }
        ],
        edges: [
          ['pos', 'api', 'REST JSON'],
          ['api', 'db', 'ACID commit'],
          ['db', 'workers', 'Async read replicas'],
          ['workers', 'export', 'Chunked streaming']
        ]
      },
      highlights: [
        'Automated background reporting server generating daily/weekly/monthly PDF & Excel sheets',
        'Licensing, feature toggles, client onboarding, and FAQ content management systems',
        'Low-latency checkout integration with synchronized client-server transaction records',
        'Optimized SQL queries and aggregation pipelines for rapid retail analytics retrieval'
      ]
    },
    engineeringDecisions: [
      {
        title: 'Asynchronous Batch Analytics Generation',
        description:
          'Decoupled computationally expensive Excel and PDF report generation into background worker queues, ensuring zero latency degradation for front-counter retail checkout transactions.'
      }
    ],
    challenges: [
      {
        title: 'Large Dataset Memory Spikes in PDF Generation',
        description:
          'Exporting multi-month transaction histories caused Node.js process memory spikes. Solved by streaming records through chunked transformers rather than buffering full datasets in memory.'
      }
    ],
    whatILearned:
      'Business-critical transactional systems require strict performance isolation between real-time operational flows (checkout) and asynchronous analytical workloads (reporting).'
  },
  {
    id: 'farmer-consumer-direct-marketplace',
    number: '05',
    title: 'Farmer-to-Consumer Direct Marketplace & Group Booking Engine',
    tagline: 'Mobile-first group booking platform connecting farmers directly to consumers with dynamic combo pricing and WhatsApp deep-linking.',
    role: 'Backend Developer',
    projectType: 'Production Backend Service',
    clientOrContext: 'Agricultural Direct Commerce Platform',
    technologies: ['Node.js', 'Express', 'MySQL', 'REST APIs', 'WhatsApp Integration', 'Data Modeling'],
    problem:
      'Smallholder farmers faced heavy distributor margins. Consumers needed an intuitive way to pool demand into group bookings for bulk fresh produce delivery.',
    architecture: {
      description:
        'Node.js REST backend orchestrating high-volume inventory and transaction models, area-based demand aggregation, dynamic combos, and WhatsApp sharing deep-links for viral community pooling.',
      diagram: `[Mobile Web Consumers] ──(Group Bookings)──> [Node.js Express API]
                                                 │
                                  ┌──────────────┴──────────────┐
                                  ▼                             ▼
                      [Area Demand Aggregator]       [WhatsApp Deep-Link Engine]
                        (Dynamic Combos / Pool)        (Viral Group Sharing)
                                  │                             │
                                  └──────────────┬──────────────┘
                                                 ▼
                                        [MySQL Order Engine]`,
      flow: {
        label: 'DIRECT MARKETPLACE & GROUP BOOKING PIPELINE',
        nodes: [
          { id: 'consumers', label: 'Mobile Web Consumers', note: 'Group booking & WhatsApp sharing' },
          { id: 'express-api', label: 'Node.js Express API', note: 'Area-based demand aggregation' },
          { id: 'inv-lock', label: 'Inventory Reservation Guard', note: 'Time-limited bulk allocation locks' },
          { id: 'db-orders', label: 'MySQL Order Engine', note: 'Transactional pool completion' }
        ],
        edges: [
          ['consumers', 'express-api', 'Group demand pooling'],
          ['express-api', 'inv-lock', 'Monotonic reservation'],
          ['inv-lock', 'db-orders', 'ACID order commit']
        ]
      },
      highlights: [
        'Dynamic combo management and automated demand pooling data models',
        'Area-based customer outreach and neighborhood drop-off coordination',
        'WhatsApp deep-linking integration to drive community group purchases',
        'High-volume transactional data models with inventory reservation locks'
      ]
    },
    engineeringDecisions: [
      {
        title: 'Time-Limited Inventory Reservation Locks',
        description:
          'Built temporary inventory reservation locks during group-booking formation to prevent inventory over-allocation while consumers pooled orders.'
      }
    ],
    challenges: [
      {
        title: 'Concurrent Group-Booking Expiry Sync',
        description:
          'Handling sudden demand pool expiration across multiple neighborhoods required reliable cron dispatchers with transactional MySQL status updates.'
      }
    ],
    whatILearned:
      'Designing consumer marketplaces requires balancing flexible dynamic business models with bulletproof database inventory locking.'
  }
];
