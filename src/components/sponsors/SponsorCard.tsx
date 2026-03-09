import { ExternalLink } from "lucide-react";
import type { SponsorEntry, Tier } from "./data";

export function SponsorCard({ sponsor, tier }: { sponsor: SponsorEntry; tier: Tier }) {
    const Wrapper = sponsor.url ? "a" : "div";
    const wrapperProps = sponsor.url
        ? { href: sponsor.url, target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
        <Wrapper
            {...wrapperProps}
            className="group relative flex items-center gap-4 px-4 py-3 rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-lg hover:shadow-black/20"
            style={{
                // We use a subtle gradient instead of a flat background for a modern feel
                background: `linear-gradient(145deg, ${tier.bg}40, ${tier.bg}10)`,
                borderColor: `${tier.border}40`
            }}
        >
            {/* Ambient Glow Effect - Adds depth based on tier color */}
            <div
                className="absolute -right-4 -top-8 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{ background: tier.color }}
            />

            {/* Avatar Section */}
            <div className="relative shrink-0">
                {sponsor.avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={sponsor.avatar}
                        alt={sponsor.name}
                        className="size-10 rounded-full object-cover ring-2 ring-white/5 group-hover:ring-white/20 transition-all"
                        style={{ borderColor: tier.border }}
                    />
                ) : (
                    <div
                        className="size-10 rounded-full flex items-center justify-center text-sm font-bold font-mono ring-2 ring-white/5"
                        style={{
                            background: `linear-gradient(135deg, ${tier.bg}, ${tier.border})`,
                            color: tier.color
                        }}
                    >
                        {sponsor.name.charAt(0).toUpperCase()}
                    </div>
                )}

            </div>

            {/* Content Section */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
                <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-gray-200 truncate group-hover:text-white transition-colors">
                        {sponsor.name}
                    </span>
                    {sponsor.url && (
                        <ExternalLink
                            size={10}
                            className="opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-300 text-gray-400"
                        />
                    )}
                </div>

                {sponsor.description && (
                    <p className="font-mono text-[10px] leading-tight text-gray-500 truncate mt-0.5 group-hover:text-gray-400 transition-colors">
                        {sponsor.description}
                    </p>
                )}
            </div>
        </Wrapper>
    );
}