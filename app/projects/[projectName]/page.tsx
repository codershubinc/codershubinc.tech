// Server Component - Main page
import { notFound } from "next/navigation";
import { ProjectShowcase, ProjectSidebar } from './clientComponents';
import { ProjectData } from "@/lib/project.type";

// Re-export server functions
export { generateMetadata, generateStaticParams } from './serverComponents';

interface PageProps {
    params: { projectName: string };
}

export default async function Page({ params }: PageProps) {
    const { projectName } = params;
    let project: ProjectData | null = null;
    let allProjects: [string, { name: string; tagline: string }][] = [];

    // Fetch project data
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

    // Fetch all projects list
    try {
        const res = await fetch("https://api.codershubinc.tech/projects/list/all", {
            next: { revalidate: 60 },
        });
        if (res.ok) {
            const projectNames: string[] = await res.json();
            // Fetch minimal data for sidebar (name, tagline)
            const details = await Promise.all(
                projectNames.map(async (name) => {
                    const detailRes = await fetch(`https://api.codershubinc.tech/projects/${encodeURIComponent(name)}`);
                    if (detailRes.ok) {
                        const { name: pname, tagline } = await detailRes.json();
                        return [name, { name: pname, tagline }];
                    }
                    return [name, { name, tagline: "" }];
                })
            );
            allProjects = details as [string, { name: string; tagline: string }][];
        }
    } catch {
        // ignore
    }

    if (!project) {
        notFound();
    }
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <ProjectSidebar currentProject={projectName} allProjects={allProjects} />
                    <ProjectShowcase project={project} />
                </div>
            </div>
        </div>
    );
}