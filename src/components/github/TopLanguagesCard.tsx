import React from 'react';
import { Code2, TrendingUp, FileCode } from 'lucide-react';
import Image from 'next/image';
import { getLanguageIcon } from '@/lib/icons';

interface Language {
    name: string;
    color: string;
    size: number;
    count: number;
}

interface TopLanguagesData {
    [key: string]: Language;
}

async function fetchTopLanguages(): Promise<TopLanguagesData | null> {
    try {
        const res = await fetch('https://github-readme-states-repo-self-inst.vercel.app/api/json-top-langs?username=codershubinc', {
            next: { revalidate: 3600 }
        });
        if (res.ok) {
            return await res.json();
        }
    } catch (error) {
        console.error('Failed to fetch top languages:', error);
    }
    return null;
}

export default async function TopLanguagesCard() {
    const data = await fetchTopLanguages();

    if (!data) {
        return (
            <div className="bg-linear-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-6 rounded-2xl shadow-xl">
                <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
                    <Code2 size={16} className="text-[#007acc]" />
                    git log --pretty=format: | sort | uniq -c
                </h3>
                <div className="text-[#666] text-sm">Unable to load language data</div>
            </div>
        );
    }

    // Calculate total size for percentages
    const languages = Object.values(data);
    const totalSize = languages.reduce((acc, lang) => acc + lang.size, 0);

    // Sort by size and get top 5
    const topLanguages = languages
        .sort((a, b) => b.size - a.size)
        .slice(0, 5);

    return (
        <div className="bg-linear-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-6 rounded-2xl relative overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-[#007acc]/10 transition-all group">
            {/* Gradient accent */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#007acc]/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-[#007acc]/20 transition-all duration-500"></div>

            <div className="relative z-10">
                <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
                    <Code2 size={16} className="text-[#007acc]" />
                    git log --pretty=format: | sort | uniq -c
                </h3>

                <div className="space-y-3">
                    {topLanguages.map((lang) => {
                        const percentage = ((lang.size / totalSize) * 100).toFixed(1);
                        const iconConfig = getLanguageIcon(lang.name);
                        return (
                            <div key={lang.name}>
                                <div className="flex items-center justify-between mb-1.5">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center justify-center w-5 h-5 rounded bg-white/5 border border-white/10">
                                            {iconConfig ? (
                                                <Image
                                                    src={iconConfig.url}
                                                    alt={lang.name}
                                                    width={32}
                                                    height={32}
                                                />
                                            ) : (
                                                <FileCode size={14} className="text-zinc-400" />
                                            )}
                                        </div>
                                        <span className="text-sm text-white font-medium">{lang.name}</span>
                                    </div>
                                    <span className="text-xs text-[#888] font-mono">{percentage}%</span>
                                </div>
                                <div className="w-full h-2 bg-[#222] rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className="h-full rounded-full transition-all duration-500 shadow-sm"
                                        style={{
                                            backgroundColor: lang.color,
                                            width: `${percentage}%`,
                                            boxShadow: `0 0 10px ${lang.color}40`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Summary Stats */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[#888]">
                        <TrendingUp size={12} className="text-[#007acc]" />
                        <span>{languages.length} Languages</span>
                    </div>
                    <div className="text-[#666]">
                        {Math.floor(totalSize / 1024)}KB Total
                    </div>
                </div>
            </div>
        </div>
    );
}
