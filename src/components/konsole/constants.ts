export const doodles = [
    "( * _ * )", "(  ' - '  )", "[ *_* ]", "*( o , o )*", "<*>",
    "* : * ", "<( * )>", "o_O", "[ * ]", "!",
    "<^_^>", "[ !_! ]", "( 0_0 )", "\\(o_o)/",
    "< 0x0 >", ">:<", "[ x_x ]",
    "( ^ - ^ )", "~ ( o_o ) ~", "( ~*-*)~",
    "*( o_o )", "\\(o_o)/",
    "(>_<)", "(^_^)", "*( o_o )",
    "**.", "(o_o)", "uwu",
    "( o_o )", "( >_<) "
];

export const gitTexts = [
    "Keep Coding", "Stay Hard", "Focus", "Ship It",
    "Debug Mode", "Arch User", "Terminal Addict"
];

export const availableCommands = [
    "help", "about", "skills", "contact", "clear",
    "ls", "pwd", "whoami", "date", "echo", "cd",
    "cat", "mkdir", "rm", "touch", "ll", "ip addr", "fastfetch"
];

export const getRandom = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];