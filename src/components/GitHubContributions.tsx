import React from 'react';
import { Activity, Flame, TrendingUp, Calendar } from 'lucide-react';

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

async function fetchContributions(): Promise<ContributionsData | null> {
    try {
        const today = new Date().toISOString().split('T')[0];
        const res = await fetch(`https://github-contributions-api.deno.dev/codershubinc.json?flat=true&to=${today}`, {
            next: { revalidate: 3600 }
        });
        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.error('Failed to fetch contributions:', error);
    }
    return null;
}

function calculateStreak(contributions: Contribution[]): number {
    let streak = 0;
    const sortedContribs = [...contributions].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    for (const contrib of sortedContribs) {
        if (contrib.contributionCount > 0) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
}

function getBestDay(contributions: Contribution[]): { count: number; date: string } {
    const best = contributions.reduce((max, curr) =>
        curr.contributionCount > max.contributionCount ? curr : max
        , contributions[0]);
    return { count: best.contributionCount, date: best.date };
}

export default async function GitHubContributions() {
    const data = await fetchContributions();

    if (!data) {
        return (
            <div className="bg-linear-to-br from-[#0a0a0a] to-black border border-white/5 p-6 rounded-2xl shadow-xl">
                <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
                    <Activity size={16} className="text-zinc-400" />
                    git log --graph --oneline
                </h3>
                <div className="text-zinc-500 text-sm">Unable to load activity data</div>
            </div>
        );
    }

    const recentContributions = data.contributions.slice(-56); // Last 8 weeks
    const currentStreak = calculateStreak(data.contributions);
    const bestDay = getBestDay(data.contributions);

    return (
        <div className="bg-linear-to-br from-[#0a0a0a] to-black border border-white/5 p-6 rounded-2xl relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-white/5 transition-all group">
            {/* Glow Effect */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-white/10 transition-all duration-500"></div>

            <div className="relative z-10">
                <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
                    <Activity size={16} className="text-zinc-400" />
                    git log --graph --oneline
                </h3>

                {/* Contribution Graph */}
                <div className="mb-4 p-3 bg-black/40 rounded-lg border border-white/5">
                    <div className="grid grid-cols-8 gap-[3px]">
                        {recentContributions.slice(-56).map((contrib, index) => {
                            const intensity = contrib.contributionCount === 0 ? 0 :
                                contrib.contributionCount <= 3 ? 1 :
                                    contrib.contributionCount <= 6 ? 2 :
                                        contrib.contributionCount <= 12 ? 3 : 4;

                            const colors = [
                                'bg-white/5',      // None
                                'bg-zinc-700/50',  // Low
                                'bg-zinc-600/60',  // Medium-low
                                'bg-zinc-500/70',  // Medium-high
                                'bg-zinc-400/80'   // High
                            ];

                            return (
                                <div
                                    key={index}
                                    className={`w-3 h-3 rounded-xs ${colors[intensity]} transition-all hover:scale-125 hover:ring-1 hover:ring-white/30 cursor-pointer`}
                                    title={`${contrib.date}: ${contrib.contributionCount} contributions`}
                                ></div>
                            );
                        })}
                    </div>
                    <div className="flex items-center justify-between mt-2 text-[9px] text-zinc-600 font-mono">
                        <span>8 weeks ago</span>
                        <span>Today</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-black/40 border border-white/5 p-3 rounded-lg group/stat hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-1 mb-1">
                            <TrendingUp size={10} className="text-zinc-400" />
                            <span className="text-[9px] font-mono uppercase text-zinc-500">Total</span>
                        </div>
                        <div className="text-lg font-bold text-white group-hover/stat:text-zinc-300 transition-colors">
                            {data.totalContributions.toLocaleString()}
                        </div>
                    </div>

                    <div className="bg-black/40 border border-white/5 p-3 rounded-lg group/stat hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-1 mb-1">
                            <Flame size={10} className="text-zinc-400" />
                            <span className="text-[9px] font-mono uppercase text-zinc-500">Streak</span>
                        </div>
                        <div className="text-lg font-bold text-white group-hover/stat:text-zinc-300 transition-colors">
                            {currentStreak} days
                        </div>
                    </div>

                    <div className="bg-black/40 border border-white/5 p-3 rounded-lg group/stat hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-1 mb-1">
                            <Calendar size={10} className="text-zinc-400" />
                            <span className="text-[9px] font-mono uppercase text-zinc-500">Best</span>
                        </div>
                        <div className="text-lg font-bold text-white group-hover/stat:text-zinc-300 transition-colors">
                            {bestDay.count}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
