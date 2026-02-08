import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = await fetch('https://sp-card-t.vercel.app/json', {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch Spotify data' },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch (error) {
        console.error('Spotify API proxy error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
