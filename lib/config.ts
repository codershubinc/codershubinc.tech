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
    ProjectSummary,
    SiteConfig,
    Author,
    SocialLinks
} from "@/data";