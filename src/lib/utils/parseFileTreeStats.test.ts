import { describe, it, expect } from 'vitest';
import { parseFileTreeStats } from './parseFileTreeStats';

describe('parseFileTreeStats', () => {
    it('parses slash style path list', () => {
        const tree = `src/index.ts\nsrc/app/main.tsx\nREADME.md`;
        const { extCounts, totalFiles } = parseFileTreeStats(tree);
        expect(totalFiles).toBe(3);
        // index.ts and main.tsx -> expect ts:1 and tsx:1
        expect(extCounts['ts']).toBe(1);
        expect(extCounts['tsx']).toBe(1);
        expect(extCounts['md']).toBe(1);
    });

    it('parses ascii tree', () => {
        const tree = `├─ src/\n│  ├─ index.ts\n│  └─ app.ts\n└─ README.md`;
        const { extCounts, totalFiles } = parseFileTreeStats(tree);
        expect(totalFiles).toBe(3);
        expect(extCounts['ts']).toBe(2);
        expect(extCounts['md']).toBe(1);
    });
});
