"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy text: ", err);
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