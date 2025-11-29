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
