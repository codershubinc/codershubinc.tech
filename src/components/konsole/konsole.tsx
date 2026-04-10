"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getCommandOutput } from "./commands";
import { listKonsoleDirectory } from "./actions";
import { doodles, gitTexts, availableCommands, getRandom } from "./constants";
import { PromptHeader } from "./PromptHeader";

export interface CommandOutput {
    id: string;
    type: 'input' | 'output';
    content: React.ReactNode;
    promptInfo?: {
        doodle: string;
        git: string;
    };
}

const idGen = () => Math.random().toString(36).substring(2, 9);
const generateId = idGen;

export default function Konsole() {
    const [history, setHistory] = useState<CommandOutput[]>([
        {
            id: generateId(),
            type: 'output',
            content: (
                <div className="text-zinc-300">
                    Welcome to codershubinc zsh terminal. Type <span className="text-emerald-400">help</span> to see available commands.
                </div>
            )
        }
    ]);
    const [input, setInput] = useState("");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);
    const [availableFiles, setAvailableFiles] = useState<string[]>([]);

    // Maintain a stable theme state for the active interactive prompt
    const [currentPromptState, setCurrentPromptState] = useState({
        doodle: "",
        git: ""
    });

    // Initialize prompt state on mount
    useEffect(() => {
        setCurrentPromptState({
            doodle: getRandom(doodles),
            git: getRandom(gitTexts)
        });
    }, []);

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

    const handleCommand = async (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        if (!trimmedCmd) return;

        if (trimmedCmd === "clear") {
            setHistory([]);
            return;
        }

        setCommandHistory(prev => [...prev, trimmedCmd]);
        setHistoryIndex(-1);

        const outputContent = await getCommandOutput(trimmedCmd);

        setHistory(prev => [
            ...prev,
            {
                id: generateId(),
                type: 'input',
                content: cmd,
                promptInfo: currentPromptState,
            },
            { id: generateId(), type: 'output', content: outputContent }
        ]);

        // roll new random prompt for next input
        setCurrentPromptState({
            doodle: getRandom(doodles),
            git: getRandom(gitTexts)
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (commandHistory.length > 0) {
                const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex !== -1) {
                const nextIndex = historyIndex + 1;
                if (nextIndex >= commandHistory.length) {
                    setHistoryIndex(-1);
                    setInput("");
                } else {
                    setHistoryIndex(nextIndex);
                    setInput(commandHistory[nextIndex]);
                }
            }
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
                setHistory(prev => [
                    ...prev,
                    {
                        id: generateId(),
                        type: 'input',
                        content: input,
                        promptInfo: currentPromptState
                    },
                    {
                        id: generateId(), type: 'output', content: (
                            <div className="flex gap-4 flex-wrap text-zinc-300 font-mono">
                                {suggestions.map(s => <span key={s} className="text-emerald-400">{s}</span>)}
                            </div>
                        )
                    }
                ]);
                setCurrentPromptState({ doodle: getRandom(doodles), git: getRandom(gitTexts) });
            }
        } else if (e.key === "ArrowRight") {
            if (suggestionText && inputRef.current?.selectionStart === input.length) {
                e.preventDefault();
                setInput(suggestionText + (suggestionText.includes(" ") ? "" : " "));
            }
        }
    };

    return (
        <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto border-t border-white/5 relative">
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none transform -translate-y-1/2"></div>

            <div className="flex items-end justify-between mb-12 relative z-10">
                <ScrollReveal direction="left">
                    <h2 className="text-2xl sm:text-4xl font-bold font-mono text-white flex items-center gap-3 mb-2 hover:text-[#007acc] transition-colors duration-300">
                        <Terminal className="text-[#007acc] animate-pulse" size={28} />
                        interactive-shell
                    </h2>
                    <p className="font-mono text-sm text-[#666]">
                        Type commands to explore more about me...
                    </p>
                </ScrollReveal>
            </div>

            <div
                className="relative z-10 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 sm:p-6 font-mono text-xs sm:text-sm shadow-xl shadow-black/50 h-[400px] overflow-hidden flex flex-col cursor-text"
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
                                    autoFocus
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
