// Server component for project data fetching
import React from "react";
// import removed: getProjectById
import { ProjectData } from "@/lib/project.type";

export async function ProjectDataProvider({
    params,
    children
}: {
    params: Promise<{ projectName: string }>;
    children: (project: ProjectData | null, projectName: string) => React.ReactNode;
}) {
    const { projectName } = await params;
    let project: ProjectData | null = null;
    try {
        const res = await fetch(`https://api.codershubinc.tech/projects/${encodeURIComponent(projectName)}`, {
            next: { revalidate: 60 },
        });
        if (res.ok) {
            project = await res.json();
        }
    } catch {
        // ignore
    }
    return <>{children(project, projectName)}</>;
}

export default ProjectDataProvider;