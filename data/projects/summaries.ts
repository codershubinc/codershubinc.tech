import { ProjectSummary } from "../../lib/project.types";
import { detailedProjects } from "./index";

// Helper function to map detailed project data to summary format
function createProjectSummary(id: string, detailed: typeof detailedProjects[keyof typeof detailedProjects]): ProjectSummary {
    return {
        id,
        name: detailed.name,
        tagline: detailed.tagline,
        description: detailed.description,
        icon: getProjectIcon(id),
        downloadLink: detailed.links.downloadLink,
        githubLink: detailed.links.githubLink,
        featured: isProjectFeatured(id)
    };
}

// Helper function to determine project icon based on ID
function getProjectIcon(id: string): string {
    const iconMap: Record<string, string> = {
        "github-newtab": "github",
        "vs-music": "music"
    };
    return iconMap[id] || "default";
}

// Helper function to determine if project is featured
function isProjectFeatured(id: string): boolean {
    const featuredProjects = ["github-newtab", "vs-music"];
    return featuredProjects.includes(id);
}

// Generate project summaries from detailed data
export const projectSummaries: ProjectSummary[] = Object.entries(detailedProjects).map(([id, project]) =>
    createProjectSummary(id, project)
);

// Legacy export for backward compatibility (will be deprecated)
export const projectsData = projectSummaries;