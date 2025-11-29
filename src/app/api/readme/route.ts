import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { markdownToHtml } from '@/lib/utils';
const markdownToHtmlWithRaw = markdownToHtml as unknown as (md: string, variant?: 'default'|'blue'|'card'|'minimal', rawBase?: string) => Promise<string>;

// GET /api/readme?repo=codershubinc/Quazaar
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const repo = searchParams.get('repo');
    if (!repo) {
        return NextResponse.json({ error: 'Missing repo parameter' }, { status: 400 });
    }

    // Only allow org/repo format
    if (!/^([\w-]+)\/[\w.-]+$/.test(repo)) {
        return NextResponse.json({ error: 'Invalid repo format' }, { status: 400 });
    }

    const url = `https://raw.githubusercontent.com/${repo}/main/README.md`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            return NextResponse.json({ error: 'README not found' }, { status: 404 });
        }
        const content = await res.text();

        // Save to /temp/{repo.replace('/', '__')}.md
        const fileName = repo.replace('/', '__') + '.md';
        const filePath = path.join(process.cwd(), 'temp', fileName);
        await writeFile(filePath, content, 'utf8');

        const base = `https://raw.githubusercontent.com/${repo}/main`;
        const html = await markdownToHtmlWithRaw(content, 'default', base);
        return NextResponse.json({ content, html, saved: true, file: `/temp/${fileName}` });
    } catch (err) {
        return NextResponse.json({ error: 'Failed to fetch or save README', message: (err as Error).message }, { status: 500 });
    }
}
