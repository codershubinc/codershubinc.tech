"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Command } from "lucide-react";

export function Navbar({ capsules }: { capsules?: React.ReactNode }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-[padding] duration-500 ease-in-out w-full rounded-lg"
            style={{ paddingTop: scrolled ? "12px" : "0" }}
        >
            <div
                className="transition-all duration-500 ease-in-out flex items-center justify-between w-full rounded-xl"
                style={{
                    maxWidth: scrolled ? "48rem" : "72rem",
                    width: scrolled ? "calc(100% - 2rem)" : "100%",
                    height: scrolled ? "3rem" : "4rem",
                    padding: scrolled ? "0 1.25rem" : "0 1.5rem",
                    borderRadius: scrolled ? "1rem" : "0",
                    background: scrolled ? "rgba(0,0,0,0.75)" : "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderBottom: scrolled ? "none" : "1px solid rgba(255,255,255,0.05)",
                    border: scrolled ? "1px solid rgba(255,255,255,0.1)" : "none",
                    boxShadow: scrolled
                        ? "0 20px 60px rgba(0,0,0,0.5)"
                        : "0 4px 6px rgba(0,0,0,0.05)",
                }}
            >
                <div className="flex items-center gap-2 text-zinc-100 font-bold tracking-tight">
                    <Command size={18} className="text-[#007acc]" />
                    <span className="font-mono text-sm">codershubinc</span>
                </div>
                <div className="flex items-center gap-4">
                    <div
                        className="transition-all duration-300 overflow-hidden"
                        style={{
                            maxWidth: scrolled ? "0" : "300px",
                            opacity: scrolled ? 0 : 1,
                        }}
                    >
                        {capsules}
                    </div>
                    <nav className="flex gap-4 md:gap-6 text-xs font-mono font-medium text-[#666]">
                        <a href="#projects" className="hover:text-white transition-colors">
                            ~/deployments
                        </a>
                        <a href="#about" className="hover:text-white transition-colors">
                            ~/profile
                        </a>
                        <Link href="/sponsors" className="hover:text-white transition-colors">
                            ~/sponsors
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
