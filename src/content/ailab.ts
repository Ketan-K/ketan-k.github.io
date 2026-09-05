import { AiExperiment } from '../types';

export const aiExperiments: AiExperiment[] = [
  {
    id: 'client-side-ml-video-effects',
    category: 'Computer Vision / Edge ML',
    title: 'Client-Side ML Video Segmentation & Virtual Backgrounds',
    status: 'Production Feature',
    classification: 'Professional Production Feature',
    foundationContext:
      'Grounded in professional production work at Spring Computing Technologies (Intermedia AnyMeeting). Leverages client-side WebAssembly inference to process real-time video without server GPU offloading.',
    relatedProjectSlug: 'anymeeting-webrtc-conferencing',
    relatedProjectTitle: 'Intermedia AnyMeeting',
    relatedSystemUrl: '/systems/webrtc',
    relatedSystemLabel: 'WebRTC Media Pipeline & Client Processing',
    problem:
      'Executing video background blur and virtual background replacement on cloud servers during multi-party calls causes unsustainable GPU costs and latency. Processing must happen entirely on client edge hardware in modern browsers.',
    technologies: ['Google MediaPipe', 'Banuba SDK', 'WebAssembly (WASM)', 'WebGL Canvas', 'TypeScript'],
    whatHappened:
      'Integrated WebAssembly-compiled Google MediaPipe Selfie Segmentation and Banuba SDK into AnyMeeting’s media capture track. Optimized memory buffers and canvas draw passes to deliver 30fps portrait segmentation with <8ms frame inference time on standard laptop CPUs.',
    whatILearned:
      'Zero-copy canvas transfers and offscreen canvas workers are critical to prevent ML inference from stalling the WebRTC main thread render loop.',
    codeUrl: 'https://github.com/ketan-k'
  },
  {
    id: 'voice-webrtc-ai-agent',
    category: 'Realtime AI',
    title: 'Sub-500ms Voice-to-Voice AI Agent Gateway over WebRTC',
    status: 'Experimental',
    classification: 'Active Experiment',
    foundationContext:
      'Extends 5+ years of WebRTC audio track, Opus codec, and signaling state machine experience into low-latency conversational AI and full-duplex voice streams.',
    relatedProjectSlug: 'anymeeting-webrtc-conferencing',
    relatedProjectTitle: 'Intermedia AnyMeeting (WebRTC Audio Pipeline)',
    relatedSystemUrl: '/systems/webrtc',
    relatedSystemLabel: 'WebRTC Sub-100ms Media Architecture',
    problem:
      'Traditional voice bots chaining HTTP STT -> LLM -> TTS suffer from 2000ms+ round-trip latency, making natural interruptions and turn-taking feel sluggish and broken.',
    technologies: ['WebRTC Audio Track', 'Opus Codec', 'VAD (Voice Activity Detection)', 'Node.js', 'Whisper API'],
    whatHappened:
      'Built a low-latency WebRTC bidirectional audio stream pipeline connecting browser microphone input directly to streaming Whisper transcription and full-duplex neural voice synthesis.',
    whatILearned:
      'Acoustic echo cancellation and fast client-side VAD (Voice Activity Detection) are critical to allow natural user interruptions during AI speech output.',
    codeUrl: 'https://github.com/ketan-k'
  },
  {
    id: 'streaming-eval-profiler',
    category: 'Realtime AI',
    title: 'Streaming Latency & TTFT Token Profiler',
    status: 'Shipped Prototype',
    classification: 'Shipped Prototype',
    foundationContext:
      'Extends real-time packet timing, jitter distribution, and telemetry profiling practices (WebRTC getStats) to generative AI streaming protocols (Server-Sent Events / Web Streams).',
    relatedSystemUrl: '/systems',
    relatedSystemLabel: 'Systems Principle 03 (Observe What Matters)',
    problem:
      'Measuring raw model completion time fails to capture user-perceived responsiveness in real-time LLM applications. Need to profile Time-to-First-Token (TTFT), inter-token arrival jitter, and token generation throughput.',
    technologies: ['TypeScript', 'Server-Sent Events', 'Web Streams API', 'React', 'Chart.js / SVG Canvas'],
    whatHappened:
      'Engineered an in-browser streaming profiler that hooks into SSE / Fetch streams, calculating millisecond-accurate TTFT, instantaneous token velocity (tokens/sec), and chunk jitter distributions.',
    whatILearned:
      'Proxy buffer flushes and HTTP/2 multiplexing significantly impact TTFT. Disabling chunk buffering on upstream proxies is mandatory for responsive streaming UX.',
    codeUrl: 'https://github.com/ketan-k',
    demoUrl: '/ai'
  },
  {
    id: 'local-llm-structured-parser',
    category: 'LLM Systems',
    title: 'Incremental Grammar-Guided JSON Stream Parser',
    status: 'Experimental',
    classification: 'Active Experiment',
    foundationContext:
      'Applies protocol state machine design and chunked delta parsing (honed in real-time WebSocket messaging) to streaming token chunks for LLM tool invocation.',
    relatedProjectSlug: 'zultys-zac-unified-communications',
    relatedProjectTitle: 'Zultys ZAC (Signaling State Machines)',
    problem:
      'Standard JSON.parse() fails on partial streaming responses. Waiting for the complete JSON payload before executing tool calls eliminates the benefit of streaming.',
    technologies: ['TypeScript', 'Finite State Machine', 'JSON Schema', 'Web Workers'],
    whatHappened:
      'Constructed a token-by-token streaming state machine that extracts completed keys, arrays, and partial strings in real-time, allowing downstream UI components to render structured tool calls in flight.',
    whatILearned:
      'Handling escaped quotes and nested delimiters during incomplete token cuts requires strict boundary stack tracking rather than regular expressions.',
    codeUrl: 'https://github.com/ketan-k'
  },
  {
    id: 'agentic-sandbox-runner',
    category: 'Developer Tools',
    title: 'Sandboxed Tool Execution Gateway for AI Agents',
    status: 'In Progress',
    classification: 'Exploration & Research',
    foundationContext:
      'Extends backend API security, rate-limiting guards, and domain boundary isolation practices (from microservices work) into autonomous AI agent runtimes.',
    relatedSystemUrl: '/systems/full-stack',
    relatedSystemLabel: 'Full-Stack Architecture & Gateway Security',
    problem:
      'Allowing autonomous AI agents to execute local commands and API queries safely requires strict isolation, timeout guards, and deterministic input validation.',
    technologies: ['TypeScript', 'Node.js Sandbox', 'Zod Schemas', 'Docker Isolated Workers'],
    whatHappened:
      'Created an extensible agent execution runner with strict schema checking, time-limited execution boundaries, and human-in-the-loop approval hooks for sensitive actions.',
    whatILearned:
      'Deterministic schema validation at the gateway level is the most reliable defense against hallucinated tool arguments.',
    codeUrl: 'https://github.com/ketan-k'
  }
];
