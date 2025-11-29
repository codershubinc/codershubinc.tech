import React from 'react';
import { fetchProjects } from '@/lib/api';
import { ProjectShowcase } from '@/components/sections/ProjectShowcase';

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#09090b] transition-colors duration-500">
      {/* Header Section */}
      <div className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent"></div>
        <div className="container mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Our Projects
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Explore our collection of open-source tools, libraries, and applications built for the modern developer ecosystem.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-20">
        <ProjectShowcase projects={projects} />
      </div>
    </div>
  );
}
