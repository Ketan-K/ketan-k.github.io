# Ketan Katore — Engineering Portfolio

[![Live Site](https://img.shields.io/badge/Live-ketan--k.github.io-38bdf8?style=flat-square&logo=githubpages&logoColor=white)](https://ketan-k.github.io/)
[![Deploy Status](https://github.com/Ketan-K/ketan-k.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ketan-K/ketan-k.github.io/actions/workflows/deploy.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald?style=flat-square)](LICENSE)

The personal engineering portfolio and systems showcase for **Ketan Katore** — Senior Software Engineer specializing in WebRTC, real-time media systems, distributed backend infrastructure, and full-stack engineering.

Hosted at: **[https://ketan-k.github.io/](https://ketan-k.github.io/)**

---

## Highlights & Features

- **Interactive System Architecture Visualizers**:
  - **WebRTC Topology Simulator**: Visualizes bandwidth scaling, latency, and CPU trade-offs across Peer-to-Peer Mesh, SFU (Selective Forwarding Unit), and MCU (Multipoint Control Unit).
  - **Request Lifecycle Pipeline**: Step-by-step trace of incoming requests traversing DNS, TLS, CDN edge, reverse proxy, API gateway, microservice, Redis cache, and Postgres.
  - **Real-Time Event Stream**: Live simulated WebSocket / SSE Redis pub-sub stream with event throughput metrics.
  - **Tiered Caching & Singleflight**: Visual demonstration of L1 (in-memory), L2 (Redis), and DB querying with mutex-based request coalescing.
  - **AI Token Streaming**: Benchmarks TTFT (Time-To-First-Token), tokens-per-second, and SSE chunk parsing across prompt complexities.
  - **System Resilience Cascade**: Interactive simulation of breaker states (Closed, Open, Half-Open), exponential backoff retry policies, and fallback degradation.
- **Dynamic GitHub Repository Sync**: Live public repo telemetry via GitHub REST API with graceful fallback to typed snapshot data.
- **Zero Heavyweight UI Bloat**: Custom lightweight CSS design system with CSS custom properties, responsive typography, and full Dark/Light theme switching.
- **CI/CD Deployment**: Automated static site build and deployment to GitHub Pages via GitHub Actions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19, React Router 7 |
| **Language** | TypeScript (Strict Mode) |
| **Build & Tooling** | Vite 6, Rollup |
| **Styling** | Vanilla CSS with Design System Custom Properties |
| **Icons** | Lucide React |
| **Hosting & CI/CD** | GitHub Pages + GitHub Actions |

---

## Project Structure

```
ketan-k.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment workflow
├── public/
│   └── resume/
│       └── Ketan-Katore-Resume.pdf
├── src/
│   ├── components/             # Reusable UI & interactive visualizers
│   │   ├── about/              # Bio and credentials
│   │   ├── ailab/              # AI experiments and LLM benchmarks
│   │   ├── backend/            # Backend architecture diagrams
│   │   ├── common/             # Badges, icons, scroll helpers
│   │   ├── contact/            # Contact channels and links
│   │   ├── demos/              # Interactive architecture sandboxes
│   │   ├── experience/         # Career timeline and achievements
│   │   ├── github/             # Live GitHub repositories grid
│   │   ├── hero/               # Hero landing section & interactive pipeline
│   │   ├── layout/             # Navigation and footer
│   │   ├── stack/              # Categorized tech stack grid
│   │   ├── systems/            # Architectural principles and case studies
│   │   ├── webrtc/             # WebRTC media deep-dives
│   │   ├── work/               # Featured projects and case studies
│   │   └── writing/            # Technical notes and whitepapers
│   ├── content/                # Structured, typed portfolio data
│   │   ├── ailab.ts
│   │   ├── education.ts
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   ├── repos.ts
│   │   ├── systems.ts
│   │   ├── techstack.ts
│   │   └── writing.ts
│   ├── context/
│   │   └── ThemeContext.tsx    # Light/Dark mode state management
│   ├── hooks/
│   │   └── useGitHubRepos.ts   # Live GitHub repository fetcher with caching
│   ├── pages/                  # Routed page views
│   ├── styles/
│   │   └── index.css           # Core design system tokens and utilities
│   ├── types/
│   │   └── index.ts            # Global TypeScript interface definitions
│   ├── App.tsx                 # Root application component & routing
│   └── main.tsx                # Application entry point
├── index.html                  # HTML template with SEO & Open Graph meta
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or later (Node 22 recommended)
- **npm**: v9.0.0 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/Ketan-K/ketan-k.github.io.git
cd ketan-k.github.io

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Runs the application locally at `http://localhost:5173/`.

### Production Build

```bash
# Type check and build optimized bundle for production
npm run build
```

Built static assets will be output to the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

---

## Deployment

The portfolio is deployed to **GitHub Pages** automatically on every push to `main` via the GitHub Actions workflow located at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---

## License

This project is open source and available under the [MIT License](LICENSE).
