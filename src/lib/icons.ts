/**
 * Icon utility functions for programming languages, operating systems, and editors
 * Returns CDN URLs for devicons and simple icons
 */

export interface IconConfig {
    url: string;
    fallbackColor?: string;
}

/**
 * Get icon URL for a programming language
 */
export function getLanguageIcon(langName: string): IconConfig | null {
    const name = langName.toLowerCase().trim();

    const iconMap: { [key: string]: { name: string; variant?: string } } = {
        'javascript': { name: 'javascript' },
        'typescript': { name: 'typescript' },
        'python': { name: 'python' },
        'java': { name: 'java' },
        'go': { name: 'go' },
        'rust': { name: 'rust' },
        'c++': { name: 'cplusplus' },
        'c': { name: 'c' },
        'c#': { name: 'csharp' },
        'csharp': { name: 'csharp' },
        'ruby': { name: 'ruby' },
        'php': { name: 'php' },
        'swift': { name: 'swift' },
        'kotlin': { name: 'kotlin' },
        'shell': { name: 'bash' },
        'bash': { name: 'bash' },
        'html': { name: 'html5' },
        'css': { name: 'css3' },
        'scss': { name: 'sass' },
        'sass': { name: 'sass' },
        'vue': { name: 'vuejs' },
        'react': { name: 'react' },
        'node': { name: 'nodejs' },
        'nodejs': { name: 'nodejs' },
        'lua': { name: 'lua' },
        'dart': { name: 'dart' },
        'elixir': { name: 'elixir' },
        'scala': { name: 'scala' },
        'haskell': { name: 'haskell' },
        'clojure': { name: 'clojure' },
        'perl': { name: 'perl' },
        'r': { name: 'r' },
        'julia': { name: 'julia' },
        'matlab': { name: 'matlab' },
        'ocaml': { name: 'ocaml' },
        'fsharp': { name: 'fsharp' },
        'f#': { name: 'fsharp' },
        'erlang': { name: 'erlang' },
        'groovy': { name: 'groovy' },
        'objective-c': { name: 'objectivec' },
        'sql': { name: 'mysql' },
        'postgresql': { name: 'postgresql' },
        'mysql': { name: 'mysql' },
        'mongodb': { name: 'mongodb' },
        'graphql': { name: 'graphql' },
        'json': { name: 'json' },
        'yaml': { name: 'yaml' },
        'xml': { name: 'xml' },
        'markdown': { name: 'markdown' },
        'svelte': { name: 'svelte' },
        'angular': { name: 'angular' },
        'solidity': { name: 'solidity' },
        'zig': { name: 'zig' },
        'assembly': { name: 'atom' },
        'docker': { name: 'docker' },
        'latex': { name: 'latex' },
        'tex': { name: 'latex' },
    };

    const iconConfig = iconMap[name];
    if (iconConfig) {
        return {
            url: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconConfig.name}/${iconConfig.name}-original.svg`,
        };
    }
    return null;
}

/**
 * Get icon URL for an operating system
 */
export function getOSIcon(osName: string): IconConfig | null {
    const name = osName.toLowerCase().trim();

    const iconMap: { [key: string]: string } = {
        'windows': 'windows11',
        'mac': 'apple',
        'macos': 'apple',
        'osx': 'apple',
        'linux': 'linux',
        'ubuntu': 'ubuntu',
        'debian': 'debian',
        'fedora': 'fedora',
        'arch': 'archlinux',
        'manjaro': 'manjaro',
        'centos': 'centos',
        'redhat': 'redhat',
        'opensuse': 'opensuse',
        'mint': 'linuxmint',
        'kali': 'kalilinux',
        'android': 'android',
        'ios': 'apple',
    };

    const iconName = iconMap[name];
    if (iconName) {
        return {
            url: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconName}/${iconName}-original.svg`,
        };
    }
    return null;
}

/**
 * Get icon URL for an editor/IDE
 */
export function getEditorIcon(editorName: string): IconConfig | null {
    const name = editorName.toLowerCase().trim();

    const iconMap: { [key: string]: string } = {
        'vscode': 'vscode',
        'vs code': 'vscode',
        'visual studio code': 'vscode',
        'visual studio': 'visualstudio',
        'intellij': 'intellij',
        'intellij idea': 'intellij',
        'pycharm': 'pycharm',
        'webstorm': 'webstorm',
        'phpstorm': 'phpstorm',
        'android studio': 'androidstudio',
        'xcode': 'xcode',
        'sublime': 'sublime',
        'sublime text': 'sublime',
        'atom': 'atom',
        'vim': 'vim',
        'neovim': 'vim',
        'emacs': 'emacs',
        'eclipse': 'eclipse',
        'netbeans': 'netbeans',
        'rider': 'rider',
        'goland': 'goland',
        'clion': 'clion',
        'rubymine': 'rubymine',
        'datagrip': 'datagrip',
    };

    const iconName = iconMap[name];
    if (iconName) {
        return {
            url: `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${iconName}/${iconName}-original.svg`,
        };
    }
    return null;
}

/**
 * Get a fallback icon URL if specific icon is not found
 */
export function getFallbackIcon(category: 'language' | 'os' | 'editor'): string {
    const fallbackMap = {
        'language': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg',
        'os': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg',
        'editor': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
    };
    return fallbackMap[category];
}

/**
 * Get icon URL with fallback support
 */
export function getIconWithFallback(
    name: string,
    category: 'language' | 'os' | 'editor'
): string {
    let iconConfig: IconConfig | null = null;

    switch (category) {
        case 'language':
            iconConfig = getLanguageIcon(name);
            break;
        case 'os':
            iconConfig = getOSIcon(name);
            break;
        case 'editor':
            iconConfig = getEditorIcon(name);
            break;
    }

    return iconConfig?.url || getFallbackIcon(category);
}
