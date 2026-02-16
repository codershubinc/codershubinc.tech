'use client';

import { useState, useEffect } from 'react';

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

interface UseContributionsReturn {
    contributionsData: ContributionsData | null;
    todaysCount: number;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useContributions(): UseContributionsReturn {
    const [contributionsData, setContributionsData] = useState<ContributionsData | null>(null);
    const [todaysCount, setTodaysCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContributions = async () => {
        setLoading(true);
        setError(null);

        try {
            const today = new Date().toLocaleString().split('T')[0];
            const response = await fetch(
                `https://github-contributions-api.deno.dev/codershubinc.json?flat=true&to=${today}`,
                { cache: 'no-store' }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch contributions: ${response.status}`);
            }

            const data: ContributionsData = await response.json();
            setContributionsData(data);

            const todayContrib = data.contributions[data.contributions.length - 1];
            // console.log(`Today's contributions: ${todayContrib?.contributionCount || 0}`);

            setTodaysCount(todayContrib?.contributionCount || 0);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch contributions';
            setError(errorMessage);
            console.error('Error fetching contributions:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContributions();
        const interval = setInterval(() => {
            fetchContributions();
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return {
        contributionsData,
        todaysCount,
        loading,
        error,
        refetch: fetchContributions,
    };
}
