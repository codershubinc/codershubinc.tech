import { describe, it, expect } from 'vitest';
import { formatCreationDate } from './date';

describe('formatCreationDate', () => {
    it('shows days for < 1 month', () => {
        const now = Date.now();
        const tenDaysAgo = new Date(now - 10 * 24 * 60 * 60 * 1000).toISOString();
        expect(formatCreationDate(tenDaysAgo)).toMatch(/10 day/);
    });

    it('shows months for < 1 year', () => {
        const now = Date.now();
        const twoMonthsAgo = new Date(now - 2 * 30 * 24 * 60 * 60 * 1000).toISOString();
        expect(formatCreationDate(twoMonthsAgo)).toMatch(/2 month/);
    });

    it('shows years and months for > 1 year', () => {
        const now = Date.now();
        const fourteenMonthsAgo = new Date(now - (1 * 365 + 2 * 30) * 24 * 60 * 60 * 1000).toISOString();
        expect(formatCreationDate(fourteenMonthsAgo)).toMatch(/1 year/);
        expect(formatCreationDate(fourteenMonthsAgo)).toMatch(/2 month/);
    });
});
