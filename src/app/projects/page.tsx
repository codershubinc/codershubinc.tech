import React from "react";
import { Terminal } from "lucide-react";
import { ProjectCard } from "@/components/projects";
import { projects } from "@/data/projects";
import { Navbar, ScrollReveal } from "@/components/ui";
import ProfileCapsules from "@/components/ui/ProfileCapsules";

export default function ProjectsPage() {
    return (
        <>
            <main className="min-h-screen bg-linear-to-b from-[#0a0a0a] via-[#050505] to-[#000000] text-[#b0b0b0] selection:bg-[#007acc] selection:text-white font-sans overflow-x-hidden">
                <Navbar capsules={<ProfileCapsules />} />

                {/* Page Content */}
                <section className="pt-32 pb-24 px-4 sm:px-6 max-w-6xl mx-auto relative min-h-screen flex flex-col">
                    {/* Background Accent glow */}
                    <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#007acc]/5 blur-[120px] rounded-full pointer-events-none"></div>

                    <div className="flex items-end justify-between mb-16 relative z-10">
                        <ScrollReveal direction="left">
                            <h1 className="text-3xl sm:text-5xl font-bold font-mono text-white flex items-center gap-3 mb-4 hover:text-[#007acc] transition-colors duration-300">
                                <Terminal className="text-[#007acc] animate-pulse" size={36} />
                                ~/projects
                            </h1>
                            <p className="font-mono text-base text-[#888] max-w-xl">
                                A complete archive of my open-source work, active projects, tools, and experiments.
                            </p>
                        </ScrollReveal>
                        <span className="font-mono text-sm text-[#444] hidden md:block px-4 py-2 bg-white/5 rounded-lg border border-white/5">
                            total {projects.length}
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 grow">
                        {projects.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </div>
                </section>
            </main>
        </>
    );
}
