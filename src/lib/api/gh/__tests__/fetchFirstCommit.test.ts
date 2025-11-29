import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchFirstCommitDate } from '../fetchFirstCommit';

describe('fetchFirstCommitDate', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('returns the first commit when Link header points to last page', async () => {
        const commitsUrl = 'https://api.github.com/repos/codershubinc/repo/commits?per_page=1';
        const lastPageUrl = 'https://api.github.com/repos/codershubinc/repo/commits?page=100&per_page=1';

        const firstResponse = {
            ok: true,
            headers: {
                get: (name: string) => name === 'link' ? `<${lastPageUrl}>; rel="last"` : null
            },
            json: async () => []
        } as any;

        const lastResponse = {
            ok: true,
            json: async () => [{ sha: 'abc123', commit: { author: { date: '2020-01-01T00:00:00Z' }, message: 'Initial commit' } }]
        } as any;

        const fetchMock = vi.fn()
            .mockResolvedValueOnce(firstResponse)
            .mockResolvedValueOnce(lastResponse);
        global.fetch = fetchMock as any;

        const result = await fetchFirstCommitDate('repo', 'codershubinc');

        expect(result).not.toBeNull();
        expect(result?.sha).toBe('abc123');
        expect(result?.date).toBe('2020-01-01T00:00:00Z');
    });

    it('handles repos with single commit (no link header)', async () => {
        const response = {
            ok: true,
            headers: { get: (_: string) => null },
            json: async () => [{ sha: 'single', commit: { author: { date: '2010-02-03T00:00:00Z' }, message: 'Single' } }]
        } as any;

        const fetchMock = vi.fn().mockResolvedValue(response);
        global.fetch = fetchMock as any;

        const result = await fetchFirstCommitDate('repo', 'codershubinc');
        expect(result).not.toBeNull();
        expect(result?.sha).toBe('single');
        expect(result?.date).toBe('2010-02-03T00:00:00Z');
    });
});
