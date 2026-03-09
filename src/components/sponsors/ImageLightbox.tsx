"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
    images: string[];
    index: number;
    name: string;
    onClose: () => void;
    onNav: (index: number) => void;
}

export function ImageLightbox({ images, index, name, onClose, onNav }: Props) {
    const prev = useCallback(() => onNav((index - 1 + images.length) % images.length), [index, images.length, onNav]);
    const next = useCallback(() => onNav((index + 1) % images.length), [index, images.length, onNav]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", handler);
            document.body.style.overflow = "";
        };
    }, [onClose, prev, next]);

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={onClose}
        >
            {/* Close */}
            <button
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 border border-white/10 text-white hover:bg-white/20 transition-colors"
                onClick={onClose}
                aria-label="Close"
            >
                <X size={20} />
            </button>

            {/* Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-xs text-white/40 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                {index + 1} / {images.length}
            </div>

            {/* Prev */}
            <button
                className="absolute left-4 z-10 p-3 rounded-full bg-white/10 border border-white/10 text-white hover:bg-[#007acc]/50 hover:border-[#007acc]/50 transition-all active:scale-95"
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous image"
            >
                <ChevronLeft size={24} />
            </button>

            {/* Image */}
            <div
                className="relative w-full max-w-4xl max-h-[85vh] mx-20 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    key={index}
                    src={images[index]}
                    alt={`${name} photo ${index + 1}`}
                    width={1200}
                    height={900}
                    className="w-full h-auto max-h-[85vh] object-contain animate-in fade-in zoom-in-95 duration-200"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                />
            </div>

            {/* Next */}
            <button
                className="absolute right-4 z-10 p-3 rounded-full bg-white/10 border border-white/10 text-white hover:bg-[#007acc]/50 hover:border-[#007acc]/50 transition-all active:scale-95"
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next image"
            >
                <ChevronRight size={24} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={(e) => { e.stopPropagation(); onNav(i); }}
                        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === index ? "bg-[#007acc] w-4" : "bg-white/30 hover:bg-white/60"}`}
                        aria-label={`Go to photo ${i + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
