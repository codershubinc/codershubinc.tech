"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CoverflowCarouselProps {
    children: React.ReactNode[] | React.ReactNode;
    initialIndex?: number;
    loop?: boolean;
}

export default function CoverflowCarousel({ children, initialIndex = 0, loop = true }: CoverflowCarouselProps) {
    const items = React.Children.toArray(children);
    const [active, setActive] = useState(initialIndex);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const prev = () => setActive((i) => (i - 1 + items.length) % items.length);
    const next = () => setActive((i) => (i + 1) % items.length);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, []);

    return (
        <div className="relative w-full">
            <button
                aria-label="Previous"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/70 border border-border rounded-full hover:bg-background/90"
            >
                ‹
            </button>

            <div ref={containerRef} className="w-full overflow-hidden select-none">
                <div className="flex items-center justify-center w-full pointer-events-none" style={{ height: 420 }}>
                    {items.map((child, idx) => {
                        const distance = Math.abs(active - idx);
                        // allow wrap-around minimal distance
                        const wrapDist = Math.min(distance, items.length - distance);
                        const isActive = idx === active;
                        const scale = isActive ? 1 : wrapDist === 1 ? 0.86 : 0.7;
                        const zIndex = isActive ? 30 : 20 - wrapDist;
                        const rotateY = isActive ? 0 : idx < active ? 15 : -15;
                        const xOffset = (idx - active) * 260; // spacing

                        return (
                            <motion.div
                                key={idx}
                                className="pointer-events-auto transition-transform duration-300"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transform: `translateX(${xOffset}px) scale(${scale}) rotateY(${rotateY}deg)` }}
                                style={{ zIndex, minWidth: 320 }}
                            >
                                {child}
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <button
                aria-label="Next"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 bg-background/70 border border-border rounded-full hover:bg-background/90"
            >
                ›
            </button>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-4">
                {items.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setActive(i)}
                        className={`w-2 h-2 rounded-full transition-all ${i === active ? 'bg-blue-600' : 'bg-gray-500/40'}`}
                        aria-label={`Go to ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
