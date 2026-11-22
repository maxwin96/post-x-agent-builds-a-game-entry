// Neon Orbit — make.fun entry helper (post-x-the-agent-builds-a-game-from-20261122-1709)
//
// Copies POST.json (the X post URL for this entry) into /output so the
// make.fun grader can read it. Node 22, stdlib only, no network.
// Never deletes /output — only mkdir + copy.
import { mkdirSync, copyFileSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const src = join(root, 'POST.json');
const outDir = '/output';
const dest = join(outDir, 'POST.json');

if (!existsSync(src)) {
  console.error('POST.json not found next to main.ts');
  process.exit(1);
}

// Validate that POST.json is real JSON before copying.
JSON.parse(readFileSync(src, 'utf8'));

mkdirSync(outDir, { recursive: true });
copyFileSync(src, dest);
console.log(`Copied POST.json -> ${dest}`);
