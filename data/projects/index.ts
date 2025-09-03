import githubNewtab from "./github-newtab";
import vsMusic from "./vs-music";
import { ProjectData } from "../types";

// Detailed project data for individual project pages
export const detailedProjects: Record<string, ProjectData> = {
    "github-newtab": githubNewtab,
    "vs-music": vsMusic
};

// Export individual projects for direct access
export { githubNewtab, vsMusic };