# Ketan Katore — Engineering Portfolio

Personal engineering portfolio for **Ketan Katore** (Senior Software Engineer). Built with React, TypeScript, and Vite. Deployed to GitHub Pages.

Live site: [https://ketan-k.github.io/](https://ketan-k.github.io/)

## Development

```bash
# Install dependencies and configure git hooks
npm install

# Start development server
npm run dev
```

## Build & Typecheck

```bash
# Type check TypeScript codebase
npm run typecheck

# Build production bundle
npm run build

# Preview production build locally
npm run preview
```

## Tech Stack

- **Framework**: React 19, React Router 7
- **Language**: TypeScript (Strict Mode)
- **Build Tooling**: Vite 6, Rollup
- **Styling**: Vanilla CSS (CSS custom properties design system)
- **Icons**: Lucide React
- **Deployment**: GitHub Pages via GitHub Actions

## Project Structure

```
ketan-k.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment workflow
├── .githooks/
│   └── pre-commit                  # Native Git pre-commit hook (zero dependencies)
├── public/
│   └── resume/
│       └── Ketan-Katore-Resume.pdf # Downloadable resume PDF
├── scripts/
│   └── sync-readme.js          # Repository structure synchronization tool
├── src/
│   ├── components/                 # Reusable UI & architectural diagrams
│   │   ├── about/                  # Bio and credentials
│   │   ├── ailab/                  # AI experiments and LLM benchmarks
│   │   ├── backend/                # Backend architecture diagrams
│   │   ├── common/                 # Badges, icons, scroll helpers
│   │   ├── contact/                # Contact channels and links
│   │   ├── demos/                  # Interactive architecture sandboxes
│   │   ├── experience/             # Career timeline and achievements
│   │   ├── github/                 # Live GitHub repositories & verified demos
│   │   ├── hero/                   # Hero landing section & interactive pipeline
│   │   ├── layout/                 # Navigation and footer
│   │   ├── stack/                  # Categorized tech stack grid
│   │   ├── systems/                # Architectural principles & visual node graphs
│   │   ├── webrtc/                 # WebRTC media deep-dives & topology
│   │   ├── work/                   # Featured projects and case studies
│   │   └── writing/                # Technical notes and whitepapers
│   ├── content/                    # Structured, typed portfolio data
│   │   ├── ailab.ts
│   │   ├── education.ts
│   │   ├── experience.ts
│   │   ├── projects.ts
│   │   ├── repos.ts
│   │   ├── systems.ts
│   │   ├── techstack.ts
│   │   └── writing.ts
│   ├── context/
│   │   └── ThemeContext.tsx        # Light/Dark mode state management
│   ├── hooks/
│   │   └── useGitHubRepos.ts       # Live GitHub repository fetcher with caching
│   ├── pages/                      # Routed page views
│   ├── styles/
│   │   └── index.css               # Core design system tokens and utilities
│   ├── types/
│   │   └── index.ts                # Global TypeScript interface definitions
│   ├── App.tsx                     # Root application component & routing
│   └── main.tsx                    # Application entry point
├── index.html                      # HTML template with SEO & Open Graph meta
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Pre-Commit Hook

This repository uses a native Git pre-commit hook at [`.githooks/pre-commit`](.githooks/pre-commit) configured via `git config core.hooksPath .githooks`:
- Scans staged diffs for accidental credentials/tokens and blocks environment files (`.env`).
- Verifies staged TypeScript files pass strict type checking (`npm run typecheck`).

## License

[MIT](LICENSE) © Ketan Katore

