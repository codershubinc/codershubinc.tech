import { Project } from '@/types/project';
import { BASE_URL, GITHUB_USERNAME, getHeaders } from './headers';
import { fetchReadme } from './fetchReadme';
import { fetchRoadmap } from './fetchRoadmap';
import { fetchContributing } from './fetchContributing';

interface GitHubRepo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    topics: string[];
    language: string | null;
    stargazers_count: number;
    updated_at: string;
    archived: boolean;
    default_branch: string;
    created_at: string;
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const response = await fetch(`${BASE_URL}/repos/${GITHUB_USERNAME}/${slug}`, {
            headers: getHeaders(),
            next: { revalidate: 86400 },
        });
        if (!response.ok) return null;
        const repo: GitHubRepo = await response.json();
        const [readme, roadmap, contributing, languagesData, treeData] = await Promise.all([
            fetchReadme(slug),
            fetchRoadmap(slug),
            fetchContributing(slug),
            fetch(`${BASE_URL}/repos/${GITHUB_USERNAME}/${slug}/languages`, { headers: getHeaders(), next: { revalidate: 86400 } }).then((res) => (res.ok ? res.json() : {})),
            fetch(`${BASE_URL}/repos/${GITHUB_USERNAME}/${slug}/git/trees/${repo.default_branch}?recursive=1`, { headers: getHeaders(), next: { revalidate: 86400 } }).then((res) => (res.ok ? res.json() : null)),
        ]);
        const languages = Object.keys(languagesData || {});
        let fileTree = '';
        if (treeData && treeData.tree) fileTree = treeData.tree.map((item: { path: string }) => item.path).join('\n');
        return {
            id: repo.id.toString(),
            title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
            slug: repo.name,
            techStack: repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean) as string[],
            description: repo.description || 'No description available.',
            githubUrl: repo.html_url,
            liveUrl: repo.homepage || '',
            tagline: repo.description || '',
            featured: repo.topics.includes('featured'),
            content: readme || undefined,
            languages,
            roadmap: roadmap || undefined,
            contributing: contributing || undefined,
            fileTree: fileTree || undefined,
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>',
            createdAt: repo.created_at,
        };
    } catch (error) {
        console.error(`Error fetching project ${slug}:`, error);
        return null;
    }
}
