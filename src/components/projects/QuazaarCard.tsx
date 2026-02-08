import React from 'react';
import { Radio, ArrowRight, Github, Volume2 } from 'lucide-react';

export default function QuazaarCard() {
    const projectData = {
        title: 'Quazaar',
        description: 'Unified media control system bridging Linux and Windows audio APIs into a single Go-based control surface.',
        techStack: ['Go', 'C#', 'Cross-Platform', 'Backend'],
        liveUrl: 'https://quazaar.codershubinc.com',
        githubUrl: 'https://github.com/codershubinc/quazaar'
    };

    return (
        <div className="group relative bg-gradient-to-br from-[#0a0a0a] to-black border border-white/5 rounded-xl p-6 hover:border-amber-500/20 transition-all hover:-translate-y-2 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10">
            {/* Dual Platform Gradient */}
            <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-amber-500/5 to-transparent blur-[60px] pointer-events-none group-hover:from-amber-500/10 transition-all duration-500"></div>
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-slate-500/5 to-transparent blur-[60px] pointer-events-none group-hover:from-slate-500/10 transition-all duration-500"></div>

            {/* Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-white/5 rounded-lg text-amber-400/60 group-hover:scale-110 group-hover:text-amber-400 transition-all">
                    <Radio size={24} />
                </div>
                <div className="flex gap-2">
                    <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded hover:bg-white/5 transition-colors">
                        <Github size={14} />
                    </a>
                    <a href={projectData.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono border border-white/10 px-3 py-2 rounded hover:bg-amber-500/10 hover:text-amber-400 hover:border-amber-500/20 transition-all flex items-center gap-2">
                        Live <ArrowRight size={10} />
                    </a>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    {projectData.title}
                    <Volume2 size={16} className="text-amber-400/60" />
                </h3>
                <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
                    Unified media control system bridging <span className="text-zinc-300 font-semibold">Linux</span> and
                    <span className="text-zinc-300 font-semibold"> Windows</span> audio APIs into a single Go-based control surface.
                </p>

                {/* Platform Badges */}
                <div className="flex gap-2 mb-4">
                    <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400">
                        LINUX
                    </div>
                    <div className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-bold text-zinc-400">
                        WINDOWS
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {projectData.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-amber-500/5 text-amber-400/60 border border-amber-500/10">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Bridge Visual Accent */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-transparent via-white/5 to-transparent"></div>
        </div>
    );
}
