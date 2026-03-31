
export const GITHUB_USERNAME = 'codershubinc';

export const github = {
    baseUrl: 'https://github-readme-states-repo-self-inst.vercel.app/api',
    contributionsBaseUrl: 'https://github-contributions-api.deno.dev',
    apiBaseUrl: 'https://api.github.com',

    endpoints: {
        stats: (username: string = GITHUB_USERNAME) =>
            `https://github-readme-states-repo-self-inst.vercel.app/api/json-stats?username=${username}`,

        topLanguages: (username: string = GITHUB_USERNAME) =>
            `https://github-readme-states-repo-self-inst.vercel.app/api/json-top-langs?username=${username}`,

        contributions: (username: string = GITHUB_USERNAME, toDate?: string) => {
            const date = toDate || new Date().toISOString().split('T')[0];
            return `https://github-contributions-api.deno.dev/${username}.json?flat=true&to=${date}`;
        },

        userProfile: (username: string = GITHUB_USERNAME) =>
            `https://api.github.com/users/${username}`,

        streak: (username: string = GITHUB_USERNAME) =>
            `https://github-readme-streak-stats-chi-three.vercel.app/?user=${username}&type=json`,
    },
} as const;

// Spotify API Endpoints
export const spotify = {
    proxy: '/api/spotify',
    external: 'https://sp-card-t.vercel.app/json',
} as const;

export const vsMusic = {
    capsuleInfo: 'http://192.168.1.109:3000/api/capsule-info',
} as const;

export const badges = {
    baseUrl: 'https://img.shields.io',

    followers: (username: string = GITHUB_USERNAME) =>
        `https://img.shields.io/github/followers/${username}?style=for-the-badge&logo=github&logoColor=white&labelColor=181717&color=007acc`,

    repos: (username: string = GITHUB_USERNAME) =>
        `https://img.shields.io/badge/dynamic/json?style=for-the-badge&logo=github&logoColor=white&labelColor=181717&color=007acc&label=Repos&query=$.public_repos&url=https://api.github.com/users/${username}`,
} as const;

// CDN Endpoints
export const cdn = {
    devicon: (iconName: string) =>
        `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconName}/${iconName}-original.svg`,
} as const;

// Revalidation Times (in seconds)
export const REVALIDATE = {
    REALTIME: 0,
    FAST: 60,
    MEDIUM: 300,
    SLOW: 3600,
    DAILY: 86400,
} as const;
