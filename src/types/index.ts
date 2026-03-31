export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  slug: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export * from './github';
export * from './spotify';
export * from './vsmusic';
