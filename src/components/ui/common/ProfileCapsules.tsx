import React from "react";
import { Terminal, GitBranch } from "lucide-react";

function compactNumber(value: number): string {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

async function fetchGitHubProfile() {
  try {
    const res = await fetch("https://api.github.com/users/codershubinc", {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      return {
        followers: data.followers,
        repos: data.public_repos,
      };
    }
  } catch (error) {
    console.error("Failed to fetch GitHub profile:", error);
  }
  return { followers: 0, repos: 0 };
}

export default async function ProfileCapsules() {
  const profile = await fetchGitHubProfile();

  return (
    <div className="hidden lg:flex items-center gap-2.5">
      {/* Followers */}
      <a
        href="https://github.com/codershubinc?tab=followers"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        aria-label="View GitHub followers"
      >
        <div className="relative overflow-hidden flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-linear-to-br from-black/70 to-[#0b1118]/80 border border-white/10 group-hover:border-[#007acc]/45 transition-colors duration-300 font-mono text-xs whitespace-nowrap">
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-[#007acc]/0 via-[#007acc]/8 to-[#007acc]/0" />
          <Terminal size={12} className="text-[#45b0ff] relative z-10" />
          <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors relative z-10 whitespace-nowrap">
            --cult-members
          </span>
          <span className="text-white font-bold tabular-nums relative z-10 whitespace-nowrap">
            {compactNumber(profile.followers)}
          </span>
        </div>
      </a>

      {/* Repos */}

      <a
        href="https://github.com/codershubinc?tab=repositories"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
        aria-label="View GitHub repositories"
      >
        <div className="relative overflow-hidden flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-linear-to-br from-black/70 to-[#0b1118]/80 border border-white/10 group-hover:border-[#007acc]/45 transition-colors duration-300 font-mono text-xs whitespace-nowrap">
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-linear-to-r from-[#007acc]/0 via-[#007acc]/8 to-[#007acc]/0" />
          <GitBranch size={12} className="text-[#45b0ff] relative z-10" />
          <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors relative z-10 whitespace-nowrap">
            --public.repos
          </span>
          <span className="text-white font-bold tabular-nums relative z-10 whitespace-nowrap">
            {compactNumber(profile.repos)}
          </span>
        </div>
      </a>
    </div>
  );
}
