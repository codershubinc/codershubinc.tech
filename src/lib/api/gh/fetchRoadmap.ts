import { fetchRepoFileContent } from './fetchRepoFile';

export async function fetchRoadmap(slug: string): Promise<string | null> {
    const content = await fetchRepoFileContent(slug, 'ROADMAP.md');
    if (content) return content;
    return await fetchRepoFileContent(slug, 'roadmap.md');
}
