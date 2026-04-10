import React from "react";
import { SiArchlinux, SiNodedotjs } from "react-icons/si";
import { FaFolder } from "react-icons/fa";
import { VscGitCommit } from "react-icons/vsc";
import Image from "next/image";

interface PromptHeaderProps {
    doodle: string;
    gitText: string;
    children?: React.ReactNode;
}

export const PromptHeader = ({ doodle, gitText, children }: PromptHeaderProps) => (
    <div className="flex flex-col gap-1 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
            <span className="text-blue-500 font-bold">╭─</span>

            {/* Replaced Arch Logo */}
            <span className="text-cyan-400 font-bold flex items-center gap-1">
                <SiArchlinux className="text-[0.9em]" /> swap
            </span>

            <span className="text-fuchsia-500">{doodle}</span>

            {/* Replaced Folder Logo */}
            <span className="text-blue-500 font-bold flex items-center gap-1">
                <FaFolder className="text-[0.9em]" /> ~/Github/codershubinc.tech
            </span>

            <span className="font-bold flex items-center">
                <span className="text-white">{"{ "}</span>
                <span className="text-fuchsia-500">{gitText}</span>

                {/* Replaced Git Branch Logo */}
                <span className="text-white flex items-center gap-1 mx-1">
                    <Image src={"https://api.iconify.design/eos-icons/branch-outlined.svg?color=gray"} width={16} height={16} alt="Git Branch" />
                    main
                </span>

                <span className="text-cyan-400">✦</span>
                <span className="text-white">{" }"}</span>
            </span>

            {/* Replaced Node Logo */}
            <span className="text-green-500 font-bold flex items-center gap-1">
                <SiNodedotjs className="text-[0.9em]" /> 25.9.0
            </span>
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