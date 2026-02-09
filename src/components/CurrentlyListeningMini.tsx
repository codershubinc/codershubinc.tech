"use client";

import { useEffect, useState } from "react";
import { Music } from "lucide-react";
import Image from "next/image";

interface SpotifyData {
    is_playing: boolean;
    track: string;
    artist: string;
    album_images: Array<{ url: string; height: number; width: number }>;
    raw?: {
        progress_ms: number;
        item: {
            duration_ms: number;
        };
    };
}

export default function CurrentlyListeningMini() {
    const [data, setData] = useState<SpotifyData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("/api/spotify", {
                    cache: "no-store",
                });
                if (res.ok) {
                    const json = await res.json();
                    if (json.is_playing) {
                        setData(json);
                    } else {
                        setData(null);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch Spotify data:", error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);
    }, []);

    if (!data) return null;

    const albumArt =
        data.album_images.find((img) => img.height === 640)?.url ||
        data.album_images[0]?.url;

    // Calculate remaining time
    const formatRemainingTime = () => {
        if (!data.raw?.progress_ms || !data.raw?.item?.duration_ms) return null;

        const remainingMs = data.raw.item.duration_ms - data.raw.progress_ms;
        const totalSeconds = Math.floor(remainingMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `-${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const remainingTime = formatRemainingTime();

    return (
        <div className="p-4 rounded-lg bg-gradient-to-br from-black/40 to-black/20 border border-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-3">
                <Music size={14} className="text-green-400 animate-pulse" />
                <span className="text-xs font-mono text-zinc-400 tracking-wider">
                    spotify-cli --now
                </span>
            </div>
            <div className="flex gap-3">
                <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-white/5 border border-white/10 shadow-lg">
                    {albumArt ? (
                        <Image
                            src={albumArt}
                            alt="Album Art"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Music size={20} className="text-zinc-600" />
                        </div>
                    )}
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                    <p className="text-sm text-white font-medium line-clamp-1">
                        {data.track}
                    </p>
                    <div className="flex items-center justify-between gap-2">
                        <p className="text-xs text-zinc-500 line-clamp-1">{data.artist}</p>
                        {remainingTime && (
                            <span className="text-[10px] font-mono text-zinc-600 flex-shrink-0">
                                {remainingTime}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
