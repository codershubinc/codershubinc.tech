"use client";

import { useContributions } from '@/hooks/useTodaysContributions';
import { GitCommit } from 'lucide-react';

export default function TodayContributionsBadge() {
    const { todaysCount } = useContributions();

    return (
        <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-linear-to-r from-zinc-800/80 to-zinc-900/80 border border-white/10 text-xs font-mono font-bold text-zinc-300 shadow-md backdrop-blur-sm">
            <GitCommit size={12} className="text-zinc-400" />
            <span className="text-white">{todaysCount}</span>
            <span className="text-zinc-500">contributions  today </span>
        </div>
    );
}
