import React from 'react';
import { Activity, Flame, TrendingUp, Calendar } from 'lucide-react';
import { fetchGitHubContributions, type Contribution } from '@/lib/githubContributions';

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
    const data = await fetchGitHubContributions();

    if (!data) {
        return (
            <div className="bg-gradient-to-br from-[#0a0a0a] to-black border border-white/5 p-6 rounded-2xl shadow-xl">
                <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
                    <Activity size={16} className="text-zinc-400" />
                    git log --graph --oneline
                </h3>
                <div className="text-zinc-500 text-sm">Unable to load activity data</div>
            </div>
        );
    }

    const recentContributions = data.contributions; // Last 8 weeks
    const currentStreak = calculateStreak(data.contributions);
    const bestDay = getBestDay(data.contributions);

    return (
        <div className="bg-gradient-to-br from-[#0a0a0a] to-black border border-white/5 p-6 rounded-2xl relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-white/5 transition-all group">
            {/* Glow Effect */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-white/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-white/10 transition-all duration-500"></div>

            <div className="relative z-10">
                <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
                    <Activity size={16} className="text-zinc-400" />
                    git log --graph --oneline
                </h3>

                {/* Contribution Graph Container */}
                <div className="mb-4 p-4 bg-[#0d1117]/80 rounded-xl border border-white/5 flex flex-col items-center">

                    {/* The Graph itself - w-max prevents stretching, gap-[2px] tightens it */}
                    <div className="grid grid-rows-7 grid-flow-col gap-[2px] w-max">
                        {recentContributions.map((contrib, index) => {
                            const count = contrib.contributionCount;
                            const intensity = count === 0 ? 0 :
                                count <= 3 ? 1 :
                                    count <= 6 ? 2 :
                                        count <= 12 ? 3 : 4;

                            // Exact GitHub Dark Mode Colors
                            const githubColors = [
                                'bg-[#161b22]', // 0 contributions
                                'bg-[#0e4429]', // 1-3 contributions
                                'bg-[#006d32]', // 4-6 contributions
                                'bg-[#26a641]', // 7-12 contributions
                                'bg-[#39d353]'  // 13+ contributions
                            ];

                            // My custom terminal theme (Swap githubColors with this if you want it)
                            const codershubColors = [
                                'bg-white/5',
                                'bg-zinc-600/60',
                                'bg-zinc-400/80',
                                'bg-zinc-200',
                                'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
                            ];

                            return (
                                <div
                                    key={index}
                                    // Exactly 10x10 pixels like GitHub
                                    className={`w-[10px] h-[10px] rounded-[2px] ${githubColors[intensity]} transition-all hover:scale-125 hover:ring-1 hover:ring-white/30 cursor-pointer`}
                                    title={`${new Date(contrib.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}: ${count} contributions`}
                                ></div>
                            );
                        })}
                    </div>

                    {/* Legend matched to 10px sizing */}
                    <div className="flex items-center justify-between w-full mt-3 text-[10px] text-zinc-500 font-mono px-1">
                        <span>8 weeks ago</span>
                        <div className="flex items-center gap-1.5">
                            <span>Less</span>
                            <div className="flex gap-[2px]">
                                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#161b22]"></div>
                                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#0e4429]"></div>
                                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#006d32]"></div>
                                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#26a641]"></div>
                                <div className="w-[10px] h-[10px] rounded-[2px] bg-[#39d353]"></div>
                            </div>
                            <span>More</span>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="bg-[#0d1117]/50 border border-white/5 p-3 rounded-lg group/stat hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-1 mb-1">
                            <TrendingUp size={12} className="text-zinc-400" />
                            <span className="text-[10px] font-mono uppercase text-zinc-500">Total</span>
                        </div>
                        <div className="text-lg font-bold text-white group-hover/stat:text-zinc-300 transition-colors">
                            {data.totalContributions.toLocaleString()}
                        </div>
                    </div>

                    <div className="bg-[#0d1117]/50 border border-white/5 p-3 rounded-lg group/stat hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-1 mb-1">
                            <Flame size={12} className="text-zinc-400" />
                            <span className="text-[10px] font-mono uppercase text-zinc-500">Streak</span>
                        </div>
                        <div className="text-lg font-bold text-white group-hover/stat:text-zinc-300 transition-colors">
                            {currentStreak} <span className="text-sm font-normal text-zinc-500">days</span>
                        </div>
                    </div>

                    <div className="bg-[#0d1117]/50 border border-white/5 p-3 rounded-lg group/stat hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-1 mb-1">
                            <Calendar size={12} className="text-zinc-400" />
                            <span className="text-[10px] font-mono uppercase text-zinc-500">Best</span>
                        </div>
                        <div className="text-lg font-bold text-white group-hover/stat:text-zinc-300 transition-colors flex items-baseline gap-1">
                            {bestDay.count}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}