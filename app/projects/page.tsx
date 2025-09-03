import Link from "next/link";
import { projectsData } from "@/lib/config";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Projects - CodersHub Inc",
    description: "Explore our collection of open-source developer tools and utilities. From browser extensions to VS Code plugins, discover tools that enhance your development workflow.",
    keywords: ["developer tools", "open source projects", "GitHub extensions", "VS Code plugins", "browser extensions", "productivity tools"],
    openGraph: {
        title: "Projects - CodersHub Inc",
        description: "Explore our collection of open-source developer tools and utilities.",
        url: "https://codershubinc.tech/projects",
        type: "website",
    },
};

export default function ProjectsPage() {
    const featuredProjects = projectsData.filter(project => project.featured);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            <Header />

            <section className="px-6 py-12 lg:px-8">
                <div className="mx-auto max-w-6xl text-center">
                    <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                        Our Projects
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
                        Discover our collection of open-source developer tools designed to enhance your productivity and streamline your workflow.
                    </p>
                    <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        From browser extensions to VS Code plugins, each project is built with care to solve real developer problems.
                    </p>
                </div>
            </section>

            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <section className="px-6 py-12 lg:px-8">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-12">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                Featured Projects
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-300">
                                Our most popular and actively maintained projects
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {featuredProjects.map((project) => (
                                <div
                                    key={project.id}
                                    className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 group"
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-200">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                                        </svg>
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                        {project.name}
                                    </h3>
                                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-4">
                                        {project.tagline}
                                    </p>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Link
                                            href={`/projects/${project.id}`}
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200"
                                        >
                                            View Details
                                        </Link>
                                        <a
                                            href={project.downloadLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 border border-gray-300 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-4 rounded-lg text-center transition-colors duration-200"
                                        >
                                            Download
                                        </a>
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-none w-12 h-12 border border-gray-300 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 text-gray-700 dark:text-gray-300 rounded-lg flex items-center justify-center transition-colors duration-200"
                                            aria-label={`View ${project.name} on GitHub`}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Coming Soon Section */}
            <section className="px-6 py-12 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-12 border border-blue-100 dark:border-blue-800/30">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                            More Projects Coming Soon
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                            We&apos;re constantly working on new developer tools and utilities. Follow us on GitHub or Twitter to stay updated on our latest releases.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://github.com/codershubinc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 justify-center"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                Follow on GitHub
                            </a>
                            <a
                                href="https://x.com/codershubinc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-200 flex items-center gap-2 justify-center"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                                Follow for Updates
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
