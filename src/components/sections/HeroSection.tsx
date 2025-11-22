"use client";

import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { terminalData, type TerminalEndpoint } from "@/data/terminal";

export function HeroSection() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [activeEndpoint, setActiveEndpoint] = useState<TerminalEndpoint>('overview');

    useEffect(() => {
        setMounted(true);
    }, []);

    const apiData = terminalData;

    if (!mounted) {
        return (
            <section className="relative min-h-screen flex items-center justify-center px-6 py-8 lg:px-8 overflow-hidden">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-800 w-full max-w-5xl h-96 rounded-xl"></div>
            </section>
        );
    }

    if (theme === 'backend') {
        return (
            <section className="relative min-h-screen flex items-center justify-center px-4 py-8 overflow-hidden bg-[#09090b] font-mono selection:bg-[#3f3f46] selection:text-white">
                <div className="w-full max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left Column: Terminal */}
                        <div className="group relative bg-[#0c0c0c]/90 backdrop-blur-md border border-[#3f3f46] rounded-xl overflow-hidden shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] flex flex-col h-full min-h-[500px] transition-all duration-300 hover:shadow-[0_0_50px_-10px_rgba(255,255,255,0.05)] hover:border-[#52525b]">
                            {/* Terminal Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-[#18181b] border-b border-[#27272a]">
                                <div className="flex space-x-2 group-hover:opacity-100 transition-opacity">
                                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] shadow-sm"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123] shadow-sm"></div>
                                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29] shadow-sm"></div>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#71717a] font-mono select-none">
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    user@codershub:~/api
                                </div>
                                <div className="w-14"></div> {/* Spacer for centering */}
                            </div>

                            {/* API Navigation Tabs */}
                            <div className="flex border-b border-[#27272a] bg-[#0c0c0c]">
                                {(['overview', 'stack', 'languages', 'projects', 'github'] as const).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveEndpoint(tab)}
                                        className={`px-4 py-2 text-xs font-mono transition-all border-r border-[#27272a] hover:bg-[#18181b] hover:text-[#e4e4e7] ${activeEndpoint === tab
                                                ? 'bg-[#18181b] text-[#e4e4e7] border-b-2 border-b-[#e4e4e7]'
                                                : 'text-[#71717a] bg-[#0c0c0c]'
                                            }`}
                                    >
                                        {tab.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <div className="p-6 overflow-x-auto flex-1 bg-[#0c0c0c]/50">
                                <div className="flex items-center mb-4 text-[#e4e4e7]">
                                    <span className="mr-2 text-[#27c93f]">➜</span>
                                    <span className="mr-2 text-[#27c93f]">~</span>
                                    <span
                                        className="typing-command"
                                        key={activeEndpoint}
                                        style={{ '--typing-width': `${(`curl -X GET ${apiData[activeEndpoint].endpoint}`).length}ch` } as React.CSSProperties}
                                    >
                                        curl -X GET {apiData[activeEndpoint].endpoint}
                                    </span>
                                </div>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeEndpoint}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <pre className="text-sm sm:text-base text-[#d4d4d8] font-mono whitespace-pre-wrap break-all sm:break-normal pl-4 border-l-2 border-[#27272a]">
                                            <code>
                                                {JSON.stringify(apiData[activeEndpoint].response, null, 2)}
                                            </code>
                                        </pre>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Right Column: Visual Dashboard */}
                        <div className="flex flex-col gap-6 h-full">
                            <AnimatePresence mode="wait">
                                {activeEndpoint === 'overview' && (
                                    <motion.div
                                        key="overview"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="space-y-6"
                                    >
                                        {/* Main Info Card */}
                                        <div className="bg-[#0c0c0c]/90 backdrop-blur-md border border-[#3f3f46] p-6 rounded-xl shadow-lg hover:border-[#52525b] transition-colors">
                                            <div className="flex items-center justify-between mb-6 border-b border-[#27272a] pb-4">
                                                <h3 className="text-xl text-[#e4e4e7] font-bold flex items-center gap-2">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                                                    </svg>
                                                    System Overview
                                                </h3>
                                                <span className="flex items-center text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded border border-green-500/20">
                                                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                                                    ONLINE
                                                </span>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <div className="text-[#a1a1aa] text-xs uppercase tracking-wider mb-1">Organization</div>
                                                    <div className="text-[#e4e4e7] text-3xl font-bold tracking-tight">CodersHub Inc</div>
                                                </div>

                                                <div>
                                                    <div className="text-[#a1a1aa] text-xs uppercase tracking-wider mb-1">Mission Protocol</div>
                                                    <div className="text-[#e4e4e7] text-lg">Building Developer Excellence</div>
                                                </div>

                                                <div>
                                                    <div className="text-[#a1a1aa] text-xs uppercase tracking-wider mb-3">Active Stack</div>
                                                    <div className="flex flex-wrap gap-2">
                                                        {["Next.js", "TypeScript", "TailwindCSS", "Node.js"].map(tech => (
                                                            <span key={tech} className="px-3 py-1.5 bg-[#27272a] text-[#e4e4e7] text-xs rounded border border-[#3f3f46] hover:border-[#e4e4e7] transition-colors cursor-default">
                                                                {tech}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Secondary Info / Stats */}
                                        <div className="grid grid-cols-2 gap-6">
                                            <div className="bg-[#0c0c0c]/90 backdrop-blur-md border border-[#3f3f46] p-5 rounded-xl hover:border-[#e4e4e7] transition-colors group">
                                                <div className="text-[#71717a] text-xs uppercase tracking-wider mb-2 group-hover:text-[#a1a1aa]">Maintainer</div>
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-[#18181b] rounded-md flex items-center justify-center text-sm font-bold border border-[#27272a] group-hover:border-[#e4e4e7] transition-colors">
                                                        {siteConfig.author.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                    <div>
                                                        <div className="text-[#e4e4e7] text-sm font-medium">{siteConfig.author.name}</div>
                                                        <a href={siteConfig.author.github} target="_blank" rel="noopener noreferrer" className="text-[#71717a] text-xs hover:text-[#e4e4e7] hover:underline">
                                                            @github
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-[#0c0c0c]/90 backdrop-blur-md border border-[#3f3f46] p-5 rounded-xl hover:border-[#e4e4e7] transition-colors group">
                                                <div className="text-[#71717a] text-xs uppercase tracking-wider mb-1 group-hover:text-[#a1a1aa]">Projects</div>
                                                <div className="text-[#e4e4e7] text-3xl font-bold">10+</div>
                                                <div className="text-xs text-green-500 mt-1 flex items-center">
                                                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                                    Active Development
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeEndpoint === 'stack' && (
                                    <motion.div
                                        key="stack"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="h-full"
                                    >
                                        <div className="bg-[#0c0c0c]/90 backdrop-blur-md border border-[#3f3f46] p-6 rounded-xl shadow-lg h-full hover:border-[#52525b] transition-colors">
                                            <h3 className="text-xl text-[#e4e4e7] font-bold mb-6 flex items-center gap-2 border-b border-[#27272a] pb-4">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                                </svg>
                                                Tech Stack
                                            </h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                                {Object.entries(apiData.stack.response.data).map(([category, items]) => (
                                                    <div key={category}>
                                                        <div className="text-[#a1a1aa] text-xs uppercase tracking-wider mb-3 border-b border-[#27272a] pb-1 inline-block">{category}</div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {items.map(item => (
                                                                <span key={item} className="px-2 py-1 bg-[#27272a] text-[#e4e4e7] text-xs rounded border border-[#3f3f46] hover:border-[#e4e4e7] transition-colors cursor-default">
                                                                    {item}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeEndpoint === 'languages' && (
                                    <motion.div
                                        key="languages"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="h-full"
                                    >
                                        <div className="bg-[#0c0c0c]/90 backdrop-blur-md border border-[#3f3f46] p-6 rounded-xl shadow-lg h-full hover:border-[#52525b] transition-colors">
                                            <h3 className="text-xl text-[#e4e4e7] font-bold mb-6 flex items-center gap-2 border-b border-[#27272a] pb-4">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                </svg>
                                                Languages
                                            </h3>
                                            <div className="space-y-6">
                                                {apiData.languages.response.data.map((lang) => (
                                                    <div key={lang.name}>
                                                        <div className="flex justify-between text-sm mb-2">
                                                            <span className="text-[#e4e4e7] font-medium">{lang.name}</span>
                                                            <span className="text-[#a1a1aa]">{lang.usage}</span>
                                                        </div>
                                                        <div className="h-2 bg-[#27272a] rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-[#e4e4e7] transition-all duration-1000 ease-out"
                                                                style={{ width: lang.usage }}
                                                            ></div>
                                                        </div>
                                                        <div className="text-xs text-[#a1a1aa] mt-1 text-right">{lang.proficiency}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeEndpoint === 'projects' && (
                                    <motion.div
                                        key="projects"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="h-full"
                                    >
                                        <div className="bg-[#0c0c0c]/90 backdrop-blur-md border border-[#3f3f46] p-6 rounded-xl shadow-lg h-full hover:border-[#52525b] transition-colors">
                                            <h3 className="text-xl text-[#e4e4e7] font-bold mb-6 flex items-center gap-2 border-b border-[#27272a] pb-4">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                                </svg>
                                                Featured Projects
                                            </h3>
                                            <div className="space-y-4">
                                                {apiData.projects.response.data.map((project) => (
                                                    <div key={project.id} className="p-4 bg-[#27272a]/30 border border-[#3f3f46] rounded hover:border-[#e4e4e7] hover:bg-[#27272a]/50 transition-all group cursor-pointer">
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <div className="text-[#e4e4e7] font-bold group-hover:text-white">{project.name}</div>
                                                                <div className="text-[#a1a1aa] text-xs mt-1">{project.type}</div>
                                                            </div>
                                                            <div className="text-[#e4e4e7] text-xs bg-[#27272a] px-2 py-1 rounded border border-[#3f3f46]">
                                                                {project.stars || project.users || project.stack}
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                                <div className="pt-4 text-center">
                                                    <Link href="/projects" className="text-sm text-[#a1a1aa] hover:text-[#e4e4e7] hover:underline">
                                                        View all projects →
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeEndpoint === 'github' && (
                                    <motion.div
                                        key="github"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="h-full"
                                    >
                                        <div className="bg-[#0c0c0c]/90 backdrop-blur-md border border-[#3f3f46] p-6 rounded-xl shadow-lg h-full hover:border-[#52525b] transition-colors">
                                            <h3 className="text-xl text-[#e4e4e7] font-bold mb-6 flex items-center gap-2 border-b border-[#27272a] pb-4">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                                </svg>
                                                GitHub Activity
                                            </h3>

                                            <div className="grid grid-cols-1 gap-6">
                                                {/* Total Contributions */}
                                                <div className="bg-[#18181b] border border-[#27272a] p-5 rounded-lg">
                                                    <div className="text-[#a1a1aa] text-xs uppercase tracking-wider mb-1">Total Contributions</div>
                                                    <div className="text-[#e4e4e7] text-3xl font-bold">
                                                        {apiData.github.response.data.totalContributions.toLocaleString()}
                                                    </div>
                                                    <div className="text-xs text-[#a1a1aa] mt-1">
                                                        Since {new Date(apiData.github.response.data.firstContribution).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                                                    </div>
                                                </div>

                                                {/* Streaks */}
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-[#18181b] border border-[#27272a] p-4 rounded-lg">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-orange-500">🔥</span>
                                                            <div className="text-[#a1a1aa] text-xs uppercase tracking-wider">Current Streak</div>
                                                        </div>
                                                        <div className="text-[#e4e4e7] text-2xl font-bold">
                                                            {apiData.github.response.data.currentStreak.length} <span className="text-sm font-normal text-[#a1a1aa]">days</span>
                                                        </div>
                                                        <div className="text-[10px] text-[#71717a] mt-1">
                                                            {apiData.github.response.data.currentStreak.start} — Present
                                                        </div>
                                                    </div>
                                                    <div className="bg-[#18181b] border border-[#27272a] p-4 rounded-lg">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <span className="text-yellow-500">🏆</span>
                                                            <div className="text-[#a1a1aa] text-xs uppercase tracking-wider">Longest Streak</div>
                                                        </div>
                                                        <div className="text-[#e4e4e7] text-2xl font-bold">
                                                            {apiData.github.response.data.longestStreak.length} <span className="text-sm font-normal text-[#a1a1aa]">days</span>
                                                        </div>
                                                        <div className="text-[10px] text-[#71717a] mt-1">
                                                            {apiData.github.response.data.longestStreak.start} — {apiData.github.response.data.longestStreak.end}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Visual Graph Image */}
                                                <div className="mt-2">
                                                    <div className="text-[#a1a1aa] text-xs uppercase tracking-wider mb-3">Contribution Graph</div>
                                                    <div className="relative w-full h-32 bg-[#18181b] border border-[#27272a] rounded-lg overflow-hidden flex items-center justify-center">
                                                        {/* Using the image URL provided by user but with theme param */}
                                                        <Image
                                                            src="https://github-readme-streak-stats-chi-three.vercel.app/?user=codershubinc&theme=dark&hide_border=true&background=00000000&ring=e4e4e7&fire=e4e4e7&currStreakLabel=e4e4e7"
                                                            alt="GitHub Streak Stats"
                                                            width={500}
                                                            height={200}
                                                            className="max-w-full max-h-full object-contain opacity-90 hover:opacity-100 transition-opacity"
                                                            unoptimized
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <Link
                                href="/projects"
                                className="block w-full py-4 text-center border border-[#e4e4e7] text-[#e4e4e7] hover:bg-[#e4e4e7] hover:text-black transition-all duration-300 font-mono text-lg group rounded-lg relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    <span className="mr-2">&gt;</span>
                                    ./explore_projects.sh
                                    <span className="ml-2 animate-pulse">_</span>
                                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 py-8 lg:px-8 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-r from-blue-600/10 via-purple-600/5 to-cyan-600/10 dark:from-blue-400/5 dark:via-purple-400/3 dark:to-cyan-400/5"></div>

                {/* Animated gradient orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-linear-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-linear-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative mx-auto max-w-5xl text-center w-full">
                {/* Logo and Brand */}
                <div className="flex flex-col items-center mb-6 sm:mb-8">
                    {/* Enhanced Logo Container */}
                    <div className="relative mb-4 sm:mb-6 group">
                        {/* Glow effect behind logo */}
                        <div className="absolute inset-0 bg-linear-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl scale-110 opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Logo */}
                        <div className="relative">
                            <Image
                                src="/assets/ch.ico.png"
                                alt="CodersHub Inc Logo"
                                width={240}
                                height={240}
                                className="mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-300 sm:w-[280px] sm:h-[280px]"
                                priority
                            />
                        </div>
                    </div>

                    {/* Brand Name with enhanced typography */}
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl xl:text-8xl mb-2">
                        <span className="bg-linear-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                            CodersHub
                        </span>
                        <span className="text-gray-900 dark:text-white"> Inc</span>
                    </h1>

                    {/* Brand tagline */}
                    <div className="text-base sm:text-lg lg:text-xl text-blue-600 dark:text-blue-400 font-medium tracking-wide">
                        Building Developer Excellence
                    </div>

                    {/* Creator attribution */}
                    <div className="mt-3 text-sm sm:text-base text-gray-500 dark:text-gray-400">
                        Maintained and created by{" "}
                        <a
                            href={siteConfig.author.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline transition-colors duration-200"
                        >
                            {siteConfig.author.name}
                        </a>
                    </div>
                </div>

                {/* Main Headline with enhanced styling */}
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold text-gray-800 dark:text-gray-200 mb-6 sm:mb-8 leading-tight">
                    Smart,
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 mx-2">
                        open-source
                    </span>
                    utilities for the
                    <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-cyan-600">
                        modern developer
                    </span>
                </h2>

                {/* Sub-headline with better spacing */}
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed font-light">
                    A curated collection of practical, open-source projects designed to solve
                    <span className="font-medium text-gray-700 dark:text-gray-200"> real-world developer problems</span>
                </p>

                {/* Enhanced CTA Section */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16">
                    {/* Primary CTA */}
                    <Link
                        href="/projects"
                        className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-linear-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
                    >
                        <span className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative flex items-center gap-2">
                            View All Projects
                            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </Link>

                    {/* Secondary CTA */}
                    <a
                        href="https://github.com/codershubinc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200 dark:border-slate-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-white dark:hover:bg-slate-800 w-full sm:w-auto"
                    >
                        <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-200" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        View on GitHub
                    </a>
                </div>

                {/* Stats or badges section */}
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>Open Source</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                        <span>Developer Focused</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700"></div>
                        <span>Community Driven</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
