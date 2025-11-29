"use client";

import React, { useState, useMemo } from 'react';
import { Project } from '@/types/project';
import { ProjectCard } from './ProjectCard';
import { motion, AnimatePresence } from 'framer-motion';
import CoverflowCarousel from '@/components/ui/CoverflowCarousel';
import featuredProjects from '@/data/featuredProjects';

interface ProjectShowcaseProps {
    projects: Project[];
}

type Category = 'All' | 'Featured' | 'Frontend' | 'Backend' | 'Fullstack' | 'Tools';

const CATEGORIES: Category[] = ['All', 'Featured', 'Frontend', 'Backend', 'Fullstack', 'Tools'];

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
    const [activeCategory, setActiveCategory] = useState<Category>('Featured');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'carousel'>('grid');

    const getCategory = (project: Project): Category => {
        const stack = project.techStack.map(t => t.toLowerCase());
        const title = project.title.toLowerCase();
        const desc = project.description.toLowerCase();

        const isFrontend = stack.some(t => ['react', 'next', 'vue', 'tailwind', 'css', 'html', 'frontend', 'ui', 'ux'].some(k => t.includes(k)));
        const isBackend = stack.some(t => ['node', 'express', 'nest', 'python', 'java', 'go', 'sql', 'database', 'api', 'backend'].some(k => t.includes(k)));
        const isTool = stack.some(t => ['cli', 'tool', 'library', 'config', 'devops', 'docker', 'utility'].some(k => t.includes(k))) || title.includes('tool') || desc.includes('utility');

        if (isFrontend && isBackend) return 'Fullstack';
        if (isFrontend) return 'Frontend';
        if (isBackend) return 'Backend';
        if (isTool) return 'Tools';
        return 'Frontend'; // Default fallback
    };

    const featuredSlugs = featuredProjects.reduce<Set<string>>((set, slug) => {
        set.add(slug);
        return set;
    }, new Set<string>());
    console.log("featured slugs", featuredSlugs);


    const filteredProjects = useMemo(() => {

        return projects.filter(project => {
            const matchesCategory = activeCategory === 'All' || activeCategory === 'Featured' && featuredSlugs.has(project.slug) || getCategory(project) === activeCategory;
            const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [projects, activeCategory, searchQuery, featuredSlugs]);

    return (
        <div className="space-y-8">
            {/* Controls Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-background/5 backdrop-blur-md p-4 rounded-2xl border border-border">
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 justify-center">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${activeCategory === category
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                                : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:scale-105'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Search and View Toggle */}
                <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <input
                            type="text"
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-muted border border-border rounded-xl px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>

                    <div className="flex bg-muted rounded-xl p-1 border border-border">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid'
                                ? 'bg-card text-blue-600 shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list'
                                ? 'bg-card text-blue-600 shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setViewMode('carousel')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'carousel'
                                ? 'bg-card text-blue-600 shadow-sm'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h18M3 6h6M3 18h6" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Projects Grid/List */}
            {viewMode === 'carousel' ? (
                <CoverflowCarousel>
                    {filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </CoverflowCarousel>
            ) : (
                <motion.div
                    layout
                    className={`grid gap-6 ${viewMode === 'grid'
                        ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                        : 'grid-cols-1'
                        }`}
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ProjectCard project={project} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            )}

            {filteredProjects.length === 0 && (
                <div className="text-center py-20">
                    <div className="inline-block p-4 rounded-full bg-muted mb-4">
                        <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">No projects found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or category filter</p>
                </div>
            )}
        </div>
    );
}
