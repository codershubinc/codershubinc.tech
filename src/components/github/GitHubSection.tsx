import React from "react";
import { Github } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import GitHubContributions from "./GitHubContributions";
import GitHubStatsCard from "./GitHubStatsCard";
import TopLanguagesCard from "./TopLanguagesCard";
import GitHubStreakMini from "./GitHubStreakMini";

export default function GitHubSection() {
    return (
        <section
            id="github-stats"
            className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto relative border-white/5"
        >
            {/* Accent Glow */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#007acc]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2"></div>

            <div className="flex items-end justify-between mb-16 relative z-10">
                <ScrollReveal direction="left">
                    <h2 className="text-2xl sm:text-4xl font-bold font-mono text-white flex items-center gap-3 mb-2 hover:text-[#007acc] transition-colors duration-300">
                        <Github className="text-[#007acc] animate-pulse" size={28} />
                        gh status --all
                    </h2>
                    <p className="font-mono text-sm text-[#666]">
                        Contributions, coding activity, and languages over time
                    </p>
                </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {/* Left 2 cols for contributions and main stats */}
                <div className="md:col-span-2 space-y-6">
                    <GitHubContributions />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <GitHubStatsCard />
                        <TopLanguagesCard />
                    </div>
                </div>

                {/* Right column for side elements */}
                <div className="space-y-6">
                    <GitHubStreakMini />
                </div>
            </div>
        </section>
    );
}