import React from "react";
import { Flame, TrendingUp, Calendar } from "lucide-react";
import { github, REVALIDATE } from "@/constants/constantApis";

interface StreakData {
    mode: string;
    totalContributions: number;
    firstContribution: string;
    longestStreak: {
        start: string;
        end: string;
        length: number;
    };
    currentStreak: {
        start: string;
        end: string;
        length: number;
    };
    excludedDays: string[];
}

async function fetchStreakData(): Promise<StreakData | null> {
    try {
        const res = await fetch(github.endpoints.streak(), {
            next: { revalidate: REVALIDATE.SLOW },
        });
        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.error("Failed to fetch streak data:", error);
    }
    return null;
}

export default async function GitHubStreakMini() {
    const data = await fetchStreakData();

    if (!data) return null;

    return (
        <div className="p-4 rounded-lg bg-gradient-to-br from-black/40 to-black/20 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
                <Flame size={14} className="text-orange-400" />
                <span className="text-xs font-mono text-zinc-400 tracking-wider">
                    git streak-log --all --format=%ar | head -1
                </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <div className="text-center">
                    <div className="text-lg font-bold text-white">
                        {data.currentStreak.length}
                    </div>
                    <div className="text-[10px] text-zinc-500 uppercase">Current</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-bold text-orange-400">
                        {data.longestStreak.length}
                    </div>
                    <div className="text-[10px] text-zinc-500 uppercase">Longest</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-bold text-white">
                        {data.totalContributions}
                    </div>
                    <div className="text-[10px] text-zinc-500 uppercase">Total Contributions</div>
                </div>
            </div>
        </div>
    );
}
