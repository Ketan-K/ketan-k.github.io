export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  role: string;
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

export interface SystemPrinciple {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  diagram: string;
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
}

export interface TechStackCategory {
  category: string;
  description: string;
  items: {
    name: string;
    context: string;
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
  status: 'Active' | 'Maintained' | 'Experimental';
  url: string;
  tags: string[];
}

export interface SystemNode {
  id: string;
  label: string;
  category: 'client' | 'network' | 'gateway' | 'storage' | 'media';
  description: string;
  role: string;
  simulatedMetric: string;
}
