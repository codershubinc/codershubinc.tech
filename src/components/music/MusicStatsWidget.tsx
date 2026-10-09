'use client';

import { Headphones, PlayCircle, Library } from 'lucide-react';
import { SiApplemusic, SiSpotify, SiYoutube } from 'react-icons/si';
import Image from 'next/image';
import { useMusic } from '@/hooks/useMusic';

function formatHoursMins(seconds: number) {
    if (!seconds) return '0h 0m';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${h}h ${m}m`;
}

function formatLargeNumber(num: number) {
    return new Intl.NumberFormat("en", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(num);
}

const StatsSkeleton = () => (
    <div className="animate-pulse w-full">
        <div className="h-4 w-40 bg-zinc-800 rounded mb-8" />
        <div className="flex justify-between mb-8">
            <div className="space-y-2">
                <div className="h-8 w-24 bg-zinc-800 rounded" />
                <div className="h-3 w-16 bg-zinc-800 rounded" />
            </div>
            <div className="space-y-2 flex flex-col items-end">
                <div className="h-8 w-32 bg-zinc-800 rounded" />
                <div className="h-3 w-20 bg-zinc-800 rounded" />
            </div>
        </div>
        <div className="h-px bg-white/5 w-full mb-6" />
        <div className="flex justify-between">
            <div className="h-4 w-20 bg-zinc-800 rounded" />
            <div className="h-4 w-20 bg-zinc-800 rounded" />
        </div>
    </div>
);

export default function MusicStatsWidget() {
    const { musicData } = useMusic();

    if (!musicData) {
        return (
            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-2xl w-full max-w-sm font-sans">
                <StatsSkeleton />
            </div>
        );
    }

    const albumArt = musicData.last_playing_song?.artwork_url;
    const sourceLower = musicData.last_playing_song?.source?.toLowerCase() || '';
    let SourceIcon: any = Headphones;
    if (sourceLower.includes('apple')) SourceIcon = SiApplemusic;
    else if (sourceLower.includes('spotify')) SourceIcon = SiSpotify;
    else if (sourceLower.includes('youtube')) SourceIcon = SiYoutube;

    return (
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] shadow-2xl w-full max-w-sm font-sans relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#007acc]/5 blur-[50px] rounded-full pointer-events-none group-hover:bg-[#007acc]/10 transition-colors duration-500" />

            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-2 opacity-60">
                    <SourceIcon size={14} className="text-zinc-100" />
                    <span className="text-xs font-mono font-semibold tracking-wide text-zinc-300">
                        synker-cli --music --stats
                    </span>
                </div>
                <a href="https://synker.coderhubinc.com" target="_blank" rel="noopener noreferrer" className="text-[8px] text-zinc-500 hover:text-zinc-300 transition-all uppercase tracking-widest font-bold border border-white/10 hover:border-white/30 hover:bg-white/5 px-2 py-1 rounded-md">
                    POWERED BY SYNKER
                </a>
            </div>

            <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="flex flex-col">
                    <span className="text-3xl font-mono text-white font-medium tracking-tight">
                        {formatHoursMins(musicData.todays_total_listening_time_sec)}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium mt-1">
                        -- today
                    </span>
                </div>

                <div className="flex flex-col items-end text-right">
                    <span className="text-3xl font-mono font-medium tracking-tight text-transparent bg-clip-text bg-linear-to-r from-[#007acc] to-[#00d2ff]">
                        {formatHoursMins(musicData.total_listening_time_sec)}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-medium mt-1 truncate flex items-center gap-1">
                        -- since {musicData.tracked_from || 'all time'} <SourceIcon size={10} />
                    </span>
                </div>
            </div>

            <div className="h-px bg-white/5 w-full mb-6 relative z-10" />

            <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
                        <PlayCircle size={14} />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-white font-mono">
                            {formatLargeNumber(musicData.todays_play_count)}
                        </span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                            Plays Today
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                        <span className="text-sm font-bold text-white font-mono">
                            {formatLargeNumber(musicData.total_play_count)}
                        </span>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">
                            Total Plays
                        </span>
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
                        <Library size={14} />
                    </div>
                </div>
            </div>
        </div>
    );
}
