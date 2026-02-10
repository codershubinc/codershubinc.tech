import React from 'react';
import { GitCommit, Activity } from 'lucide-react';

interface Contribution {
    color: string;
    contributionCount: number;
    contributionLevel: string;
    date: string;
}

interface ContributionsData {
    contributions: Contribution[];
    totalContributions: number;
}

async function fetchTodayContributions(): Promise<number> {
    try {
        const today = new Date().toISOString().split('T')[0];
        const res = await fetch(`https://github-contributions-api.deno.dev/codershubinc.json?flat=true&to=${today}`, {
            cache: 'no-store'
        });
        if (res.ok) {
            const data: ContributionsData = await res.json();
            const todayContrib = data.contributions.find(c => c.date === today);
            return todayContrib?.contributionCount || 0;
        }
    } catch (error) {
        console.error('Failed to fetch today contributions:', error);
    }
    return 0;
}

export default async function TodayContributionsCard() {
    const count = await fetchTodayContributions();

    return (
        <div className="p-5 rounded-lg bg-linear-to-br from-green-500/10 to-black/40 border border-green-500/30 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 shadow-lg shadow-green-500/10">
            <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-green-400" />
                <span className="text-sm font-mono text-white font-bold">Today&apos;s Stats</span>
            </div>

            <div className="space-y-3">
                {/* GitHub Contributions */}
                <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <GitCommit size={14} className="text-green-400" />
                            <span className="text-xs text-zinc-400">GitHub Commits</span>
                        </div>
                        <span className="text-xl font-bold text-white font-mono">{count}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
