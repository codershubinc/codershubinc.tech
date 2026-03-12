import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const res = await fetch(
            'https://github-readme-states-repo-self-inst.vercel.app/api/json-top-langs?username=codershubinc',
            { next: { revalidate: 3600 } }
        );

        if (!res.ok) {
            return NextResponse.json({ error: 'Failed to fetch' }, { status: 502 });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
