import React from 'react';
import { GitCommit } from 'lucide-react';

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
            next: { revalidate: 300 } // Revalidate every 5 minutes
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

export default async function TodayContributionsBadge() {
    const count = await fetchTodayContributions();

    return (
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-linear-to-r from-zinc-800/80 to-zinc-900/80 border border-white/10 text-xs font-mono font-bold text-zinc-300 shadow-md backdrop-blur-sm">
            <GitCommit size={12} className="text-zinc-400" />
            <span className="text-white">{count}</span>
            <span className="text-zinc-500">contributions  today </span>
        </div>
    );
}
