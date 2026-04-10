import React from "react";

export const fastfetchCommand = (
    <div className="flex gap-6 text-zinc-300 font-mono mt-2">
        <div className="text-cyan-400 font-bold whitespace-pre hidden sm:block">
            {`      _,met$$$$$gg.
    ,g$$$$$$$$$$$$$$$P.
  ,g$$P"     """Y$$.".
 ,$$P'              \`$$$.
',$$P       ,ggs.     \`$$b:
\`d$$'     ,$P"'   .    $$$
 $$P      d$'     ,    $$P
 $$:      $$.   -    ,d$$'
 $$;      Y$b._   _,d$P'
 Y$$.    \`.w$$$$$$$P"'
 \`$$b      "-.__
  \`Y$$
   \`Y$$.
     \`$$b.
       \`Y$$b.
          \`"Y$b._
              \`"""`}
        </div>
        <div className="flex flex-col gap-1">
            <div><span className="text-cyan-400 font-bold">swap</span><span className="text-white">@</span><span className="text-cyan-400 font-bold">codershubinc</span></div>
            <div className="text-zinc-500">------------------</div>
            <div><span className="text-cyan-400 font-bold">OS</span>: Arch Linux x86_64</div>
            <div><span className="text-cyan-400 font-bold">Host</span>: Next.js 15</div>
            <div><span className="text-cyan-400 font-bold">Kernel</span>: 6.8.9-arch1-1</div>
            <div><span className="text-cyan-400 font-bold">Uptime</span>: {Math.floor(Math.random() * 10) + 1} hours, {Math.floor(Math.random() * 60)} mins</div>
            <div><span className="text-cyan-400 font-bold">Packages</span>: 1420 (pacman)</div>
            <div><span className="text-cyan-400 font-bold">Shell</span>: zsh 5.9</div>
            <div><span className="text-cyan-400 font-bold">Resolution</span>: 1920x1080</div>
            <div><span className="text-cyan-400 font-bold">DE</span>: Hyprland</div>
            <div><span className="text-cyan-400 font-bold">WM</span>: Wayland</div>
            <div><span className="text-cyan-400 font-bold">Terminal</span>: Konsole</div>
            <div><span className="text-cyan-400 font-bold">CPU</span>: AMD Ryzen 9 5900X (16) @ 3.700GHz</div>
            <div><span className="text-cyan-400 font-bold">GPU</span>: NVIDIA GeForce RTX 3080</div>
            <div><span className="text-cyan-400 font-bold">Memory</span>: 8192MiB / 32014MiB</div>
            <div className="flex gap-2 mt-2">
                <div className="w-4 h-4 bg-black"></div>
                <div className="w-4 h-4 bg-red-400"></div>
                <div className="w-4 h-4 bg-green-400"></div>
                <div className="w-4 h-4 bg-yellow-400"></div>
                <div className="w-4 h-4 bg-blue-400"></div>
                <div className="w-4 h-4 bg-fuchsia-400"></div>
                <div className="w-4 h-4 bg-cyan-400"></div>
                <div className="w-4 h-4 bg-zinc-300"></div>
            </div>
        </div>
    </div>
);