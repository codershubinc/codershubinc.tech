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
    previousDaysCount: number;
    loading: boolean;
    error: string | null;
    refetch: () => void;
}

export function useContributions(): UseContributionsReturn {
    const [contributionsData, setContributionsData] = useState<ContributionsData | null>(null);
    const [todaysCount, setTodaysCount] = useState<number>(0);
    const [previousDaysCount, setPreviousDaysCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchContributions = async () => {
        setLoading(true);
        setError(null);

        try {
            const d = new Date();
            const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
            const response = await fetch(
                `https://github-contributions-api.deno.dev/codershubinc.json?flat=true&to=${today}&nocache=${Date.now()}`,
                {
                    cache: 'no-store',
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to fetch contributions: ${response.status}`);
            }

            const data: ContributionsData = await response.json();
            setContributionsData(data);

            const todayContrib = data.contributions[data.contributions.length - 1];
            const prevDayContrib = data.contributions[data.contributions.length - 2];
            // toast(`Fetched contributions for ${today}: ${JSON.stringify(todayContrib) || 0}`);
            // console.log(`Today's contributions: ${todayContrib || 0}`);

            setTodaysCount(todayContrib?.contributionCount || 0);
            setPreviousDaysCount(prevDayContrib?.contributionCount || 0);
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
        previousDaysCount,
        loading,
        error,
        refetch: fetchContributions,
    };
}
