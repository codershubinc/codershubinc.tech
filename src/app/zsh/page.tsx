import React from "react";
import Konsole from "@/components/konsole/konsole";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "zsh - codershubinc",
    description: "Interactive full-screen zsh terminal interface",
};

export default function ZshStandalonePage() {
    return (
        <main className="w-screen h-screen bg-[#0a0a0a] overflow-hidden flex flex-col p-4 sm:p-8">
            <div className="mb-4">
                <Link 
                    href="/"
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded hover:bg-white/10 transition-colors font-mono text-sm text-zinc-300 hover:text-emerald-400 w-fit"
                >
                    <ArrowLeft size={16} />
                    <span>cd ..</span>
                </Link>
            </div>
            <div className="flex-1 min-h-0 bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                <Konsole fullScreen={true} />
            </div>
        </main>
    );
}