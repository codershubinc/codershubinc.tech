import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface ReadmeViewerProps {
    owner: string;
    repo: string;
}

async function fetchReadme(owner: string, repo: string) {
    try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
            headers: {
                Accept: 'application/vnd.github.raw',
            },
            next: { revalidate: 3600 },
        });

        if (!res.ok) {
            if (res.status === 404) {
                return "# No README found\nThis repository does not appear to have a README.md file.";
            }
            throw new Error(`Failed to fetch README: ${res.statusText}`);
        }

        return await res.text();
    } catch (error) {
        console.error('Error fetching README:', error);
        return null;
    }
}

export default async function ReadmeViewer({ owner, repo }: ReadmeViewerProps) {
    const content = await fetchReadme(owner, repo);

    if (!content) return null;

    return (
        <div className="w-full text-gray-300 leading-relaxed">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                    // 1. Headings: Add margins, colors, and borders
                    h1: ({ ...props }) => <h1 className="text-3xl font-bold text-white mt-8 mb-4 border-b border-gray-700 pb-2" {...props} />,
                    h2: ({ ...props }) => <h2 className="text-2xl font-semibold text-white mt-6 mb-3 border-b border-gray-800 pb-1" {...props} />,
                    h3: ({ ...props }) => <h3 className="text-xl font-semibold text-gray-100 mt-4 mb-2" {...props} />,

                    // 2. Paragraphs & Lists: Fix spacing
                    p: ({ ...props }) => <p className="mb-4 text-gray-300" {...props} />,
                    ul: ({ ...props }) => <ul className="list-disc list-inside mb-4 space-y-1 ml-4" {...props} />,
                    ol: ({ ...props }) => <ol className="list-decimal list-inside mb-4 space-y-1 ml-4" {...props} />,
                    li: ({ ...props }) => <li className="text-gray-300" {...props} />,

                    // 3. Links: Make them pop
                    a: ({ ...props }) => <a className="text-blue-400 hover:text-blue-300 hover:underline transition-colors" target="_blank" rel="noopener noreferrer" {...props} />,

                    // 4. Blockquotes: Add that distinct gray line
                    blockquote: ({ ...props }) => <blockquote className="border-l-4 border-gray-600 pl-4 italic text-gray-400 my-4" {...props} />,

                    // 5. Code Blocks (The most important part for you)
                    pre: ({ ...props }) => (
                        <pre className="bg-[#0d1117] border border-gray-700 rounded-lg p-4 overflow-x-auto my-4 text-sm font-mono" {...props} />
                    ),
                    code: ({ ...props }) => {
                        // Differentiate between inline code (backticks) and code blocks
                        const { className } = props;
                        const isInline = !String(className).includes('language-'); // Simple check

                        if (isInline && !className) {
                            return <code className="bg-gray-800 text-red-300 rounded px-1.5 py-0.5 text-sm font-mono" {...props} />;
                        }
                        return <code className={`${className} font-mono`} {...props} />;
                    },

                    // 6. Tables (GitHub Flavored Markdown)
                    table: ({ ...props }) => <div className="overflow-x-auto my-4"><table className="min-w-full text-left border-collapse border border-gray-700" {...props} /></div>,
                    th: ({ ...props }) => <th className="border border-gray-700 bg-gray-800 px-4 py-2 font-semibold text-white" {...props} />,
                    td: ({ ...props }) => <td className="border border-gray-700 px-4 py-2 text-gray-300" {...props} />,

                    // 7. Images
                    // eslint-disable-next-line @next/next/no-img-element
                    img: ({ ...props }) => <img className="max-w-full h-auto rounded-lg shadow-md border border-gray-700 my-4" {...props} alt={props.alt || ''} />,

                    // 8. Horizontal Rules
                    hr: ({ ...props }) => <hr className="border-gray-700 my-8" {...props} />
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
