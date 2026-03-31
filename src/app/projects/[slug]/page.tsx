import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, Globe, Terminal, Activity, Calendar } from "lucide-react";
import { projects } from "@/data/projects";
import { Navbar, ScrollReveal, MarkdownRenderer } from "@/components/ui";
import ProfileCapsules from "@/components/ui/ProfileCapsules";

// Helper to extract exact owner/repo from GitHub URLs
function getRepoPath(url?: string) {
    if (!url || url === "#") return null;
    const rawUrl = url.match(/\((.*?)\)/)?.[1] || url;
    const match = rawUrl.match(/github\.com\/([^\/]+\/[^\/]+)/);
    if (!match) return null;
    return match[1].replace(/\/$/, ""); // remove trailing slash
}

async function fetchReadme(repoPath: string) {
    try {
        // Attempt to fetch from main
        const res = await fetch(`https://raw.githubusercontent.com/${repoPath}/main/README.md`, { next: { revalidate: 3600 } });
        if (res.ok) return { content: await res.text(), branch: "main" };

        // Fallback to master if main doesn't exist
        const resMaster = await fetch(`https://raw.githubusercontent.com/${repoPath}/master/README.md`, { next: { revalidate: 3600 } });
        if (resMaster.ok) return { content: await resMaster.text(), branch: "master" };
    } catch (error) {
        console.error("Failed to fetch README", error);
    }
    return null;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> | { slug: string } }): Promise<Metadata> {
    const resolvedParams = await Promise.resolve(params);
    const slug = resolvedParams.slug;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    const title = `${project.title} | CodersHubInc`;
    const description = project.description;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            type: "article",
            url: `https://codershubinc.com/projects/${slug}`,
            images: [
                {
                    url: `https://codershubinc.com/api/og?slug=${slug}`,
                    width: 1200,
                    height: 630,
                    alt: title,
                    type: "image/png",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [`https://codershubinc.com/api/og?slug=${slug}`],
        },
    };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> | { slug: string } }) {
    // Await params if it's a promise (Next.js 15+ App Router)
    const resolvedParams = await Promise.resolve(params);
    const slug = resolvedParams.slug;
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const repoPath = getRepoPath(project.githubUrl);
    const readmeData = repoPath ? await fetchReadme(repoPath) : null;
    const readmeContent = readmeData?.content || null;
    const rawBaseUrl = repoPath && readmeData ? `https://raw.githubusercontent.com/${repoPath}/${readmeData.branch}` : undefined;

    const githubUrl = project.githubUrl?.match(/\((.*?)\)/)?.[1] || project.githubUrl;
    const liveUrl = project.liveUrl?.match(/\((.*?)\)/)?.[1] || project.liveUrl;

    return (
        <>
            <main className="min-h-screen bg-[#000000] text-[#b0b0b0] selection:bg-[#007acc] selection:text-white font-sans overflow-x-hidden">
                <Navbar capsules={<ProfileCapsules />} />

                <article className="pt-32 pb-24 px-4 sm:px-6 max-w-4xl mx-auto relative min-h-screen flex flex-col">
                    {/* Background Ambient Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#007acc]/10 blur-[150px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10">
                        {/* Back Navigation */}
                        <ScrollReveal direction="up">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 text-sm font-mono text-zinc-400 hover:text-[#007acc] transition-colors mb-12 group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                cd ..
                            </Link>
                        </ScrollReveal>

                        {/* Header Section */}
                        <ScrollReveal direction="up" delay={100}>
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                                <div>
                                    <h1 className="text-4xl sm:text-6xl font-bold font-mono text-white mb-4 flex items-center gap-4">
                                        <Terminal className="text-[#007acc]" size={40} />
                                        {project.title}
                                    </h1>
                                    <p className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Action Links */}
                                <div className="flex items-center gap-3 shrink-0">
                                    {githubUrl && githubUrl !== "#" && (
                                        <a href={githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/10 text-white transition-all font-medium text-sm">
                                            <Github size={16} /> Repository
                                        </a>
                                    )}
                                    {liveUrl && liveUrl !== "#" && (
                                        <a href={liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#007acc]/10 border border-[#007acc]/30 rounded-lg hover:bg-[#007acc]/20 text-[#007acc] transition-all font-medium text-sm">
                                            <Globe size={16} /> Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Tech Stack Bar */}
                            <div className="flex flex-wrap gap-2 mb-16 pb-8 border-b border-white/5">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="px-3 py-1 font-mono text-xs bg-white/5 text-zinc-300 rounded-full border border-white/10">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </ScrollReveal>

                        {/* Readme Content */}
                        <ScrollReveal direction="up" delay={200}>
                            {readmeContent ? (
                                <MarkdownRenderer content={readmeContent} rawBaseUrl={rawBaseUrl} />
                            ) : (
                                <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                                    <Activity className="mx-auto text-zinc-500 mb-4 animate-pulse" size={32} />
                                    <p className="text-zinc-500 font-mono text-sm max-w-sm mx-auto">
                                        [System Status] No README log detected for this module or repository is closed context.
                                    </p>
                                </div>
                            )}
                        </ScrollReveal>
                    </div>
                </article>
            </main>
        </>
    );
}
