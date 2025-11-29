export function fileTreeToHtml(treeStr: string): string {
  if (!treeStr) return '';
  const lines = treeStr.split(/\r?\n/).filter(Boolean);

  // Check if input looks like paths (has at least one slash)
  const looksLikePaths = lines.some(l => l.includes('/'));

  // Counts by extension
  const extCounts: Record<string, number> = {};
  let totalFiles = 0;
  const incExt = (filename: string) => {
    const m = filename.match(/\.([a-z0-9]+)$/i);
    const ext = m ? m[1].toLowerCase() : 'no-ext';
    extCounts[ext] = (extCounts[ext] || 0) + 1;
    totalFiles++;
  };

  // Shared icons
  const folderIcon = `<svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h4l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/></svg>`;
  const fileIcon = `<svg class="w-4 h-4 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4a2 2 0 012 2v2h2a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"/></svg>`;

  if (looksLikePaths) {
    // Build tree from path list
    type Node = { name: string; children: Record<string, Node>; isFile?: boolean; comment?: string };
    const root: Record<string, Node> = {};

    const addPath = (pathLine: string) => {
      // parse comment if present
      const [pathPartRaw, ...commentParts] = pathLine.split(/\s+#/);
      const pathPart = (pathPartRaw || '').trim();
      const comment = commentParts.join(' #').trim();
      if (!pathPart) return;
      const parts = pathPart.split('/').filter(Boolean);
      if (parts.length === 0) return;
      let current = root;
      for (let i = 0; i < parts.length; i++) {
        const p = parts[i];
        const isLast = i === parts.length - 1;
        if (!current[p]) {
          current[p] = { name: p, children: {} };
        }
        if (isLast) {
          // If last part contains a dot -> file, else if original ended with / -> folder
          const isFolder = pathPart.endsWith('/') || !/\.[\w\d]+$/.test(p);
          current[p].isFile = !isFolder;
          if (comment) current[p].comment = comment;
          if (current[p].isFile) {
            incExt(p);
          }
        }
        current = current[p].children;
      }
    };

    lines.forEach(addPath);

    const renderNode = (node: Node, depth = 0) => {
      const padding = depth * 14; // px
      const childrenKeys = Object.keys(node.children || {});
      const isFolder = !node.isFile;
      let out = `<li class=\"flex items-center gap-2 py-0.5 rounded transition hover:bg-gray-800/60 group\" style=\"padding-left:${padding}px\">`;
      out += isFolder ? `${folderIcon}<span class=\"font-semibold text-yellow-300\">${node.name.replace(/\/$/, '')}/</span>` : `${fileIcon}<span class=\"text-gray-300\">${node.name}</span>`;
      if (node.comment) out += `<span class=\"ml-2 text-xs text-gray-500 italic\"># ${node.comment}</span>`;
      out += '</li>';
      if (childrenKeys.length > 0) {
        out += '<ul>';
        // show files first, then folders
        const sorted = childrenKeys.sort((a, b) => {
          const aIsFile = !!node.children[a].isFile;
          const bIsFile = !!node.children[b].isFile;
          if (aIsFile === bIsFile) return a.localeCompare(b);
          return aIsFile ? -1 : 1;
        });
        sorted.forEach(k => {
          out += renderNode(node.children[k], depth + 1);
        });
        out += '</ul>';
      }
      return out;
    };

    // Render root nodes (single files or folders)
    let html = '<ul class="filetree text-[13px] dark:text-gray-200 font-mono">';
    const rootKeys = Object.keys(root);
    // Render root files first, then folders
    const rootFiles = rootKeys.filter(k => !!root[k].isFile).sort();
    const rootDirs = rootKeys.filter(k => !root[k].isFile).sort();
    rootFiles.forEach(k => {
      html += renderNode(root[k], 0);
    });
    rootDirs.forEach(k => {
      html += renderNode(root[k], 0);
    });
    html += '</ul>';
    const extToLang: Record<string, string> = {
      ts: 'TypeScript',
      tsx: 'TypeScript',
      js: 'JavaScript',
      jsx: 'React',
      py: 'Python',
      go: 'Go',
      rs: 'Rust',
      java: 'Java',
      html: 'HTML',
      css: 'CSS',
      vue: 'Vue',
      php: 'PHP',
      rb: 'Ruby',
      swift: 'Swift',
      kt: 'Kotlin',
    };
    const extEntries = Object.entries(extCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    const summaryHtml = extEntries.length
      ? `<div class="mt-3 flex flex-wrap gap-2">${extEntries
        .map(([ext, count]) => {
          const lang = extToLang[ext] ?? null;
          const colorClass = lang ? getLanguageColor(lang) : 'bg-gray-800 text-gray-200 border-gray-700';
          const label = ext === 'no-ext' ? '* (no ext)' : `*.${ext}`;
          return `<span class="px-2 py-0.5 text-xs rounded ${colorClass} border ${lang ? '' : ''}">${label} <span class="ml-1 font-semibold">${count}</span></span>`;
        })
        .join('')}
          <span class="px-2 py-0.5 text-xs rounded bg-blue-900 text-blue-100 border border-blue-800">Total <span class="ml-1 font-semibold">${totalFiles}</span></span>
        </div>`
      : '';
    return `<div class="overflow-x-auto bg-gray-900 rounded-lg border border-gray-800 p-4 shadow-lg"><div class="mb-2 text-xs uppercase tracking-widest text-blue-400 font-bold">Project Structure</div>${html}${summaryHtml}</div>`;
  }

  // Fallback: ASCII tree (│ ├ └ style)
  const getDepth = (line: string) => {
    const match = line.match(/^(\s*│|\s*├|\s*└|\s*─|\s*\||\s* )+/);
    if (match) {
      return Math.floor(match[0].replace(/[^│├└─| ]/g, '').length / 4) + (match[0].length > 0 ? 1 : 0);
    }
    return 0;
  };
  const cleanLine = (line: string) => line.replace(/^([\s│├└─|]+)?([\s]*)/, '');
  let html = '<ul class="filetree text-[13px] dark:text-gray-200 font-mono">';
  for (const raw of lines) {
    const line = raw;
    const depth = getDepth(line);
    const clean = cleanLine(line);
    const [first, ...rest] = clean.split(/\s+#/);
    const name = (first || '').trim();
    const comment = rest.length ? rest.join(' #').trim() : '';
    const folder = name.endsWith('/') || !/\.[\w\d]+$/.test(name);
    const padding = depth * 14;
    if (!folder) incExt(name);
    html += `<li class=\"flex items-center gap-2 py-0.5 rounded transition hover:bg-gray-800/60 group\" style=\"padding-left:${padding}px\">`;
    html += folder ? `${folderIcon}<span class=\"font-semibold text-yellow-300\">${name.replace(/\/$/, '')}</span>` : `${fileIcon}<span class=\"text-gray-300\">${name}</span>`;
    if (comment) html += `<span class=\"ml-2 text-xs text-gray-500 italic\"># ${comment}</span>`;
    html += `</li>`;
  }
  html += '</ul>';
  const extEntries = Object.entries(extCounts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const summaryHtml = extEntries.length
    ? `<div class="mt-3 flex flex-wrap gap-2">${extEntries
      .map(([ext, count]) => {
        const lang = ({
          ts: 'TypeScript',
          tsx: 'TypeScript',
          js: 'JavaScript',
          jsx: 'React',
          py: 'Python',
          go: 'Go',
          rs: 'Rust',
          java: 'Java',
          html: 'HTML',
          css: 'CSS',
          vue: 'Vue',
          php: 'PHP',
          rb: 'Ruby',
          swift: 'Swift',
          kt: 'Kotlin',
        } as Record<string, string>)[ext] ?? null;
        const colorClass = lang ? getLanguageColor(lang) : 'bg-gray-800 text-gray-200 border-gray-700';
        const label = ext === 'no-ext' ? '* (no ext)' : `*.${ext}`;
        return `<span class="px-2 py-0.5 text-xs rounded ${colorClass} border">${label} <span class="ml-1 font-semibold">${count}</span></span>`;
      })
      .join('')}
        <span class="px-2 py-0.5 text-xs rounded bg-blue-900 text-blue-100 border border-blue-800">Total <span class="ml-1 font-semibold">${totalFiles}</span></span>
      </div>`
    : '';
  return `<div class="overflow-x-auto bg-gray-900 rounded-lg border border-gray-800 p-4 shadow-lg"><div class="mb-2 text-xs uppercase tracking-widest text-blue-400 font-bold">Project Structure</div>${html}${summaryHtml}</div>`;
}

/**
 * Parse file tree string and return extension counts and total files.
 */
export function parseFileTreeStats(treeStr: string) {
  const lines = (treeStr || '').split(/\r?\n/).filter(Boolean);
  const extCounts: Record<string, number> = {};
  let totalFiles = 0;
  const inc = (name: string) => {
    const m = name.match(/\.([a-z0-9]+)$/i);
    const ext = m ? m[1].toLowerCase() : 'no-ext';
    extCounts[ext] = (extCounts[ext] || 0) + 1;
    totalFiles++;
  };

  const looksLikePaths = lines.some(l => l.includes('/'));
  if (looksLikePaths) {
    for (const ln of lines) {
      const [pathPartRaw] = ln.split(/\s+#/);
      const pathPart = (pathPartRaw || '').trim();
      if (!pathPart) continue;
      const parts = pathPart.split('/').filter(Boolean);
      if (!parts.length) continue;
      const last = parts[parts.length - 1];
      const isFile = /\.[a-z0-9]+$/i.test(last);
      if (isFile) inc(last);
    }
  } else {
    // ascii-style
    for (const ln of lines) {
      const clean = ln.replace(/^([\s│├└─|]+)?([\s]*)/, '');
      const [first] = clean.split(/\s+#/);
      const name = (first || '').trim();
      if (!name) continue;
      const isFile = /\.[a-z0-9]+$/i.test(name);
      if (isFile) inc(name);
    }
  }

  return { extCounts, totalFiles };
}
import { marked } from 'marked';

/**
 * Converts markdown string to HTML with Tailwind Typography styling.
 * @param markdown Markdown string
 * @returns HTML string (use with `dangerouslySetInnerHTML`)
 */
export async function markdownToHtml(markdown: string, variant: 'default' | 'blue' | 'card' | 'minimal' = 'default'): Promise<string> {
  // Convert markdown to HTML
  let html = await marked.parse(markdown);

  // Style variants for dark mode
  const variants: Record<string, { wrapper: string; custom: Record<string, string> }> = {
    default: {
      wrapper: 'prose prose-neutral dark:prose-invert max-w-none',
      custom: {
        h1: 'text-4xl font-bold mt-8 mb-4 text-blue-400',
        h2: 'text-3xl font-semibold mt-8 mb-3 text-blue-300',
        h3: 'text-2xl font-semibold mt-6 mb-2 text-blue-200',
        h4: 'text-xl font-semibold mt-4 mb-2 text-blue-100',
        p: 'my-4 text-gray-300',
        ul: 'list-disc pl-6 my-4',
        ol: 'list-decimal pl-6 my-4',
        li: 'mb-1',
        pre: 'bg-gray-900 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto',
        code: 'bg-gradient-to-br from-gray-800 to-gray-900 text-gray-400 px-2 py-1 rounded-lg font-mono text-[0.97em] border border-gray-700 shadow-sm gap-1 hover:bg-gray-700 hover:text-gray-500',
        blockquote: 'border-l-4 border-blue-400 pl-4 italic text-gray-400 my-6',
        hr: 'my-8 border-gray-700',
        table: 'w-full my-6 border-collapse',
        th: 'border px-3 py-2 bg-gray-800 text-white font-semibold',
        td: 'border px-3 py-2 text-gray-300',
        a: 'text-blue-400 underline hover:text-blue-200',
        img: 'rounded-sm border border-gray-800 shadow-lg  ',
      },
    },
    blue: {
      wrapper: 'prose dark:prose-invert max-w-none bg-[#0a192f] border border-blue-900/40 p-6 rounded-xl shadow-lg',
      custom: {
        h1: 'text-4xl font-extrabold mt-8 mb-4 text-blue-300',
        h2: 'text-3xl font-bold mt-8 mb-3 text-blue-200',
        h3: 'text-2xl font-semibold mt-6 mb-2 text-blue-100',
        h4: 'text-xl font-semibold mt-4 mb-2 text-blue-100',
        p: 'my-4 text-blue-100',
        ul: 'list-disc pl-6 my-4',
        ol: 'list-decimal pl-6 my-4',
        li: 'mb-1',
        pre: 'bg-blue-950 text-blue-100 rounded-lg p-4 my-6 overflow-x-auto',
        code: 'bg-gradient-to-br from-blue-950 to-blue-900 text-blue-200 px-2 py-1 rounded-lg font-mono text-[0.97em] border border-blue-800 shadow-sm',
        blockquote: 'border-l-4 border-blue-500 pl-4 italic text-blue-200 my-6',
        hr: 'my-8 border-blue-900',
        table: 'w-full my-6 border-collapse',
        th: 'border px-3 py-2 bg-blue-900 text-blue-100 font-semibold',
        td: 'border px-3 py-2 text-blue-100',
        a: 'text-blue-300 underline hover:text-blue-100',
        img: 'rounded-xl border border-blue-900 shadow-lg my-8 mx-auto',
      },
    },
    card: {
      wrapper: 'prose dark:prose-invert max-w-none bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-2xl',
      custom: {
        h1: 'text-4xl font-bold mt-8 mb-4 text-gray-100',
        h2: 'text-3xl font-semibold mt-8 mb-3 text-gray-200',
        h3: 'text-2xl font-semibold mt-6 mb-2 text-gray-300',
        h4: 'text-xl font-semibold mt-4 mb-2 text-gray-400',
        p: 'my-4 text-gray-300',
        ul: 'list-disc pl-6 my-4',
        ol: 'list-decimal pl-6 my-4',
        li: 'mb-1',
        pre: 'bg-gray-800 text-gray-100 rounded-lg p-4 my-6 overflow-x-auto',
        code: 'bg-gradient-to-br from-gray-900 to-gray-800 text-pink-400 px-2 py-1 rounded-lg font-mono text-[0.97em] border border-gray-700 shadow-sm',
        blockquote: 'border-l-4 border-gray-700 pl-4 italic text-gray-400 my-6',
        hr: 'my-8 border-gray-700',
        table: 'w-full my-6 border-collapse',
        th: 'border px-3 py-2 bg-gray-800 text-white font-semibold',
        td: 'border px-3 py-2 text-gray-300',
        a: 'text-blue-400 underline hover:text-blue-200',
        img: 'rounded-xl border border-gray-800 shadow-lg my-8 mx-auto',
      },
    },
    minimal: {
      wrapper: 'prose dark:prose-invert max-w-none bg-transparent p-0',
      custom: {
        h1: 'text-3xl font-bold mt-8 mb-4 text-gray-200',
        h2: 'text-2xl font-semibold mt-8 mb-3 text-gray-300',
        h3: 'text-xl font-semibold mt-6 mb-2 text-gray-400',
        h4: 'text-lg font-semibold mt-4 mb-2 text-gray-500',
        p: 'my-4 text-gray-400',
        ul: 'list-disc pl-6 my-4',
        ol: 'list-decimal pl-6 my-4',
        li: 'mb-1',
        pre: 'bg-gray-900 text-gray-300 rounded p-4 my-6 overflow-x-auto',
        code: 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-200 px-2 py-1 rounded-lg font-mono text-[0.97em] border border-gray-700 shadow-sm',
        blockquote: 'border-l-4 border-gray-700 pl-4 italic text-gray-500 my-6',
        hr: 'my-8 border-gray-800',
        table: 'w-full my-6 border-collapse',
        th: 'border px-3 py-2 bg-gray-800 text-gray-200 font-semibold',
        td: 'border px-3 py-2 text-gray-400',
        a: 'text-blue-400 underline hover:text-blue-200',
        img: 'rounded-xl border border-gray-800 shadow my-8 mx-auto',
      },
    },
  };

  const { wrapper, custom: customClasses } = variants[variant] || variants.default;

  // Add classes to tags using regex (simple approach)
  for (const tag in customClasses) {
    const classAttr = `class=\"${customClasses[tag]}\"`;
    // Only add class if not already present
    html = html.replace(
      new RegExp(`<${tag}(?![\w-])([^>]*)(?<!class=)`, 'g'),
      `<${tag} ${classAttr}$1`
    );
  }

  // If a <p> contains more than one <img>, add flex classes to the <p>
  html = html.replace(/<p([^>]*)>((?:[^<]*<img[^>]+>[^<]*){2,})<\/p>/g, (match, attrs, inner) => {
    // Add flex classes to the <p>
    const flexClass = 'flex gap-4 flex-wrap items-center justify-space-between';
    // If class already exists, append
    if (/class=["']([^"']*)["']/.test(attrs)) {
      return `<p${attrs.replace(/class=["']([^"']*)["']/, (m: string, c: string) => `class=\"${c} ${flexClass}\"`)}>${inner}</p>`;
    } else {
      return `<p class=\"${flexClass}\"${attrs}>${inner}</p>`;
    }
  });

  // Wrap with Tailwind Typography classes
  return `<article class="${wrapper}">${html}</article>`;
}
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    TypeScript: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    JavaScript: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800',
    Python: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800',
    Java: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800',
    HTML: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    CSS: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800',
    Vue: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    React: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
    Go: 'bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    Rust: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    'C++': 'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300 border-pink-200 dark:border-pink-800',
    C: 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300 border-slate-200 dark:border-slate-800',
    PHP: 'bg-violet-100 text-violet-800 dark:bg-violet-900/30 dark:text-violet-300 border-violet-200 dark:border-violet-800',
    Ruby: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    Swift: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800',
    Kotlin: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  };
  return colors[language] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
};

export const getDarkLanguageColor = (language: string) => {
  const colors: Record<string, string> = {
    TypeScript: 'bg-blue-900/30 text-blue-300 border-blue-800',
    JavaScript: 'bg-yellow-900/30 text-yellow-300 border-yellow-800',
    Python: 'bg-green-900/30 text-green-300 border-green-800',
    Java: 'bg-red-900/30 text-red-300 border-red-800',
    HTML: 'bg-orange-900/30 text-orange-300 border-orange-800',
    CSS: 'bg-indigo-900/30 text-indigo-300 border-indigo-800',
    Vue: 'bg-emerald-900/30 text-emerald-300 border-emerald-800',
    React: 'bg-cyan-900/30 text-cyan-300 border-cyan-800',
    Go: 'bg-sky-900/30 text-sky-300 border-sky-800',
    Rust: 'bg-orange-900/30 text-orange-300 border-orange-800',
    'C++': 'bg-pink-900/30 text-pink-300 border-pink-800',
    C: 'bg-slate-900/30 text-slate-300 border-slate-800',
    PHP: 'bg-violet-900/30 text-violet-300 border-violet-800',
    Ruby: 'bg-rose-900/30 text-rose-300 border-rose-800',
    Swift: 'bg-orange-900/30 text-orange-300 border-orange-800',
    Kotlin: 'bg-purple-900/30 text-purple-300 border-purple-800',
  };
  return colors[language] || 'bg-gray-800 text-gray-300 border-gray-700';
};

export function getGitHubThemeStyles() {
  return cn(
    // Base Layout
    "prose prose-lg dark:prose-invert max-w-none",

    // Headings
    "prose-headings:scroll-mt-20 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white",
    "prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:border-b prose-h1:border-gray-200 dark:prose-h1:border-gray-800 prose-h1:pb-2 prose-h1:mb-8",
    "prose-h2:text-2xl prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-800 prose-h2:pb-2 prose-h2:mt-10 prose-h2:mb-6",
    "prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:font-semibold",
    "prose-h4:text-lg prose-h4:mt-6 prose-h4:mb-4 prose-h4:font-semibold",

    // Paragraphs & Text
    "prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-7 prose-p:mb-4",
    "prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold",
    "prose-em:text-gray-700 dark:prose-em:text-gray-300 prose-em:italic",

    // Links
    "prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline hover:prose-a:text-blue-500 dark:hover:prose-a:text-blue-300 prose-a:font-normal",

    // Code Blocks (Pre)
    "prose-pre:bg-gray-100 dark:prose-pre:bg-[#161b22] prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:rounded-xl prose-pre:p-4 prose-pre:my-6",
    "prose-pre:shadow-sm prose-pre:overflow-x-auto",

    // Inline Code
    "prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-[#161b22] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md",
    "prose-code:before:content-none prose-code:after:content-none", // Remove backticks
    "prose-code:font-mono prose-code:text-[0.9em]",

    // Lists
    "prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4",
    "prose-ol:text-gray-700 dark:prose-ol:text-gray-300 prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4",
    "prose-li:marker:text-gray-500 prose-li:my-1",

    // Blockquotes
    "prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-700 prose-blockquote:pl-4 prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-blockquote:italic prose-blockquote:my-6",

    // Images
    "prose-img:rounded-xl prose-img:border prose-img:border-gray-200 dark:prose-img:border-gray-800 prose-img:shadow-lg prose-img:my-8 prose-img:mx-auto",

    // Horizontal Rules
    "prose-hr:border-gray-200 dark:prose-hr:border-gray-800 prose-hr:my-8",

    // Tables
    "prose-table:w-full prose-table:my-6 prose-table:border-collapse",
    "prose-th:border prose-th:border-gray-200 dark:prose-th:border-gray-700 prose-th:bg-gray-100 dark:prose-th:bg-[#161b22] prose-th:p-3 prose-th:text-left prose-th:text-gray-900 dark:prose-th:text-white prose-th:font-semibold",
    "prose-td:border prose-td:border-gray-200 dark:prose-td:border-gray-700 prose-td:p-3 prose-td:text-gray-700 dark:prose-td:text-gray-300",

    // Task Lists (GitHub flavored)
    "prose-li:has-[input]:list-none prose-li:has-[input]:pl-0 prose-li:has-[input]:flex prose-li:has-[input]:items-center prose-li:has-[input]:gap-2"
  );
}

/**
 * Format a creation date into a friendly relative string.
 * - if less than 1 month -> show days
 * - if less than 1 year -> show months
 * - otherwise show years and optional months
 */
export function formatCreationDate(dateInput: string | number | Date) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const msPerMonth = msPerDay * 30; // approx
  const msPerYear = msPerDay * 365; // approx
  const created = new Date(dateInput);
  if (isNaN(created.getTime())) return '';
  const diff = Date.now() - created.getTime();
  if (diff < 0) return 'In the future';

  const years = Math.floor(diff / msPerYear);
  const months = Math.floor((diff % msPerYear) / msPerMonth);
  const days = Math.floor((diff % msPerMonth) / msPerDay);

  if (years === 0) {
    if (months === 0) {
      const d = Math.max(1, days);
      return `${d} day${d === 1 ? '' : 's'} ago`;
    }
    return `${months} month${months === 1 ? '' : 's'} ago`;
  }

  // years >= 1
  if (months === 0) {
    return `${years} year${years === 1 ? '' : 's'} ago`;
  }
  return `${years} year${years === 1 ? '' : 's'} ${months} month${months === 1 ? '' : 's'} ago`;
}
