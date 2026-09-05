export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  role: string;
  projectType: 'Production Enterprise System' | 'Production Client Application' | 'Production Backend Service';
  clientOrContext: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  problem: string;
  architecture: {
    description: string;
    diagram: string;
    highlights: string[];
  };
  engineeringDecisions: {
    title: string;
    description: string;
  }[];
  challenges: {
    title: string;
    description: string;
  }[];
  whatILearned: string;
}

export interface SystemPrincipleNode {
  id: string;
  label: string;
  note?: string;
  isFinal?: boolean;
}

export interface SystemPrincipleFlow {
  type?: 'pipeline' | 'tree' | 'decision';
  label?: string;
  nodes: SystemPrincipleNode[];
  edges: ([string, string] | [string, string, string])[];
}

export interface SystemPrinciple {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  flow: SystemPrincipleFlow;
  keyTakeaway: string;
}

export interface AiExperiment {
  id: string;
  category: 'LLM Systems' | 'Realtime AI' | 'Developer Tools';
  title: string;
  status: 'Experimental' | 'In Progress' | 'Shipped Prototype';
  problem: string;
  technologies: string[];
  whatHappened: string;
  whatILearned: string;
  codeUrl?: string;
  demoUrl?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  tagline: string;
  achievements: string[];
  technologies: string[];
  scaleMetrics?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  location: string;
  focus: string;
}

export interface TechStackCategory {
  category: string;
  description: string;
  items: {
    name: string;
    context: string;
    usedIn: string[];
    experienceYears?: string;
  }[];
}

export interface EngineeringNote {
  id: string;
  title: string;
  date: string;
  readTime: string;
  summary: string;
  tags: string[];
  slug: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  language: string;
  languageColor: string;
  status: 'Active' | 'Maintained' | 'Experimental' | 'Archived';
  url: string;
  tags: string[];
  stars?: number;
  forks?: number;
  updatedAt?: string;
  isFork?: boolean;
  homepage?: string;
}

export interface SystemNode {
  id: string;
  label: string;
  category: 'client' | 'network' | 'gateway' | 'storage' | 'media';
  description: string;
  role: string;
  simulatedMetric: string;
}
