'use client';

import { GitCommit, Activity, RefreshCw } from 'lucide-react';
import { useContributions } from '@/hooks/useTodaysContributions';

export default function TodayContributionsCard() {
    const { todaysCount, previousDaysCount, loading, error } = useContributions();

    return (
        <div className="p-5 rounded-lg bg-linear-to-br from-green-500/10 to-black/40 border border-green-500/30 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300 shadow-lg shadow-green-500/10">
            <div className="flex items-center gap-2 mb-4">
                <Activity size={16} className="text-green-400" />
                <span className="text-sm font-mono text-white font-bold">git --contributions --date={(() => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; })()}</span>
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

                {/* Previous Day Contributions - Show when today's count is 0 or less */}
                {todaysCount <= 0 && previousDaysCount > 0 && (
                    <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <GitCommit size={14} className="text-yellow-400" />
                                <span className="text-xs text-zinc-400">Yesterday's Commits</span>
                            </div>
                            <span className="text-xl font-bold text-white font-mono">
                                {previousDaysCount}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
