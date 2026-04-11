"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal, Maximize2 } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { listKonsoleDirectory } from "./actions";
import { availableCommands } from "./constants";
import { PromptHeader } from "./PromptHeader";
import { useKonsoleHistory, generateId } from "./useKonsoleHistory";

export interface CommandOutput {
    id: string;
    type: 'input' | 'output';
    content: React.ReactNode;
    promptInfo?: {
        doodle: string;
        git: string;
    };
}

export default function Konsole({ fullScreen }: { fullScreen?: boolean }) {
    const {
        history,
        currentPromptState,
        handleCommand,
        navigateHistoryUp,
        navigateHistoryDown,
        appendToHistory,
        refreshPromptState
    } = useKonsoleHistory();

    const [input, setInput] = useState("");
    const [availableFiles, setAvailableFiles] = useState<string[]>([]);

    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const focusInput = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        listKonsoleDirectory().then(files => {
            setAvailableFiles(files.map(f => f.name));
        });
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [history]);

    const getSuggestions = (text: string) => {
        if (!text) return [];
        const parts = text.split(" ");
        if (parts.length === 1) {
            return availableCommands.filter(c => c.startsWith(text.toLowerCase()));
        } else if (parts.length === 2 && ["cat", "rm", "ls", "touch"].includes(parts[0].toLowerCase())) {
            return availableFiles.filter(f => f.toLowerCase().startsWith(parts[1].toLowerCase()));
        }
        return [];
    };

    const suggestions = getSuggestions(input);
    let suggestionText = "";
    if (suggestions.length > 0) {
        const parts = input.split(" ");
        if (parts.length === 1) {
            suggestionText = input + suggestions[0].slice(input.length);
        } else {
            suggestionText = parts[0] + " " + parts[1] + suggestions[0].slice(parts[1].length);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setInput(navigateHistoryUp(input));
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            setInput(navigateHistoryDown(input));
        } else if (e.key === "Tab") {
            e.preventDefault();
            if (!input.trim() || suggestions.length === 0) return;

            if (suggestions.length === 1) {
                const parts = input.split(" ");
                if (parts.length === 1) {
                    setInput(suggestions[0] + " ");
                } else {
                    setInput(parts[0] + " " + suggestions[0]);
                }
            } else if (suggestions.length > 1) {
                // If multiples, display the alternatives in the terminal
                appendToHistory([{
                    id: generateId(),
                    type: 'input',
                    content: input,
                    promptInfo: currentPromptState,
                }, {
                    id: generateId(),
                    type: 'output',
                    content: (
                        <div className="flex gap-4 flex-wrap text-zinc-300 font-mono">
                            {suggestions.map(s => <span key={s} className="text-emerald-400">{s}</span>)}
                        </div>
                    )
                }]);
                refreshPromptState();
            }
        } else if (e.key === "ArrowRight") {
            if (suggestionText && inputRef.current?.selectionStart === input.length) {
                e.preventDefault();
                setInput(suggestionText + (suggestionText.includes(" ") ? "" : " "));
            }
        }
    };

    return (
        <section className={fullScreen ? "w-full h-full p-4 relative" : "py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/5 relative"}>
            {!fullScreen && <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none transform -translate-y-1/2"></div>}

            {!fullScreen && (
                <div className="flex items-end justify-between mb-12 relative z-10 w-full">
                    <ScrollReveal direction="left">
                        <h2 className="text-2xl sm:text-4xl font-bold font-mono text-white flex items-center gap-3 mb-2 hover:text-[#007acc] transition-colors duration-300">
                            <Terminal className="text-[#007acc] animate-pulse" size={28} />
                            interactive-shell
                        </h2>
                        <p className="font-mono text-sm text-[#666]">
                            Type commands to explore more about me...
                        </p>
                    </ScrollReveal>
                    
                    <ScrollReveal direction="right">
                        <Link 
                            href="/zsh"
                            className="group flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:border-emerald-500/50 transition-all duration-300 font-mono text-sm text-zinc-300 hover:text-emerald-400"
                            title="Open full screen terminal"
                        >
                            <span className="hidden sm:inline">Launch /zsh</span>
                            <Maximize2 size={16} className="group-hover:scale-110 transition-transform" />
                        </Link>
                    </ScrollReveal>
                </div>
            )}

            <div
                className={`relative z-10 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 sm:p-6 font-mono text-xs sm:text-sm shadow-xl shadow-black/50 overflow-hidden flex flex-col cursor-text ${fullScreen ? "h-full w-full" : "h-[400px]"}`}
                onClick={focusInput}
            >
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5 shrink-0">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <div className="ml-2 flex items-center gap-2">
                        <span className="text-emerald-400 font-semibold">➜</span>
                        <span className="text-[#007acc] font-semibold">~</span>
                        <span className="text-zinc-500">zsh</span>
                    </div>
                </div>

                <div ref={containerRef} className="flex-1 overflow-y-auto space-y-3 pb-4 custom-scrollbar scroll-smooth">
                    {history.map((item) => (
                        <div key={item.id} className="mb-4">
                            {item.type === 'input' ? (
                                <PromptHeader doodle={item.promptInfo?.doodle || ""} gitText={item.promptInfo?.git || ""}>
                                    <span className="text-white ml-2 block w-full">{item.content}</span>
                                </PromptHeader>
                            ) : (
                                <div className="pl-9 mt-2 text-zinc-300">
                                    {item.content}
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="relative mt-4">
                        <PromptHeader doodle={currentPromptState.doodle} gitText={currentPromptState.git}>
                            <div className="relative flex-1 flex items-center h-full ml-2">
                                {suggestionText && input && (
                                    <span className="absolute left-0 top-0 text-zinc-600 pointer-events-none break-pre whitespace-pre">
                                        {suggestionText}
                                    </span>
                                )}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="relative z-10 bg-transparent border-none outline-none text-white w-full focus:ring-0 focus:outline-none p-0 m-0"
                                    autoFocus={fullScreen}
                                    spellCheck="false"
                                    autoComplete="off"
                                />
                            </div>
                        </PromptHeader>
                    </div>
                </div>
            </div>
        </section>
    );
}
