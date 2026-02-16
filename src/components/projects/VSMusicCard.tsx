import React from 'react';
import { Music, ArrowRight, Github, Headphones, Download, Star } from 'lucide-react';

async function fetchVSMusicStats() {
    try {
        const res = await fetch('https://vsmusic.codershubinc.com/api/capsule-info', {
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
        description: 'Control Spotify & Apple Music directly from your editor',
        techStack: ['TypeScript', 'VS Code API', 'IPC'],
        liveUrl: 'https://vsmusic.codershubinc.com',
        githubUrl: 'https://github.com/codershubinc/vs-music'
    };

    return (
        <div className="group relative bg-linear-to-br from-emerald-950/20 via-black to-black border border-emerald-500/20 rounded-2xl overflow-hidden hover:border-emerald-500/40 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-emerald-500/20">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.1),transparent_50%)] group-hover:bg-[radial-gradient(circle_at_50%_120%,rgba(16,185,129,0.15),transparent_60%)] transition-all duration-500"></div>

            {/* Action Buttons - Top Right */}
            <div className="absolute top-4 right-4 z-20 flex gap-2">
                <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer"
                    className="p-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all group/btn">
                    <Github size={14} className="text-zinc-400 group-hover/btn:text-emerald-400" />
                </a>
                <a href={projectData.liveUrl} target="_blank" rel="noopener noreferrer"
                    className="px-3 py-2 bg-black/50 backdrop-blur-sm border border-white/10 rounded-lg text-[10px] font-mono text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/10 transition-all flex items-center gap-1.5">
                    Website <ArrowRight size={10} />
                </a>
            </div>

            {/* Main Content */}
            <div className="relative z-10 p-6 pt-16">
                {/* Large Icon */}
                <div className="mb-6 flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full"></div>
                        <div className="relative p-4 bg-linear-to-br from-emerald-500/20 to-emerald-600/10 rounded-2xl border border-emerald-500/30">
                            <Headphones size={32} className="text-emerald-400" strokeWidth={1.5} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-1 tracking-tight">
                            {projectData.title}
                        </h3>
                        <p className="text-xs text-emerald-400/60 font-mono">{stats.version}</p>
                    </div>
                </div>

                {/* Description */}
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                    {projectData.description}
                </p>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-zinc-500 mb-1">
                            <Download size={12} />
                            <span className="text-[10px] font-mono uppercase">Installs</span>
                        </div>
                        <div className="text-lg font-bold text-white font-mono">{stats.installs}</div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/5 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-zinc-500 mb-1">
                            <Star size={12} />
                            <span className="text-[10px] font-mono uppercase">Stars</span>
                        </div>
                        <div className="text-lg font-bold text-white font-mono">{stats.stars}</div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                    {projectData.techStack.map((tech) => (
                        <span key={tech} className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-500/10 text-emerald-400/80 border border-emerald-500/20">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 right-0 text-emerald-500/5 group-hover:text-emerald-500/10 transition-all duration-500 transform group-hover:scale-110">
                <Music size={120} strokeWidth={0.5} />
            </div>
        </div>
    );
}
