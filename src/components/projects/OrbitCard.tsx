import React from 'react';
import { Satellite, ArrowRight, Github } from 'lucide-react';

export default function OrbitCard() {
    const projectData = {
        title: 'Orbit',
        description: 'Self-hosted deployment monitoring server written in Go. Tracks system health, uptime, and deployment status via a lightweight agent.',
        techStack: ['Go', 'Linux', 'Systemd', 'Concurrency'],
        liveUrl: 'https://orbit.codershubinc.com',
        githubUrl: 'https://github.com/codershubinc/orbit'
    };

    return (
        <div className="group relative bg-gradient-to-br from-[#0a0a0a] to-black border border-white/5 rounded-xl p-6 hover:border-white/10 transition-all hover:-translate-y-2 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-white/5">
            {/* Orbital Glow Effect */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 blur-[100px] rounded-full pointer-events-none group-hover:bg-white/10 transition-all duration-500"></div>

            {/* Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-white/5 rounded-lg text-zinc-400 group-hover:scale-110 group-hover:text-white transition-all">
                    <Satellite size={24} />
                </div>
                <div className="flex gap-2">
                    <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded hover:bg-white/5 transition-colors">
                        <Github size={14} />
                    </a>
                    <a href={projectData.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono border border-white/10 px-3 py-2 rounded hover:bg-white/10 hover:text-white hover:border-white/20 transition-colors flex items-center gap-2">
                        Live <ArrowRight size={10} />
                    </a>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    {projectData.title}
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-400"></span>
                    </span>
                </h3>
                <p className="text-sm text-zinc-500 mb-6 leading-relaxed">
                    {projectData.description.split('Go').map((part, i) =>
                        i === 0 ? part : <React.Fragment key={i}><span className="text-zinc-300 font-semibold">Go</span>{part}</React.Fragment>
                    )}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {projectData.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-white/5 text-zinc-400 border border-white/10">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Corner Accent */}
            <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-white/10 rounded-bl-xl"></div>
        </div>
    );
}
