"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CarouselProps {
    children: React.ReactNode;
    gap?: number;
    autoplay?: boolean;
    interval?: number; // ms
    itemsPerView?: number;
}

export default function Carousel({ children, gap = 16, autoplay = false, interval = 3000, itemsPerView = 1 }: CarouselProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isPaused, setIsPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const scrollBy = (offset: number) => {
        if (!containerRef.current) return;
        containerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    };

    const handlePrev = () => {
        if (!containerRef.current) return;
        scrollBy(-containerRef.current.clientWidth + gap);
    };

    const handleNext = () => {
        if (!containerRef.current) return;
        scrollBy(containerRef.current.clientWidth - gap);
    };

    useEffect(() => {
        if (!autoplay || !containerRef.current) return;
        const id = setInterval(() => {
            if (isPaused) return;
            if (!containerRef.current) return;
            scrollBy(containerRef.current.clientWidth - gap);
        }, interval);
        return () => clearInterval(id);
    }, [autoplay, interval, gap, isPaused]);

    useEffect(() => {
        const node = containerRef.current;
        if (!node) return;
        let raf = 0;
        const onScroll = () => {
            if (!node) return;
            const pageWidth = node.clientWidth;
            const idx = Math.round(node.scrollLeft / (pageWidth - gap));
            setCurrentIndex(idx);
        };
        node.addEventListener('scroll', onScroll, { passive: true });
        return () => {
            node.removeEventListener('scroll', onScroll);
            cancelAnimationFrame(raf);
        };
    }, [gap]);

    return (
        <div className="relative">
            <button
                aria-label="Previous"
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/70 border border-border rounded-full hover:bg-background/90"
            >
                ‹
            </button>
            <div
                ref={containerRef}
                className="overflow-x-auto no-scrollbar scroll-snap-x snap-mandatory flex gap-4 py-3"
                style={{ scrollSnapType: 'x mandatory' as React.CSSProperties['scrollSnapType'] }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Dots */}
                <div className="flex items-center justify-center gap-2 mt-3">
                    {Array.from({ length: Math.max(1, Math.ceil(React.Children.count(children) / itemsPerView)) }).map((_, i) => (
                        <button
                            key={i}
                            aria-label={`Go to slide ${i + 1}`}
                            onClick={() => {
                                if (!containerRef.current) return;
                                containerRef.current.scrollTo({ left: i * containerRef.current.clientWidth, behavior: 'smooth' });
                            }}
                            className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-blue-600' : 'bg-gray-500/40'}`}
                        />
                    ))}
                </div>
                {React.Children.map(children, (child) => (
                    <motion.div className="snap-start shrink-0" style={{ flex: `0 0 ${100 / itemsPerView}%` }}>{child}</motion.div>
                ))}
            </div>
            <button
                aria-label="Next"
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/70 border border-border rounded-full hover:bg-background/90"
            >
                ›
            </button>
        </div>
    );
}
