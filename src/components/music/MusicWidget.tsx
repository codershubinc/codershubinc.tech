'use client';

import { Headphones, Music } from 'lucide-react';
import { SiApplemusic, SiSpotify, SiYoutube } from 'react-icons/si';
import Image from 'next/image';
import { useMusic } from '@/hooks/useMusic';

function formatTime(seconds: number) {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

const WidgetSkeleton = () => (
    <div className="animate-pulse w-full">
        <div className="flex items-center gap-2 mb-8 opacity-60">
            <div className="h-4 w-4 bg-zinc-800 rounded-full" />
            <div className="h-4 w-48 bg-zinc-800 rounded" />
        </div>
        <div className="flex gap-4">
            <div className="w-20 h-20 bg-zinc-800 rounded-xl" />
            <div className="flex-1 space-y-3 py-2">
                <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                <div className="h-3 w-1/2 bg-zinc-800 rounded" />
            </div>
        </div>
    </div>
);

export default function MusicWidget() {
    const { musicData } = useMusic();
    const data = musicData?.last_playing_song;

    if (!musicData) {
        return (
            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-2xl w-full max-w-sm font-sans">
                <WidgetSkeleton />
            </div>
        );
    }

    if (!data) return null;

    const albumArt = data.artwork_url;
    const isPlaying = data.playback_status === 'Playing';
    
    
    const durationSecs = data.duration_ms ? data.duration_ms / 1000 : 0;
    const progressSecs = data.current_seconds;
    const hasProgress = durationSecs > 0;
    const progressPercent = hasProgress
        ? ((progressSecs / durationSecs) * 100).toFixed(1)
        : 0;

    const sourceLower = data.source?.toLowerCase() || '';
    let SourceIcon: any = Headphones;
    if (sourceLower.includes('apple')) SourceIcon = SiApplemusic;
    else if (sourceLower.includes('spotify')) SourceIcon = SiSpotify;
    else if (sourceLower.includes('youtube')) SourceIcon = SiYoutube;

    return (
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-2xl w-full max-w-sm font-sans relative overflow-hidden group">


            
            <div className="flex items-center justify-between mb-8 relative z-10">
                <div className="flex items-center gap-2 opacity-60">
                    <SourceIcon size={14} className={isPlaying ? "text-[#007acc]" : "text-zinc-100"} />
                    <span className="text-xs font-mono font-semibold tracking-wide text-zinc-300">
                        synker-cli --music {isPlaying ? '--now' : '--last'}
                    </span>
                </div>
                <div className="flex items-center gap-3">
                    <a href="https://synker.coderhubinc.com" target="_blank" rel="noopener noreferrer" className="text-[8px] text-zinc-500 hover:text-zinc-300 transition-all uppercase tracking-widest font-bold border border-white/10 hover:border-white/30 hover:bg-white/5 px-2 py-1 rounded-md">
                        POWERED BY SYNKER
                    </a>
                    {isPlaying && (
                        <div className="flex gap-1 items-end h-3">
                            <span className="w-1 h-full bg-[#007acc] animate-[bounce_1s_ease-in-out_infinite]" />
                            <span className="w-1 h-[60%] bg-[#007acc] animate-[bounce_1s_ease-in-out_infinite_0.2s]" />
                            <span className="w-1 h-[80%] bg-[#007acc] animate-[bounce_1s_ease-in-out_infinite_0.4s]" />
                        </div>
                    )}
                </div>
            </div>

            
            <div className="flex gap-4 relative z-10">
                
                <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-2xl shrink-0 group-hover:shadow-[#007acc]/20 transition-all duration-500 border border-white/10">
                    {albumArt ? (
                        <Image
                            src={albumArt}
                            alt={data.album || "Album cover"}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    ) : (
                        <div className="w-full h-full bg-zinc-900 flex items-center justify-center">
                            <Music size={24} className="text-zinc-600" />
                        </div>
                    )}
                </div>

                
                <div className="flex flex-col justify-center min-w-0">
                    <div className="text-base font-bold text-white mb-1 truncate group-hover:text-[#007acc] transition-colors">
                        {data.title}
                    </div>
                    <div className="text-xs text-zinc-400 truncate mb-0.5">{data.artist}</div>
                    <div className="text-[10px] text-zinc-600 truncate">{data.album}</div>
                </div>
            </div>

            
            <div className="mt-6 relative z-10">
                <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden mb-2">
                    <div
                        className="h-full bg-linear-to-r from-[#007acc] to-[#00d2ff] rounded-full relative"
                        style={{ width: `${hasProgress ? progressPercent : 100}%` }}
                    />
                </div>
                {hasProgress ? (
                    <div className="flex justify-between font-mono text-[10px] text-zinc-500">
                        <span>{formatTime(progressSecs)}</span>
                        <span>{formatTime(durationSecs)}</span>
                    </div>
                ) : (
                    <div className="flex justify-between font-mono text-[10px] text-zinc-500">
                        <span>Live / Unknown Duration</span>
                    </div>
                )}
            </div>
        </div>
    );
}
