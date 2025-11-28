import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export function getGitHubThemeStyles() {
  return cn(
    // Base Layout
    "prose prose-lg dark:prose-invert max-w-none",

    // Headings
    "prose-headings:scroll-mt-20 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white",
    "prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:border-b prose-h1:border-gray-200 dark:prose-h1:border-gray-800 prose-h1:pb-2 prose-h1:mb-8",
    "prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-800 prose-h2:pb-2 prose-h2:mt-10 prose-h2:mb-6",
    "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-semibold",
    "prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-4 prose-h4:font-semibold",

    // Paragraphs & Text
    "prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-7 prose-p:mb-4",
    "prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold",
    "prose-em:text-gray-700 dark:prose-em:text-gray-300 prose-em:italic",

    // Links
    "prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-500 dark:hover:prose-a:text-blue-300 prose-a:font-normal",

    // Code Blocks (Pre)
    "prose-pre:bg-gray-100 dark:prose-pre:bg-[#161b22] prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:rounded-xl prose-pre:p-4 prose-pre:my-6",
    "prose-pre:shadow-sm prose-pre:overflow-x-auto",

    // Inline Code
    "prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-[#161b22] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md",
    "prose-code:before:content-none prose-code:after:content-none", // Remove backticks
    "prose-code:font-mono prose-code:text-[0.9em]",

    // Lists
    "prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4",
    "prose-ol:text-gray-700 dark:prose-ol:text-gray-300 prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4",
    "prose-li:marker:text-gray-500 prose-li:my-1",

    // Blockquotes
    "prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700 prose-blockquote:pl-4 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-blockquote:italic prose-blockquote:my-6",

    // Images
    "prose-img:rounded-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-800 prose-img:shadow-lg prose-img:my-8 prose-img:mx-auto",

    // Horizontal Rules
    "prose-hr:border-gray-200 dark:prose-hr:border-gray-800 prose-hr:my-8",

    // Tables
    "prose-table:w-full prose-table:my-6 prose-table:border-collapse",
    "prose-th:border prose-th:border-gray-200 dark:prose-th:border-gray-700 prose-th:bg-gray-100 dark:prose-th:bg-[#161b22] prose-th:p-3 prose-th:text-left prose-th:text-gray-900 dark:prose-th:text-white prose-th:font-semibold",
    "prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-td:p-3 prose-td:text-gray-700 dark:prose-td:text-gray-300",

    // Task Lists (GitHub flavored)
    "prose-li:has-[input]:list-none prose-li:has-[input]:pl-0 prose-li:has-[input]:flex prose-li:has-[input]:items-center prose-li:has-[input]:gap-2"
  );
}
