// Generate metadata for each project page
// import removed: getProjectById
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ projectName: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { projectName } = await params;
    let project = null;
    try {
        const res = await fetch(`https://api.codershubinc.tech/projects/${encodeURIComponent(projectName)}`, {
            next: { revalidate: 60 },
        });
        if (res.ok) {
            project = await res.json();
        }
    } catch {
        // ignore
    return {} 
    }
    if (!project) {
        return {
            title: "Project Not Found | CoderHub",
            description: "The requested project could not be found.",
        };
    }
    return {
        title: `${project.name} | CoderHub`,
        description: project.tagline,
        keywords: project.techStack?.join(", ") ?? "",
        openGraph: {
            title: project.name,
            description: project.tagline,
            type: "website",
        },
    };
}

export default generateMetadata;