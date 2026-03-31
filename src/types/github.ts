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

export type GitHubStreakData = {
    mode: string;
    totalContributions: number;
    firstContribution: string;
    longestStreak: {
        start: string;
        end: string;
        length: number;
    };
    currentStreak: {
        start: string;
        end: string;
        length: number;
    };
    excludedDays: string[];
};
