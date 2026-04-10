import React from "react";
import { readKonsoleFile, listKonsoleDirectory } from "./actions";
import { fastfetchCommand } from "./commands/fastfetch";
import { getIpCommand } from "./commands/ip";

export const staticCommands: Record<string, React.ReactNode> = {
    help: (
        <div className="flex flex-col gap-1 text-zinc-300">
            <div><span className="text-emerald-400">help</span> - View all commands</div>
            <div><span className="text-emerald-400">ls</span> - List directory contents</div>
            <div><span className="text-emerald-400">ls -la</span> - List directory contents with details</div>
            <div><span className="text-emerald-400">pwd</span> - Print working directory</div>
            <div><span className="text-emerald-400">whoami</span> - Print current user</div>
            <div><span className="text-emerald-400">date</span> - Print current date and time</div>
            <div><span className="text-emerald-400">echo [text]</span> - Print text</div>
            <div><span className="text-emerald-400">cat [file]</span> - Read a file (try: <span className="text-blue-400">cat hire-me.txt</span>)</div>
            <div><span className="text-emerald-400">ip addr</span> - Show current IP address</div>
            <div><span className="text-emerald-400">fastfetch</span> - Fetch system information</div>
            <div><span className="text-emerald-400">clear</span> - Clear terminal</div>
        </div>
    ),
    fastfetch: fastfetchCommand,
    pwd: (
        <>
            <div className="text-zinc-300">/home/codershubinc</div>
            <div className="text-zinc-300">/home/codershubinc</div>
        </>
    ),
    whoami: (
        <div className="text-zinc-300">guest</div>
    ),
    date: (
        <div className="text-zinc-300">{new Date().toString()}</div>
    )
};

export const getCommandOutput = async (cmd: string): Promise<React.ReactNode> => {
    const trimmedCmd = cmd.trim();
    const lowerCmd = trimmedCmd.toLowerCase();

    if (staticCommands[lowerCmd]) {
        return staticCommands[lowerCmd];
    }

    if (lowerCmd.startsWith("echo ")) {
        return <div className="text-zinc-300">{trimmedCmd.substring(5)}</div>;
    }

    if (lowerCmd.startsWith("cd ")) {
        const path = trimmedCmd.substring(3).trim();
        return <div className="text-red-400">cd: no such file or directory: {path}</div>;
    }

    if (lowerCmd.startsWith("mkdir ") || lowerCmd.startsWith("rm ") || lowerCmd.startsWith("touch ")) {
        return <div className="text-red-400">permission denied: running as guest</div>;
    }

    if (lowerCmd === "ip" || lowerCmd === "ip addr" || lowerCmd === "ip address") {
        return await getIpCommand();
    }

    if (lowerCmd === "ls" || lowerCmd === "ll" || lowerCmd === "ls -la" || lowerCmd === "ls -l") {
        const files = await listKonsoleDirectory();

        if (lowerCmd === "ls") {
            return (
                <div className="flex gap-4 flex-wrap text-zinc-300">
                    {files.map(f => (
                        <span key={f.name} className={f.isDirectory ? "text-[#007acc]" : ""}>
                            {f.name}
                        </span>
                    ))}
                    <span className="text-[#007acc]">projects</span>
                </div>
            );
        } else {
            return (
                <div className="flex flex-col text-zinc-300 font-mono whitespace-pre">
                    <span>total {files.length * 4}</span>
                    <span>drwxr-xr-x 3 root root 4096 .</span>
                    <span>drwxr-xr-x 5 root root 4096 ..</span>
                    {files.map(f => {
                        const date = new Date(f.mtime).toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
                        return (
                            <span key={f.name}>-rw-r--r-- 1 root root {f.size.toString().padStart(4, ' ')} {date} {f.name}</span>
                        );
                    })}
                    <span>drwxr-xr-x 2 root root 4096 {new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' })} <span className="text-[#007acc]">projects</span></span>
                </div>
            );
        }
    }

    if (lowerCmd.startsWith("cat ")) {
        const target = lowerCmd.substring(4).trim();
        const content = await readKonsoleFile(target);

        if (content !== null) {
            return <div className="text-zinc-300 whitespace-pre-wrap">{content}</div>;
        } else if (target === "projects") {
            return <div className="text-red-400">cat: projects: Is a directory</div>;
        } else {
            return <div className="text-red-400">cat: {target}: No such file or directory</div>;
        }
    }

    return (
        <div className="text-red-400">
            zsh: command not found: {cmd.split(" ")[0]}. Type &apos;help&apos; for available commands.
        </div>
    );
};
