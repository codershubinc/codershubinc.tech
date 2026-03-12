import React from "react";
import { Terminal } from "lucide-react";
import { OrbitCard, VSMusicCard, QuazaarCard } from "@/components/projects";
import { CurrentlyListeningMini } from "@/components/spotify";
import { TodayContributionsCard } from "@/components/github";
import {
  ServerBootPanel,
  Navbar,
  ScrollReveal,
  HeroContent,
  WhoAmISection,
} from "@/components/ui";
import ProfileCapsules from "@/components/ui/ProfileCapsules";
import { WakatimeStats } from "@/components/wakatime";

export default async function Home() {
  return (
    <ServerBootPanel>
      <main className="min-h-screen bg-linear-to-b from-[#0a0a0a] via-[#050505] to-[#000000] text-[#b0b0b0] selection:bg-[#007acc] selection:text-white font-sans overflow-x-hidden">
        {/* 1. Navbar */}
        <Navbar capsules={<ProfileCapsules />} />

        {/* =========================================
          ZONE A: THE SYSTEM INTERFACE (Professional)
         ========================================= */}

        <section className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 max-w-6xl mx-auto relative">
          {/* Background Accent */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#007acc]/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Left: Main Hero Content */}
            <HeroContent />

            {/* Right: What I'm Doing Today */}
            <div className="lg:col-span-4 hidden lg:block space-y-4">
              {/* Today's Contributions Card */}
              <TodayContributionsCard />

              {/* Wakatime Stats */}
              <WakatimeStats />

              {/* Spotify mini  */}
              <CurrentlyListeningMini />
            </div>
          </div>
        </section>

        {/* ── divider ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
        </div>

        {/* Who Am I */}
        <WhoAmISection />

        {/* ── divider ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-[#007acc]/40 to-transparent" />
        </div>

        {/* Projects Grid */}
        <section
          id="projects"
          className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/5 relative"
        >
          {/* Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 blur-[100px] rounded-full pointer-events-none"></div>

          <div className="flex items-end justify-between mb-16 relative z-10">
            <ScrollReveal direction="left">
              <h2 className="text-2xl sm:text-4xl font-bold font-mono text-white flex items-center gap-3 mb-2 hover:text-[#007acc] transition-colors duration-300">
                <Terminal className="text-[#007acc] animate-pulse" size={28} />
                ls -la ./projects
              </h2>
              <p className="font-mono text-sm text-[#666]">
                drwxr-xr-x 3 codershubinc staff
              </p>
            </ScrollReveal>
            <span className="font-mono text-xs text-[#444] hidden md:block px-3 py-1 bg-white/5 rounded-lg border border-white/5">
              total 3
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            <ScrollReveal direction="left" delay={100}>
              <VSMusicCard />
            </ScrollReveal>
            <ScrollReveal direction="right" delay={200}>
              <OrbitCard />
            </ScrollReveal>
            <ScrollReveal direction="up" delay={300}>
              <QuazaarCard />
            </ScrollReveal>
          </div>
        </section>

        {/* ── divider ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/8 to-transparent" />
        </div>

        {/* Footer */}
        <footer className="relative mt-32 border-t border-white/5 bg-black/60 backdrop-blur-xl overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-b from-[#007acc]/5 via-transparent to-transparent pointer-events-none"></div>

          <ScrollReveal
            direction="up"
            className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16"
          >
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              {/* Brand Column */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <Terminal size={24} className="text-[#007acc]" />
                  <span className="font-mono font-bold text-xl text-white">
                    codershubinc
                  </span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  Building high-performance tools and self-hosted
                  infrastructure. Passionate about systems programming, Linux,
                  and open source.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href="https://github.com/codershubinc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#007acc]/20 hover:border-[#007acc] transition-all group"
                    aria-label="GitHub"
                  >
                    <svg
                      className="w-5 h-5 text-zinc-400 group-hover:text-[#007acc] transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/codershubinc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#007acc]/20 hover:border-[#007acc] transition-all group"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="w-5 h-5 text-zinc-400 group-hover:text-[#007acc] transition-colors"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="mailto:ingleswapnil2004@gmail.com"
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#007acc]/20 hover:border-[#007acc] transition-all group"
                    aria-label="Email"
                  >
                    <svg
                      className="w-5 h-5 text-zinc-400 group-hover:text-[#007acc] transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-mono font-bold text-white text-sm mb-4 uppercase tracking-wider">
                  Navigate
                </h4>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#projects"
                      className="text-zinc-400 hover:text-[#007acc] text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="text-[#007acc] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                      Projects
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="text-zinc-400 hover:text-[#007acc] text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="text-[#007acc] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/codershubinc"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-400 hover:text-[#007acc] text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="text-[#007acc] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:ingleswapnil2004@gmail.com"
                      className="text-zinc-400 hover:text-[#007acc] text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="text-[#007acc] opacity-0 group-hover:opacity-100 transition-opacity">
                        →
                      </span>
                      Contact
                    </a>
                  </li>
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="font-mono font-bold text-white text-sm mb-4 uppercase tracking-wider">
                  Built With
                </h4>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007acc]"></span>
                    Next.js 16
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007acc]"></span>
                    TypeScript
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007acc]"></span>
                    TailwindCSS 4
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#007acc]"></span>
                    Framer Motion
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-white/5">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
                  <span>© 2026 Swapnil Ingle</span>
                  <span className="hidden md:inline">•</span>
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    System Online
                  </span>
                  <span className="hidden md:inline">•</span>
                  <span>Made with ❤️ and ☕</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                  <span className="text-[#007acc]">v1.0.0</span>
                  <span>•</span>
                  <span>Panvel, India</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Decorative Element */}
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#007acc]/5 blur-[100px] rounded-full pointer-events-none"></div>
        </footer>
      </main>
    </ServerBootPanel>
  );
}
