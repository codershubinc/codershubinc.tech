"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn, getLanguageColor, getDarkLanguageColor } from '@/lib/utils';

type ColorMode = 'light' | 'dark' | 'custom';

interface AnimatedTagsProps {
    tags: string[];
    colorMode?: ColorMode; // 'light' uses getLanguageColor, 'dark' uses getDarkLanguageColor
    baseClassName?: string; // Base classes for all tags (e.g. padding, rounded)
    className?: string; // Container class
    delay?: number;
}

export function AnimatedTags({
    tags,
    colorMode = 'light',
    baseClassName,
    className,
    delay = 0
}: AnimatedTagsProps) {

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
                delayChildren: delay,
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 15, scale: 0.8, rotate: -2 },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring" as const,
                stiffness: 200,
                damping: 12
            }
        }
    };

    const getColorClass = (tag: string) => {
        if (colorMode === 'dark') return getDarkLanguageColor(tag);
        if (colorMode === 'light') return getLanguageColor(tag);
        return '';
    };

    return (
        <motion.div
            className={cn("flex flex-wrap gap-2", className)}
            variants={container}
            initial="hidden"
            animate="show"
        >
            {tags.map((tag) => (
                <motion.span
                    key={tag}
                    variants={item}
                    whileHover={{ scale: 1.05, y: -2, rotate: 1 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                        "border transition-all cursor-default shadow-xs hover:shadow-md",
                        baseClassName,
                        getColorClass(tag)
                    )}
                >
                    {tag}
                </motion.span>
            ))}
        </motion.div>
    );
}
