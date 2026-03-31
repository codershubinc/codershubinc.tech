"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

interface CopyButtonProps {
    textToCopy?: string;
    getCopyText?: () => string;
}

export function CopyButton({ textToCopy, getCopyText }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            const text = getCopyText ? getCopyText() : textToCopy || "";
            await navigator.clipboard.writeText(text);
            setCopied(true);
            toast.success("Copied to clipboard", {
                icon: <Check size={16} className="text-[#007acc]" />,
                style: {
                    borderRadius: "8px",
                    background: "#0a0a0a",
                    color: "#b0b0b0",
                    border: "1px solid rgba(255,255,255,0.05)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    boxShadow: "0 10px 30px -10px rgba(0, 122, 204, 0.1)"
                },
            });
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
            toast.error("Failed to copy text");
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="p-1.5 rounded-md text-zinc-500 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center relative w-8 h-8"
            aria-label="Copy code"
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.div
                        key="check"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute"
                    >
                        <Check size={14} className="text-green-500" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="copy"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        transition={{ duration: 0.15 }}
                        className="absolute"
                    >
                        <Copy size={14} />
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}