"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Project } from "@/types";
import { ArrowUpRight, Github, Code2, Network, Database, Activity, Music, Terminal, Download, ArrowRight } from "lucide-react";

interface ProjectCardProps {
    project: Project;
    index: number;
}

const getProjectIcon = (id: string, className: string) => {
    switch (id) {
        case 'openapi': return <Network className={className} strokeWidth={1} />;
        case 'aaxion': return <Database className={className} strokeWidth={1} />;
        case 'quazaar': return <Activity className={className} strokeWidth={1} />;
        case 'vsmusic': return <Music className={className} strokeWidth={1} />;
        default: return <Terminal className={className} strokeWidth={1} />;
    }
};

export const ProjectCard = ({ project, index }: ProjectCardProps) => {
    const [vsMusicData, setVsMusicData] = useState<{ installs: number | string }>({ installs: "..." });

    useEffect(() => {
        if (project.id === "vsmusic") {
            fetch("/api/vsmusic")
                .then((res) => res.json())
                .then((data) => setVsMusicData({ installs: data.installs }))
                .catch(() => setVsMusicData({ installs: "500+" }));
        }
    }, [project.id]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-white/15 transition-colors duration-500 p-6 sm:p-8"
        >
            {/* Giant Background Icon Peaking from Bottom Right */}
            <div className="absolute -bottom-8 -right-8 z-0 text-white/[0.02] group-hover:text-[#007acc]/10 transition-all duration-500 transform group-hover:-translate-x-6 group-hover:-translate-y-6 group-hover:-rotate-12 group-hover:scale-110 pointer-events-none">
                {getProjectIcon(project.id, "w-48 h-48 sm:w-56 sm:h-56")}
            </div>

            {/* Background Hover Effect */}
            <div className="absolute -inset-px bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-[2px] bg-linear-to-r from-transparent via-[#007acc]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10 flex flex-col grow">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-white/5 border border-white/10 group-hover:border-[#007acc]/30 transition-colors">
                            <Code2 className="text-[#007acc] relative z-10" size={20} />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-semibold text-white group-hover:text-[#007acc] transition-colors relative z-10 flex items-center gap-2">
                            {project.title}
                            {project.id === "vsmusic" && (
                                <span className="flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#007acc]/10 text-[#007acc] border border-[#007acc]/20">
                                    <Download size={10} />
                                    {vsMusicData.installs}
                                </span>
                            )}
                        </h3>
                    </div>
                    <div className="flex items-center gap-3">
                        {project.githubUrl && project.githubUrl !== "#" && (
                            <a
                                href={project.githubUrl.match(/\((.*?)\)/)?.[1] || project.githubUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-zinc-400 hover:text-white transition-colors p-1"
                                aria-label="GitHub Repository"
                            >
                                <Github size={20} />
                            </a>
                        )}

                        {project.githubUrl && project.liveUrl && project.githubUrl !== "#" && project.liveUrl !== "#" && (
                            <div className="h-4 w-px bg-white/10" aria-hidden="true" />
                        )}

                        {project.liveUrl && project.liveUrl !== "#" && (
                            <a
                                href={project.liveUrl.match(/\((.*?)\)/)?.[1] || project.liveUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="text-zinc-400 hover:text-white transition-colors p-1"
                                aria-label="Live Project"
                            >
                                <ArrowUpRight size={22} />
                            </a>
                        )}
                    </div>
                </div>

                {/* Description */}
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6 grow">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mt-auto pb-4">
                    {project.techStack.map((tech) => (
                        <span
                            key={tech}
                            className="px-3 py-1 text-xs font-mono text-zinc-300 bg-white/5 border border-white/10 rounded-full"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* View More Bar (Fused bottom popup) */}
            <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-20">
                <Link 
                    href={`/projects/${project.slug}`}
                    className="flex items-center justify-center w-full py-3.5 bg-black/60 backdrop-blur-md border-t border-white/5 text-zinc-400 hover:text-white transition-colors group/link"
                >
                    <span className="flex items-center gap-2 text-sm font-medium">
                        View Project
                        <ArrowRight size={16} className="group-hover/link:translate-x-1 group-hover/link:text-[#007acc] transition-transform duration-300" />
                    </span>
                </Link>
            </div>
        </motion.div>
    );
};
