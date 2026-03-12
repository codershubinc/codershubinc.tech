"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Command, Menu, X } from "lucide-react";

export function Navbar({ capsules }: { capsules?: React.ReactNode }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navLinks = [
        { href: "#projects", label: "~/deployments" },
        { href: "#whoami", label: "~/profile" },
    ];

    return (
        <>
            <header
                className="fixed top-0 left-0 right-0 z-50 flex justify-center transition-[padding] duration-500 ease-in-out w-full"
                style={{ paddingTop: scrolled ? "12px" : "0" }}
            >
                <div
                    className="transition-all duration-500 ease-in-out flex items-center justify-between w-full"
                    style={{
                        maxWidth: scrolled ? "48rem" : "100%",
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
                    {/* Logo */}
                    <div className="flex items-center gap-2 text-zinc-100 font-bold tracking-tight">
                        <Command size={18} className="text-[#007acc]" />
                        <span className="font-mono text-sm">codershubinc</span>
                    </div>

                    {/* Desktop nav */}
                    <div className="hidden md:flex items-center gap-4 max-w-fit w-max ">
                        <div
                            className="transition-all duration-300  max-w-fit w-max "
                            style={{ maxWidth: scrolled ? "0" : "600px", opacity: scrolled ? 0 : 1 }}
                        >
                            {capsules}
                        </div>
                        <nav className="flex gap-6 text-xs font-mono font-medium text-[#666]">
                            {navLinks.map((l) => (
                                <a key={l.href} href={l.href} className="hover:text-white transition-colors">
                                    {l.label}
                                </a>
                            ))}
                            <Link href="/sponsors" className="hover:text-white transition-colors">
                                ~/sponsors
                            </Link>
                        </nav>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="md:hidden text-[#666] hover:text-white transition-colors p-1"
                        onClick={() => setMenuOpen((o) => !o)}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </header>

            {/* Mobile drawer */}
            {menuOpen && (
                <div
                    className="fixed inset-0 z-40 md:hidden"
                    onClick={() => setMenuOpen(false)}
                >
                    <div
                        className="absolute top-0 left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/10 pt-20 pb-8 px-6 flex flex-col gap-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {navLinks.map((l) => (
                            <a
                                key={l.href}
                                href={l.href}
                                className="font-mono text-sm text-[#888] hover:text-white transition-colors py-1"
                                onClick={() => setMenuOpen(false)}
                            >
                                {l.label}
                            </a>
                        ))}
                        <Link
                            href="/sponsors"
                            className="font-mono text-sm text-[#888] hover:text-white transition-colors py-1"
                            onClick={() => setMenuOpen(false)}
                        >
                            ~/sponsors
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
