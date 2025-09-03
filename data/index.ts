// Export all types
export * from "./types";

// Export site configuration
export { siteConfig } from "./site/config";

// Export project data
export { detailedProjects, githubNewtab, vsMusic } from "./projects/index";
export { projectSummaries, projectsData } from "./projects/summaries";

// Helper functions for working with project data
export function getProjectById(id: string) {
    return detailedProjects[id];
}

export function getFeaturedProjects() {
    return projectSummaries.filter(project => project.featured);
}

export function getAllProjectIds() {
    return Object.keys(detailedProjects);
}

// Re-export from the centralized location
import { detailedProjects } from "./projects/index";
import { projectSummaries } from "./projects/summaries";