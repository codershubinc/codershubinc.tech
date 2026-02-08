import React from 'react';
import { Music, ArrowRight, Github, Headphones, Download, Star } from 'lucide-react';

async function fetchVSMusicStats() {
    try {
        const res = await fetch('http://192.168.1.109:3000/api/capsule-info', {
            next: { revalidate: 60 }
        });
        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.error('Failed to fetch VS Music stats:', error);
    }
    return { installs: 390, stars: 8, version: 'v0.2.1', forks: 0, issues: 0 };
}

export default async function VSMusicCard() {
    const stats = await fetchVSMusicStats();

    const projectData = {
        title: 'VS Music',
        description: 'VS Code extension to control Spotify and Apple Music playback directly from the editor status bar.',
        techStack: ['TypeScript', 'VS Code API', 'IPC'],
        liveUrl: 'https://vsmusic.codershubinc.com',
        githubUrl: 'https://github.com/codershubinc/vs-music'
    };

    return (
        <div className="group relative bg-gradient-to-br from-[#0a0a0a] to-black border border-white/5 rounded-xl p-6 hover:border-emerald-500/20 transition-all hover:-translate-y-2 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10">
            {/* Music Wave Glow */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-32 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-emerald-500/5 blur-[80px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-500"></div>

            {/* Header */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="p-3 bg-emerald-500/5 rounded-lg text-emerald-400/60 group-hover:scale-110 group-hover:text-emerald-400 transition-all">
                    <Headphones size={24} />
                </div>
                <div className="flex gap-2">
                    <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 border border-white/10 rounded hover:bg-white/5 transition-colors">
                        <Github size={14} />
                    </a>
                    <a href={projectData.liveUrl} target="_blank" rel="noopener noreferrer" className="text-xs font-mono border border-white/10 px-3 py-2 rounded hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/20 transition-colors flex items-center gap-2">
                        Live <ArrowRight size={10} />
                    </a>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                    {projectData.title}
                    <Music size={16} className="text-emerald-400/60 animate-pulse" />
                </h3>
                <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
                    VS Code extension to control <span className="text-zinc-300 font-semibold">Spotify</span> and
                    <span className="text-zinc-300 font-semibold"> Apple Music</span> playback directly from the editor status bar.
                </p>

                {/* Stats Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-zinc-400">
                        <Download size={12} />
                        <span className="text-white">{stats.installs}</span> Installs
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-zinc-400">
                        <Star size={12} />
                        <span className="text-white">{stats.stars}</span> Stars
                    </div>
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-bold text-zinc-400">
                        <span className="text-white">{stats.version}</span>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {projectData.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded bg-emerald-500/5 text-emerald-400/60 border border-emerald-500/10">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Musical Note Accent */}
            <div className="absolute bottom-4 right-4 text-white/5 group-hover:text-white/10 transition-colors">
                <Music size={60} strokeWidth={1} />
            </div>
        </div>
    );
}
