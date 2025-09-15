"use client"
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ProjectSummary } from "@/lib/project.type";
import ProjectCard from "./ProjectCard";

interface ProjectCarouselProps {
    projects: ProjectSummary[];
    title?: string;
    description?: string;
}

export default function ProjectCarousel({
    projects,
    title = "Featured Projects",
    description = "Open-source tools built to enhance your development workflow"
}: ProjectCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(1);

    // Update items per view based on screen size
    useEffect(() => {
        const updateItemsPerView = () => {
            if (window.innerWidth >= 1024) {
                setItemsPerView(3);
            } else if (window.innerWidth >= 768) {
                setItemsPerView(2);
            } else {
                setItemsPerView(1);
            }
        };

        updateItemsPerView();
        window.addEventListener("resize", updateItemsPerView);
        return () => window.removeEventListener("resize", updateItemsPerView);
    }, []);

    const maxIndex = Math.max(0, projects.length - itemsPerView);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, [maxIndex]);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(Math.min(index, maxIndex));
    };

    // Auto-play functionality
    useEffect(() => {
        if (!isAutoPlay) return;

        const timer = setInterval(() => {
            nextSlide();
        }, 4000); // Change slide every 4 seconds

        return () => clearInterval(timer);
    }, [currentIndex, maxIndex, nextSlide]);

    return (
        <section className="py-20 px-6 lg:px-8 bg-white/30 dark:bg-slate-800/30 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-16">
                    <h3 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                        {title}
                    </h3>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        {description}
                    </p>
                </div>

                {/* Carousel Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    {projects.length > itemsPerView && (
                        <>
                            <button
                                onClick={prevSlide}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 border border-gray-200/50 dark:border-slate-600/50"
                                aria-label="Previous projects"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>

                            <button
                                onClick={nextSlide}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:scale-110 border border-gray-200/50 dark:border-slate-600/50"
                                aria-label="Next projects"
                            >
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </>
                    )}

                    {/* Cards Container */}
                    <div className="overflow-hidden rounded-2xl">
                        <div
                            className="flex transition-transform duration-500 ease-in-out gap-8"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                                width: `${(projects.length / itemsPerView) * 100}%`
                            }}
                        >
                            {projects.map((project) => (
                                <div
                                    key={project.id}
                                    className="flex-shrink-0"
                                    style={{ width: `${100 / projects.length}%` }}
                                >
                                    <ProjectCard project={project} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    {projects.length > itemsPerView && (
                        <div className="flex justify-center mt-12 gap-3">
                            {Array.from({ length: maxIndex + 1 }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                            ? "bg-blue-600 dark:bg-blue-400 scale-125"
                                            : "bg-gray-300 dark:bg-slate-600 hover:bg-gray-400 dark:hover:bg-slate-500"
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* View All Projects Button */}
                <div className="text-center mt-16">
                    <Link
                        href="/projects"
                        className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700"
                    >
                        <span className="mr-2">View All Projects</span>
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}