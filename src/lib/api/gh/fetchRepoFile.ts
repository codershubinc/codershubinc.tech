import { BASE_URL, GITHUB_USERNAME, getHeaders } from './headers';

/**
 * Fetch a file content from a repo. Returns raw text or null.
 */
export async function fetchRepoFileContent(slug: string, filename: string): Promise<string | null> {
    try {
        const res = await fetch(`${BASE_URL}/repos/${GITHUB_USERNAME}/${slug}/contents/${filename}`, {
            headers: getHeaders({ Accept: 'application/vnd.github.raw+json' }),
            next: { revalidate: 86400 },
        });
        if (!res.ok) return null;
        return await res.text();
    } catch (err) {
        return null;
    }
}
