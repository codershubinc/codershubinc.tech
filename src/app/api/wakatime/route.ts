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
        const authHeader = `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`;

        // Fetch today's stats
        const todayResponse = await fetch(
            'https://wakatime.com/api/v1/users/current/summaries?range=Today',
            {
                headers: {
                    Authorization: authHeader,
                },
                cache: 'no-store',
            }
        );

        // Fetch last 7 days stats for weekly hours
        const weekResponse = await fetch(
            'https://wakatime.com/api/v1/users/current/summaries?range=Last%207%20Days',
            {
                headers: {
                    Authorization: authHeader,
                },
                cache: 'no-store',
            }
        );

        if (!todayResponse.ok) {
            throw new Error('Failed to fetch Wakatime data');
        }

        const todayData = (await todayResponse.json()).data[0];
        const weekData = weekResponse.ok ? (await weekResponse.json()).data : [];

        if (!todayData) {
            return NextResponse.json({
                total_seconds: 0,
                total_time: '0 secs',
                projects: [],
                languages: [],
                editors: [],
                operating_systems: [],
                weekly_total: '0 hrs 0 mins',
                weekly_seconds: 0,
            });
        }

        // Calculate weekly total
        const weeklySeconds = weekData.reduce(
            (acc: number, day: any) => acc + (day.grand_total?.total_seconds || 0),
            0
        );
        const weeklyHours = Math.floor(weeklySeconds / 3600);
        const weeklyMinutes = Math.floor((weeklySeconds % 3600) / 60);
        const weeklyTotal = `${weeklyHours} hrs ${weeklyMinutes} mins`;

        // Get top project and total time
        const topProject = todayData.projects[0] || null;
        const totalSeconds = todayData.grand_total.total_seconds;

        return NextResponse.json({
            total_seconds: totalSeconds,
            total_time: todayData.grand_total.text,
            weekly_total: weeklyTotal,
            weekly_seconds: weeklySeconds,
            projects: todayData.projects.slice(0, 3).map((p: { name: string; text: string; percent: number }) => ({
                name: p.name,
                text: p.text,
                percent: p.percent,
            })),
            languages: todayData.languages.slice(0, 5).map((l: { name: string; text: string; percent: number }) => ({
                name: l.name,
                text: l.text,
                percent: l.percent,
            })),
            editors: todayData.editors.slice(0, 3).map((e: { name: string; text: string; percent: number }) => ({
                name: e.name,
                text: e.text,
                percent: e.percent,
            })),
            operating_systems: todayData.operating_systems.slice(0, 3).map((os: { name: string; text: string; percent: number }) => ({
                name: os.name,
                text: os.text,
                percent: os.percent,
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
