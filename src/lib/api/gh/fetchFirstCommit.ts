import { BASE_URL, GITHUB_USERNAME, getHeaders } from './headers';

export async function fetchFirstCommitDate(slug: string, owner: string = GITHUB_USERNAME): Promise<{ sha: string; date: string; message?: string } | null> {
    try {
        const url = `${BASE_URL}/repos/${owner}/${slug}/commits?per_page=1`;
        const res = await fetch(url, {
            headers: getHeaders(),
            next: { revalidate: 86400 },
        });
        if (!res.ok) return null;

        const linkHeader = res.headers.get('link');
        let firstCommitUrl = url;
        if (linkHeader) {
            const matches = linkHeader.match(/<([^>]+)>;\s*rel="last"/);
            if (matches) firstCommitUrl = matches[1];
        }

        const commitRes = await fetch(firstCommitUrl, {
            headers: getHeaders(),
            next: { revalidate: 86400 },
        });
        if (!commitRes.ok) return null;
        const data = await commitRes.json();
        const commitData = Array.isArray(data) ? data[0] : data;
        if (!commitData || !commitData.commit) return null;
        return {
            sha: commitData.sha,
            date: commitData.commit.author?.date || commitData.commit.committer?.date || '',
            message: commitData.commit.message,
        };
    } catch (error) {
        console.error('Error fetching first commit date', error);
        return null;
    }
}
