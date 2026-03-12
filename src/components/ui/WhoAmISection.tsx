"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Terminal,
  Code2,
  Server,
  Cpu,
  Globe,
  Mail,
  GraduationCap,
  MapPin,
  Coffee,
  Github,
  Linkedin,
  BookOpen,
  Layers,
} from "lucide-react";
import Image from "next/image";
import { getLanguageIcon } from "@/lib/icons";

interface TopLang {
  name: string;
  color: string;
  size: number;
  count: number;
}

const stack = [
  { label: "Go", color: "#00ADD8", category: "Backend" },
  { label: "TypeScript", color: "#3178C6", category: "Language" },
  { label: "Rust", color: "#CE422B", category: "Systems" },
  { label: "Node.js", color: "#68A063", category: "Runtime" },
  { label: "Next.js", color: "#FFFFFF", category: "Framework" },
  { label: "Docker", color: "#2496ED", category: "Infra" },
  { label: "Linux (Arch)", color: "#1793D1", category: "OS" },
  { label: "PostgreSQL", color: "#336791", category: "Database" },
];

const stats = [
  { icon: <Code2 size={16} />, value: "2+", label: "Years Coding" },
  { icon: <Layers size={16} />, value: "3+", label: "Open Source Projects" },
  { icon: <Server size={16} />, value: "Self-hosted", label: "Infrastructure" },
  { icon: <Coffee size={16} />, value: "\u221e", label: "Cups of Coffee" },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 0.68, 0, 1.2] as [number, number, number, number],
    },
  },
};

function useTopLanguages() {
  const [langs, setLangs] = useState<TopLang[]>([]);

  useEffect(() => {
    fetch("/api/top-langs")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data) return;
        const sorted: TopLang[] = Object.values(data as Record<string, TopLang>)
          .sort((a, b) => b.size - a.size)
          .slice(0, 10);
        setLangs(sorted);
      })
      .catch(() => {});
  }, []);

  return langs;
}

