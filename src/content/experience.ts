import { ExperienceItem } from '../types';

export const experienceHistory: ExperienceItem[] = [
  {
    company: 'Spring Computing Technologies Pvt. Ltd.',
    role: 'Senior Software Engineer / Senior WebRTC Engineer',
    location: 'Pune / Remote',
    period: 'Jan 2023 — Present',
    scaleMetrics: 'Global communication platform serving ~20,000 daily active users (4–5 engineer core team)',
    tagline: 'Owning key real-time media architecture, client-side media strategy across Web and VDI/Citrix, and WebRTC network resilience.',
    achievements: [
      'Contribute to a high-scale global communication platform serving ~20,000 users per day as part of a 4–5 engineer team, owning key real-time media and reliability components.',
      'Own end-to-end delivery of enterprise media features, taking full ownership from technical investigation and architecture design through automated testing, production release, and live support.',
      'Architect client-side media strategy across web browsers and VDI / Citrix Workspace environments, designing resilient solutions for hardware device recovery and media processing.',
      'Improve WebRTC connection resilience through ICE Restart state machines, STUN/TURN relay fallback, adaptive bitrate/framerate throttling, substream selection, and CPU-aware controls.',
      'Integrate Citrix Workspace SDK for VDI media offloading and Banuba / Google MediaPipe for client-side virtual backgrounds and real-time video effects.',
      'Investigate and resolve complex production incidents involving audio/video synchronization, network jitter, packet loss, device behavior, and FreeSWITCH recording layouts.',
      'Drive code reviews, technical mentoring, and architecture documentation across release cycles from pre-alpha to General Availability.'
    ],
    technologies: ['TypeScript', 'JavaScript', 'WebRTC', 'Node.js', 'Janus', 'FreeSWITCH', 'Citrix Workspace SDK', 'Google MediaPipe', 'Banuba SDK', 'STUN/TURN', 'ICE Restart', 'getStats()']
  },
  {
    company: 'Spring Computing Technologies Pvt. Ltd.',
    role: 'Software Engineer',
    location: 'Pune / Remote',
    period: 'Feb 2021 — Dec 2022',
    scaleMetrics: 'Enterprise Unified Communications (UC) & PBX Telephony Platform',
    tagline: 'Engineered Angular frontend and Node.js backend capabilities for unified communications, ad-hoc conferencing, and PBX telephony.',
    achievements: [
      'Engineered Angular frontend and Node.js backend capabilities for an enterprise Unified Communications and business telephony platform.',
      'Designed and implemented calling, messaging, and collaboration workflows including call transfer, call parking, ad-hoc conferencing, device binding, presence tracking, real-time chat, SMS, and file sharing.',
      'Developed backend services and real-time signaling integrations while synchronizing browser application state with the communication layer.',
      'Architected scalable service and data pipelines, including Redis-backed real-time communication patterns and database-driven application workflows.',
      'Owned high-priority production fixes, automated testing practices, and code reviews to improve stability across core messaging and calling modules.'
    ],
    technologies: ['Angular', 'Node.js', 'TypeScript', 'JavaScript', 'Janus Media Server', 'WebSockets', 'SIP', 'Redis', 'REST APIs', 'RxJS', 'SASS']
  },
  {
    company: 'Humation Limited',
    role: 'Associate Software Engineer',
    location: 'Remote',
    period: 'Jul 2020 — Jan 2021',
    scaleMetrics: 'High-Concurrency Real-Time Bidding & Multi-Currency Platform',
    tagline: 'Led backend re-engineering into a modular Node.js/MongoDB architecture for financial-grade low-latency transactions.',
    achievements: [
      'Led the overhaul of a legacy Node.js backend into a modular service architecture using MongoDB, improving maintainability and release cadence.',
      'Implemented secure authentication, role-based access control, and RESTful API endpoints for low-latency financial-grade applications.',
      'Engineered real-time socket synchronization for high-concurrency auction and bidding workflows with multi-currency cryptocurrency wallet integrations.'
    ],
    technologies: ['Node.js', 'MongoDB', 'JavaScript', 'Socket.io', 'REST APIs', 'JWT', 'Crypto Wallets (BTC, ETH, LTC)']
  },
  {
    company: 'OneGreenDiary Software Pvt. Ltd.',
    role: 'Associate Software Engineer',
    location: 'Pune, India',
    period: 'Jan 2020 — Jun 2020',
    scaleMetrics: 'Cloud Point of Sale (POS) Ecosystem & Reporting Analytics',
    tagline: 'Delivered end-to-end features and automated reporting servers across Angular, Node.js, Sails.js, and MySQL.',
    achievements: [
      'Delivered end-to-end features using Angular, Node.js, Sails.js, and MySQL across frontend, backend, database, and integration layers.',
      'Architected automated data-processing and reporting modules generating daily, weekly, and monthly sales analytics in Excel and PDF formats for enterprise clients.',
      'Built licensing, feature-toggle, client onboarding, FAQ, content-management, and REST API functionality with low-latency client-server synchronization.'
    ],
    technologies: ['Angular', 'Node.js', 'Sails.js', 'MySQL', 'JavaScript', 'REST APIs', 'HTML5/CSS3']
  }
];
