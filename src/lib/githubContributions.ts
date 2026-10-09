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
 * Data is cached for 5 seconds to avoid excessive requests.
 */
export async function fetchGitHubContributions(): Promise<ContributionsData | null> {
    const now = Date.now();

    // Return cached data if still valid
    if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
        return cachedData;
    }

    try {
        const res = await fetch(
            `https://github-contributions-api.jogruber.de/v4/codershubinc`,
            { cache: 'no-store' }
        );

        if (res.ok) {
            const data = await res.json();
            
            const today = new Date();
            const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
            
            const allContribs = data.contributions.sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());
            const pastAndToday = allContribs.filter((c: any) => c.date <= todayStr);
            const last365Days = pastAndToday.slice(-365);
            const totalAllTime = Object.values(data.total).reduce((a: any, b: any) => a + b, 0);

            const mappedData: ContributionsData = {
                contributions: last365Days.map((c: any) => ({
                    date: c.date,
                    contributionCount: c.count,
                    color: '#ebedf0',
                    contributionLevel: String(c.level)
                })),
                totalContributions: totalAllTime as number
            };

            // Update cache
            cachedData = mappedData;
            cacheTimestamp = now;
            return mappedData;
        }
    } catch (error) {
        console.error('Failed to fetch GitHub contributions:', error);
    }

    return cachedData || null;
}

/**
 * Gets today's contribution count from the fetched data
 */
export async function getTodayContributions(): Promise<number> {
    const data = await fetchGitHubContributions();
    if (!data) return 0;

    const today = new Date();
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const todayContrib = data.contributions.find(c => c.date === todayStr);
    return todayContrib?.contributionCount || 0;
}

export type { Contribution, ContributionsData };
