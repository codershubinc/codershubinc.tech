'use client';

import React from 'react';
import { GitCommit, Activity, RefreshCw } from 'lucide-react';
import { useContributions } from '@/hooks/useTodaysContributions';

export default function TodayContributionsCard() {
    const { todaysCount, loading, error } = useContributions();

    return (
        <div className="p-5 rounded-lg bg-linear-to-br from-green-500/10 to-black/40 border border-green-500/30 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 shadow-lg shadow-green-500/10">
            <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-green-400" />
                <span className="text-sm font-mono text-white font-bold">Today&apos;s Stats</span>
                {loading && <RefreshCw size={12} className="text-green-400 animate-spin" />}
            </div>

            <div className="space-y-3">
                {/* GitHub Contributions */}
                <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <GitCommit size={14} className="text-green-400" />
                            <span className="text-xs text-zinc-400">GitHub Commits</span>
                        </div>
                        <span className="text-xl font-bold text-white font-mono">
                            {error ? '—' : todaysCount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
