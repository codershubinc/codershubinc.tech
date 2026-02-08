/**
 * API Constants
 * Centralized API endpoints configuration for the portfolio
 */

// GitHub Username
export const GITHUB_USERNAME = 'codershubinc';

// GitHub API Endpoints
export const github = {
    baseUrl: 'https://github-readme-states-repo-self-inst.vercel.app/api',
    contributionsBaseUrl: 'https://github-contributions-api.deno.dev',
    apiBaseUrl: 'https://api.github.com',

    endpoints: {
        /**
         * GitHub Stats - Returns commit count, stars, PRs, issues, rank, etc.
         * Revalidate: 1 hour
         */
        stats: (username: string = GITHUB_USERNAME) =>
            `https://github-readme-states-repo-self-inst.vercel.app/api/json-stats?username=${username}`,

        /**
         * GitHub Top Languages - Returns language distribution
         * Revalidate: 1 hour
         */
        topLanguages: (username: string = GITHUB_USERNAME) =>
            `https://github-readme-states-repo-self-inst.vercel.app/api/json-top-langs?username=${username}`,

        /**
         * GitHub Contributions - Returns daily contribution data
         * @param username - GitHub username
         * @param toDate - End date in ISO format (YYYY-MM-DD)
         * Revalidate: 1 hour
         */
        contributions: (username: string = GITHUB_USERNAME, toDate?: string) => {
            const date = toDate || new Date().toISOString().split('T')[0];
            return `https://github-contributions-api.deno.dev/${username}.json?flat=true&to=${date}`;
        },

        /**
         * GitHub User Profile - Returns public profile data
         * Used for follower/repo counts
         */
        userProfile: (username: string = GITHUB_USERNAME) =>
            `https://api.github.com/users/${username}`,
    },
} as const;

// Spotify API Endpoints
export const spotify = {
    /**
     * Local proxy endpoint for Spotify data
     * Updates: Real-time (5 second intervals on client)
     */
    proxy: '/api/spotify',

    /**
     * External Spotify Card API
     * Returns currently playing track info
     */
    external: 'https://sp-card-t.vercel.app/json',
} as const;

// VS Music API Endpoints
export const vsMusic = {
    /**
     * VS Music Extension Stats
     * Returns install count, stars, version info
     * Revalidate: 1 minute
     */
    capsuleInfo: 'http://192.168.1.109:3000/api/capsule-info',
} as const;

// Badge/Shield API Endpoints
export const badges = {
    baseUrl: 'https://img.shields.io',

    /**
     * GitHub Followers Badge
     */
    followers: (username: string = GITHUB_USERNAME) =>
        `https://img.shields.io/github/followers/${username}?style=for-the-badge&logo=github&logoColor=white&labelColor=181717&color=007acc`,

    /**
     * GitHub Public Repos Badge (Dynamic JSON)
     */
    repos: (username: string = GITHUB_USERNAME) =>
        `https://img.shields.io/badge/dynamic/json?style=for-the-badge&logo=github&logoColor=white&labelColor=181717&color=007acc&label=Repos&query=$.public_repos&url=https://api.github.com/users/${username}`,
} as const;

// CDN Endpoints
export const cdn = {
    /**
     * DevIcon CDN for programming language icons
     * @param iconName - Language icon name (e.g., 'javascript', 'python')
     */
    devicon: (iconName: string) =>
        `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconName}/${iconName}-original.svg`,
} as const;

// Revalidation Times (in seconds)
export const REVALIDATE = {
    REALTIME: 0,          // No cache, always fetch fresh
    FAST: 60,             // 1 minute
    MEDIUM: 300,          // 5 minutes
    SLOW: 3600,           // 1 hour
    DAILY: 86400,         // 24 hours
} as const;

// API Response Types (for reference)
export type GitHubStatsResponse = {
    name: string;
    totalPRs: number;
    totalPRsMerged: number;
    mergedPRsPercentage: number;
    totalReviews: number;
    totalCommits: number;
    totalIssues: number;
    totalStars: number;
    totalDiscussionsStarted: number;
    totalDiscussionsAnswered: number;
    contributedTo: number;
    rank: {
        level: string;
        percentile: number;
    };
};

export type GitHubLanguage = {
    name: string;
    color: string;
    size: number;
    count: number;
};

export type GitHubContribution = {
    color: string;
    contributionCount: number;
    contributionLevel: string;
    date: string;
};

export type SpotifyData = {
    artist: string;
    track: string;
    album: string;
    album_images: Array<{ url: string; height: number; width: number }>;
    is_playing: boolean;
    status: string;
    track_uri: string;
    raw: {
        progress_ms: number;
        item: {
            duration_ms: number;
        };
    };
};

export type VSMusicStats = {
    installs: number;
    stars: number;
    version: string;
    forks: number;
    issues: number;
};
