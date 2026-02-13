"use client";

import { useEffect, useState } from "react";
import { Terminal, Check } from "lucide-react";

interface ServerBootPanelProps {
    children: React.ReactNode;
}

const bootSequence = [
    { time: 0, text: "[ OK ] Starting system services...", status: "ok" },
    { time: 300, text: "[ OK ] Mounting file systems...", status: "ok" },
    { time: 600, text: "[ OK ] Loading kernel modules...", status: "ok" },
    { time: 900, text: "[ OK ] Initializing network interfaces...", status: "ok" },
    { time: 1200, text: "[ OK ] Starting GitHub API service...", status: "ok" },
    { time: 1500, text: "[ OK ] Connecting to Spotify service...", status: "ok" },
    { time: 1800, text: "[ OK ] Loading language data...", status: "ok" },
    { time: 1900, text: "[ OK ] System ready", status: "ok" },
];

export default function ServerBootPanel({ children }: ServerBootPanelProps) {
    const [isBooting, setIsBooting] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        bootSequence.forEach((step, index) => {
            setTimeout(() => {
                setVisibleLines((prev) => [...prev, index]);
                setProgress(((index + 1) / bootSequence.length) * 100);
            }, step.time);
        });

        // Start fade out
        setTimeout(() => {
            setIsFadingOut(true);
        }, 2400);

        // Finish boot sequence
        setTimeout(() => {
            setIsBooting(false);
        }, 3000);
    }, []);

    if (!isBooting) {
        return <>{children}</>;
    }

    return (
        <>
            {/* Full Screen Splash Screen */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-500 ${isFadingOut ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                {/* Animated background grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-size-[4rem_4rem] opacity-20"></div>

                {/* Animated glow effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#047857_0%,transparent_70%)] opacity-10 animate-pulse"></div>

                {/* Boot Panel */}
                <div className="relative z-10 w-full max-w-2xl mx-4 p-8 md:p-12 rounded-lg bg-black/90 border border-emerald-500/30 backdrop-blur-md shadow-2xl shadow-emerald-500/20 font-mono">
                    {/* Header */}
                    <div className="flex items-center justify-center gap-3 mb-8 text-emerald-400 font-bold text-lg md:text-xl">
                        <Terminal size={24} className="animate-pulse" />
                        <span className="tracking-wider">SYSTEM BOOT</span>
                    </div>

                    {/* Boot Messages */}
                    <div className="space-y-3 mb-8">
                        {bootSequence.map((step, index) => (
                            <div
                                key={index}
                                className={`transition-all duration-300 ${visibleLines.includes(index)
                                    ? "opacity-100 translate-x-0"
                                    : "opacity-0 -translate-x-4"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Check size={16} className="shrink-0 text-emerald-400" />
                                    <span className="text-zinc-300 text-sm md:text-base">{step.text}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-8 pt-6 border-t border-emerald-500/30">
                        <div className="flex items-center justify-between text-xs text-zinc-400 mb-3">
                            <span>Initializing portfolio...</span>
                            <span className="font-bold text-emerald-400">{Math.floor(progress)}%</span>
                        </div>
                        <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden shadow-inner">
                            <div
                                className="h-full bg-linear-to-r from-emerald-600 via-emerald-500 to-emerald-400 rounded-full transition-all duration-300 ease-out relative"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent animate-pulse"></div>
                            </div>
                        </div>
                    </div>

                    {/* System Info */}
                    <div className="mt-6 pt-6 border-t border-emerald-500/20 text-xs text-zinc-600 space-y-1.5 text-center md:text-left">
                        <div>KERNEL: Linux 6.1.0-codershub INC</div>
                        <div>HOSTNAME: portfolio.codershubinc.local</div>
                        <div>ARCH: x86_64</div>
                    </div>
                </div>
            </div>
        </>
    );
}
