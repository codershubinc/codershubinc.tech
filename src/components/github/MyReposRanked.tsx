import React from 'react';
import { Star, GitFork, Boxes } from 'lucide-react';
interface Repo {
    id: number;
    name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    html_url: string;
    language: string;
    languages_url: string;
    detailedLanguages?: { name: string; percent: number; color: string }[];
}

const colors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Go: '#00ADD8',
    Rust: '#dea584',
    Shell: '#89e051',
    Vue: '#41b883',
    SCSS: '#c6538c',
    Java: '#b07219',
    'C++': '#f34b7d',
    'C#': '#178600',
    PHP: '#4F5D95',
    Ruby: '#701516',
};

async function fetchTopRepos() {
    try {
        const res = await fetch('https://api.github.com/users/codershubinc/repos?per_page=100', {
            next: { revalidate: 3600 }
        });
        if (!res.ok) return [];

        const repos = await res.json();
        const top5 = repos
            .sort((a: { stargazers_count: number }, b: { stargazers_count: number }) => b.stargazers_count - a.stargazers_count)
            .slice(0, 5) as Repo[];

        // Fetch languages details
        const enrichedRepos = await Promise.all(top5.map(async (repo) => {
            try {
                const langRes = await fetch(repo.languages_url, { next: { revalidate: 3600 } });
                const langs = await langRes.json();

                const totalBytes = Object.values(langs).reduce((a: any, b: any) => a + b, 0) as number;
                const detailedLanguages = Object.entries(langs).map(([name, bytes]) => ({
                    name,
                    percent: Number((((bytes as number) / totalBytes) * 100).toFixed(1)),
                    color: colors[name] || '#888'
                })).sort((a, b) => b.percent - a.percent);

                return { ...repo, detailedLanguages };
            } catch (error) {
                return { ...repo, detailedLanguages: [] };
            }
        }));

        return enrichedRepos;
    } catch (error) {
        console.error('Failed to fetch repos:', error);
    }
    return [];
}

export default async function MyReposRanked() {
    const repos = await fetchTopRepos();

    if (!repos || repos.length === 0) {
        return (
            <div className="bg-linear-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-6 rounded-2xl shadow-xl">
                <h3 className="text-white font-mono font-bold mb-4 flex items-center gap-2">
                    <Star size={16} className="text-yellow-500" />
                    gh repo list --limit=5 --sort stars
                </h3>
                <div className="text-[#666] text-sm">Unable to load repositories</div>
            </div>
        );
    }

    return (
        <div className="bg-linear-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-6 rounded-2xl relative shadow-xl focus-within:z-50 group h-full sm:h-auto min-h-0 md:min-h-full">
            {/* Background Glow */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/5 blur-[80px] rounded-full group-hover:bg-yellow-500/10 transition-all duration-500"></div>
            </div>

            <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-center justify-between mb-5">
                    <h3 className="text-white font-mono font-bold flex items-center gap-2">
                        <Star size={16} className="text-yellow-500" />
                        gh repo list --limit=5 --sort stars
                    </h3>
                </div>

                <div className="flex flex-col gap-3 flex-1">
                    {repos.map((repo: Repo, i: number) => (
                        <div key={repo.id} className="relative group/repo bg-[#0a0a0a] border border-white/5 p-3 rounded-lg hover:border-white/20 transition-colors flex items-center justify-between flex-1 min-h-[50px] cursor-pointer">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <span className={
                                    `font-mono text-xs w-4 text-center rounded-sm shrink-0 ` +
                                    (i === 0 ? "text-yellow-500 font-bold" : i === 1 ? "text-gray-300 font-bold" : i === 2 ? "text-amber-700 font-bold" : "text-[#444]")
                                }>
                                    {i + 1}
                                </span>
                                <div className="flex flex-col truncate">
                                    <a
                                        href={repo.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white text-sm font-semibold truncate hover:text-[#007acc] transition-colors"
                                    >
                                        {repo.name}
                                    </a>
                                    {repo.description && (
                                        <span className="text-xs text-[#666] truncate mt-0.5 max-w-[200px]">
                                            {repo.description}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-3 pl-3 shrink-0">
                                {repo.detailedLanguages && repo.detailedLanguages[0] && (
                                    <div className="flex items-center gap-1.5 hidden sm:flex">
                                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: repo.detailedLanguages[0].color }}></span>
                                        <span className="text-[10px] text-[#666] font-mono">{repo.detailedLanguages[0].name}</span>
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5 min-w-[2.5rem] justify-end">
                                    <span className="text-xs font-mono text-[#888] group-hover/repo:text-white transition-colors">
                                        {repo.stargazers_count}
                                    </span>
                                    <Star size={12} className="text-[#888] group-hover/repo:text-yellow-500 transition-colors" />
                                </div>
                            </div>

                            {/* Hover Popover */}
                            <div className="absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 w-64 md:w-72 bg-[#141414] border border-white/10 p-4 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] opacity-0 invisible group-hover/repo:opacity-100 group-hover/repo:visible transition-all duration-300 z-[100] pointer-events-none scale-95 group-hover/repo:scale-100 origin-right">
                                <div className="flex items-center gap-2 mb-2">
                                    <Boxes size={14} className="text-white/60" />
                                    <span className="text-white text-sm font-semibold truncate">{repo.name}</span>
                                </div>
                                {repo.description && (
                                    <p className="text-xs text-[#888] mb-4 leading-relaxed line-clamp-2">
                                        {repo.description}
                                    </p>
                                )}

                                <div className="flex items-center gap-4 mb-4 text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <Star size={12} className="text-yellow-500" />
                                        <span className="text-white font-mono">{repo.stargazers_count}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <GitFork size={12} className="text-gray-400" />
                                        <span className="text-white font-mono">{repo.forks_count}</span>
                                    </div>
                                </div>

                                <div className="pt-3 border-t border-white/5">
                                    <div className="w-full h-1.5 rounded-full flex overflow-hidden mb-3 bg-[#222]">
                                        {repo.detailedLanguages?.map((lang) => (
                                            <div
                                                key={lang.name}
                                                style={{ width: `${lang.percent}%`, backgroundColor: lang.color }}
                                                className="h-full"
                                            />
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                        {repo.detailedLanguages?.slice(0, 4).map((lang) => (
                                            <div key={lang.name} className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-1.5 truncate flex-1 pr-2">
                                                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: lang.color }}></span>
                                                    <span className="text-[#888] truncate">{lang.name}</span>
                                                </div>
                                                <span className="text-white font-mono shrink-0">{lang.percent}%</span>
                                            </div>
                                        ))}
                                        {repo.detailedLanguages && repo.detailedLanguages.length > 4 && (
                                            <div className="col-span-2 text-xs text-[#555] mt-1 italic">
                                                +{repo.detailedLanguages.length - 4} more
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
