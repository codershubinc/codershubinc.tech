import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const user = url.searchParams.get('user') || 'codershubinc';
        const endpoint = `https://github-readme-streak-stats-chi-three.vercel.app?user=${encodeURIComponent(user)}&type=json`;

        const res = await fetch(endpoint);
        if (!res.ok) {
            return NextResponse.json({ error: 'Upstream error', status: res.status }, { status: 502 });
        }
        const data = await res.json();

        return NextResponse.json({ data }, { status: 200, headers: { 'cache-control': 'public, max-age=60' } });
    } catch (err) {
        // Return a friendly error
        return NextResponse.json({ error: 'Fetch failed', message: (err as Error).message }, { status: 500 });
    }
}
