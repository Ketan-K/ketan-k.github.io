import { useState, useEffect, useCallback } from 'react';
import { GitHubRepo } from '../types';
import { selectedRepos as fallbackRepos } from '../content/repos';

interface GitHubApiRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  language: string | null;
  homepage: string | null;
  topics?: string[];
  pushed_at: string;
  updated_at: string;
  created_at: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  Python: '#3572a5',
  Shell: '#89e051',
  Rust: '#dea584',
  Go: '#00add8',
  Java: '#b07219',
  Dockerfile: '#384d54',
  SCSS: '#c6538c',
  Vue: '#41b883',
  Ruby: '#701516'
};

const CACHE_KEY = 'ketan_k_github_repos_v2';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

/**
 * Priority weighting for repositories to ensure the highest-impact,
 * most technically substantive projects appear at the top.
 */
const REPO_WEIGHT_MAP: Record<string, number> = {
  'segmentation-lab': 100, // Top 1: WebRTC + AI Background Segmentation (SAM2, MediaPipe)
  'unified-collaboration-platform': 90, // Top 2: WebRTC Collaboration Architecture
  'cpu-metrics-compare-tool': 80, // Top 3: Systems Telemetry & Benchmarking
  'snap-pdf': 75, // Top 4: Client-Side PDF.js & Canvas Tool
  'ParallelComputing': 65, // Top 5: High-Performance Scientific Computing (OpenMP/MPI)
  'Matrix-Class': 60, // Top 6: C++ Linear Algebra Engine
  'webcam-preview': 55, // Top 7: MediaStream & Camera Tool
  'keep-awake': 50, // Top 8: Automation Utility
  'mern-interview-prep': 45, // Top 9: Full-Stack Architecture Playbook
  'LinuxBootWinISO': 40, // Top 10: Linux Automation
  'NumericalMethods': 35,
  'NumericalMethods-II': 30,
  'moments-backend': 25,
  'moments-app': 20,
  'Angular-Demo-App': 15,
  'Express-Demo-App': 10,
  'Canopus-Project': 5
};

const REPO_DESCRIPTIONS_MAP: Record<string, string> = {
  'segmentation-lab': 'Real-time WebRTC conferencing lab benchmarking background segmentation models (SAM2, BodyPix, MediaPipe, WebGL).',
  'snap-pdf': 'Fast, privacy-first in-browser PDF to PNG page extractor powered by PDF.js and HTML5 Canvas. Zero server uploads.',
  'cpu-metrics-compare-tool': 'Cross-platform CPU telemetry comparison benchmark for Node.js process stats, systeminformation, and native OS counters.',
  'unified-collaboration-platform': 'Architecture blueprint and abstractions for multi-party WebRTC video conferencing, room presence, and adaptive media signaling.',
  'keep-awake': 'Lightweight, configurable background utility that prevents OS sleep during long builds and downloads via subtle mouse simulation.',
  'webcam-preview': 'Zero-dependency browser utility for testing and inspecting webcam feeds, media constraints, resolution modes, and digital zoom.',
  'mern-interview-prep': 'Curated MERN stack, Node.js event loop, React internals, and backend system design interview playbook with real-world patterns.',
  'LinuxBootWinISO': 'Shell utility automating the creation of bootable Windows UEFI USB installation drives directly from Linux.',
  'ParallelComputing': 'High-performance parallel computing implementations using OpenMP, MPI, and multi-threaded numerical algorithms in C.',
  'Matrix-Class': 'High-performance C++ Matrix linear algebra library supporting LU decomposition, determinant evaluation, and vector operations.',
  'NumericalMethods': 'Scientific numerical computing library in C++: root-finding, interpolation, and matrix decompositions.',
  'NumericalMethods-II': 'Advanced numerical analysis in C++: Runge-Kutta ODE solvers, differential equations, and computational methods.',
  'moments-backend': 'Event-driven RESTful backend and data services for photo timeline indexing and media storage.',
  'moments-app': 'Responsive frontend client application for photo timeline browsing and album management.',
  'Angular-Demo-App': 'Angular frontend application showcasing component architecture and reactive state management.',
  'Express-Demo-App': 'Node.js & Express REST API scaffolding with middleware pipelines and route handling.',
  'Canopus-Project': 'Backend microservice and data orchestration for Project Canopus.',
  'Ketan-K': 'GitHub user profile and developer configuration repository.'
};

function formatRepoDate(isoString: string): string {
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  } catch {
    return 'Recently';
  }
}

