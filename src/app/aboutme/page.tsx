import SocialLinks from '@/components/ui/common/SocialLinks'
import { Terminal, Server, Wrench, Cpu } from 'lucide-react'
import { AdBanner } from '@/components/ui'
import React from 'react'

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white/80 p-8 md:p-16 lg:p-24 font-sans selection:bg-teal-500/30">
            <div className="max-w-4xl mx-auto space-y-16">

                {/* Hero Section */}
                <header className="space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            Swapnil Ingle
                        </h1>
                        <p className="text-xl text-teal-400 font-mono">
                            Backend & Infrastructure Engineer
                        </p>
                    </div>
                    <p className="text-lg leading-relaxed max-w-2xl text-white/70">
                        I am a 2nd-year B.Tech AIML student operating out of Mumbai, specializing in systems programming and high-performance backend architecture. Driving development under the CodersHubInc organization, I build developer tooling, telemetry platforms, and cloud-native solutions.
                    </p>

                    {/* Socials - Using the default or large variant */}
                    <div className="pt-4">
                        <SocialLinks variant="default" />
                    </div>
                </header>

                <hr className="border-white/10" />

                {/* Core Competencies */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                        <Cpu className="text-teal-500" size={24} />
                        Technical Arsenal
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                                <Server size={18} /> Systems & Backend
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed">
                                Architecting robust services using <strong className="text-white">Go, Rust, Java, and Kotlin</strong>. Experienced in designing cross-platform telemetry systems and high-throughput data pipelines.
                            </p>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl">
                            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                                <Terminal size={18} /> Environment & Tooling
                            </h3>
                            <p className="text-sm text-white/60 leading-relaxed">
                                Living in the terminal. My daily workflow is powered by <strong className="text-white">Arch Linux</strong>, Warp, and Zed, ensuring minimal latency from thought to execution.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Ad Placement: About Me Mid Section */}
                <div className="py-2">
                    <AdBanner />
                </div>

                {/* Open Source & Engineering */}
                <section className="space-y-6">
                    <h2 className="text-2xl font-semibold text-white flex items-center gap-3">
                        <Wrench className="text-teal-500" size={24} />
                        Engineering & Open Source
                    </h2>
                    <div className="space-y-4">
                        {/* Project 1 */}
                        <div className="group border border-white/10 bg-white/[0.02] hover:bg-white/5 p-6 rounded-2xl transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-medium text-white group-hover:text-teal-400 transition-colors">
                                    Aaxion & Quazaar
                                </h3>
                                <span className="text-xs font-mono bg-white/10 text-white/70 px-2 py-1 rounded-md">Go / Systems</span>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed">
                                Developed a high-performance self-hosted cloud storage server alongside a cross-platform telemetry and LAN media control platform utilizing a Go backend.
                            </p>
                        </div>

                        {/* Project 2 */}
                        <div className="group border border-white/10 bg-white/[0.02] hover:bg-white/5 p-6 rounded-2xl transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-medium text-white group-hover:text-teal-400 transition-colors">
                                    VS Music v0.2.2
                                </h3>
                                <span className="text-xs font-mono bg-white/10 text-white/70 px-2 py-1 rounded-md">C# / D-Bus</span>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed">
                                Built and maintained a VS Code extension with over 550 active installations, providing seamless media control integration directly into the editor via D-Bus services.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Status / CTA */}
                <section className="bg-teal-900/20 border border-teal-500/30 p-8 rounded-2xl text-center space-y-4">
                    <h2 className="text-xl font-medium text-white">Current Status</h2>
                    <p className="text-white/70 max-w-lg mx-auto">
                        Actively seeking a backend infrastructure or developer tooling internship for mid-2026. If your team is building tools for developers or scaling distributed systems, let&apos;s connect.
                    </p>
                    <div className="pt-2">
                        <a
                            href="mailto:ingleswapnil2004@gmail.com"
                            className="inline-block px-6 py-3 bg-teal-500 text-black font-medium rounded-xl hover:bg-teal-400 transition-colors shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)]"
                        >
                            Get in Touch
                        </a>
                    </div>
                </section>

            </div>
        </main>
    )
}