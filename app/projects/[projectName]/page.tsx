// Server Component - Main page
import { getProjectById } from "@/data";
import { notFound } from "next/navigation";
import { ProjectShowcase, ProjectSidebar } from './clientComponents';

// Re-export server functions
export { generateMetadata, generateStaticParams } from './serverComponents';

interface PageProps {
    params: Promise<{ projectName: string }>;
}

export default async function Page({ params }: PageProps) {
    const { projectName } = await params;
    const project = getProjectById(projectName);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    <ProjectSidebar currentProject={projectName} />
                    <ProjectShowcase project={project} />
                </div>
            </div>
        </div>
    );
}