import { ExternalLink } from "lucide-react";
import { SponsorCard } from "./SponsorCard";
import type { SponsorEntry, Tier } from "./data";

export function SponsorTierSection({
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
                    {sponsors.length === 0
                        ? "none yet"
                        : `${sponsors.length} sponsor${sponsors.length > 1 ? "s" : ""}`}
                </span>
            </div>

            {sponsors.length === 0 ? (
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
