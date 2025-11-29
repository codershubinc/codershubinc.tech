import { Project } from '@/types/project';

const GITHUB_USERNAME = 'codershubinc';
const BASE_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const getHeaders = (additionalHeaders: Record<string, string> = {}) => {
    console.log(`using the gh token ${!!GITHUB_TOKEN}`);

    const headers: Record<string, string> = {
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...additionalHeaders,
    };
    if (GITHUB_TOKEN) {
        console.log(`Using GitHub token: ${GITHUB_TOKEN.substring(0, 4)}...`);
        headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }
    return headers;
};

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

export async function fetchProjects(): Promise<Project[]> {
    try {
        const response = await fetch(
            `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
            {
                headers: getHeaders(),
                next: { revalidate: 86400 } // Cache for 24 hours
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch projects');
        }

        const repos: GitHubRepo[] = await response.json();

        const filteredRepos = repos
            .filter(repo => !repo.archived && !repo.description?.includes('[ARCHIVED]'))
            .sort((a, b) => {
                // 1. Sort by Stars (descending)
                if (b.stargazers_count !== a.stargazers_count) {
                    return b.stargazers_count - a.stargazers_count;
                }
                // 2. Sort by "Has Description" (projects with descriptions first)
                if (a.description && !b.description) return -1;
                if (!a.description && b.description) return 1;

                // 3. Sort by Updated At (descending)
                return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
            });

        const projects = await Promise.all(filteredRepos.map(async (repo) => {
            // Fetch Languages
            let languages: string[] = [];
            try {
                const languagesResponse = await fetch(`${BASE_URL}/repos/${GITHUB_USERNAME}/${repo.name}/languages`, {
                    headers: getHeaders(),
                    next: { revalidate: 86400 }
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
                title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), // Format title
                slug: repo.name,
                techStack: repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean) as string[],
                description: repo.description || 'No description available.',
                githubUrl: repo.html_url,
                liveUrl: repo.homepage || '',
                tagline: repo.description || '',
                featured: repo.topics.includes('featured'),
                languages: languages,
                // Default icon or logic to choose one
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>',
                createdAt: repo.created_at
            };
        }));

        return projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export async function fetchProjectBySlug(slug: string): Promise<Project | null> {
    try {
        const response = await fetch(`${BASE_URL}/repos/${GITHUB_USERNAME}/${slug}`, {
            headers: getHeaders(),
            next: { revalidate: 86400 }
        });
        // console.log(`Fetching project with slug: ${slug}  from ${BASE_URL}/repos/${GITHUB_USERNAME}/${slug}`);

        if (!response.ok) {
            console.log("Failed to fetch project with slug: ", slug, "got response: ", response.status);
            return null;
        }

        const repo: GitHubRepo = await response.json();
        // console.log("project is ", repo);

        const fetchRaw = async (filename: string) => {
            try {
                const res = await fetch(`${BASE_URL}/repos/${GITHUB_USERNAME}/${slug}/contents/${filename}`, {
                    headers: getHeaders({ 'Accept': 'application/vnd.github.raw+json' }),
                    next: { revalidate: 86400 }
                });
                return res.ok ? await res.text() : null;
            } catch {
                return null;
            }
        };

        // Parallelize fetching of additional data
        const [readme, roadmap, contributing, languagesData, treeData] = await Promise.all([
            fetchRaw('README.md').then(res => res || fetchRaw('readme.md') || ''),
            fetchRaw('ROADMAP.md').then(res => res || fetchRaw('roadmap.md')),
            fetchRaw('CONTRIBUTING.md').then(res => res || fetchRaw('contributing.md')),
            fetch(`${BASE_URL}/repos/${GITHUB_USERNAME}/${slug}/languages`, {
                headers: getHeaders(),
                next: { revalidate: 86400 }
            }).then(res => res.ok ? res.json() : {}),
            fetch(`${BASE_URL}/repos/${GITHUB_USERNAME}/${slug}/git/trees/${repo.default_branch}?recursive=1`, {
                headers: getHeaders(),
                next: { revalidate: 86400 }
            }).then(res => res.ok ? res.json() : null)
        ]);

        const languages = Object.keys(languagesData);

        let fileTree = '';
        if (treeData && treeData.tree) {
            fileTree = treeData.tree.map((item: { path: string }) => item.path).join('\n');
        }

        return {
            id: repo.id.toString(),
            title: repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
            slug: repo.name,
            techStack: repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean) as string[],
            description: repo.description || 'No description available.',
            githubUrl: repo.html_url,
            liveUrl: repo.homepage || '',
            tagline: repo.description || '',
            featured: repo.topics.includes('featured'),
            content: readme || undefined,
            languages: languages,
            roadmap: roadmap || undefined,
            contributing: contributing || undefined,
            fileTree: fileTree || undefined,
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>',
            createdAt: repo.created_at
        };
    } catch (error) {
        console.error(`Error fetching project ${slug}:`, error);
        return null;
    }
}
