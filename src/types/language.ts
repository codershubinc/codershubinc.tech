export const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
        TypeScript: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
        JavaScript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
        Python: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
        Java: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
        HTML: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
        CSS: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
        Vue: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
        React: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
        Go: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 border-sky-200 dark:border-sky-800',
        Rust: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
        'C++': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-800',
        C: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300 border-slate-200 dark:border-slate-800',
        PHP: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 border-violet-200 dark:border-violet-800',
        Ruby: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800',
        Swift: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
        Kotlin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800',
    };
    return colors[language] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
};

export const getDarkLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
        TypeScript: 'bg-blue-900/30 text-blue-300 border-blue-800',
        JavaScript: 'bg-yellow-900/30 text-yellow-300 border-yellow-800',
        Python: 'bg-green-900/30 text-green-300 border-green-800',
        Java: 'bg-red-900/30 text-red-300 border-red-800',
        HTML: 'bg-orange-900/30 text-orange-300 border-orange-800',
        CSS: 'bg-indigo-900/30 text-indigo-300 border-indigo-800',
        Vue: 'bg-emerald-900/30 text-emerald-300 border-emerald-800',
        React: 'bg-cyan-900/30 text-cyan-300 border-cyan-800',
        Go: 'bg-sky-900/30 text-sky-300 border-sky-800',
        Rust: 'bg-orange-900/30 text-orange-300 border-orange-800',
        'C++': 'bg-pink-900/30 text-pink-300 border-pink-800',
        C: 'bg-slate-900/30 text-slate-300 border-slate-800',
        PHP: 'bg-violet-900/30 text-violet-300 border-violet-800',
        Ruby: 'bg-rose-900/30 text-rose-300 border-rose-800',
        Swift: 'bg-orange-900/30 text-orange-300 border-orange-800',
        Kotlin: 'bg-purple-900/30 text-purple-300 border-purple-800',
    };
    return colors[language] || 'bg-gray-800 text-gray-300 border-gray-700';
};
