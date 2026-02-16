import React from 'react';
import { Satellite, ArrowRight, Github } from 'lucide-react';

export default function OrbitCard() {
    const projectData = {
        title: 'Orbit',
        description: 'Self-hosted deployment monitoring server with real-time system health tracking',
        techStack: ['Go', 'Linux', 'Systemd', 'Concurrency'],
        liveUrl: 'https://orbit.codershubinc.com',
        githubUrl: 'https://github.com/codershubinc/orbit'
    };

    return (
        <div className="group relative bg-black border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                }}></div>
            </div>

            {/* Orbital Ring Animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-cyan-500/10 rounded-full group-hover:scale-110 group-hover:border-cyan-500/20 transition-all duration-700"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-cyan-500/5 rounded-full group-hover:scale-125 group-hover:border-cyan-500/15 transition-all duration-500"></div>

            <div className="relative z-10 p-6">
                {/* Status Bar */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                        </span>
                        <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">Active</span>
                    </div>
                    <div className="flex gap-2">
                        <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="p-1.5 bg-white/5 border border-white/10 rounded hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all">
                            <Github size={12} className="text-zinc-400" />
                        </a>
                        <a href={projectData.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/10 transition-all flex items-center gap-1">
                            Docs <ArrowRight size={10} />
                        </a>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mb-6">
                    <div className="flex items-start gap-3 mb-3">
                        <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                            <Satellite size={20} className="text-cyan-400" strokeWidth={2} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">{projectData.title}</h3>
                            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">Monitoring System</div>
                        </div>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        {projectData.description}
                    </p>
                </div>

                {/* Metrics Display */}
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                        <div className="text-xs font-bold text-white font-mono">99.9%</div>
                        <div className="text-[9px] text-zinc-500 uppercase mt-0.5">Uptime</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                        <div className="text-xs font-bold text-white font-mono">12ms</div>
                        <div className="text-[9px] text-zinc-500 uppercase mt-0.5">Latency</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-2">
                        <div className="text-xs font-bold text-white font-mono">24/7</div>
                        <div className="text-[9px] text-zinc-500 uppercase mt-0.5">Monitor</div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5">
                    {projectData.techStack.map((tech) => (
                        <span key={tech} className="text-[9px] font-mono px-2 py-1 rounded bg-cyan-500/10 text-cyan-400/80 border border-cyan-500/20">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
