interface Contribution {
    color: string;
    contributionCount: number;
    contributionLevel: string;
    date: string;
}

interface ContributionsData {
    contributions: Contribution[];
    totalContributions: number;
}

// Cache to store the fetched data
let cachedData: ContributionsData | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5000;


/**
 * Fetches GitHub contributions data with caching to reduce API calls.
 * Data is cached for 10 seconds to avoid excessive requests.
 */
export async function fetchGitHubContributions(): Promise<ContributionsData | null> {
    const now = Date.now();

    // Return cached data if still valid
    if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
        return cachedData;
    }

    try {
        const today = new Date().toISOString().split('T')[0];
        const res = await fetch(
            `https://github-contributions-api.deno.dev/codershubinc.json?flat=true&to=${today}`,
            { cache: 'no-store' }
        );

        if (res.ok) {
            const data: ContributionsData = await res.json();
            // Update cache
            cachedData = data;
            cacheTimestamp = now;
            return data;
        }
    } catch (error) {
        console.error('Failed to fetch GitHub contributions:', error);
    }

    return null;
}

/**
 * Gets today's contribution count from the fetched data
 */
export async function getTodayContributions(): Promise<number> {
    const data = await fetchGitHubContributions();
    if (!data) return 0;

    const today = new Date().toISOString().split('T')[0];
    const todayContrib = data.contributions.find(c => c.date === today);
    return todayContrib?.contributionCount || 0;
}

export type { Contribution, ContributionsData };
