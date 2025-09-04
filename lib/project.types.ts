// Project-related types

export interface CreatorData {
    login: string;
    id: string;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
}

export type ContributorData = Array<{
    login: string;
    id: string;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
}>;

export interface LinksData {
    downloadLink: string;
    githubLink: string;
    readmeLink: string;
    changelogLink?: string;
}

export interface ProjectData {
    name: string;
    tagline: string;
    description: string;
    features: string[];
    techStack: string[];
    links: LinksData;
    installationSteps: string[];
    screenshots?: string[];
    ideaBehindIt?: string;
    futurePlans?: string[];
    contributors?: ContributorData;
    creator: CreatorData;
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