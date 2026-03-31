"use client";

import React, { useRef } from "react";
import { CopyButton } from "./CopyButton";

interface CodeBlockWrapperProps {
    children: React.ReactNode;
}

export function CodeBlockWrapper({ children }: CodeBlockWrapperProps) {
    const preRef = useRef<HTMLPreElement>(null);

    const handleCopy = () => {
        // Extract text from the pre element
        if (preRef.current) {
            return preRef.current.innerText;
        }
        return "";
    };

    return (
        <div className="group relative rounded-xl border border-white/10 bg-[#0a0a0a] overflow-hidden my-6">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
                    </div>
                </div>
                <CopyButton textToCopy="" getCopyText={handleCopy} />
            </div>
            <pre ref={preRef} className="bg-transparent! m-0! p-4! overflow-x-auto text-[13px] leading-relaxed">
                {children}
            </pre>
        </div>
    );
}