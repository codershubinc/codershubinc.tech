export const GITHUB_USERNAME = 'codershubinc';
export const BASE_URL = 'https://api.github.com';
export const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const getHeaders = (additionalHeaders: Record<string, string> = {}) => {
    console.log(`using the gh token ${!!GITHUB_TOKEN}`);
    const headers: Record<string, string> = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...additionalHeaders,
    };
    if (GITHUB_TOKEN) {
        console.log(`Using GitHub token: ${GITHUB_TOKEN.substring(0, 4)}...`);
        headers['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
    }
    return headers;
};
