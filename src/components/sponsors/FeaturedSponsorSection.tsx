"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, ExternalLink, Quote } from "lucide-react";
import { SPONSOR_TIERS } from "./data";
import type { FeaturedSponsor } from "./data";
import { ImageLightbox } from "./ImageLightbox";

export function FeaturedSponsorSection({
    sponsor,
    reversed,
}: {
    sponsor: FeaturedSponsor;
    reversed: boolean;
}) {
    const tierMeta = SPONSOR_TIERS.find((t) => t.id === sponsor.tier)!;
    const TierIcon = tierMeta.icon;
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    return (
        <>
            <div className="group relative rounded-3xl border border-[#007acc]/20 bg-[#07080d] overflow-hidden shadow-2xl shadow-black/40 hover:border-[#007acc]/40 transition-all duration-500">
                {/* Ambient glow */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-40 bg-[#007acc]/5 blur-[60px] rounded-full pointer-events-none" />

                {/* Top header bar */}
                <div className="flex items-center justify-between px-6 py-3 border-b border-[#007acc]/15 bg-[#007acc]/5">
                    <div className="flex items-center gap-3">
                        <div
                            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-widest"
                            style={{ borderColor: tierMeta.border, color: tierMeta.color, background: tierMeta.bg }}
                        >
                            <TierIcon size={10} />
                            {tierMeta.label} Sponsor
                        </div>
                        <span className="font-mono text-[11px] text-[#444]">since {sponsor.joinedDate}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#007acc] animate-pulse" />
                        <span className="font-mono text-[10px] text-[#007acc]/50">active</span>
                    </div>
                </div>

                <div className={`flex flex-col ${reversed ? "lg:flex-row-reverse" : "lg:flex-row"} gap-0`}>
                    {/* Image gallery */}
                    <div className="lg:w-[52%] relative overflow-hidden">
                        <div className="grid grid-cols-2 gap-0.5 h-full min-h-80">
                            {sponsor.images.map((src, i) => (
                                <div
                                    key={i}
                                    className="relative overflow-hidden bg-[#0a0b10] group/img cursor-zoom-in"
                                    onClick={() => setLightboxIndex(i)}
                                >                                <Image
                                        src={src}
                                        alt={`${sponsor.name} photo ${i + 1}`}
                                        fill
                                        className="object-contain opacity-80 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all duration-500 ease-in-out"
                                        sizes="(max-width: 768px) 50vw, 26vw"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/30 pointer-events-none group-hover/img:opacity-0 transition-opacity duration-500" />
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 pointer-events-none">
                                        <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-full p-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                <circle cx="11" cy="11" r="8" />
                                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                                <line x1="11" y1="8" x2="11" y2="14" />
                                                <line x1="8" y1="11" x2="14" y2="11" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div
                            className={`absolute inset-y-0 ${reversed ? "left-0" : "right-0"} w-16 bg-linear-to-${reversed ? "r" : "l"} from-[#07080d] to-transparent pointer-events-none hidden lg:block`}
                        />
                    </div>

                    {/* Info panel */}
                    <div className="lg:w-[48%] flex flex-col justify-between p-8 relative z-10">
                        <div>
                            <div className="mb-1 font-mono text-xs text-[#007acc]/60 uppercase tracking-widest">
                                # featured sponsor
                            </div>
                            <h3 className="text-4xl font-bold font-mono text-white tracking-tighter mb-1">
                                {sponsor.name}
                                <span className="text-[#007acc]">.</span>
                            </h3>
                            {sponsor.handle && (
                                <p className="font-mono text-sm text-[#444] mb-6">{sponsor.handle}</p>
                            )}
                            <p className="text-[#888] text-sm leading-relaxed mb-6 font-sans">
                                {sponsor.description}
                            </p>
                            {sponsor.quote && (
                                <div className="relative border-l-2 border-[#007acc]/40 pl-4 mb-6">
                                    <Quote size={14} className="text-[#007acc]/40 mb-1" />
                                    <p className="font-mono text-xs text-[#555] italic leading-relaxed">
                                        &ldquo;{sponsor.quote}&rdquo;
                                    </p>
                                </div>
                            )}

                            {/* Sponsored Projects */}
                            {sponsor.sponsoredProjects?.length > 0 && (
                                <div className="mb-6">
                                    <p className="font-mono text-[10px] text-[#444] uppercase tracking-widest mb-2">
                                        # sponsoring projects
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {sponsor.sponsoredProjects.map((project) => (
                                            <span
                                                key={project}
                                                className="px-3 py-1 rounded-full border border-[#007acc]/30 bg-[#007acc]/5 font-mono text-xs text-[#007acc] font-semibold"
                                            >
                                                {project}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/5">
                            <div className="flex items-center gap-2">
                                <Heart size={14} className="text-[#007acc] animate-pulse" />
                                <span className="font-mono text-xs text-[#555]">Thank you for your support</span>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Sponsored amount badge */}
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#007acc]/20 bg-[#007acc]/5">
                                        <span className="font-mono text-[10px] text-[#007acc]/60 uppercase tracking-widest">sponsored</span>
                                        <span className="font-mono text-xs font-bold text-[#007acc]">
                                            {sponsor.currency}&nbsp;{sponsor.spooredAmount}
                                        </span>
                                    </div>
                                    {sponsor.amountDescription && (
                                        <p className="font-mono text-sm text-white italic px-1 max-w-[220px]">
                                            {sponsor.amountDescription}
                                        </p>
                                    )}
                                </div>
                                {sponsor.url && (
                                    <a
                                        href={sponsor.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 font-mono text-xs text-[#007acc] hover:underline"
                                    >
                                        Visit <ExternalLink size={10} />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {lightboxIndex !== null && (
                <ImageLightbox
                    images={sponsor.images}
                    index={lightboxIndex as number}
                    name={sponsor.name}
                    onClose={() => setLightboxIndex(null)}
                    onNav={(i) => setLightboxIndex(i)}
                />
            )}
        </>
    );
}
