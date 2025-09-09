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
} from "./project.type";

export type {
    SiteConfig,
    Author,
    SocialLinks
} from "./site.type";