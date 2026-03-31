import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/atom-one-dark.css";
import { Terminal } from "lucide-react";
import { CodeBlockWrapper } from "./CodeBlockWrapper";

interface MarkdownRendererProps {
    content: string;
    rawBaseUrl?: string;
}

export function MarkdownRenderer({ content, rawBaseUrl }: MarkdownRendererProps) {
    return (
        <div className="prose prose-invert max-w-none 
        prose-headings:text-white/90 prose-headings:font-sans prose-headings:font-bold prose-headings:tracking-tight
        prose-h1:text-4xl prose-h1:border-b prose-h1:border-white/10 prose-h1:pb-4 prose-h1:mb-8
        prose-h2:text-3xl prose-h2:border-b prose-h2:border-white/5 prose-h2:pb-3 prose-h2:mt-12 prose-h2:mb-6
        prose-h3:text-2xl
        prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:mb-6
        prose-a:text-[#007acc] hover:prose-a:text-[#007acc]/80 prose-a:transition-colors prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4
        prose-strong:text-white/90 prose-strong:font-semibold
        prose-code:text-[#007acc] prose-code:bg-[#007acc]/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-[#050505] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:p-0 prose-pre:my-8 prose-pre:overflow-hidden prose-pre:shadow-2xl
        prose-blockquote:border-l-[3px] prose-blockquote:border-l-[#007acc] prose-blockquote:bg-linear-to-r prose-blockquote:from-[#007acc]/10 prose-blockquote:to-transparent prose-blockquote:text-zinc-300 prose-blockquote:py-3 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
        prose-ul:text-zinc-400 prose-ul:my-6 prose-ol:text-zinc-400 prose-ol:my-6
        prose-li:marker:text-zinc-500 prose-li:my-2
        prose-hr:border-white/10 prose-hr:my-10
        prose-table:border-collapse prose-table:w-full prose-table:my-8 prose-table:text-sm
        prose-th:text-left prose-th:text-white/90 prose-th:px-4 prose-th:py-3 prose-th:bg-white/5 prose-th:border prose-th:border-white/10 prose-th:font-medium
        prose-td:border prose-td:border-white/10 prose-td:px-4 prose-td:py-3 prose-td:text-zinc-400
        [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
        /* custom style for pre blocks to look like code editors */
        [&_pre]:relative
    ">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeHighlight]}
                components={{
                    img: (props) => {
                        let src = props.src;
                        // Transform relative URLs to raw GitHub URLs if a base URL is provided
                        if (src && rawBaseUrl && !src.startsWith("http") && !src.startsWith("data:")) {
                            // Trim leading slash to avoid double slashes
                            const cleanPath = src.replace(/^\/+/, "");
                            src = `${rawBaseUrl}/${cleanPath}`;
                        }

                        const isBadge = src?.match(/shields\.io|badge|wakatime\.com/i);
                        if (isBadge) {
                            // Render badges inline without heavy prose styles
                            return <img {...props} src={src} className="not-prose inline-block !m-0 !mr-2 !mb-2 align-middle border-0 shadow-none bg-transparent" style={{ marginTop: 0, marginBottom: 0 }} />;
                        }
                        // Render regular images with rich styles
                        return <img {...props} src={src} className="rounded-xl border border-white/10 my-8 shadow-xl max-w-full" />;
                    },
                    pre: ({ node, ...props }) => {
                        // The pre element typically wraps a code element. So we pass the children inside.
                        const { children } = props;
                        return (
                            <CodeBlockWrapper>
                                {children}
                            </CodeBlockWrapper>
                        );
                    }
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}