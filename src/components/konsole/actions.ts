"use server";

import fs from 'fs/promises';
import path from 'path';

const getRootPath = () => path.join(process.cwd(), 'src/components/konsole/root');

export async function readKonsoleFile(fileName: string) {
    const rootPath = getRootPath();
    const filePath = path.join(rootPath, fileName);

    if (!filePath.startsWith(rootPath)) {
        return null;
    }

    try {
        const content = await fs.readFile(filePath, 'utf-8');
        return content;
    } catch {
        return null;
    }
}

export async function listKonsoleDirectory() {
    const rootPath = getRootPath();
    try {
        const files = await fs.readdir(rootPath, { withFileTypes: true });
        
        const details = await Promise.all(
            files.map(async (file) => {
                const stat = await fs.stat(path.join(rootPath, file.name));
                return {
                    name: file.name,
                    isDirectory: file.isDirectory(),
                    size: stat.size,
                    mtime: stat.mtime
                };
            })
        );
        return details;
    } catch {
        return [];
    }
}
