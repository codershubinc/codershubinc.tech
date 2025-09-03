// Project-related types
export interface ProjectData {
    name: string;
    tagline: string;
    description: string;
    features: string[];
    techStack: string[];
    links: {
        downloadLink: string;
        githubLink: string;
        readmeLink: string;
        changelogLink?: string;
    };
    installationSteps: string[];
    screenshots?: string[];
    ideaBehindIt?: string;
    futurePlans?: string[];
    contributors?: Array<{
        login: string;
        id: string;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
    }>;
    creator: {
        login: string;
        id: string;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
    };
}

// Simplified project data for listings and cards
export interface ProjectSummary {
    id: string;
    name: string;
    tagline: string;
    description: string;
    icon: string;
    downloadLink: string;
    githubLink: string;
    featured: boolean;
}

// Site configuration types
export interface Author {
    name: string;
    url: string;
    twitter: string;
}

export interface SocialLinks {
    github: string;
    twitter: string;
    portfolio: string;
    email: string;
}

export interface SiteConfig {
    name: string;
    tagline: string;
    description: string;
    url: string;
    author: Author;
    social: SocialLinks;
}