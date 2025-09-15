// Server component for project data fetching
import React from "react";
import { getProjectById } from "@/data";
import { ProjectData } from "@/lib/project.type";

export async function ProjectDataProvider({
    params,
    children
}: {
    params: Promise<{ projectName: string }>;
    children: (project: ProjectData | null, projectName: string) => React.ReactNode;
}) {
    const { projectName } = await params;
    const project = getProjectById(projectName);

    return <>{children(project, projectName)}</>;
}

export default ProjectDataProvider;