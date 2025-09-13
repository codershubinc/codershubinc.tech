// Generate metadata for each project page
import { getProjectById } from "@/data";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ projectName: string }>;
}

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

export default generateMetadata;