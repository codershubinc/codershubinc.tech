"use client"
import { ProjectData } from "@/lib/project.type";

// Project Showcase Component
function ProjectShowcase({ project }: { project: ProjectData }) {
    return (
        <main className="w-full lg:w-3/4 lg:pl-8">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-xl p-8 mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    {project.name}
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.tagline}
                </p>
            </section>

            {/* Image Showcase - Placeholder for now */}
            <section className="mb-8">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-700 dark:to-slate-800 rounded-xl h-64 md:h-80 flex items-center justify-center shadow-lg">
                    <div className="text-center">
                        <div className="text-4xl mb-2">🖼️</div>
                        <p className="text-gray-600 dark:text-gray-400">Project Screenshot</p>
                        <p className="text-sm text-gray-500 dark:text-gray-500">Coming Soon</p>
                    </div>
                </div>
            </section>

            {/* Description Section */}
            <section className="mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        About This Project
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                        {project.description}
                    </p>
                </div>
            </section>

            {/* Features Section */}
            <section className="mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Key Features
                    </h2>
                    <div className="grid md:grid-cols-2 gap-4">
                        {project.features.map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
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
            <section className="mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Installation & Setup
                    </h2>
                    <div className="space-y-4">
                        {project.installationSteps.map((step, index) => (
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
            <section className="mb-8">
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Technology Stack
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {project.techStack.map((tech, index) => (
                            <span
                                key={index}
                                className="px-4 py-2 bg-slate-800 dark:bg-slate-700 text-white rounded-full text-sm font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Action Buttons */}
            <section className="mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">
                        Ready to try {project.name}?
                    </h2>
                    <p className="text-blue-100 mb-8">
                        Get started with our project and enhance your development workflow.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={project.links.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white hover:bg-gray-100 text-blue-600 font-semibold px-8 py-3 rounded-xl transition-colors duration-200 inline-flex items-center gap-2 justify-center"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                            View on GitHub
                        </a>
                        <a
                            href={project.links.downloadLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-white/30 hover:border-white/50 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 inline-flex items-center gap-2 justify-center"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                            Download / Install
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ProjectShowcase;