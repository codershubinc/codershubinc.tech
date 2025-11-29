import React from 'react';
import Link from 'next/link';
import { Project } from '@/types/project';
import { getLanguageColor } from '@/types/language';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="project-card rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden w-full">
      <div className="bg-white dark:bg-gray-50/5 px-4 py-3 flex items-center justify-between gap-3 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="text-xs text-muted-foreground">codershubinc/</div>
          <div className="text-sm font-semibold text-foreground truncate">{project.slug}</div>
        </div>
        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-sm">
          {project.icon ? (
            <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: project.icon }} />
          ) : (
            <div className="text-sm font-bold">{project.title.charAt(0)}</div>
          )}
        </div>
      </div>

      <div className="bg-[#0c1720] dark:bg-[#0c1720] rounded-b-2xl p-5">
        {/* Project Icon */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-lg border border-border">
            {project.icon ? (
              <div className="w-6 h-6" dangerouslySetInnerHTML={{ __html: project.icon }} />
            ) : (
              <div className="w-6 h-6 text-white font-bold text-lg">{project.title.charAt(0)}</div>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h4 className="text-xl font-semibold text-white">{project.title}</h4>
              {project.featured && (
                <span className="ml-1 inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/15">★ Featured</span>
              )}
            </div>
            {project.tagline && <p className="text-sm text-gray-300 mt-2">{project.tagline}</p>}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            {/* title moved above in header */}
          </div>

          {/* Description intentionally removed for compact card design */}

          {/* Stars  */}
          {project.stars !== undefined && (
            <div className="flex items-center text-sm text-yellow-500 font-medium">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>{project.stars}</span>
            </div>
          )}
          {/* Languages */}
          {project.languages && project.languages.length > 0 && (
            <div className="mb-3">
              <div className="flex flex-wrap gap-2 text-xs">
                {project.languages.map((lang) => (
                  <span key={lang} className={`px-2 py-0.5 rounded-full font-medium border ${getLanguageColor(lang)} text-xs`}>{lang}</span>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {/* Tech stack removed to declutter card; keep language chips above */}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex gap-3 items-center">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center justify-center px-4 py-2 bg-primary text-white font-semibold rounded-md hover:bg-primary/90 transition-colors text-sm"
          >
            View Details
          </Link>

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 py-1 border border-border text-sm rounded-md bg-muted hover:bg-muted/80"
            >
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-3 py-1 border border-border text-sm rounded-md bg-muted hover:bg-muted/80"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
