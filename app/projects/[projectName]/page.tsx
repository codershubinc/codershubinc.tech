import { notFound } from "next/navigation";
import { getAllProjectIds, getProjectById } from "@/lib/config";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export async function generateStaticParams() {
    return getAllProjectIds().map((projectName) => ({
        projectName,
    }));
}

interface PageProps {
    params: Promise<{ projectName: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
    const { projectName } = await params;
    const project = getProjectById(projectName);
    console.log("Project:", project);


    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Navigation */}
            <Header showBackButton={true} />

            {/* Project Hero */}
            <section className="px-6 py-12 lg:px-8">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            {project.name}
                        </h1>
                        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                            {project.tagline}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={project.links.downloadLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
                            >
                                Download Now
                            </a>
                            <a
                                href={project.links.githubLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-gray-300 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 text-gray-700 dark:text-gray-300 font-semibold px-8 py-3 rounded-xl transition-colors duration-200 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                View on GitHub
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description */}
            <section className="px-6 py-12 lg:px-8 bg-white/50 dark:bg-slate-800/50">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        About {project.name}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.description}
                    </p>
                </div>
            </section>

            {/* Features */}
            <section className="px-6 py-12 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {project.features.map((feature: string, index: number) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Installation Guide */}
            <section className="px-6 py-12 lg:px-8 bg-white/50 dark:bg-slate-800/50">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                        Installation & Setup
                    </h2>
                    <div className="space-y-4">
                        {project.installationSteps.map((step: string, index: number) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold flex-shrink-0">
                                    {index + 1}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 pt-1">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="px-6 py-12 lg:px-8">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                        Built With
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {project.techStack.map((tech: string, index: number) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 rounded-lg font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="px-6 py-12 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="mx-auto max-w-4xl text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Ready to try {project.name}?
                    </h2>
                    <p className="text-blue-100 mb-8">
                        Join thousands of developers who are already using our tools to enhance their workflow.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={project.links.downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white hover:bg-gray-100 text-blue-600 font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
                        >
                            Download Now
                        </a>
                        <a
                            href={project.links.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-white/30 hover:border-white/50 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
                        >
                            View Source Code
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer variant="simple" />
        </div>
    );
}