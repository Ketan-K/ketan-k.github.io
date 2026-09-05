import { TechStackCategory } from '../types';

export const techStackCategories: TechStackCategory[] = [
  {
    category: 'LANGUAGES',
    description: 'Strongly typed and modern JavaScript ecosystems used across production applications.',
    items: [
      {
        name: 'TypeScript',
        context: 'Primary language across enterprise WebRTC clients, Node.js backend services, and interactive frontend systems.',
        usedIn: ['Intermedia AnyMeeting', 'Spring Computing Technologies', 'AI Streaming Profiler', 'Janus Middleware'],
        experienceYears: '4+ Years'
      },
      {
        name: 'JavaScript (ES6+)',
        context: 'Deep expertise in asynchronous programming, event loop mechanics, Web Workers, and DOM engine performance.',
        usedIn: ['Spring Computing', 'Humation Limited', 'OneGreenDiary', 'Core Real-Time Systems'],
        experienceYears: '6+ Years'
      },
      {
        name: 'HTML5 & CSS3 (SASS / LESS)',
        context: 'Modern CSS layouts, design tokens, accessible ARIA components, responsive viewport architectures.',
        usedIn: ['Enterprise Telephony UI', 'Cloud POS Frontend', 'AnyMeeting Video Controls'],
        experienceYears: '6+ Years'
      }
    ]
  },
  {
    category: 'REAL-TIME & COMMUNICATIONS',
    description: 'Core engineering specialty in media streaming, signaling, and protocol design.',
    items: [
      {
        name: 'WebRTC',
        context: 'RTCPeerConnection, ICE Restart, SDP offer/answer negotiation, MediaStreams, device management, getStats() telemetry.',
        usedIn: ['Intermedia AnyMeeting', 'Zultys ZAC', 'Interactive WebRTC Demos'],
        experienceYears: '5+ Years'
      },
      {
        name: 'Media Servers (Janus, SFU / MCU)',
        context: 'Room lifecycle management, horizontal media cluster load distribution, selective forwarding, and audio mixing.',
        usedIn: ['Zultys UC Telephony', 'Janus Middleware Engine'],
        experienceYears: '3+ Years'
      },
      {
        name: 'WebSockets & Socket.io',
        context: 'High-concurrency bidirectional messaging, heartbeat keepalives, real-time presence tracking, and auction synchronization.',
        usedIn: ['Spring Computing UC', 'Humation NFT Auction Engine', 'Realtime Event Bus Demo'],
        experienceYears: '5+ Years'
      },
      {
        name: 'Networking Protocols (SIP, RTP/RTCP, STUN/TURN, ICE, TCP/UDP)',
        context: 'Enterprise PBX SIP bridges, SRTP encryption, NAT hole punching, TURN relay fallbacks, jitter analysis.',
        usedIn: ['Intermedia AnyMeeting', 'Zultys PBX Integration', 'WebRTC Protocol Map'],
        experienceYears: '5+ Years'
      }
    ]
  },
  {
    category: 'FRONTEND FRAMEWORKS & STATE',
    description: 'Modern component architectures, reactive streams, and state synchronization.',
    items: [
      {
        name: 'Angular & RxJS',
        context: 'Enterprise single-page application architectures, observable streams, state synchronization with real-time backends.',
        usedIn: ['Zultys ZAC Unified Communications', 'Cloud POS Ecosystem', 'NFT Bidding Platform'],
        experienceYears: '4+ Years'
      },
      {
        name: 'React & Next.js',
        context: 'Concurrent rendering, modern hooks, Vite tooling, optimistic UI state machines, and streaming interfaces.',
        usedIn: ['Personal Portfolio', 'AI Systems Lab', 'Client Real-Time Interfaces'],
        experienceYears: '3+ Years'
      },
      {
        name: 'State Management & Synchronization',
        context: 'RxJS BehaviorSubjects, optimistic mutations, client-side delta buffering, and real-time state reconciliation.',
        usedIn: ['AnyMeeting Device State', 'Zultys PBX Calling State', 'Failure Resilience State Machine'],
        experienceYears: '5+ Years'
      }
    ]
  },
  {
    category: 'BACKEND & MICROSERVICES',
    description: 'Scalable service architectures, API gateway design, and enterprise middleware.',
    items: [
      {
        name: 'Node.js (Express.js, Sails.js)',
        context: 'High-throughput REST APIs, asynchronous stream pipelines, media middleware, microservices architecture.',
        usedIn: ['Spring Computing Technologies', 'Humation Limited', 'OneGreenDiary', 'Farmer Marketplace'],
        experienceYears: '6+ Years'
      },
      {
        name: 'REST APIs & Microservices',
        context: 'Domain-driven service boundaries, rate-limiting gateways, JWT/OAuth2 authentication, CORS, and request schemas.',
        usedIn: ['Cloud POS APIs', 'Humation Financial Services', 'Janus Room Management'],
        experienceYears: '6+ Years'
      },
      {
        name: 'Security & Auth (JWT, OAuth2)',
        context: 'Stateless cryptographically signed tokens, refresh token rotation with breach revocation, role-based access control.',
        usedIn: ['Enterprise Calling Auth', 'NFT Wallet Gateways', 'API Gateway Blueprints'],
        experienceYears: '5+ Years'
      }
    ]
  },
  {
    category: 'MEDIA, SDKs & VIDEO ML',
    description: 'Client-side hardware acceleration, VDI offloading, and video processing SDKs.',
    items: [
      {
        name: 'Citrix Workspace SDK',
        context: 'Offloaded WebRTC media encoding, decoding, and capture directly to local endpoint hardware in virtualized environments.',
        usedIn: ['Intermedia AnyMeeting (VDI Media Strategy)'],
        experienceYears: '2+ Years'
      },
      {
        name: 'Google MediaPipe & Banuba SDK',
        context: 'Client-side ML-powered virtual backgrounds, portrait segmentation, and real-time WebAssembly video effects.',
        usedIn: ['Intermedia AnyMeeting (Client-Side Video FX)'],
        experienceYears: '2+ Years'
      },
      {
        name: 'FreeSWITCH Recording Layouts',
        context: 'Dynamic audio/video mixing, recording layout synchronization, and composite video tile management during live calls.',
        usedIn: ['Intermedia AnyMeeting (Cloud Call Recording)'],
        experienceYears: '2+ Years'
      }
    ]
  },
  {
    category: 'DATABASES & DATA PIPELINES',
    description: 'Relational, in-memory, and document stores with sharding and query optimization.',
    items: [
      {
        name: 'Redis',
        context: 'Pub/Sub event backplanes, ephemeral presence tracking with TTL leases, distributed locking, and L2 caching.',
        usedIn: ['Spring Computing Real-Time Layer', 'Zultys PBX Coordination', 'Tiered Cache Demo'],
        experienceYears: '4+ Years'
      },
      {
        name: 'PostgreSQL & MySQL',
        context: 'ACID transactional schemas, relational indexing strategies, connection pool management, and query plan profiling.',
        usedIn: ['OneGreenDiary POS Server', 'Farmer Direct Marketplace', 'Enterprise User DBs'],
        experienceYears: '5+ Years'
      },
      {
        name: 'MongoDB',
        context: 'Document schema design, aggregation pipelines, atomic monotonic updates for high-concurrency bidding.',
        usedIn: ['Humation NFT Platform', 'Session State Stores'],
        experienceYears: '3+ Years'
      }
    ]
  },
  {
    category: 'ENGINEERING, TESTING & CI/CD',
    description: 'System design, testing rigor, automated delivery, and production operations.',
    items: [
      {
        name: 'System Design & Architecture',
        context: 'Designing fault-tolerant real-time topologies, state machines, and horizontal scaling strategies.',
        usedIn: ['Spring Computing Platform (~20k DAU)', 'Janus Cluster Balancing'],
        experienceYears: '6+ Years'
      },
      {
        name: 'Testing (Unit, Integration, E2E)',
        context: 'Automated test suites, network fault simulations, WebRTC getStats() verification, regression prevention.',
        usedIn: ['Spring Computing Core Modules', 'OneGreenDiary POS Pipelines'],
        experienceYears: '5+ Years'
      },
      {
        name: 'Git, GitHub, CI/CD & JIRA',
        context: 'Automated build and deployment pipelines, structured branching, technical code reviews, agile delivery.',
        usedIn: ['Production Release Cycles (Pre-Alpha to GA)', 'GitHub Actions Workflows'],
        experienceYears: '6+ Years'
      }
    ]
  }
];
