import React from "react";
import OrbitCard from "@/components/projects/OrbitCard";
import VSMusicCard from "@/components/projects/VSMusicCard";
import QuazaarCard from "@/components/projects/QuazaarCard";
import SpotifyWidget from "@/components/SpotifyWidget";
import TopLanguagesCard from "@/components/TopLanguagesCard";
import GitHubStatsCard from "@/components/GitHubStatsCard";
import GitHubContributions from "@/components/GitHubContributions";
import TodayContributionsBadge from "@/components/TodayContributionsBadge";
import ProfileCapsules from "@/components/ProfileCapsules";
import CurrentlyListeningMini from "@/components/CurrentlyListeningMini";
import ServerBootPanel from "@/components/ServerBootPanel";
import { Terminal, Github, Command, Coffee, BookOpen, Zap, MapPin, Clock, Cpu, Activity, Code2, Music, TrendingUp } from "lucide-react";
import Link from "next/link";

// Helper functions for sidebar data
async function getTopLanguages() {
  try {
    const res = await fetch('https://github-readme-states-repo-self-inst.vercel.app/api/json-top-langs?username=codershubinc', {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const data = await res.json();
      const languages = Object.values(data) as any[];
      const total = languages.reduce((acc, lang) => acc + lang.size, 0);
      return languages
        .sort((a, b) => b.size - a.size)
        .slice(0, 3)
        .map(lang => ({
          name: lang.name,
          percentage: ((lang.size / total) * 100).toFixed(1),
          color: lang.color
        }));
    }
  } catch (error) {
    console.error('Failed to fetch languages:', error);
  }
  return [];
}

async function getGitHubStats() {
  try {
    const res = await fetch('https://github-readme-states-repo-self-inst.vercel.app/api/json-stats?username=codershubinc', {
      next: { revalidate: 3600 }
    });
    if (res.ok) {
      const data = await res.json();
      return {
        stars: data.totalStars,
        commits: data.totalCommits,
        rank: data.rank.level
      };
    }
  } catch (error) {
    console.error('Failed to fetch GitHub stats:', error);
  }
  return null;
}

export default async function Home() {
  // Fetch sidebar data
  const topLanguages = await getTopLanguages();
  const githubStats = await getGitHubStats();
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#050505] to-[#000000] text-[#b0b0b0] selection:bg-[#007acc] selection:text-white font-sans overflow-x-hidden">
      {/* 1. Navbar (Professional) */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl shadow-lg shadow-black/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-zinc-100 font-bold tracking-tight">
            <Command size={18} className="text-[#007acc]" />
            <span className="font-mono">codershubinc</span>
          </div>
          <div className="flex items-center gap-4">
            <ProfileCapsules />
            <nav className="flex gap-6 text-xs md:text-sm font-mono font-medium text-[#666]">
              <a
                href="#projects"
                className="hover:text-white transition-colors"
              >
                ~/deployments
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                ~/profile
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* =========================================
          ZONE A: THE SYSTEM INTERFACE (Professional)
         ========================================= */}

      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto relative">
        {/* Background Accent */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#007acc]/5 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          {/* Left: Main Hero Content */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Status Badges */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#007acc]/10 to-[#0066b3]/10 border border-[#007acc]/30 w-fit text-xs font-mono font-bold text-[#007acc] uppercase tracking-wider shadow-lg shadow-[#007acc]/10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007acc] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007acc]"></span>
                </span>
                System Online
              </div>
              <TodayContributionsBadge />
            </div>

            <h1 className="text-6xl md:text-9xl font-mono font-bold gap-0.5  text-white tracking-tighter leading-[0.9] bg-gradient-to-b from-white to-gray-400 bg-clip-text">
              Swapnil Ingle<span className="text-[#007acc]">.</span>
            </h1>

            <div className="max-w-2xl space-y-5">
              <p className="text-2xl md:text-3xl text-transparent bg-gradient-to-r from-white to-gray-500 bg-clip-text font-medium">
                Backend Engineer & Linux Enthusiast.
              </p>
              <p className="text-[#888] leading-relaxed max-w-lg text-lg">
                Building high-performance tools and self-hosted infrastructure.
                Converting caffeine into{" "}
                <strong className="text-[#00D9FF]">Go</strong> and{" "}
                <strong className="text-[#3178C6]">TypeScript</strong>.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-6 font-mono text-sm">
              <a
                href="https://github.com/codershubinc"
                target="_blank"
                className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-[#007acc] hover:text-white transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#007acc]/30"
              >
                <Github
                  size={18}
                  className="group-hover:rotate-12 transition-transform"
                />
                GitHub
              </a>
              <a
                href="#projects"
                className="flex items-center gap-2 border-2 border-white/10 bg-white/5 text-white px-8 py-4 rounded-xl font-medium hover:border-[#007acc] hover:bg-[#007acc]/10 transition-all hover:scale-105 backdrop-blur-sm"
              >
                View Deployments
              </a>
            </div>
          </div>

          {/* Right: System Status Panel */}
          <ServerBootPanel>
            <div className="lg:col-span-4 hidden lg:block space-y-4">
              {/* Top 3 Languages */}
              <div className="p-4 rounded-lg bg-gradient-to-br from-black/40 to-black/20 border border-white/5 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Code2 size={14} className="text-[#007acc]" />
                  <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">Top Languages</span>
                </div>
                <div className="space-y-2">
                  {topLanguages.map((lang: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: lang.color }}></div>
                        <span className="text-xs text-white font-medium">{lang.name}</span>
                      </div>
                      <span className="text-xs font-mono text-zinc-500">{lang.percentage}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Currently Listening */}
              <CurrentlyListeningMini />

              {/* GitHub Stats */}
              {githubStats && (
                <div className="p-4 rounded-lg bg-gradient-to-br from-black/40 to-black/20 border border-white/5 backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <Github size={14} className="text-zinc-400" />
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">GitHub</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{githubStats.stars}</div>
                      <div className="text-[10px] text-zinc-500 uppercase">Total Stars</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-white">{githubStats.commits}</div>
                      <div className="text-[10px] text-zinc-500 uppercase">Commits</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-[#007acc]">{githubStats.rank}</div>
                      <div className="text-[10px] text-zinc-500 uppercase">Rank</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ServerBootPanel>
        </div>
      </section>

      {/* Projects Grid (Zone A) */}
      <section
        id="projects"
        className="py-24 px-6 max-w-6xl mx-auto border-t border-white/5 relative"
      >
        {/* Accent Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="flex items-end justify-between mb-16 relative z-10">
          <div>
            <h2 className="text-4xl font-bold text-white flex items-center gap-3 mb-2">
              <Terminal className="text-[#007acc]" size={28} />
              Featured Projects
            </h2>
            <p className="font-mono text-sm text-[#666]">
              Building tools that matter
            </p>
          </div>
          <span className="font-mono text-xs text-[#444] hidden md:block px-3 py-1 bg-white/5 rounded-lg border border-white/5">
            3 projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <VSMusicCard />
          <OrbitCard />
          <QuazaarCard />
        </div>
      </section>

      {/* =========================================
          TRANSITION: THE BREAK
         ========================================= */}
      <div className="w-full py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-[#007acc]/50 to-transparent"></div>
        </div>
      </div>

      {/* =========================================
          ZONE B: THE HUMAN SIDE (Casual)
         ========================================= */}

      <section id="about" className="py-24 px-6 max-w-6xl mx-auto relative">
        {/* Background Accent */}
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="grid md:grid-cols-12 gap-12 relative z-10">
          {/* Left Column: Bio & Story */}
          <div className="md:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 text-[#007acc] font-mono text-xs font-bold uppercase tracking-widest mb-2 px-3 py-1 bg-[#007acc]/10 rounded-full border border-[#007acc]/20">
              <Coffee size={14} />
              About Me
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-white to-gray-500 bg-clip-text leading-tight">
              B.Tech Student & <br />{" "}
              <span className="text-[#888]">Systems Explorer.</span>
            </h2>

            <div className="prose prose-invert text-[#b0b0b0] leading-7 space-y-4">
              <p>
                Hi, I&apos;m <b>Swapnil</b>. I&apos;m currently a{" "}
                <b>2nd Year B.Tech AIML student</b> based in Panvel, Mumbai.
              </p>
              <p>
                While I&apos;m still in university, I don&apos;t just study
                theory. I spend my nights digging into low-level systems,
                customizing <b>Arch Linux</b>, and building tools that improve
                my own workflow.
              </p>
              <p>
                My goal is simple: bridge the gap between simple web apps and
                high-performance system architecture. That&apos;s why I love{" "}
                <b>Go</b> and <b>Rust</b>—they let me touch the metal.
              </p>
            </div>

            {/* Tech Stack List (Casual) */}
            <div className="pt-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <Zap size={16} className="text-yellow-400" />
                Current Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "Go (Golang)",
                  "TypeScript",
                  "Rust",
                  "Node.js",
                  "Linux (Arch/Kali)",
                  "Docker",
                ].map((item) => (
                  <span
                    key={item}
                    className="px-4 py-2 rounded-xl bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/10 text-sm text-white hover:border-[#007acc]/50 transition-all hover:scale-105 cursor-default shadow-lg"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: "The Vibe" (Music & Stats) */}
          <div className="md:col-span-5 space-y-6">
            {/* 1. The Music Widget */}
            <SpotifyWidget />

            {/* 2. Top Languages */}
            <TopLanguagesCard />

            {/* 3. GitHub Stats */}
            <GitHubStatsCard />

            {/* 3.5 GitHub Contributions */}
            <GitHubContributions />

            {/* 4. University Status */}
            <div className="bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-6 rounded-2xl shadow-xl hover:border-white/10 transition-all">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                <BookOpen size={16} className="text-[#007acc]" />
                University Status
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center group">
                  <span className="text-[#888]">Institution</span>
                  <span className="text-white font-medium group-hover:text-[#007acc] transition-colors">
                    CSMU, Panvel
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-[#888]">Degree</span>
                  <span className="text-white font-medium group-hover:text-[#007acc] transition-colors">
                    B.Tech AIML
                  </span>
                </li>
                <li className="flex justify-between items-center group">
                  <span className="text-[#888]">Year</span>
                  <span className="text-white font-medium group-hover:text-[#007acc] transition-colors">
                    2nd Year
                  </span>
                </li>
              </ul>
            </div>

            {/* 5. Connect */}
            <div className="p-6 rounded-2xl border border-[#007acc]/30 bg-gradient-to-br from-[#007acc]/10 to-[#0066b3]/5 text-center shadow-xl shadow-[#007acc]/10 hover:shadow-2xl hover:shadow-[#007acc]/20 transition-all">
              <p className="text-white font-bold mb-3 text-lg">
                Want to build something?
              </p>
              <a
                href="mailto:ingleswapnil2004@gmail.com"
                className="text-[#007acc] hover:text-white text-sm font-medium transition-colors underline decoration-[#007acc]/50 hover:decoration-white"
              >
                ingleswapnil2004@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5 bg-black/40 backdrop-blur-xl text-center mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <div className="flex items-center gap-2 text-[#888]">
              <Command size={16} className="text-[#007acc]" />
              <p className="font-mono">
                &copy; 2026 CodersHubInc. Built with Next.js.
              </p>
            </div>
            <div className="flex items-center gap-6 text-[#666]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Panvel, IN
              </span>
              <span className="text-[#007acc] font-mono">
                All Systems Normal
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
