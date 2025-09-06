// Server Components - for async operations and metadata
import React from "react";
import { getAllProjectIds, getProjectById } from "@/data";
import { ProjectData } from "@/lib/project.types";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ projectName: string }>;
}

// Generate metadata for each project page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { projectName } = await params;
    const project = getProjectById(projectName);

    if (!project) {
        return {
            title: "Project Not Found | CoderHub",
            description: "The requested project could not be found.",
        };
    }

    return {
        title: `${project.name} | CoderHub`,
        description: project.tagline,
        keywords: project.techStack.join(", "),
        openGraph: {
            title: project.name,
            description: project.tagline,
            type: "website",
        },
    };
}

// Generate static params for static generation
export async function generateStaticParams() {
    return getAllProjectIds().map((projectName) => ({
        projectName,
    }));
}

// Server component for project data fetching
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