import { NextResponse } from 'next/server';
import { fetchGitHubContributions } from '@/lib/githubContributions';

export async function GET() {
    try {
        const data = await fetchGitHubContributions();

        if (!data) {
            return NextResponse.json({ error: 'Failed to fetch contributions' }, { status: 500 });
        }

        return NextResponse.json(data, {
            headers: { 'Cache-Control': 'no-store, max-age=0' }
        });
    } catch (error) {
        console.error('Github API error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
