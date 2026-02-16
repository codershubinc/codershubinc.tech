import React from 'react';
import { Radio, ArrowRight, Github, Volume2 } from 'lucide-react';

export default function QuazaarCard() {
    const projectData = {
        title: 'Quazaar',
        description: 'Cross-platform media control bridging Linux & Windows audio APIs',
        techStack: ['Go', 'C#', 'Cross-Platform', 'Backend'],
        liveUrl: 'https://quazaar.codershubinc.com',
        githubUrl: 'https://github.com/codershubinc/quazaar'
    };

    return (
        <div className="group relative bg-black rounded-2xl overflow-hidden border border-white/10 hover:border-orange-500/30 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-orange-500/10">
            {/* Split Background */}
            <div className="absolute inset-0">
                <div className="absolute left-0 top-0 w-1/2 h-full bg-linear-to-r from-orange-500/10 to-transparent"></div>
                <div className="absolute right-0 top-0 w-1/2 h-full bg-linear-to-l from-blue-500/10 to-transparent"></div>
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/50 to-black"></div>
            </div>

            {/* Center Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-transparent via-white/20 to-transparent"></div>

            <div className="relative z-10 p-6">
                {/* Platform Labels */}
                <div className="flex justify-between items-center mb-6 text-[8px] font-mono uppercase tracking-widest">
                    <span className="text-orange-400/60">Linux</span>
                    <div className="flex gap-2">
                        <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="p-1.5 bg-white/5 border border-white/10 rounded hover:border-orange-500/30 hover:bg-orange-500/10 transition-all">
                            <Github size={12} className="text-zinc-400" />
                        </a>
                        <a href={projectData.liveUrl} target="_blank" rel="noopener noreferrer"
                            className="px-2 py-1.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono text-zinc-400 hover:text-orange-400 hover:border-orange-500/30 transition-all flex items-center gap-1">
                            Site <ArrowRight size={10} />
                        </a>
                    </div>
                    <span className="text-blue-400/60">Windows</span>
                </div>

                {/* Center Icon & Title */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center mb-3">
                        <div className="relative">
                            <div className="absolute inset-0 bg-orange-500/20 blur-xl"></div>
                            <div className="relative p-3 bg-linear-to-br from-orange-500/20 via-purple-500/10 to-blue-500/20 rounded-xl border border-white/20">
                                <Radio size={24} className="text-white" strokeWidth={2} />
                            </div>
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">{projectData.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                        {projectData.description}
                    </p>
                </div>

                {/* Platform Features */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-orange-500/5 border border-orange-500/20 rounded-lg p-3">
                        <div className="text-[10px] text-orange-400/60 mb-1 font-mono uppercase">PulseAudio</div>
                        <div className="text-xs text-white">Native Linux Support</div>
                    </div>
                    <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
                        <div className="text-[10px] text-blue-400/60 mb-1 font-mono uppercase">WASAPI</div>
                        <div className="text-xs text-white">Windows Integration</div>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 justify-center">
                    {projectData.techStack.map((tech) => (
                        <span key={tech} className="text-[9px] font-mono px-2 py-1 rounded bg-white/5 text-zinc-400 border border-white/10">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Sound Wave Decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-orange-500/20 via-purple-500/20 to-blue-500/20"></div>
        </div>
    );
}
