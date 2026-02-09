import React from 'react';
import { Terminal, GitBranch } from 'lucide-react';

async function fetchGitHubProfile() {
    try {
        const res = await fetch('https://api.github.com/users/codershubinc', {
            next: { revalidate: 3600 }
        });
        if (res.ok) {
            const data = await res.json();
            return {
                followers: data.followers,
                repos: data.public_repos
            };
        }
    } catch (error) {
        console.error('Failed to fetch GitHub profile:', error);
    }
    return { followers: 0, repos: 0 };
}

export default async function ProfileCapsules() {
    const profile = await fetchGitHubProfile();

    return (
        <div className="hidden lg:flex items-center gap-3">
            {/* Followers */}
            <a
                href="https://github.com/codershubinc?tab=followers"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
            >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 border border-white/10 hover:border-[#007acc]/50 transition-all font-mono text-xs hover:scale-105">
                    <Terminal size={12} className="text-[#007acc]" />
                    <span className="text-zinc-500">--followers</span>
                    <span className="text-white font-bold">{profile.followers}</span>
                </div>
            </a>

            {/* Repos */}
            <a
                href="https://github.com/codershubinc?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
            >
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/60 border border-white/10 hover:border-[#007acc]/50 transition-all font-mono text-xs hover:scale-105">
                    <GitBranch size={12} className="text-[#007acc]" />
                    <span className="text-zinc-500">--repos</span>
                    <span className="text-white font-bold">{profile.repos}</span>
                </div>
            </a>
        </div>
    );
}
