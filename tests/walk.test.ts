import { describe, expect, it } from 'vitest';
import { audit } from '../tools/walk_audit';

describe('the world hangs together', () => {
  it('every arrival is free, has a way back, and reaches every exit, door, person and thing of its map', () => {
    expect(audit().flatMap((m) => m.problems.map((p) => `${m.map}: ${p}`))).toEqual([]);
  });
});
