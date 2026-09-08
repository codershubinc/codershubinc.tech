"use client";

import { useEffect, useState } from "react";
import { Terminal } from "lucide-react";

interface ServerBootPanelProps {
    children: React.ReactNode;
}

const bootSequence = [
    { time: 0, text: "Loaded: codershubinc.portfolio.service", tag: "LOAD" },
    { time: 200, text: "Starting: github-api.service", tag: "START" },
    { time: 380, text: "Started: github-api.service", tag: "OK" },
    { time: 520, text: "Starting: spotify-connect.service", tag: "START" },
    { time: 680, text: "Started: spotify-connect.service", tag: "OK" },
    { time: 820, text: "Starting: wakatime-stats.service", tag: "START" },
    { time: 980, text: "Started: wakatime-stats.service", tag: "OK" },
    { time: 1100, text: "Starting: lang-data.service", tag: "START" },
    { time: 1250, text: "Started: lang-data.service", tag: "OK" },
    { time: 1380, text: "Reached target: multi-user.target", tag: "OK" },
    { time: 1500, text: "Reached target: graphical.target", tag: "OK" },
    { time: 1620, text: "codershubinc.local login: — system ready", tag: "BOOT" },
];

const tagStyle: Record<string, string> = {
    OK: "text-emerald-400",
    START: "text-[#007acc]",
    LOAD: "text-yellow-400",
    BOOT: "text-white",
};

const tagLabel: Record<string, string> = {
    OK: "  OK  ",
    START: "START ",
    LOAD: " LOAD ",
    BOOT: " BOOT ",
};

export default function ServerBootPanel({ children }: ServerBootPanelProps) {
    const [isBooting, setIsBooting] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const [progress, setProgress] = useState(0);
    const [cursorBlink, setCursorBlink] = useState(true);

    useEffect(() => {
        bootSequence.forEach((step, index) => {
            setTimeout(() => {
                setVisibleLines((prev) => [...prev, index]);
                setProgress(Math.round(((index + 1) / bootSequence.length) * 100));
            }, step.time);
        });

        const blinkInterval = setInterval(() => setCursorBlink((b) => !b), 530);

        setTimeout(() => setIsFadingOut(true), 2200);
        setTimeout(() => {
            setIsBooting(false);
            clearInterval(blinkInterval);
        }, 2800);

        return () => clearInterval(blinkInterval);
    }, []);

    if (!isBooting) return <>{children}</>;

    return (
        <div
            className={`fixed inset-0 z-50 bg-[#050505] flex flex-col transition-opacity duration-600 ${isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
                }`}
        >
            {/* Scanline overlay */}
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)] z-10" />

            {/* Subtle grid */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,122,204,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,122,204,0.03)_1px,transparent_1px)] bg-size-[48px_48px]" />

            {/* Glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(0,122,204,0.08),transparent_70%)]" />

            <div className="relative z-20 flex flex-col h-full max-w-3xl mx-auto w-full px-6 py-10 font-mono">

                {/* Top bar */}
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3 text-[#007acc]">
                        <Terminal size={16} />
                        <span className="text-xs font-bold tracking-[0.2em] uppercase">codershubinc — systemd boot</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] text-zinc-600 tracking-widest uppercase">v2.0.0</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </div>

                {/* Log lines */}
                <div className="flex-1 space-y-1 overflow-hidden">
                    {bootSequence.map((step, index) => (
                        <div
                            key={index}
                            className={`flex items-start gap-3 text-xs leading-relaxed transition-all duration-200 ${visibleLines.includes(index)
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 translate-y-1"
                                }`}
                        >
                            {/* Tag */}
                            <span className={`shrink-0 font-bold ${tagStyle[step.tag]}`}>
                                [{tagLabel[step.tag]}]
                            </span>
                            {/* Message */}
                            <span className={step.tag === "BOOT" ? "text-white font-bold" : "text-zinc-400"}>
                                {step.text}
                                {/* blinking cursor on last visible line */}
                                {index === Math.max(...visibleLines) && (
                                    <span className={`ml-0.5 inline-block w-1.5 h-3 align-middle bg-[#007acc] ${cursorBlink ? "opacity-100" : "opacity-0"}`} />
                                )}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="mt-8 border-t border-white/5 pt-5">
                    {/* Meta */}
                    <div className="flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-zinc-600 mb-4 tracking-wider">
                        <span>KERNEL 6.1.0-codershub</span>
                        <span>HOSTNAME portfolio.codershubinc.local</span>
                        <span>ARCH x86_64</span>
                        <span>UP {(progress / 100 * 1.62).toFixed(2)}s</span>
                    </div>

                    {/* Progress */}
                    <div className="flex items-center gap-4">
                        <div className="flex-1 h-[3px] bg-zinc-900 rounded-full overflow-hidden">
                            <div
                                className="h-full rounded-full transition-all duration-200 ease-out relative overflow-hidden"
                                style={{
                                    width: `${progress}%`,
                                    background: "linear-gradient(90deg, #005f9e, #007acc, #00aaff)",
                                }}
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                            </div>
                        </div>
                        <span className="text-xs font-bold text-[#007acc] w-10 text-right tabular-nums">
                            {progress}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

