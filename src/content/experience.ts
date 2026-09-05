import { ExperienceItem } from '../types';

export const experienceHistory: ExperienceItem[] = [
  {
    company: 'Enterprise Software & Real-Time Products',
    role: 'Senior Full-Stack Engineer',
    location: 'Remote',
    period: '2023 — Present',
    tagline: 'Leading architecture and development of real-time communication platforms, media streaming gateways, and distributed cloud services.',
    achievements: [
      'Architected and implemented production WebRTC signaling engines and WebSocket clusters serving concurrent multi-party audio/video sessions.',
      'Engineered sub-200ms streaming LLM integration pipelines using Server-Sent Events, custom chunk parsers, and progressive UI telemetry.',
      'Designed Redis-backed pub/sub presence services and caching layers, cutting database read loads by 60% during peak user activity.',
      'Standardized frontend and backend TypeScript architectures, enforcing strict type safety, end-to-end integration testing, and CI/CD automation.'
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'WebRTC', 'WebSockets', 'Redis', 'PostgreSQL', 'Docker', 'Vite']
  },
  {
    company: 'Cloud & Web Engineering Solutions',
    role: 'Full-Stack Software Engineer',
    location: 'Remote',
    period: '2021 — 2023',
    tagline: 'Built and scaled high-performance web applications, resilient backend microservices, and interactive collaboration features.',
    achievements: [
      'Developed low-latency interactive collaboration features utilizing WebSocket bidirectional event pipelines and optimistic state synchronization.',
      'Constructed RESTful and WebSocket API gateways with JWT authentication, rate limiting, and structured observability logging.',
      'Refactored legacy single-page applications into modular, high-performance React architectures, improving Core Web Vitals (LCP < 1.2s).',
      'Implemented transactional database migrations and optimized query execution plans in PostgreSQL to resolve connection pool bottlenecks.'
    ],
    technologies: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'WebSockets', 'PostgreSQL', 'Redis', 'Tailwind CSS']
  },
  {
    company: 'Software Systems & Product Engineering',
    role: 'Software Engineer',
    location: 'India',
    period: '2019 — 2021',
    tagline: 'Focused on core web application development, asynchronous data pipelines, and responsive frontend interfaces.',
    achievements: [
      'Built responsive, accessible web interfaces and reusable component libraries tested across modern mobile and desktop browsers.',
      'Created automated data processing scripts and asynchronous backend task queues handling scheduled batch jobs.',
      'Collaborated closely with cross-functional product and design teams to deliver end-to-end customer-facing features on schedule.'
    ],
    technologies: ['JavaScript', 'HTML5/CSS3', 'React', 'Node.js', 'REST APIs', 'Git', 'SQL']
  }
];
