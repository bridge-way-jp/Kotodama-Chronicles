/** shared state between the React editor panel and the Phaser scene (map editor, `?edit`) */
type Listener = () => void;
class EditorState {
  enabled = typeof location !== 'undefined' && new URLSearchParams(location.search).has('edit');
  /** sprite key picked in the palette (null = select / move mode) */
  brush: string | null = null;
  eraser = false;
  /** walkability paint: open = walkable, block = blocked, reset = back to the map's own collision */
  walkBrush: 'open' | 'block' | 'reset' | null = null;
  grid = true;
  /** short status line shown in the panel */
  info = '';
  private ls = new Set<Listener>();
  subscribe(l: Listener) {
    this.ls.add(l);
    return () => void this.ls.delete(l);
  }
  emit() {
    this.ls.forEach((l) => l());
  }
  set(patch: Partial<Pick<EditorState, 'brush' | 'eraser' | 'grid' | 'info' | 'walkBrush'>>) {
    Object.assign(this, patch);
    this.emit();
  }
}
export const editor = new EditorState();
