'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Code2, Loader2 } from 'lucide-react';

interface WakatimeData {
    total_seconds: number;
    total_time: string;
    projects: Array<{ name: string; text: string; percent: number }>;
    languages: Array<{ name: string; text: string; percent: number }>;
    top_project: { name: string; text: string; percent: number } | null;
}

export default function WakatimeStats() {
    const [wakatimeData, setWakatimeData] = useState<WakatimeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWakatimeData = async () => {
        try {
            const res = await fetch('/api/wakatime', {
                cache: 'no-store',
            });
            if (res.ok) {
                const data = await res.json();
                setWakatimeData(data);
            }
        } catch (error) {
            console.error('Failed to fetch Wakatime data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWakatimeData();
        // Refresh every 5 minutes
        const interval = setInterval(fetchWakatimeData, 300000);
        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <div className="p-5 rounded-lg bg-linear-to-br from-purple-500/10 to-black/40 border border-purple-500/30 backdrop-blur-sm">
                <div className="flex items-center justify-center py-4">
                    <Loader2 size={20} className="animate-spin text-purple-400" />
                </div>
            </div>
        );
    }

    if (!wakatimeData || wakatimeData.total_seconds === 0) {
        return (
            <div className="p-5 rounded-lg bg-linear-to-br from-purple-500/10 to-black/40 border border-purple-500/30 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} className="text-purple-400" />
                    <span className="text-sm font-mono text-white font-bold">Coding Today</span>
                </div>
                <p className="text-xs text-zinc-400">No coding time tracked yet today</p>
            </div>
        );
    }

    return (
        <div className="p-5 rounded-lg bg-linear-to-br from-purple-500/10 to-black/40 border border-purple-500/30 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 shadow-lg shadow-purple-500/10">
            <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-purple-400" />
                <span className="text-sm font-mono text-white font-bold">Coding Today</span>
            </div>

            {/* Total Time */}
            <div className="mb-4 pb-4 border-b border-white/5">
                <div className="text-2xl font-bold text-white font-mono">
                    {wakatimeData.total_time}
                </div>
                <div className="text-xs text-zinc-500 mt-1">Total coding time</div>
            </div>

            {/* Top Project */}
            {wakatimeData.top_project && (
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Code2 size={12} className="text-purple-400" />
                        <span className="text-xs font-mono text-zinc-400">Current Project</span>
                    </div>
                    <div className="bg-black/40 rounded-lg p-3 border border-white/5">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-white font-medium truncate">
                                {wakatimeData.top_project.name}
                            </span>
                            <span className="text-xs text-purple-400 font-mono ml-2">
                                {wakatimeData.top_project.text}
                            </span>
                        </div>
                        <div className="mt-2 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-300"
                                style={{ width: `${wakatimeData.top_project.percent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Top Languages */}
            {wakatimeData.languages.length > 0 && (
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Code2 size={12} className="text-purple-400" />
                        <span className="text-xs font-mono text-zinc-400">Languages</span>
                    </div>
                    <div className="space-y-2">
                        {wakatimeData.languages.map((lang, idx) => (
                            <div key={idx} className="flex items-center justify-between text-xs">
                                <span className="text-zinc-300">{lang.name}</span>
                                <span className="text-zinc-500 font-mono">{lang.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
