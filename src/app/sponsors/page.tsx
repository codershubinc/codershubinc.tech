import React from "react";
import { Command, Heart, Star, Zap, Coffee, ArrowLeft, ExternalLink, Terminal } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsors | CodersHubInc",
  description: "Support CodersHubInc and help fund open-source development. Become a sponsor today.",
};

const SPONSORS: {
  tier: "gold" | "silver" | "bronze";
  name: string;
  url?: string;
  avatar?: string;
  description?: string;
}[] = [
  // Placeholder — real sponsors will be added here
];

const SPONSOR_TIERS = [
  {
    id: "gold",
    label: "Gold",
    icon: Star,
    color: "#FFD700",
    glow: "rgba(255,215,0,0.15)",
    border: "rgba(255,215,0,0.3)",
    bg: "rgba(255,215,0,0.05)",
    price: "$50 / month",
    perks: [
      "Name & logo on README and website",
      "Shout-out in release notes",
      "Priority issue responses",
      "Direct Discord access",
    ],
  },
  {
    id: "silver",
    label: "Silver",
    icon: Zap,
    color: "#C0C0C0",
    glow: "rgba(192,192,192,0.15)",
    border: "rgba(192,192,192,0.3)",
    bg: "rgba(192,192,192,0.05)",
    price: "$20 / month",
    perks: [
      "Name on README and website",
      "Shout-out in release notes",
      "Priority issue responses",
    ],
  },
  {
    id: "bronze",
    label: "Bronze",
    icon: Coffee,
    color: "#CD7F32",
    glow: "rgba(205,127,50,0.15)",
    border: "rgba(205,127,50,0.3)",
    bg: "rgba(205,127,50,0.05)",
    price: "$5 / month",
    perks: [
      "Name in the sponsors list",
      "A big thank you from the maintainer",
    ],
  },
] as const;

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
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="h-px bg-linear-to-r from-transparent via-[#007acc]/40 to-transparent" />
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPONSOR_TIERS.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} delay={i * 100} />
          ))}
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

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

type Tier = (typeof SPONSOR_TIERS)[number];
type SponsorEntry = (typeof SPONSORS)[number];

function SponsorTierSection({
  tier,
  sponsors,
}: {
  tier: Tier;
  sponsors: SponsorEntry[];
}) {
  const Icon = tier.icon;

  return (
    <div className="mb-12">
      {/* Tier heading */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="p-1.5 rounded-lg border"
          style={{ background: tier.bg, borderColor: tier.border }}
        >
          <Icon size={16} style={{ color: tier.color }} />
        </div>
        <span className="font-mono text-sm font-bold" style={{ color: tier.color }}>
          {tier.label} Sponsors
        </span>
        <span className="font-mono text-xs text-[#444] px-2 py-0.5 bg-white/5 rounded border border-white/5">
          {sponsors.length === 0 ? "none yet" : `${sponsors.length} sponsor${sponsors.length > 1 ? "s" : ""}`}
        </span>
      </div>

      {sponsors.length === 0 ? (
        /* Empty state */
        <div
          className="border rounded-xl p-8 text-center"
          style={{ borderColor: tier.border, background: tier.bg }}
        >
          <Icon size={28} className="mx-auto mb-3 opacity-40" style={{ color: tier.color }} />
          <p className="font-mono text-sm text-[#555]">
            Be the first {tier.label.toLowerCase()} sponsor!
          </p>
          <a
            href="https://github.com/sponsors/codershubinc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-4 font-mono text-xs hover:underline transition-all"
            style={{ color: tier.color }}
          >
            Sponsor on GitHub <ExternalLink size={11} />
          </a>
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {sponsors.map((s) => (
            <SponsorCard key={s.name} sponsor={s} tier={tier} />
          ))}
        </div>
      )}
    </div>
  );
}

function SponsorCard({ sponsor, tier }: { sponsor: SponsorEntry; tier: Tier }) {
  const card = (
    <div
      className="group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all hover:scale-105"
      style={{ background: tier.bg, borderColor: tier.border }}
    >
      {sponsor.avatar ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={sponsor.avatar}
          alt={sponsor.name}
          className="w-8 h-8 rounded-full border border-white/10"
        />
      ) : (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold font-mono"
          style={{ borderColor: tier.border, color: tier.color, background: tier.bg }}
        >
          {sponsor.name.charAt(0).toUpperCase()}
        </div>
      )}
      <div>
        <div className="font-mono text-sm font-semibold text-white group-hover:text-white transition-colors">
          {sponsor.name}
        </div>
        {sponsor.description && (
          <div className="font-mono text-[10px] text-[#555]">{sponsor.description}</div>
        )}
      </div>
      {sponsor.url && <ExternalLink size={12} className="ml-auto opacity-40 group-hover:opacity-80" style={{ color: tier.color }} />}
    </div>
  );

  return sponsor.url ? (
    <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
      {card}
    </a>
  ) : (
    card
  );
}

function TierCard({ tier, delay }: { tier: Tier; delay: number }) {
  const Icon = tier.icon;

  return (
    <div
      className="group relative rounded-2xl border overflow-hidden transition-all duration-500 hover:scale-[1.02] animate-in fade-in slide-in-from-bottom duration-700"
      style={{
        borderColor: tier.border,
        background: tier.bg,
        animationDelay: `${delay}ms`,
        boxShadow: `0 0 0 transparent`,
      }}
    >
      {/* Glow effect on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at top left, ${tier.glow}, transparent 60%)` }}
      />

      <div className="relative z-10 p-6">
        {/* Icon + label */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="p-2.5 rounded-lg border"
            style={{ background: tier.bg, borderColor: tier.border }}
          >
            <Icon size={20} style={{ color: tier.color }} />
          </div>
          <div>
            <div className="font-mono font-bold text-white text-base">{tier.label}</div>
            <div className="font-mono text-xs" style={{ color: tier.color }}>
              {tier.price}
            </div>
          </div>
        </div>

        {/* Perks */}
        <ul className="space-y-2 mb-6">
          {tier.perks.map((perk) => (
            <li key={perk} className="flex items-start gap-2 text-xs text-[#888] font-mono">
              <span style={{ color: tier.color }} className="mt-0.5 shrink-0">
                ▸
              </span>
              {perk}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="https://github.com/sponsors/codershubinc"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border font-mono text-xs font-semibold transition-all hover:scale-105 active:scale-95"
          style={{
            borderColor: tier.border,
            color: tier.color,
            background: tier.bg,
          }}
        >
          <Heart size={13} />
          Sponsor ({tier.price})
        </a>
      </div>
    </div>
  );
}
