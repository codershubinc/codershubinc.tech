export const doodles = [
    "( ✦ ‿ ✦ )", "✧( ु•⌄• )", "[ ✦_✦ ]", "*( ◕ ◡ ◕ )*", "⟡",
    "✧･ﾟ: *", "<( ✦ )>", "☾˙❀", "【 ✦ 】", "⚡",
    "くコ:彡", "[ ⚠_⚠ ]", "( 0_0 )", "⊂(▀¯▀⊂)",
    "〈 0x0 〉", "⌁☍", "【 ✖_✖ 】",
    "( ˘ ɜ˘) ♬", "♫ ꒰･◡･꒱ ♫", "( ~*-*)~",
    "♥( ◡‿◡ )", "♪♪(o_o)♪♪",
    "(≧◡≦)", "(¬‿¬)", "♡( ━_━ )",
    "*:･ﾟ✧", "(◕‿◕✿)", "uwu",
    "( ಠ_ಠ )", "( ╯°□°)╯ ┻━━┻"
];

export const gitTexts = [
    "Keep Coding", "Stay Hard", "Focus", "Ship It",
    "Debug Mode", "Arch User", "Terminal Addict"
];

export const availableCommands = [
    "help", "about", "skills", "contact", "clear",
    "ls", "pwd", "whoami", "date", "echo", "cd",
    "cat", "mkdir", "rm", "touch", "ll"
];

export const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];