import React from 'react';
import Image from 'next/image';

export default function ProfileCapsules() {
    const username = 'codershubinc';

    const badges = [
        {
            label: 'GitHub',
            url: `https://img.shields.io/github/followers/${username}?style=for-the-badge&logo=github&logoColor=white&labelColor=181717&color=007acc`,
            link: `https://github.com/${username}?tab=followers`
        },
        {
            label: 'Repos',
            url: `https://img.shields.io/badge/dynamic/json?style=for-the-badge&logo=github&logoColor=white&labelColor=181717&color=007acc&label=Repos&query=$.public_repos&url=https://api.github.com/users/${username}`,
            link: `https://github.com/${username}?tab=repositories`
        }
    ];

    return (
        <div className="hidden lg:flex items-center gap-3">
            {badges.map((badge) => (
                <a
                    key={badge.label}
                    href={badge.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative hover:scale-105 transition-all duration-300"
                >
                    <div className="absolute inset-0 bg-[#007acc]/0 group-hover:bg-[#007acc]/10 blur-sm rounded-md transition-all duration-300 group-hover:blur-md"></div>
                    <div className="relative rounded-md overflow-hidden shadow-md group-hover:shadow-lg group-hover:shadow-[#007acc]/30 transition-all duration-300 ring-1 ring-white/5 group-hover:ring-[#007acc]/50">
                        <Image
                            src={badge.url}
                            alt={badge.label}
                            width={120}
                            height={28}
                            className="h-7 w-auto"
                            unoptimized
                        />
                    </div>
                </a>
            ))}
        </div>
    );
}
