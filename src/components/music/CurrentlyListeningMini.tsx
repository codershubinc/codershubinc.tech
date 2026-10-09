'use client';

import { Music } from "lucide-react";
import Image from "next/image";
import { useMusic } from "@/hooks/useMusic";

export default function CurrentlyListeningMini() {
    const { musicData } = useMusic();
    const data = musicData?.last_playing_song;

    if (!data) return null;

    return (
        <div className="flex items-center gap-3 px-5 py-3 sm:px-8 sm:py-4 bg-white/5 border-2 border-white/10 rounded-xl backdrop-blur-sm group hover:border-[#007acc] hover:bg-[#007acc]/10 transition-all hover:scale-105 active:scale-95 duration-300 w-fit cursor-pointer shadow-lg shadow-black/20">
            <div className="relative w-8 h-8 rounded-md overflow-hidden shrink-0 border border-white/10 group-hover:border-[#007acc]/30 transition-colors">
                {data.artwork_url ? (
                    <Image
                        src={data.artwork_url}
                        alt={data.album || "Album cover"}
                        fill
                        className="object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                        <Music size={14} className="text-zinc-500" />
                    </div>
                )}
                {data.playback_status === 'Playing' && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                        <Music size={14} className="text-green-400 animate-pulse drop-shadow-[0_0_8px_rgba(74,222,128,0.5)]" />
                    </div>
                )}
            </div>

            <div className="flex flex-col min-w-0 max-w-[140px] sm:max-w-[200px]">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#007acc] tracking-wider uppercase font-semibold">
                        {data.playback_status === 'Playing' ? 'Now Playing' : 'Last Played'}
                    </span>
                    {data.playback_status === 'Playing' && (
                        <div className="flex gap-0.5 items-end h-2">
                            <span className="w-0.5 h-full bg-green-400 animate-[bounce_1s_ease-in-out_infinite]" />
                            <span className="w-0.5 h-[60%] bg-green-400 animate-[bounce_1s_ease-in-out_infinite_0.2s]" />
                            <span className="w-0.5 h-[80%] bg-green-400 animate-[bounce_1s_ease-in-out_infinite_0.4s]" />
                        </div>
                    )}
                </div>
                <span className="text-xs font-medium text-white truncate group-hover:text-[#007acc] transition-colors mt-0.5">
                    {data.title}
                </span>
                <span className="text-[10px] text-zinc-500 truncate">
                    {data.artist}
                </span>
            </div>
        </div>
    );
}
