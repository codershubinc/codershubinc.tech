import { fetchRepoFileContent } from './fetchRepoFile';

export async function fetchReadme(slug: string): Promise<string | ''> {
    const content = await fetchRepoFileContent(slug, 'README.md');
    if (content) return content;
    // fallback to lower-case
    const alt = await fetchRepoFileContent(slug, 'readme.md');
    return alt || '';
}
