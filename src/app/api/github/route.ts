import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://github-contributions-api.jogruber.de/v4/codershubinc', {
            cache: 'no-store'
        });

        if (!response.ok) {
            return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: response.status });
        }

        const data = await response.json();
        
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
        const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, '0')}-${String(yesterday.getDate()).padStart(2, '0')}`;

        const todayContrib = data.contributions.find((c: any) => c.date === todayStr);
        const yesterdayContrib = data.contributions.find((c: any) => c.date === yesterdayStr);

        const totalAllTime = Object.values(data.total).reduce((a: any, b: any) => a + b, 0);

        return NextResponse.json({
            contributions: [
                {
                    date: yesterdayStr,
                    contributionCount: yesterdayContrib?.count || 0,
                    color: '#ebedf0'
                },
                {
                    date: todayStr,
                    contributionCount: todayContrib?.count || 0,
                    color: '#ebedf0'
                }
            ],
            totalContributions: totalAllTime
        }, {
            headers: { 'Cache-Control': 'no-store, max-age=0' }
        });
    } catch (error) {
        console.error('Github API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
