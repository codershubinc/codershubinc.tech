import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/data";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center px-6 py-8 lg:px-8 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-cyan-600/10 dark:from-blue-400/5 dark:via-purple-400/3 dark:to-cyan-400/5"></div>

                {/* Animated gradient orbs */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative mx-auto max-w-5xl text-center w-full">
                {/* Logo and Brand */}
                <div className="flex flex-col items-center mb-6 sm:mb-8">
                    {/* Enhanced Logo Container */}
                    <div className="relative mb-4 sm:mb-6 group">
                        {/* Glow effect behind logo */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl scale-110 opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Logo */}
                        <div className="relative">
                            <Image
                                src="/static/ch.ico.png"
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
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
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
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mx-2">
                        open-source
                    </span>
                    utilities for the
                    <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600">
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
                        className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 w-full sm:w-auto"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></span>
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