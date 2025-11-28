'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
    id: string;
    label: string;
    content: React.ReactNode;
}

interface ProjectTabsProps {
    tabs: Tab[];
}

export function ProjectTabs({ tabs }: ProjectTabsProps) {
    const [activeTab, setActiveTab] = useState(tabs[0]?.id);

    if (!tabs.length) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-800">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-4 py-3 text-sm font-medium transition-all relative",
                            activeTab === tab.id
                                ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="min-h-[200px] animate-in fade-in duration-300">
                {tabs.map((tab) => (
                    <div key={tab.id} className={cn(activeTab === tab.id ? "block" : "hidden")}>
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
}
