'use client';

import React, { useState, useEffect } from 'react';
import { Clock, Code2, Monitor, Laptop, Terminal } from 'lucide-react';
import Image from 'next/image';
import { getLanguageIcon } from '@/lib/icons'; // Keep your existing icon helper

// Types
interface WakatimeData {
    total_seconds: number;
    total_time: string;
    weekly_total: string;
    weekly_seconds: number;
    projects: Array<{ name: string; text: string; percent: number }>;
    languages: Array<{ name: string; text: string; percent: number }>;
    editors: Array<{ name: string; text: string; percent: number }>;
    operating_systems: Array<{ name: string; text: string; percent: number }>;
    top_project: { name: string; text: string; percent: number } | null;
}

// Skeleton Loader to match the specific layout
const StatsSkeleton = () => (
    <div className="animate-pulse w-full">
        <div className="h-4 w-32 bg-zinc-800 rounded mb-6" />
        <div className="flex justify-between mb-8">
            <div className="space-y-2">
                <div className="h-8 w-24 bg-zinc-800 rounded" />
                <div className="h-3 w-12 bg-zinc-800 rounded" />
            </div>
            <div className="space-y-2 flex flex-col items-end">
                <div className="h-8 w-32 bg-zinc-800 rounded" />
                <div className="h-3 w-16 bg-zinc-800 rounded" />
            </div>
        </div>
        <div className="h-3 w-40 bg-zinc-800 rounded mb-4" />
        <div className="space-y-6">
            <div className="h-12 w-full bg-zinc-800 rounded" />
            <div className="h-12 w-full bg-zinc-800 rounded" />
        </div>
    </div>
);

export default function WakatimeStats() {
    const [data, setData] = useState<WakatimeData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchWakatimeData = async () => {
        try {
            const res = await fetch('/api/wakatime', { cache: 'no-store' });
            if (res.ok) {
                setData(await res.json());
            }
        } catch (error) {
            console.error('Wakatime error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWakatimeData();
        const interval = setInterval(fetchWakatimeData, 300000); // 5 mins
        return () => clearInterval(interval);
    }, []);

    if (isLoading) {
        return (
            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 w-full max-w-sm">
                <StatsSkeleton />
            </div>
        );
    }

    // Fallback if no data
    if (!data) return null;

    return (
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-2xl w-full max-w-sm font-sans">

            {/* --- Header --- */}
            <div className="flex items-center gap-2 mb-8 opacity-60">
                <Clock size={14} className="text-zinc-100" />
                <span className="text-xs font-bold tracking-widest text-zinc-100 uppercase">
                    Realtime Coding
                </span>
            </div>

            {/* --- Main Stats Grid --- */}
            <div className="flex justify-between items-start mb-8">
                {/* Today */}
                <div className="flex flex-col">
                    <span className="text-3xl font-mono text-white font-medium tracking-tight">
                        {data.total_time}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium mt-1">Today</span>
                </div>

                {/* This Week */}
                <div className="flex flex-col items-end text-right">
                    <span className="text-3xl font-mono font-medium tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                        {data.weekly_total}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium mt-1">This Week</span>
                </div>
            </div>

            {/* --- Divider --- */}
            <div className="h-px bg-white/5 w-full mb-6" />

            {/* --- Languages Section --- */}
            <div className="mb-6">
                <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-5">
                    Languages Today I Worked
                </h3>
                <div className="space-y-5">
                    {data.languages.slice(0, 3).map((lang) => {
                        const iconConfig = getLanguageIcon(lang.name);
                        return (
                            <div key={lang.name} className="group">
                                {/* Top Row: Icon + Name + Time */}
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        {iconConfig ? (
                                            <Image
                                                src={iconConfig.url}
                                                alt={lang.name}
                                                width={16}
                                                height={16}
                                                className="w-4 h-4"
                                            />
                                        ) : (
                                            <Code2 size={14} className="text-zinc-400" />
                                        )}
                                        <span className="text-sm text-zinc-200 font-medium">{lang.name}</span>
                                    </div>
                                    <span className="text-xs font-mono text-zinc-500">{lang.text}</span>
                                </div>

                                {/* Progress Bar */}
                                <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-purple-600 to-indigo-500 rounded-full"
                                        style={{ width: `${lang.percent}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* --- Divider --- */}
            <div className="h-px bg-white/5 w-full mb-4" />

            {/* --- Footer (Editor & OS) --- */}
            <div className="flex items-center justify-between text-xs text-zinc-500">
                {data.editors[0] && (
                    <div className="flex items-center gap-2">
                        <Code2 size={14} />
                        <span>{data.editors[0].name}</span>
                    </div>
                )}

                {data.operating_systems[0] && (
                    <div className="flex items-center gap-2">
                        <span>{data.operating_systems[0].name}</span>
                        <Terminal size={14} />
                    </div>
                )}
            </div>
        </div>
    );
}