"use client";

import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import TodayContributionsBadge from "@/components/github/TodayContributionsBadge";

export function HeroContent() {
    return (
        <motion.div
            className="lg:col-span-8 flex flex-col gap-8"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 0.68, 0, 1.1] }}
        >
            {/* Status Badges */}
            <motion.div
                className="flex flex-wrap items-center gap-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-[#007acc]/10 to-[#0066b3]/10 border border-[#007acc]/30 w-fit text-xs font-mono font-bold text-[#007acc] uppercase tracking-wider shadow-lg shadow-[#007acc]/10 hover:shadow-[#007acc]/30 transition-all">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#007acc] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#007acc]"></span>
                    </span>
                    System Online
                </div>
                <TodayContributionsBadge />
            </motion.div>

            <p className="text-xl sm:text-2xl md:text-3xl text-transparent bg-linear-to-r from-white to-gray-500 bg-clip-text font-medium font-mono">
                $ whoami
            </p>

            <motion.h1
                className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-mono font-bold text-white tracking-tighter leading-[0.9] bg-linear-to-b from-white to-gray-400 bg-clip-text"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 0.68, 0, 1.1] }}
            >
                Swapnil Ingle<span className="text-[#007acc] animate-pulse">.</span>
            </motion.h1>

            <motion.div
                className="max-w-2xl space-y-5"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            >

                <p className="text-[#888] leading-relaxed max-w-lg text-base">
                    Backend Engineer &amp; Linux Enthusiast. Building high-performance
                    tools and self-hosted infrastructure. Converting caffeine into{" "}
                    <strong className="text-[#00D9FF]">Go</strong> and{" "}
                    <strong className="text-[#3178C6]">TypeScript</strong>.
                </p>
            </motion.div>

            <motion.div
                className="flex flex-wrap gap-4 pt-6 font-mono text-sm"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
            >
                <a
                    href="https://github.com/codershubinc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 bg-white text-black px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-bold hover:bg-[#007acc] hover:text-white transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#007acc]/30 active:scale-95 text-xs sm:text-sm"
                >
                    <Terminal
                        size={18}
                        className="group-hover:rotate-12 transition-transform duration-300"
                    />
                    gh repo view
                </a>
                <a
                    href="#projects"
                    className="flex items-center gap-2 border-2 border-white/10 bg-white/5 text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-medium hover:border-[#007acc] hover:bg-[#007acc]/10 transition-all hover:scale-105 backdrop-blur-sm active:scale-95 text-xs sm:text-sm"
                >
                    <Terminal
                        size={18}
                        className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                    cd ~/projects
                </a>
            </motion.div>
        </motion.div>
    );
}