export function WhoAmISection() {
  const topLangs = useTopLanguages();
  const totalSize = topLangs.reduce((acc, l) => acc + l.size, 0);

  return (
    <section
      id="whoami"
      className="py-16 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto relative"
    >
      {/* bg glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#007acc]/4 blur-[140px] rounded-full pointer-events-none" />

      {/* ── Section header ── */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14 relative z-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div>
          <div className="inline-flex items-center gap-2 text-[#007acc] font-sans text-xs  uppercase tracking-widest mb-4 px-3 py-1.5 bg-[#007acc]/10 rounded-full border border-[#007acc]/20">
            <Terminal size={12} className="animate-pulse" />
            cat ~/about.md
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-mono text-white tracking-tight">
            Who Am I<span className="text-[#007acc]">?</span>
          </h2>
          <p className="text-[#555] font-mono text-sm mt-2">
            {"// the human behind the terminal"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#444] px-3 py-1 bg-white/5 rounded-lg border border-white/5 self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          open to opportunities
        </div>
      </motion.div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Left: Bio block */}
        <motion.div
          className="lg:col-span-7 flex flex-col gap-6"
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.22, 0.68, 0, 1.1] }}
        >
          {/* Bio card */}
          <div className="bg-linear-to-br from-[#111]/80 to-[#0a0a0a]/80 border border-white/8 rounded-2xl p-6 sm:p-8 space-y-5 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-[#007acc]/15 border border-[#007acc]/30 flex items-center justify-center">
                <Cpu size={22} className="text-[#007acc]" />
              </div>
              <div>
                <p className="text-white font-bold font-mono text-lg leading-none">
                  Swapnil Ingle
                </p>
                <p className="text-[#555] font-mono text-xs mt-0.5">
                  Backend Engineer · Systems Enthusiast
                </p>
              </div>
            </div>

            <div className="space-y-4 text-[#999] leading-relaxed text-sm sm:text-base border-t border-white/5 pt-5">
              <p>
                Hi, I&apos;m a{" "}
                <span className="text-white font-medium rounded-xl  border-slate-900 px-3 border-solid border-2">
                  2nd-year B.Tech AIML student
                </span>{" "}
                based in{" "}
                <span className="inline-flex items-center gap-1 text-white font-medium">
                  <MapPin size={13} className="text-[#007acc]" />
                  Panvel, Mumbai
                </span>
                . While on campus I live in the terminal — building tools,
                breaking configs, and shipping side projects.
              </p>
              <p>
                I spend my nights digging into{" "}
                <span className="text-white font-medium">
                  low-level systems
                </span>
                , customizing{" "}
                <span className="text-[#1793D1] font-medium">Arch Linux</span>,
                writing high-throughput services in{" "}
                <span className="text-[#00ADD8] font-medium rounded-xl  border-b-blue-400 px-3 border-solid border">
                  Go
                </span>
                , and occasionally touching the metal with{" "}
                <span className="text-[#CE422B] font-medium rounded-xl  border-orange-400 px-3 border-solid border">
                  Rust
                </span>
                .
              </p>
              <p>
                My goal: bridge the gap between polished web products and raw
                system performance. I believe the{" "}
                <span className="text-white font-medium">best software</span>{" "}
                lives where both worlds meet.
              </p>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-3 pt-2 border-t border-white/5">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666] px-3 py-1.5 bg-white/5 rounded-lg border border-white/6">
                <GraduationCap size={12} className="text-[#007acc]" />
                B.Tech AIML · CSMU · 2nd Year
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666] px-3 py-1.5 bg-white/5 rounded-lg border border-white/6">
                <Globe size={12} className="text-green-400" />
                Available for Remote Work
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#666] px-3 py-1.5 bg-white/5 rounded-lg border border-white/6">
                <BookOpen size={12} className="text-yellow-400" />
                Open Source Contributor
              </span>
            </div>
          </div>

          {/* Stats row */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((s) => (
              <motion.div
                key={s.label}
                variants={fadeUp}
                className="bg-linear-to-br from-[#111]/80 to-[#0a0a0a]/80 border border-white/8 rounded-xl p-4 flex flex-col gap-1 hover:border-[#007acc]/30 transition-colors"
              >
                <span className="text-[#007acc]">{s.icon}</span>
                <span className="text-white font-mono font-bold text-lg leading-none">
                  {s.value}
                </span>
                <span className="text-[#555] font-mono text-xs">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Social links */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/codershubinc"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-[#888] hover:text-white hover:border-white/25 hover:bg-white/10 transition-all"
            >
              <Github
                size={14}
                className="group-hover:text-white transition-colors"
              />
              github.com/codershubinc
            </a>
            <a
              href="https://linkedin.com/in/codershubinc"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-mono text-[#888] hover:text-white hover:border-[#0A66C2]/40 hover:bg-[#0A66C2]/10 transition-all"
            >
              <Linkedin
                size={14}
                className="group-hover:text-[#0A66C2] transition-colors"
              />
              linkedin/codershubinc
            </a>
            <a
              href="mailto:ingleswapnil2004@gmail.com"
              className="group flex items-center gap-2 px-4 py-2.5 bg-[#007acc]/10 border border-[#007acc]/20 rounded-xl text-xs font-mono text-[#007acc] hover:bg-[#007acc]/20 hover:border-[#007acc]/40 transition-all"
            >
              <Mail size={14} />
              ingleswapnil2004@gmail.com
            </a>
          </div>
        </motion.div>

        {/* Right: Tech stack + current focus */}
        <motion.div
          className="lg:col-span-5 flex flex-col gap-6"
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.65,
            delay: 0.1,
            ease: [0.22, 0.68, 0, 1.1],
          }}
        >
          {/* Tech stack */}
          <div className="bg-linear-to-br from-[#111]/80 to-[#0a0a0a]/80 border border-white/8 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="font-mono font-bold text-white text-sm flex items-center gap-2 mb-5">
              <Terminal size={14} className="text-yellow-400" />
              ls ~/tech-stack
            </h3>
            <motion.div
              className="grid grid-cols-2 gap-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {stack.map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl bg-white/4 border border-white/6 hover:border-white/15 hover:bg-white/8 transition-all group cursor-default"
                >
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-xs font-mono text-[#ccc] group-hover:text-white transition-colors truncate">
                    {item.label}
                  </span>
                  <span className="ml-auto text-[10px] font-mono text-[#444] hidden sm:block">
                    {item.category}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Top Languages */}
          <div className="bg-linear-to-br from-[#111]/80 to-[#0a0a0a]/80 border border-white/8 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="font-mono font-bold text-white text-sm flex items-center gap-2 mb-5">
              <Terminal size={14} className="text-[#007acc]" />
              cat ~/langs.txt
            </h3>
            {topLangs.length === 0 ? (
              <div className="grid grid-cols-2 gap-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="animate-pulse flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/4 border border-white/6"
                  >
                    <div className="w-2 h-2 rounded-full bg-zinc-700 shrink-0" />
                    <div className="h-3 w-16 bg-zinc-800 rounded" />
                    <div className="ml-auto h-3 w-8 bg-zinc-800 rounded" />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-2 gap-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {topLangs.map((lang) => {
                  const pct = totalSize > 0 ? (lang.size / totalSize) * 100 : 0;
                  const iconConfig = getLanguageIcon(lang.name);
                  return (
                    <motion.div
                      key={lang.name}
                      variants={fadeUp}
                      whileHover={{ scale: 1.04, y: -2 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="group relative flex flex-col gap-1.5 px-3 py-2.5 rounded-xl bg-white/4 border border-white/6 hover:bg-white/8 cursor-default overflow-hidden"
                      style={{
                        borderColor: `${lang.color}00`,
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          `${lang.color}55`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          `0 0 16px ${lang.color}20`;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor =
                          `${lang.color}00`;
                        (e.currentTarget as HTMLDivElement).style.boxShadow =
                          "none";
                      }}
                    >
                      {/* Color bar top */}
                      <div
                        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ backgroundColor: lang.color }}
                      />

                      {/* Row 1: icon + name + % */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-4 h-4 shrink-0">
                          {iconConfig ? (
                            <Image
                              src={iconConfig.url}
                              alt={lang.name}
                              width={14}
                              height={14}
                            />
                          ) : (
                            <span
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: lang.color }}
                            />
                          )}
                        </div>
                        <span className="text-xs font-mono text-[#ccc] group-hover:text-white transition-colors truncate">
                          {lang.name}
                        </span>
                        <span
                          className="ml-auto text-[10px] font-mono shrink-0 font-bold"
                          style={{ color: lang.color }}
                        >
                          {pct.toFixed(1)}%
                        </span>
                      </div>

                      {/* Row 2: mini bar + repo count (revealed on hover) */}
                      <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-8">
                        <div className="flex items-center gap-2 pt-0.5">
                          <div className="flex-1 h-[3px] bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all duration-500"
                              style={{
                                width: `${pct}%`,
                                backgroundColor: lang.color,
                                boxShadow: `0 0 6px ${lang.color}80`,
                              }}
                            />
                          </div>
                          <span className="text-[9px] font-mono text-zinc-600 shrink-0">
                            {lang.count} repo{lang.count !== 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Education */}
          <div className="bg-linear-to-br from-[#111]/80 to-[#0a0a0a]/80 border border-white/8 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="font-mono font-bold text-white text-sm flex items-center gap-2 mb-4">
              <GraduationCap size={14} className="text-purple-400" />
              cat ~/education.txt
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: "Institution", value: "CSMU, Panvel" },
                { label: "Degree", value: "B.Tech AIML" },
                { label: "Year", value: "2nd Year" },
                { label: "Expected", value: "2027" },
              ].map((row) => (
                <li
                  key={row.label}
                  className="flex justify-between items-center group border-b border-white/4 pb-2 last:border-0 last:pb-0"
                >
                  <span className="text-[#555] font-mono">{row.label}</span>
                  <span className="text-white font-medium font-mono group-hover:text-[#007acc] transition-colors">
                    {row.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
