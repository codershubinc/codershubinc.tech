"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Database, Network } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const logs = [
    {
        date: "2023-present",
        timestamp: "14:23:05",
        level: "INFO",
        module: "Backend.Core",
        message: "Architecting self-hosted telemetry tools and scalable backend infrastructure using Go and Node.js.",
        icon: Network,
        color: "text-emerald-400"
    },
    {
        date: "2021-2023",
        timestamp: "09:15:22",
        level: "WARN",
        module: "FullStack.Web",
        message: "Developed cross-platform system applications and Next.js platforms. Resolved critical state hydration issues.",
        icon: Database,
        color: "text-amber-400"
    },
    {
        date: "2019-2021",
        timestamp: "18:41:09",
        level: "BOOT",
        module: "System.Init",
        message: "Began fundamental software engineering journey. Focused on Linux administration and foundational scripting.",
        icon: Cpu,
        color: "text-[#007acc]"
    }
];

export function SystemLogsTimeline() {
    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/5 relative">
            {/* Background Accent */}
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none transform -translate-y-1/2"></div>

            <div className="flex items-end justify-between mb-12 relative z-10">
                <ScrollReveal direction="left">
                    <h2 className="text-2xl sm:text-4xl font-bold font-mono text-white flex items-center gap-3 mb-2 hover:text-[#007acc] transition-colors duration-300">
                        <Terminal className="text-[#007acc] animate-pulse" size={28} />
                        tail -f /var/log/career.log
                    </h2>
                    <p className="font-mono text-sm text-[#666]">
                        Watching for recent system level events...
                    </p>
                </ScrollReveal>
            </div>

            <div className="relative z-10 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 sm:p-6 font-mono text-xs sm:text-sm shadow-xl shadow-black/50">
                {/* Fake Terminal Header */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="ml-2 text-zinc-500">root@codershubinc: ~</span>
                </div>

                {/* Logs */}
                <div className="space-y-6">
                    {logs.map((log, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 hover:bg-white/2 p-2 -mx-2 rounded transition-colors group"
                        >
                            {/* Timestamp & Meta block */}
                            <div className="flex items-center gap-2 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                                <span className="text-zinc-500">[{log.date}]</span>
                                <span className="text-zinc-600 hidden sm:inline">{log.timestamp}</span>
                                <span className={`${log.color} font-bold`}>[{log.level}]</span>
                            </div>

                            {/* Module */}
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="text-purple-400">[{log.module}]</span>
                                <log.icon size={14} className="text-zinc-500 hidden sm:block" />
                            </div>

                            {/* Message Block */}
                            <div className="text-zinc-300 group-hover:text-white transition-colors mt-1 sm:mt-0 leading-relaxed border-l-2 border-white/5 pl-4 sm:border-none sm:pl-0">
                                {typeof log.message === 'string' ? (
                                    log.message.split(' ').map((word, j) => {
                                        // Slight syntax highlighting fake via colors
                                        if (word.match(/Go|Node\.js|Next\.js|Linux|infrastructure|cross-platform/i)) {
                                            return <span key={j} className="text-[#007acc]">{word} </span>
                                        }
                                        return word + ' '
                                    })
                                ) : (
                                    log.message
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Active Cursor */}
                    <motion.div
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-2.5 h-4 bg-zinc-400 ml-2 mt-4"
                    />
                </div>
            </div>
        </section>
    );
}
