import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;

    if (!WAKATIME_API_KEY) {
        return NextResponse.json(
            { error: 'Wakatime API key not configured' },
            { status: 500 }
        );
    }

    try {
        // Fetch today's stats
        const statsResponse = await fetch(
            'https://wakatime.com/api/v1/users/current/summaries?range=Today',
            {
                headers: {
                    Authorization: `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
                },
                next: { revalidate: 300 }, // Cache for 5 minutes
            }
        );

        if (!statsResponse.ok) {
            throw new Error('Failed to fetch Wakatime data');
        }

        const data = await statsResponse.json();
        const todayData = data.data[0];

        if (!todayData) {
            return NextResponse.json({
                total_seconds: 0,
                projects: [],
                languages: [],
            });
        }

        // Get top project and total time
        const topProject = todayData.projects[0] || null;
        const totalSeconds = todayData.grand_total.total_seconds;

        return NextResponse.json({
            total_seconds: totalSeconds,
            total_time: todayData.grand_total.text,
            projects: todayData.projects.slice(0, 3).map((p: { name: string; text: string; percent: number }) => ({
                name: p.name,
                text: p.text,
                percent: p.percent,
            })),
            languages: todayData.languages.slice(0, 3).map((l: { name: string; text: string; percent: number }) => ({
                name: l.name,
                text: l.text,
                percent: l.percent,
            })),
            top_project: topProject
                ? {
                    name: topProject.name,
                    text: topProject.text,
                    percent: topProject.percent,
                }
                : null,
        });
    } catch (error) {
        console.error('Wakatime API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Wakatime stats' },
            { status: 500 }
        );
    }
}
