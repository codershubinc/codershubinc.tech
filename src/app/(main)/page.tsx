import React from 'react';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectCard } from '@/components/sections/ProjectCard';
import { projects } from '@/data/projects';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
