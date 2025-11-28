"use client";

import React, { useMemo, useState } from 'react';
import { fileTreeToHtml } from '../lib/utils';

type FileTreeProps = {
    tree: string | string[];
    title?: string;
    className?: string;
    compact?: boolean;
};

export default function FileTree({ tree, title = 'Project Structure', className = '', compact = false }: FileTreeProps) {
    const raw = useMemo(() => (Array.isArray(tree) ? tree.join('\n') : tree || ''), [tree]);
    const [copied, setCopied] = useState(false);
    const [isCompact, setCompact] = useState(compact);

    const html = useMemo(() => fileTreeToHtml(raw), [raw]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(raw);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch (e) {
            console.error('Failed copying tree to clipboard', e);
        }
    };

    const download = () => {
        const blob = new Blob([raw], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file-tree.txt';
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`filetree-wrapper ${className}`}>
            <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs uppercase tracking-widest text-blue-400 font-bold">{title}</h4>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        className="px-2 py-1 text-xs rounded bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700"
                        onClick={() => setCompact(!isCompact)}
                        title="Toggle compact"
                    >
                        {isCompact ? 'Expanded' : 'Compact'}
                    </button>
                    <button
                        type="button"
                        className="px-2 py-1 text-xs rounded bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700"
                        onClick={copy}
                        title="Copy tree"
                    >
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                    <button
                        type="button"
                        className="px-2 py-1 text-xs rounded bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700"
                        onClick={download}
                        title="Download tree"
                    >
                        Download
                    </button>
                </div>
            </div>
            <div className={`overflow-x-auto bg-gray-900 rounded-lg border border-gray-800 ${isCompact ? 'p-2 text-[12px]' : 'p-4'} shadow-lg`}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
}
