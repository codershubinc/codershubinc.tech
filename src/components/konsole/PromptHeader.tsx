import React from "react";

interface PromptHeaderProps {
    doodle: string;
    gitText: string;
    children?: React.ReactNode;
}

export const PromptHeader = ({ doodle, gitText, children }: PromptHeaderProps) => (
    <div className="flex flex-col gap-1 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
            <span className="text-blue-500 font-bold">╭─</span>
            <span className="text-cyan-400 font-bold"> swap</span>
            <span className="text-fuchsia-500">{doodle}</span>
            <span className="text-blue-500 font-bold"> ~/Github/codershubinc.tech</span>
            <span className="font-bold flex items-center">
                <span className="text-white">{"{ "}</span>
                <span className="text-fuchsia-500">{gitText}</span>
                <span className="text-white">  main </span>
                <span className="text-cyan-400">✦</span>
                <span className="text-white">{" }"}</span>
            </span>
            <span className="text-green-500 font-bold"> 25.9.0</span>
        </div>
        <div className="flex items-center gap-2 w-full">
            <span className="text-blue-500 font-bold">╰─</span>
            <span className="text-fuchsia-500 font-bold">✦</span>
            <div className="flex-1 flex items-center min-w-0">
                {children}
            </div>
        </div>
    </div>
);