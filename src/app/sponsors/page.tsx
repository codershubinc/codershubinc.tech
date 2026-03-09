import React from "react";
import { Command, Heart, ArrowLeft, ExternalLink, Terminal } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { SPONSORS, FEATURED_SPONSORS, SPONSOR_TIERS } from "@/components/sponsors/data";
import { SponsorTierSection } from "@/components/sponsors/SponsorTierSection";
import { FeaturedSponsorSection } from "@/components/sponsors/FeaturedSponsorSection";

export const metadata: Metadata = {
  title: "Sponsors | CodersHubInc",
  description: "Support CodersHubInc and help fund open-source development. Become a sponsor today.",
};

export default function SponsorsPage() {
  const goldSponsors = SPONSORS.filter((s) => s.tier === "gold");
  const silverSponsors = SPONSORS.filter((s) => s.tier === "silver");
  const bronzeSponsors = SPONSORS.filter((s) => s.tier === "bronze");

  return (
    <main className="min-h-screen bg-linear-to-b from-[#0a0a0a] via-[#050505] to-[#000000] text-[#b0b0b0] selection:bg-[#007acc] selection:text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl shadow-lg shadow-black/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-100 font-bold tracking-tight hover:text-[#007acc] transition-colors">
            <Command size={18} className="text-[#007acc]" />
            <span className="font-mono">codershubinc</span>
          </Link>
          <nav className="flex items-center gap-6 text-xs md:text-sm font-mono font-medium text-[#666]">
            <Link href="/#projects" className="hover:text-white transition-colors">
              ~/deployments
            </Link>
            <Link href="/#about" className="hover:text-white transition-colors">
              ~/profile
            </Link>
            <Link href="/sponsors" className="text-[#007acc] font-semibold">
              ~/sponsors
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-36 pb-16 px-6 max-w-6xl mx-auto relative">
        {/* Ambient glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#007acc]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10">
          <div className="animate-in fade-in slide-in-from-top duration-500 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#555] font-mono text-xs hover:text-[#007acc] transition-colors mb-8"
            >
              <ArrowLeft size={14} />
              cd ..
            </Link>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom duration-700 text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#007acc]/10 border border-[#007acc]/30 text-xs font-mono font-bold text-[#007acc] uppercase tracking-wider mb-8 shadow-lg shadow-[#007acc]/10">
              <Heart size={14} className="animate-pulse" />
              open source funding
            </div>

            <h1 className="text-5xl md:text-7xl font-mono font-bold text-white tracking-tighter leading-[0.95] bg-linear-to-b from-white to-gray-400 bg-clip-text mb-6 animate-in fade-in zoom-in duration-700 delay-200">
              Sponsor the Build
              <span className="text-[#007acc] animate-pulse">.</span>
            </h1>

            <p className="text-[#888] text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom duration-700 delay-300">
              Every tool I build is free and open-source. Your sponsorship keeps the
              servers alive, the coffee flowing, and the commits shipping.
            </p>

            <div className="flex flex-wrap justify-center gap-4 font-mono text-sm animate-in fade-in slide-in-from-bottom duration-700 delay-500">
              <a
                href="https://github.com/sponsors/codershubinc"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-[#007acc] hover:text-white transition-all hover:scale-110 hover:shadow-xl hover:shadow-[#007acc]/30 active:scale-95"
              >
                <Heart size={18} className="group-hover:scale-110 transition-transform duration-300" />
                Become a Sponsor
              </a>
              <a
                href="https://github.com/codershubinc"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-2 border-white/10 bg-white/5 text-white px-8 py-4 rounded-xl font-medium hover:border-[#007acc] hover:bg-[#007acc]/10 transition-all hover:scale-110 backdrop-blur-sm active:scale-95"
              >
                <Terminal size={18} />
                gh profile view
              </a>
            </div>

            {/* GitHub Sponsors Button */}
            <div className="mt-10 flex justify-center animate-in fade-in zoom-in duration-700 delay-700">
              <iframe
                src="https://github.com/sponsors/codershubinc/button"
                title="Sponsor codershubinc"
                height="32"
                width="114"
                style={{ border: 0, borderRadius: "6px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="h-px bg-linear-to-r from-transparent via-[#007acc]/40 to-transparent" />
      </div>

      {/* Featured Sponsors — individual profiles */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="animate-in fade-in slide-in-from-left duration-700 mb-12">
          <h2 className="text-3xl font-bold font-mono text-white flex items-center gap-3 mb-2 hover:text-[#007acc] transition-colors duration-300">
            <Terminal className="text-[#007acc] animate-pulse" size={24} />
            ls -la ./featured sponsors
          </h2>
          <p className="font-mono text-sm text-[#555]">
            # The people who made this possible
          </p>
        </div>

        <div className="flex flex-col gap-16">
          {FEATURED_SPONSORS.map((sponsor, i) => (
            <FeaturedSponsorSection key={sponsor.id} sponsor={sponsor} reversed={i % 2 !== 0} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Current Sponsors */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="animate-in fade-in slide-in-from-left duration-700 mb-12">
          <h2 className="text-3xl font-bold font-mono text-white flex items-center gap-3 mb-2 hover:text-[#007acc] transition-colors duration-300">
            <Terminal className="text-[#007acc] animate-pulse" size={24} />
            cat ./sponsors.json
          </h2>
          <p className="font-mono text-sm text-[#555]">
            # The amazing people fueling this work
          </p>
        </div>

        {/* Gold Sponsors */}
        <SponsorTierSection tier={SPONSOR_TIERS[0]} sponsors={goldSponsors} />

        {/* Silver Sponsors */}
        <SponsorTierSection tier={SPONSOR_TIERS[1]} sponsors={silverSponsors} />

        {/* Bronze Sponsors */}
        <SponsorTierSection tier={SPONSOR_TIERS[2]} sponsors={bronzeSponsors} />
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Tier Cards */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="animate-in fade-in slide-in-from-left duration-700 mb-12">
          <h2 className="text-3xl font-bold font-mono text-white flex items-center gap-3 mb-2 hover:text-[#007acc] transition-colors duration-300">
            <Terminal className="text-[#007acc] animate-pulse" size={24} />
            ls -la ./tiers
          </h2>
          <p className="font-mono text-sm text-[#555]">
            # Pick the tier that works for you
          </p>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#007acc]/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10 animate-in fade-in zoom-in duration-700">
          <p className="font-mono text-[#555] text-xs uppercase tracking-widest mb-4">
            # even $1 makes a difference
          </p>
          <h3 className="text-3xl md:text-4xl font-bold font-mono text-white mb-6">
            Every contribution <span className="text-[#007acc]">ships code.</span>
          </h3>
          <a
            href="https://github.com/sponsors/codershubinc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#007acc] text-white px-10 py-4 rounded-xl font-mono font-bold hover:bg-[#0066b3] hover:scale-110 hover:shadow-xl hover:shadow-[#007acc]/30 transition-all active:scale-95"
          >
            <Heart size={18} />
            Sponsor on GitHub
            <ExternalLink size={14} />
          </a>
        </div>
      </section>
    </main>
  );
}
