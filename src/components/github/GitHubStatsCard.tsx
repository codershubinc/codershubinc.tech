import React from 'react';
import { Github, GitPullRequest, GitCommit, Star, AlertCircle, Award } from 'lucide-react';

interface GitHubStats {
    name: string;
    totalPRs: number;
    totalPRsMerged: number;
    mergedPRsPercentage: number;
    totalReviews: number;
    totalCommits: number;
    totalIssues: number;
    totalStars: number;
    totalDiscussionsStarted: number;
    totalDiscussionsAnswered: number;
    contributedTo: number;
    rank: {
        level: string;
        percentile: number;
    };
}

async function fetchGitHubStats(): Promise<GitHubStats | null> {
    try {
        const res = await fetch('https://github-readme-states-repo-self-inst.vercel.app/api/json-stats?username=codershubinc', {
            next: { revalidate: 3600 }
        });
        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
    }
    return null;
}

export default async function GitHubStatsCard() {
    const stats = await fetchGitHubStats();

    if (!stats) {
        return (
            <div className="bg-linear-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-6 rounded-2xl shadow-xl">
                <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
                    <Github size={16} className="text-[#007acc]" />
                    gh api user --json stats
                </h3>
                <div className="text-[#666] text-sm">Unable to load stats</div>
            </div>
        );
    }

    return (
        <div className="bg-linear-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-6 rounded-2xl relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#007acc]/10 transition-all group">
            {/* Gradient accent */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-[#007acc]/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#007acc]/20 transition-all duration-500"></div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-mono font-bold flex items-center gap-2">
                        <Github size={16} className="text-[#007acc]" />
                        gh api user --json stats
                    </h3>
                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#007acc]/20 border border-[#007acc]/30">
                        <Award size={12} className="text-[#007acc]" />
                        <span className="text-xs font-bold text-[#007acc]">{stats.rank.level}</span>
                    </div>
                </div>

                {/* Main Stats Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-[#0a0a0a] border border-white/5 p-3 rounded-lg group/stat hover:border-[#007acc]/30 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                            <GitCommit size={12} className="text-[#007acc]" />
                            <span className="text-[10px] font-mono uppercase text-[#888]">Commits</span>
                        </div>
                        <div className="text-xl font-bold text-white group-hover/stat:text-[#007acc] transition-colors">
                            {stats.totalCommits.toLocaleString()}
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/5 p-3 rounded-lg group/stat hover:border-yellow-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                            <Star size={12} className="text-yellow-500" />
                            <span className="text-[10px] font-mono uppercase text-[#888]">Stars</span>
                        </div>
                        <div className="text-xl font-bold text-white group-hover/stat:text-yellow-500 transition-colors">
                            {stats.totalStars}
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/5 p-3 rounded-lg group/stat hover:border-purple-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                            <GitPullRequest size={12} className="text-purple-500" />
                            <span className="text-[10px] font-mono uppercase text-[#888]">PRs</span>
                        </div>
                        <div className="text-xl font-bold text-white group-hover/stat:text-purple-500 transition-colors">
                            {stats.totalPRs}
                        </div>
                    </div>

                    <div className="bg-[#0a0a0a] border border-white/5 p-3 rounded-lg group/stat hover:border-red-500/30 transition-colors">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertCircle size={12} className="text-red-400" />
                            <span className="text-[10px] font-mono uppercase text-[#888]">Issues</span>
                        </div>
                        <div className="text-xl font-bold text-white group-hover/stat:text-red-400 transition-colors">
                            {stats.totalIssues}
                        </div>
                    </div>
                </div>

                {/* Rank Info */}
                <div className="pt-3 border-t border-white/5">
                    <div className="flex items-center justify-between text-xs">
                        <span className="text-[#888]">Global Rank</span>
                        <span className="text-white font-mono font-bold">
                            Top {stats.rank.percentile.toFixed(1)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
