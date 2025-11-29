import { cn } from './cn';

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
