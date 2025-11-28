import React from 'react';
import { fetchProjects, fetchProjectBySlug } from '@/lib/api/github';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote-client/rsc';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { getGitHubThemeStyles } from '@/lib/utils';
import { AnimatedTags } from '@/components/ui/AnimatedTags';
import { ProjectTabs } from '@/components/projects/ProjectTabs';

export async function generateStaticParams() {
  const projects = await fetchProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await fetchProjectBySlug(slug);

  if (!project) {
    console.log("project not found ", project, " for slug: ", slug);
    notFound();
  }

  const mdxOptions = {
    mdxOptions: {
      format: 'md' as const,
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeRaw, rehypeHighlight]
    }
  };

  const tabs = [
    {
      id: 'readme',
      label: 'README',
      content: project.content ? (
        <article
          className={
            `${getGitHubThemeStyles()} prose prose-neutral dark:prose-invert max-w-none prose-pre:bg-[#0d1117] prose-pre:text-gray-100 prose-code:before:content-[''] prose-code:after:content-[''] prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-blockquote:border-blue-400 prose-blockquote:pl-4 prose-blockquote:italic`
          }
        >
          <MDXRemote source={project.content} options={mdxOptions} />
        </article>
      ) : (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          <p>No detailed documentation available for this project.</p>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-2 inline-block"
          >
            Check the README on GitHub
          </a>
        </div>
      )
    },
    project.roadmap ? {
      id: 'roadmap',
      label: 'Roadmap',
      content: (
        <article
          className={
            `${getGitHubThemeStyles()} prose prose-neutral dark:prose-invert max-w-none prose-pre:bg-[#0d1117] prose-pre:text-gray-100 prose-code:before:content-[''] prose-code:after:content-[''] prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-blockquote:border-blue-400 prose-blockquote:pl-4 prose-blockquote:italic`
          }
        >
          <MDXRemote source={project.roadmap} options={mdxOptions} />
        </article>
      )
    } : null,
    project.contributing ? {
      id: 'contributing',
      label: 'Contributing',
      content: (
        <article
          className={
            `${getGitHubThemeStyles()} prose prose-neutral dark:prose-invert max-w-none prose-pre:bg-[#0d1117] prose-pre:text-gray-100 prose-code:before:content-[''] prose-code:after:content-[''] prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-blockquote:border-blue-400 prose-blockquote:pl-4 prose-blockquote:italic`
          }
        >
          <MDXRemote source={project.contributing} options={mdxOptions} />
        </article>
      )
    } : null,
    project.fileTree ? {
      id: 'files',
      label: 'Files',
      content: (
        <div className="bg-[#0d1117] p-4 rounded-lg overflow-x-auto border border-gray-800">
          <div className="flex items-center gap-2 mb-4 text-gray-400 border-b border-gray-800 pb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
            <span className="text-sm font-medium">Project Structure</span>
          </div>
          <pre className="text-sm text-gray-300 font-mono leading-relaxed whitespace-pre">
            {project.fileTree}
          </pre>
        </div>
      )
    } : null
  ].filter(Boolean) as { id: string; label: string; content: React.ReactNode }[];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#09090b]">
      {/* Hero Header */}
      <div className="relative bg-[#0c0c0c] border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-blue-600/10 via-purple-600/10 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center mask-[linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

        <div className="container mx-auto px-6 py-16 relative z-10">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>

          <div className="flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                  {project.icon ? (
                    <div
                      className="w-8 h-8 text-blue-400"
                      dangerouslySetInnerHTML={{ __html: project.icon }}
                    />
                  ) : (
                    <div className="w-8 h-8 flex items-center justify-center text-blue-400 font-bold text-xl">
                      {project.title.charAt(0)}
                    </div>
                  )}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                  {project.title}
                </h1>
              </div>

              <p className="text-xl text-gray-400 leading-relaxed">
                {project.description}
              </p>

              <div className="space-y-4 pt-2">
                {project.languages && project.languages.length > 0 && (
                  <div>
                    <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                      Languages Used
                    </h5>
                    <AnimatedTags
                      tags={project.languages}
                      colorMode="dark"
                      baseClassName="px-3 py-1 rounded-full text-sm font-medium"
                      delay={0.2}
                    />
                  </div>
                )}

                <div>
                  <h5 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                    Technologies
                  </h5>
                  <AnimatedTags
                    tags={project.techStack}
                    colorMode="custom"
                    baseClassName="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400 border-blue-500/20"
                    delay={0.4}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[200px]">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View Source
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl border border-white/10 hover:bg-white/20 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-[#18181b] rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-sm">
              <ProjectTabs tabs={tabs} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-[#18181b] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Project Details</h3>

              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Repository</div>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium truncate block"
                  >
                    {project.slug}
                  </a>
                </div>

                {project.tagline && (
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tagline</div>
                    <div className="text-gray-900 dark:text-gray-200 font-medium">
                      {project.tagline}
                    </div>
                  </div>
                )}

                {project.languages && project.languages.length > 0 && (
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Languages</div>
                    <AnimatedTags
                      tags={project.languages}
                      colorMode="light"
                      baseClassName="px-2 py-1 rounded text-xs font-medium"
                    />
                  </div>
                )}

                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Technologies</div>
                  <AnimatedTags
                    tags={project.techStack}
                    colorMode="custom"
                    baseClassName="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded text-xs font-medium border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
