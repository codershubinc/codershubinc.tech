'use client';

import React, { useState, useEffect } from 'react';
import { Headphones, Music, Play, Pause, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface SpotifyData {
    artist: string;
    track: string;
    album: string;
    album_images: Array<{ url: string; height: number; width: number }>;
    is_playing: boolean;
    status: string;
    track_uri: string;
    raw: {
        progress_ms: number;
        item: {
            duration_ms: number;
        }
    };
}

export default function SpotifyWidget() {
    const [spotifyData, setSpotifyData] = useState<SpotifyData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchSpotifyData = async () => {
        try {
            const res = await fetch('/api/spotify', {
                cache: 'no-store'
            });
            if (res.ok) {
                const data = await res.json();

                setSpotifyData(data);
            }
        } catch (error) {
            console.error('Failed to fetch Spotify data:', error);
        } finally {
            setIsLoading(false);

        }
    };

    useEffect(() => {
        // Initial fetch
        fetchSpotifyData();

        // Set up interval for fetching every 5 seconds
        const interval = setInterval(() => {
            fetchSpotifyData();
        }, 5000);


        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-6 rounded-2xl relative overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-green-500/20 transition-all duration-500"></div>
                <div className="flex items-center gap-2 text-green-500 font-mono text-xs font-bold mb-4 relative z-10">
                    <Headphones size={14} />
                    Music Player
                </div>
                <div className="flex items-center gap-2 text-[#666] text-sm relative z-10">
                    <Loader2 size={16} className="animate-spin" />
                    Loading...
                </div>
            </div>
        );
    }



    if (!spotifyData) {
        return (
            <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-6 rounded-2xl relative overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all">
                <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-green-500/20 transition-all duration-500"></div>
                <div className="flex items-center gap-2 text-green-500 font-mono text-xs font-bold mb-4 relative z-10">
                    <Headphones size={14} />
                    Music Player
                </div>
                <div className="text-[#666] text-sm relative z-10">Unable to load music data</div>
            </div>
        );
    }

    const albumArt = spotifyData.album_images.find(img => img.height === 640)?.url || spotifyData.album_images[0]?.url;

    // Format time from milliseconds to mm:ss
    const formatTime = (ms?: number) => {
        if (!ms) return '0:00';
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const hasProgress = spotifyData.raw?.progress_ms

    const progressPercentage = hasProgress
        ? ((spotifyData.raw!.progress_ms! / spotifyData.raw!.item.duration_ms) * 100).toFixed(1)
        : 0;

    return (
        <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-6 rounded-2xl relative overflow-hidden group shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-green-500/20 transition-all duration-500"></div>

            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-green-500 font-mono text-xs font-bold">
                    <Headphones size={14} />
                    {spotifyData.is_playing ? 'spotify-cli --now-playing' : 'spotify-cli --last-played'}
                </div>
                {spotifyData.is_playing ? (
                    <Play size={14} className="text-green-500 animate-pulse" />
                ) : (
                    <Pause size={14} className="text-[#666]" />
                )}
            </div>

            <div className="flex items-center gap-4 relative z-10">
                {albumArt ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                        <Image
                            src={albumArt}
                            alt={spotifyData.album}
                            width={64}
                            height={64}
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <div className="w-16 h-16 bg-[#222] rounded-lg flex items-center justify-center border border-white/5 shadow-lg">
                        <Music size={24} className="text-[#555]" />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <a
                        href={spotifyData.track_uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-bold hover:text-green-500 transition-colors line-clamp-1"
                    >
                        {spotifyData.track}
                    </a>
                    <div className="text-[#666] text-sm line-clamp-1">{spotifyData.artist}</div>
                    <div className="text-[#555] text-xs line-clamp-1">{spotifyData.album}</div>
                </div>
            </div>

            {/* Progress Bar */}
            {hasProgress && (
                <div className="mt-3 relative z-10">
                    <div className="flex items-center justify-between text-[10px] text-[#666] font-mono mb-1">
                        <span>{formatTime(spotifyData.raw!.progress_ms)}</span>
                        <span>{formatTime(spotifyData.raw!.item.duration_ms)}</span>
                    </div>
                    <div className="w-full h-1.5 bg-[#222] rounded-full overflow-hidden shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full transition-all duration-1000 ease-linear shadow-lg shadow-green-500/50"
                            style={{ width: `${progressPercentage}%` }}
                        ></div>
                    </div>
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-white/5 text-sm text-[#888] italic relative z-10">
                &quot;I code best while listening to good music.&quot; 🎶
            </div>
        </div>
    );
}
