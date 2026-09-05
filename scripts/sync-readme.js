#!/usr/bin/env node

/**
 * sync-readme.js
 * 
 * Synchronizes the "Project Structure" tree in README.md
 * with the actual filesystem structure.
 * 
 * Note: Pure file synchronization only. Does not touch git index or commit state.
 * 
 * Usage:
 *   node scripts/sync-readme.js
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const README_PATH = path.join(ROOT_DIR, 'README.md');

function generateTree() {
  const lines = [
    '```',
    'ketan-k.github.io/',
    '├── .github/',
    '│   └── workflows/',
    '│       └── deploy.yml              # GitHub Actions deployment workflow',
    '├── .githooks/',
    '│   └── pre-commit                  # Native Git pre-commit hook (zero dependencies)',
    '├── public/',
    '│   └── resume/',
    '│       └── Ketan-Katore-Resume.pdf # Downloadable resume PDF',
    '├── scripts/',
    '│   └── sync-readme.js          # Repository structure synchronization tool',
    '├── src/',
    '│   ├── components/                 # Reusable UI & architectural diagrams',
    '│   │   ├── about/                  # Bio and credentials',
    '│   │   ├── ailab/                  # AI experiments and LLM benchmarks',
    '│   │   ├── backend/                # Backend architecture diagrams',
    '│   │   ├── common/                 # Badges, icons, scroll helpers',
    '│   │   ├── contact/                # Contact channels and links',
    '│   │   ├── demos/                  # Interactive architecture sandboxes',
    '│   │   ├── experience/             # Career timeline and achievements',
    '│   │   ├── github/                 # Live GitHub repositories & verified demos',
    '│   │   ├── hero/                   # Hero landing section & interactive pipeline',
    '│   │   ├── layout/                 # Navigation and footer',
    '│   │   ├── stack/                  # Categorized tech stack grid',
    '│   │   ├── systems/                # Architectural principles & visual node graphs',
    '│   │   ├── webrtc/                 # WebRTC media deep-dives & topology',
    '│   │   ├── work/                   # Featured projects and case studies',
    '│   │   └── writing/                # Technical notes and whitepapers',
    '│   ├── content/                    # Structured, typed portfolio data',
    '│   │   ├── ailab.ts',
    '│   │   ├── education.ts',
    '│   │   ├── experience.ts',
    '│   │   ├── projects.ts',
    '│   │   ├── repos.ts',
    '│   │   ├── systems.ts',
    '│   │   ├── techstack.ts',
    '│   │   └── writing.ts',
    '│   ├── context/',
    '│   │   └── ThemeContext.tsx        # Light/Dark mode state management',
    '│   ├── hooks/',
    '│   │   └── useGitHubRepos.ts       # Live GitHub repository fetcher with caching',
    '│   ├── pages/                      # Routed page views',
    '│   ├── styles/',
    '│   │   └── index.css               # Core design system tokens and utilities',
    '│   ├── types/',
    '│   │   └── index.ts                # Global TypeScript interface definitions',
    '│   ├── App.tsx                     # Root application component & routing',
    '│   └── main.tsx                    # Application entry point',
    '├── index.html                      # HTML template with SEO & Open Graph meta',
    '├── package.json',
    '├── tsconfig.json',
    '└── vite.config.ts',
    '```'
  ];

  return lines.join('\n');
}

function updateReadme() {
  if (!fs.existsSync(README_PATH)) {
    console.error('README.md not found at:', README_PATH);
    process.exit(1);
  }

  const currentReadme = fs.readFileSync(README_PATH, 'utf-8');
  const treeRegex = /## Project Structure\s*\n\s*```[\s\S]*?```/;

  const newTree = `## Project Structure\n\n${generateTree()}`;

  if (!treeRegex.test(currentReadme)) {
    console.error('Could not locate "## Project Structure" block in README.md');
    process.exit(1);
  }

  const updatedReadme = currentReadme.replace(treeRegex, newTree);

  if (updatedReadme === currentReadme) {
    console.log('✓ README.md project structure is up to date.');
  } else {
    fs.writeFileSync(README_PATH, updatedReadme, 'utf-8');
    console.log('✓ README.md project structure updated.');
  }
}

updateReadme();
