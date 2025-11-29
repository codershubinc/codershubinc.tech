import { fetchRepoFileContent } from './fetchRepoFile';

export async function fetchContributing(slug: string): Promise<string | null> {
    const content = await fetchRepoFileContent(slug, 'CONTRIBUTING.md');
    if (content) return content;
    return await fetchRepoFileContent(slug, 'contributing.md');
}
