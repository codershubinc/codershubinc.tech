import { marked } from 'marked';

export async function markdownToHtml(markdown: string, variant: 'default' | 'blue' | 'card' | 'minimal' = 'default'): Promise<string> {
    let html = await marked.parse(markdown);

    // Style variants
    const variants: Record<string, { wrapper: string; custom: Record<string, string> }> = {
        default: {
            wrapper: 'prose prose-neutral dark:prose-invert max-w-none',
            custom: {
                h1: 'text-4xl font-bold mt-8 mb-4 text-blue-400',
                h2: 'text-3xl font-semibold mt-8 mb-3 text-blue-300',
                h3: 'text-2xl font-semibold mt-6 mb-2 text-blue-200',
                h4: 'text-xl font-semibold mt-4 mb-2 text-blue-100',
                p: 'my-4 text-gray-300',
                ul: 'list-disc pl-6 my-4',
                ol: 'list-decimal pl-6 my-4',
                li: 'mb-1',
                pre: 'bg-gray-900 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto',
                code: 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400 px-2 py-1 rounded-lg font-mono text-[0.97em] border border-gray-700 shadow-sm gap-1 hover:bg-gray-700 hover:text-gray-500',
                blockquote: 'border-l-4 border-blue-400 pl-4 italic text-gray-400 my-6',
                hr: 'my-8 border-gray-700',
                table: 'w-full my-6 border-collapse',
                th: 'border px-3 py-2 bg-gray-800 text-white font-semibold',
                td: 'border px-3 py-2 text-gray-300',
                a: 'text-blue-400 underline hover:text-blue-200',
                img: 'rounded-sm border border-gray-800 shadow-lg  ',
            },
        },
        blue: {
            wrapper: 'prose dark:prose-invert max-w-none bg-[#0a192f] border border-blue-900/40 p-6 rounded-xl shadow-lg',
            custom: {
                h1: 'text-4xl font-extrabold mt-8 mb-4 text-blue-300',
                h2: 'text-3xl font-bold mt-8 mb-3 text-blue-200',
                h3: 'text-2xl font-semibold mt-6 mb-2 text-blue-100',
                h4: 'text-xl font-semibold mt-4 mb-2 text-blue-100',
                p: 'my-4 text-blue-100',
                ul: 'list-disc pl-6 my-4',
                ol: 'list-decimal pl-6 my-4',
                li: 'mb-1',
                pre: 'bg-blue-950 text-blue-100 rounded-lg p-4 my-6 overflow-x-auto',
                code: 'bg-gradient-to-br from-blue-950 to-blue-900 text-blue-200 px-2 py-1 rounded-lg font-mono text-[0.97em] border border-blue-800 shadow-sm',
                blockquote: 'border-l-4 border-blue-500 pl-4 italic text-blue-200 my-6',
                hr: 'my-8 border-blue-900',
                table: 'w-full my-6 border-collapse',
                th: 'border px-3 py-2 bg-blue-900 text-blue-100 font-semibold',
                td: 'border px-3 py-2 text-blue-100',
                a: 'text-blue-300 underline hover:text-blue-100',
                img: 'rounded-xl border border-blue-900 shadow-lg my-8 mx-auto',
            },
        },
        card: {
            wrapper: 'prose dark:prose-invert max-w-none bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl',
            custom: {
                h1: 'text-4xl font-bold mt-8 mb-4 text-gray-100',
                h2: 'text-3xl font-semibold mt-8 mb-3 text-gray-200',
                h3: 'text-2xl font-semibold mt-6 mb-2 text-gray-300',
                h4: 'text-xl font-semibold mt-4 mb-2 text-gray-400',
                p: 'my-4 text-gray-300',
                ul: 'list-disc pl-6 my-4',
                ol: 'list-decimal pl-6 my-4',
                li: 'mb-1',
                pre: 'bg-gray-800 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto',
                code: 'bg-gradient-to-br from-gray-900 to-gray-800 text-pink-400 px-2 py-1 rounded-lg font-mono text-[0.97em] border border-gray-700 shadow-sm',
                blockquote: 'border-l-4 border-gray-700 pl-4 italic text-gray-400 my-6',
                hr: 'my-8 border-gray-700',
                table: 'w-full my-6 border-collapse',
                th: 'border px-3 py-2 bg-gray-800 text-white font-semibold',
                td: 'border px-3 py-2 text-gray-300',
                a: 'text-blue-400 underline hover:text-blue-200',
                img: 'rounded-xl border border-gray-800 shadow-lg my-8 mx-auto',
            },
        },
        minimal: {
            wrapper: 'prose dark:prose-invert max-w-none bg-transparent p-0',
            custom: {
                h1: 'text-3xl font-bold mt-8 mb-4 text-gray-200',
                h2: 'text-2xl font-semibold mt-8 mb-3 text-gray-300',
                h3: 'text-xl font-semibold mt-6 mb-2 text-gray-400',
                h4: 'text-lg font-semibold mt-4 mb-2 text-gray-500',
                p: 'my-4 text-gray-400',
                ul: 'list-disc pl-6 my-4',
                ol: 'list-decimal pl-6 my-4',
                li: 'mb-1',
                pre: 'bg-gray-900 text-gray-300 rounded p-4 my-6 overflow-x-auto',
                code: 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 px-2 py-1 rounded-lg font-mono text-[0.97em] border border-gray-700 shadow-sm',
                blockquote: 'border-l-4 border-gray-700 pl-4 italic text-gray-500 my-6',
                hr: 'my-8 border-gray-800',
                table: 'w-full my-6 border-collapse',
                th: 'border px-3 py-2 bg-gray-800 text-gray-200 font-semibold',
                td: 'border px-3 py-2 text-gray-400',
                a: 'text-blue-400 underline hover:text-blue-200',
                img: 'rounded-xl border border-gray-800 shadow my-8 mx-auto',
            },
        },
    };

    const { wrapper, custom: customClasses } = variants[variant] || variants.default;

    // Add classes to tags using regex (simple approach)
    for (const tag in customClasses) {
        const classAttr = `class=\"${customClasses[tag]}\"`;
        // Only add class if not already present
        html = html.replace(
            new RegExp(`<${tag}(?![\w-])([^>]*)(?<!class=)`, 'g'),
            `<${tag} ${classAttr}$1`
        );
    }

    // If a <p> contains more than one <img>, add flex classes to the <p>
    html = html.replace(/<p([^>]*)>((?:[^<]*<img[^>]+>[^<]*){2,})<\/p>/g, (match, attrs, inner) => {
        const flexClass = 'flex gap-4 flex-wrap items-center justify-space-between';
        if (/class=["']([^"']*)["']/.test(attrs)) {
            return `<p${attrs.replace(/class=["']([^"']*)["']/, (m: string, c: string) => `class=\"${c} ${flexClass}\"`)}>${inner}</p>`;
        } else {
            return `<p class=\"${flexClass}\"${attrs}>${inner}</p>`;
        }
    });

    return `<article class="${wrapper}">${html}</article>`;
}
