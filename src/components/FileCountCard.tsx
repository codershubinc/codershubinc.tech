"use client";

import React from 'react';
import { getLanguageColor } from '@/lib/utils';

export type FileCounts = { extCounts: Record<string, number>; totalFiles: number };

export default function FileCountCard({ counts }: { counts: FileCounts }) {
    const entries = Object.entries(counts?.extCounts || {}).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const extToLang: Record<string, string> = {
        ts: 'TypeScript',
        tsx: 'TypeScript',
        js: 'JavaScript',
        jsx: 'React',
        py: 'Python',
        go: 'Go',
        rs: 'Rust',
        java: 'Java',
        html: 'HTML',
        css: 'CSS',
        vue: 'Vue',
        php: 'PHP',
        rb: 'Ruby',
        swift: 'Swift',
        kt: 'Kotlin',
    };

    return (
        <div className="bg-white dark:bg-[#18181b]  p-6 m-0 shadow-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">File Counts</h3>
            <div className="flex flex-wrap gap-2 mb-3">
                {entries.length > 0 ? entries.map(([ext, count]) => {
                    const label = ext === 'no-ext' ? '* (no ext)' : `*.${ext}`;
                    const lang = extToLang[ext] ?? '';
                    const color = getLanguageColor(lang);
                    return (
                        <span key={ext} className={`px-2 py-0.5 text-xs rounded ${color} border`}>
                            {label} <span className="ml-1 font-semibold">{count}</span>
                        </span>
                    );
                }) : <div className="text-sm text-gray-500">No files found.</div>}
            </div>
            <div className="mt-2">
                <span className="px-2 py-1 text-xs rounded bg-blue-900 text-blue-100 border border-blue-800">Total <span className="ml-1 font-semibold">{counts?.totalFiles || 0}</span></span>
            </div>
        </div>
    );
}
