import 'fake-indexeddb/auto';
import { describe, expect, it } from 'vitest';
import { SaveManager, idbBackend, importFromJson, exportToJson, makeEnvelope, validateEnvelope, type SaveBackend } from '../src/core/save';
import { createInitialState } from '../src/core/store';

function memBackend(): SaveBackend & { data: Map<string, unknown> } {
  const data = new Map<string, unknown>();
  return { data, get: async (k) => data.get(k), put: async (k, v) => void data.set(k, v), del: async (k) => void data.delete(k) };
}

describe('save system', () => {
  it('round-trips through IndexedDB', async () => {
    const m = new SaveManager(idbBackend());
    const s = createInitialState('テスト');
    s.level = 7;
    await m.save(s);
    const r = await m.load();
    expect(r.kind).toBe('ok');
    if (r.kind === 'ok') expect(r.env.state.level).toBe(7);
  });

  it('rotates the previous save into backup', async () => {
    const b = memBackend();
    const m = new SaveManager(b);
    const s = createInitialState('A');
    await m.save(s);
    s.level = 2;
    await m.save(s);
    expect((b.data.get('backup') as any).state.level).toBe(1);
  });

  it('falls back to backup and never overwrites a corrupt main save', async () => {
    const b = memBackend();
    const m = new SaveManager(b);
    await m.save(createInitialState('A'));
    await m.save(createInitialState('A'));
    b.data.set('main', { format: 'kotodama-save', version: 1, state: { broken: true } });
    const r = await m.load();
    expect(r.kind).toBe('ok');
    if (r.kind === 'ok') expect(r.fromBackup).toBe(true);
    expect((b.data.get('main') as any).state.broken).toBe(true);
  });

  it('reports an error when nothing is recoverable', async () => {
    const b = memBackend();
    b.data.set('main', { hello: 1 });
    const r = await new SaveManager(b).load();
    expect(r.kind).toBe('error');
    expect(b.data.get('main')).toEqual({ hello: 1 });
  });

  it('validates imports and fills missing optional fields', () => {
    const env = makeEnvelope(createInitialState('B'));
    delete (env.state as any).confusions;
    const back = importFromJson(exportToJson(env));
    expect(back.state.confusions).toEqual({});
    expect(() => importFromJson('{"format":"other"}')).toThrow();
    expect(() => importFromJson('not json')).toThrow();
  });

  it('rejects saves from a newer version', () => {
    const env = makeEnvelope(createInitialState('C'));
    (env as any).version = 99;
    expect(() => validateEnvelope(env)).toThrow(/newer/);
  });
});
