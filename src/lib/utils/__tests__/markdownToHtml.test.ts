import { describe, it, expect } from 'vitest';
import { markdownToHtml } from '../markdownToHtml';

describe('markdownToHtml image rewriting', () => {
    it('rewrites relative markdown image links to raw base url', async () => {
        const md = '![Logo](images/logo.png)';
        const base = 'https://raw.githubusercontent.com/codershubinc/test-repo/main';
        const html = await markdownToHtml(md, 'default', base);
        expect(html).toContain('https://raw.githubusercontent.com/codershubinc/test-repo/main/images/logo.png');
    });

    it('rewrites img tags with relative src to raw base url', async () => {
        const md = '<img src="assets/pic.jpg" alt="foo" />';
        const base = 'https://raw.githubusercontent.com/codershubinc/test-repo/main';
        const html = await markdownToHtml(md, 'default', base);
        expect(html).toContain('https://raw.githubusercontent.com/codershubinc/test-repo/main/assets/pic.jpg');
    });
});
