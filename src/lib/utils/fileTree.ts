import { getLanguageColor } from './language';

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
