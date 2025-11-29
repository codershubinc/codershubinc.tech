export interface Project {
    id: string;
    title: string;
    slug: string;
    techStack: string[];
    description: string;
    githubUrl: string;
    liveUrl: string;
    icon?: string; // SVG string or icon name
    tagline?: string;
    featured?: boolean;
    downloadLink?: string;
    content?: string; // Markdown content
    languages?: string[]; // List of languages used in the project
    roadmap?: string;
    contributing?: string;
    fileTree?: string;
    createdAt: string;
    /** ISO date timestamp of the first commit in the repository (if available) */
    firstCommitDate?: string;
    stars?: number;
}