function calculateRepoStatus(repo: GitHubApiRepo): 'Active' | 'Maintained' | 'Experimental' | 'Archived' {
  if (repo.archived) return 'Archived';
  const updatedDate = new Date(repo.pushed_at || repo.updated_at);
  const now = new Date();
  const diffMonths = (now.getTime() - updatedDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
  
  if (diffMonths <= 12) return 'Active';
  if (diffMonths <= 36) return 'Maintained';
  return 'Maintained';
}

function transformApiRepo(repo: GitHubApiRepo): GitHubRepo {
  const language = repo.language || (repo.topics?.includes('mern') ? 'JavaScript' : 'TypeScript');
  const languageColor = LANGUAGE_COLORS[language] || '#3178c6';
  const description =
    repo.description ||
    REPO_DESCRIPTIONS_MAP[repo.name] ||
    `${repo.name} - Open source repository by Ketan-K.`;

  const tags: string[] = [];
  if (repo.topics && repo.topics.length > 0) {
    repo.topics.forEach((t) => tags.push(t.replace(/-/g, ' ')));
  } else {
    if (repo.language) tags.push(repo.language);
    if (repo.name.toLowerCase().includes('webrtc')) tags.push('WebRTC');
    if (repo.name.toLowerCase().includes('pdf')) tags.push('PDF.js');
    if (repo.name.toLowerCase().includes('tool') || repo.name.toLowerCase().includes('awake') || repo.name.toLowerCase().includes('preview')) tags.push('Tool');
  }

  return {
    name: repo.name,
    description,
    language,
    languageColor,
    status: calculateRepoStatus(repo),
    url: repo.html_url,
    tags: tags.slice(0, 5),
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    updatedAt: formatRepoDate(repo.pushed_at || repo.updated_at),
    isFork: repo.fork,
    homepage: repo.homepage || undefined
  };
}

function sortReposByWeight(repoList: GitHubRepo[]): GitHubRepo[] {
  return [...repoList].sort((a, b) => {
    const weightA = REPO_WEIGHT_MAP[a.name] ?? 0;
    const weightB = REPO_WEIGHT_MAP[b.name] ?? 0;
    return weightB - weightA;
  });
}

export interface UseGitHubReposReturn {
  repos: GitHubRepo[];
  allRepos: GitHubRepo[];
  loading: boolean;
  isLive: boolean;
  error: string | null;
  lastFetched: Date | null;
  refetch: () => Promise<void>;
  filterType: 'all' | 'sources' | 'featured';
  setFilterType: (filter: 'all' | 'sources' | 'featured') => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  languages: string[];
}

export function useGitHubRepos(username: string = 'Ketan-K'): UseGitHubReposReturn {
  const [repos, setRepos] = useState<GitHubRepo[]>(sortReposByWeight(fallbackRepos));
  const [loading, setLoading] = useState<boolean>(true);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'sources' | 'featured'>('all');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  const fetchFromApi = useCallback(async (ignoreCache: boolean = false) => {
    setLoading(true);
    setError(null);

    // 1. Check localStorage Cache if not ignored
    if (!ignoreCache) {
      try {
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          const cachedData = JSON.parse(cachedStr);
          if (Date.now() - cachedData.timestamp < CACHE_TTL_MS && Array.isArray(cachedData.repos) && cachedData.repos.length > 0) {
            setRepos(cachedData.repos);
            setIsLive(true);
            setLastFetched(new Date(cachedData.timestamp));
            setLoading(false);
            return;
          }
        }
      } catch {
        // Continue to network fetch if cache read fails
      }
    }

    // 2. Fetch live from GitHub REST API
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
        headers: {
          Accept: 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        throw new Error(`GitHub API returned status ${response.status}`);
      }

      const data: GitHubApiRepo[] = await response.json();
      if (!Array.isArray(data)) {
        throw new Error('Invalid response structure from GitHub API');
      }

      // Filter out self profile repository or internal meta repos
      const filteredApi = data.filter((r) => r.name !== 'Ketan-K' && !r.name.startsWith('.'));
      const transformed = filteredApi.map(transformApiRepo);
      const prioritized = sortReposByWeight(transformed);

      // Save to cache
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            repos: prioritized
          })
        );
      } catch {
        // Ignore cache write errors
      }

      setRepos(prioritized);
      setIsLive(true);
      setLastFetched(new Date());
    } catch (err) {
      console.warn('Could not fetch real GitHub repos from API, using fallback data:', err);
      setError(err instanceof Error ? err.message : 'Network error');
      setIsLive(false);
      setRepos(sortReposByWeight(fallbackRepos));
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchFromApi(false);
  }, [fetchFromApi]);

  const refetch = useCallback(() => fetchFromApi(true), [fetchFromApi]);

  // Derive unique languages
  const languages = ['all', ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean)))];

  // Apply filters
  let filtered = repos;
  if (filterType === 'sources') {
    filtered = filtered.filter((r) => !r.isFork);
  } else if (filterType === 'featured') {
    filtered = filtered.filter((r) => !r.isFork && r.status === 'Active');
  }

  if (selectedLanguage !== 'all') {
    filtered = filtered.filter((r) => r.language === selectedLanguage);
  }

  return {
    repos: filtered,
    allRepos: repos,
    loading,
    isLive,
    error,
    lastFetched,
    refetch,
    filterType,
    setFilterType,
    selectedLanguage,
    setSelectedLanguage,
    languages
  };
}
