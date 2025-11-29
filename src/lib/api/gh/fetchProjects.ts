import { Project } from '@/types/project';
import { BASE_URL, GITHUB_USERNAME, getHeaders } from './headers';

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
    stargazer_count: number;
}

export async function fetchProjects(): Promise<Project[]> {
    try {
        const response = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`, {
            headers: getHeaders(),
            next: { revalidate: 86400 },
        });
        if (!response.ok) throw new Error('Failed to fetch projects');
        const repos: GitHubRepo[] = await response.json();
        console.log("Got repos", repos);

        const filteredRepos = repos
            .filter((repo) => !repo.archived && !repo.description?.includes('[ARCHIVED]'))
            .sort((a, b) => {
                if (b.stargazers_count !== a.stargazers_count) return b.stargazers_count - a.stargazers_count;
                if (a.description && !b.description) return -1;
                if (!a.description && b.description) return 1;
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            });
        const projects = await Promise.all(
            filteredRepos.map(async (repo) => {
                let languages: string[] = [];
                try {
                    const languagesResponse = await fetch(`${BASE_URL}/repos/${GITHUB_USERNAME}/${repo.name}/languages`, {
                        headers: getHeaders(),
                        next: { revalidate: 86400 },
                    });
                    if (languagesResponse.ok) {
                        const languagesData = await languagesResponse.json();
                        languages = Object.keys(languagesData);
                    }
                } catch (e) {
                    console.error(`Failed to fetch languages for ${repo.name}`, e);
                }
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
                    languages,
                    icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>',
                    createdAt: repo.created_at,
                    stars: repo.stargazers_count,

                };
            })
        );
        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}
