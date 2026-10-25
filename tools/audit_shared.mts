/**
 * The walk audit with the map edits published for everyone (exported from the browser's kc_map_edits_shared):
 *   npx vite-node tools/audit_shared.mts <shared_edits.json>
 */
import fs from 'node:fs';

const file = process.argv[process.argv.length - 1];
const data = fs.readFileSync(file, 'utf8');
const store: Record<string, string> = { kc_map_edits_shared: data };
(globalThis as any).localStorage = { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => void (store[k] = v), removeItem: (k: string) => void delete store[k] };
const { audit } = await import('./walk_audit');
const r = audit();
for (const m of r) console.log(`## ${m.map}\n  ` + m.problems.join('\n  '));
console.log(r.length ? `${r.reduce((a, b) => a + b.problems.length, 0)} problems on ${r.length} maps` : 'all maps hang together');
