import { audit } from './walk_audit';

{
  const r = audit();
  for (const m of r) console.log(`## ${m.map}\n  ` + m.problems.join('\n  '));
  console.log(r.length ? `${r.reduce((a, b) => a + b.problems.length, 0)} problems on ${r.length} maps` : 'all maps hang together');
  process.exit(r.length ? 1 : 0);
}
