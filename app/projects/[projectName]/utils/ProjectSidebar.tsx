"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

// Project Sidebar Component
function ProjectSidebar(
    {
        currentProject,
        allProjects
    }: { currentProject: string, allProjects: [string, { name: string; tagline: string }][] }) {
    const router = useRouter();

    const handleProjectChange = (selectedProject: string) => {
        router.push(`/projects/${selectedProject}`);
    };

    return (
        <>
            {/* Mobile Dropdown */}
            <div className="lg:hidden mb-6">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4">
                    <label htmlFor="project-select" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Project:
                    </label>

                    <select
                        id="project-select"
                        value={currentProject}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        onChange={(e) => handleProjectChange(e.target.value)}
                    >
                        {allProjects.map(([projectId, project]) => (
                            <option key={projectId} value={projectId}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-1/4 sticky top-6 h-screen overflow-y-auto">
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        Projects
                    </h2>
                    <nav className="space-y-2">
                        {allProjects.map(([projectId, project]) => {
                            const isActive = projectId === currentProject;
                            return (
                                <Link
                                    key={projectId}
                                    href={`/projects/${projectId}`}
                                    className={`block px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'
                                        }`}
                                >
                                    <div className="font-medium">{project.name}</div>
                                    <div className={`text-sm mt-1 ${isActive ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                                        }`}>
                                        {project.tagline}
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>
        </>
    );
}

export default ProjectSidebar;