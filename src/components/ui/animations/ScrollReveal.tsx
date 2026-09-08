"use client";

import { motion, Variants, Transition } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    direction?: Direction;
    delay?: number;
    duration?: number;
}

function makeVariants(direction: Direction): Variants {
    const d = 40;
    const hidden = {
        opacity: 0,
        x: direction === "left" ? -d : direction === "right" ? d : 0,
        y: direction === "up" ? d : direction === "down" ? -d : 0,
    };
    return {
        hidden,
        visible: { opacity: 1, x: 0, y: 0 },
    };
}

export function ScrollReveal({
    children,
    className,
    direction = "up",
    delay = 0,
    duration = 600,
}: ScrollRevealProps) {
    const transition: Transition = {
        duration: duration / 1000,
        delay: delay / 1000,
        ease: [0.22, 0.68, 0, 1.1],
    };

    return (
        <motion.div
            className={className}
            variants={makeVariants(direction)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            transition={transition}
        >
            {children}
        </motion.div>
    );
}
