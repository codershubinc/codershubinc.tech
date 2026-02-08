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
    { time: 2100, text: "[ OK ] System ready", status: "ok" },
];

export default function ServerBootPanel({ children }: ServerBootPanelProps) {
    const [isBooting, setIsBooting] = useState(true);
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Check if already booted in this session
        const hasBooted = sessionStorage.getItem("server-booted");
        // if (hasBooted) {
        //     setIsBooting(false);
        //     return;
        // }

        // Show boot sequence
        bootSequence.forEach((step, index) => {
            setTimeout(() => {
                setVisibleLines((prev) => [...prev, index]);
                setProgress(((index + 1) / bootSequence.length) * 100);
            }, step.time);
        });

        // Finish boot sequence
        setTimeout(() => {
            setIsBooting(false);
            sessionStorage.setItem("server-booted", "true");
        }, 2400);
    }, []);

    if (!isBooting) {
        return <>{children}</>;
    }

    return (
        <div className="lg:col-span-4 hidden lg:block space-y-4">
            <div className="p-6 rounded-lg bg-black border border-emerald-500/20 backdrop-blur-sm font-mono text-xs h-full">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold">
                    <Terminal size={14} className="animate-pulse" />
                    <span>SYSTEM BOOT</span>
                </div>

                {/* Boot Messages */}
                <div className="space-y-2 mb-4">
                    {bootSequence.map((step, index) => (
                        <div
                            key={index}
                            className={`transition-all duration-300 ${visibleLines.includes(index)
                                ? "opacity-100 translate-x-0"
                                : "opacity-0 -translate-x-4"
                                }`}
                        >
                            <div className="flex items-center gap-2 text-emerald-400">
                                <Check size={12} className="flex-shrink-0" />
                                <span className="text-zinc-400">{step.text}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Progress Bar */}
                <div className="mt-6 pt-4 border-t border-emerald-500/20">
                    <div className="flex items-center justify-between text-[10px] text-zinc-500 mb-2">
                        <span>Booting...</span>
                        <span>{Math.floor(progress)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-300 ease-out"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                        </div>
                    </div>
                </div>

                {/* System Info */}
                <div className="mt-4 pt-4 border-t border-emerald-500/20 text-[10px] text-zinc-600 space-y-1">
                    <div>KERNEL: Linux 6.1.0-codershub</div>
                    <div>HOSTNAME: portfolio.codershubinc.local</div>
                    <div>ARCH: x86_64</div>
                </div>
            </div>
        </div>
    );
}
