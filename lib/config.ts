// Import from the centralized data directory
export {
    projectsData,
    projectSummaries,
    siteConfig,
    detailedProjects,
    getProjectById,
    getFeaturedProjects,
    getAllProjectIds
} from "@/data";

// Re-export types for convenience
export type {
    ProjectData,
    ProjectSummary
} from "./project.types";

export type {
    SiteConfig,
    Author,
    SocialLinks
} from "./site.types";