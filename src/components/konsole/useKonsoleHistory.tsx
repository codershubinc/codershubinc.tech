import { useState, useCallback, useEffect } from "react";
import { getCommandOutput } from "./commands";
import { CommandOutput } from "./konsole";
import { doodles, gitTexts, getRandom } from "./constants";

export const generateId = () => Math.random().toString(36).substring(2, 9);

export function useKonsoleHistory() {
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
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState<number>(-1);

    const [currentPromptState, setCurrentPromptState] = useState({
        doodle: "",
        git: ""
    });

    useEffect(() => {
        setCurrentPromptState({
            doodle: getRandom(doodles),
            git: getRandom(gitTexts)
        });
    }, []);

    const appendToHistory = useCallback((items: CommandOutput[]) => {
        setHistory(prev => [...prev, ...items]);
    }, []);

    const refreshPromptState = useCallback(() => {
        setCurrentPromptState({
            doodle: getRandom(doodles),
            git: getRandom(gitTexts)
        });
    }, []);

    const handleCommand = useCallback(async (cmd: string) => {
        const trimmedCmd = cmd.trim().toLowerCase();

        if (!trimmedCmd) return;

        if (trimmedCmd === "clear") {
            setHistory([]);
            return;
        }

        setCommandHistory(prev => [...prev, trimmedCmd]);
        setHistoryIndex(-1);

        const outputContent = await getCommandOutput(trimmedCmd);

        appendToHistory([
            {
                id: generateId(),
                type: 'input',
                content: cmd,
                promptInfo: currentPromptState,
            },
            { id: generateId(), type: 'output', content: outputContent }
        ]);

        refreshPromptState();
    }, [currentPromptState, appendToHistory, refreshPromptState]);

    const navigateHistoryUp = useCallback((currentInput: string) => {
        if (commandHistory.length > 0) {
            const nextIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
            setHistoryIndex(nextIndex);
            return commandHistory[nextIndex];
        }
        return currentInput;
    }, [commandHistory, historyIndex]);

    const navigateHistoryDown = useCallback((currentInput: string) => {
        if (historyIndex !== -1) {
            const nextIndex = historyIndex + 1;
            if (nextIndex >= commandHistory.length) {
                setHistoryIndex(-1);
                return "";
            } else {
                setHistoryIndex(nextIndex);
                return commandHistory[nextIndex];
            }
        }
        return currentInput;
    }, [commandHistory, historyIndex]);

    return {
        history,
        currentPromptState,
        handleCommand,
        navigateHistoryUp,
        navigateHistoryDown,
        appendToHistory,
        refreshPromptState
    };
}