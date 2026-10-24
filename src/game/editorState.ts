/** shared state between the React editor panel and the Phaser scene (map editor, `?edit`) */
type Listener = () => void;
class EditorState {
  enabled = typeof location !== 'undefined' && new URLSearchParams(location.search).has('edit');
  /** sprite key picked in the palette (null = select / move mode) */
  brush: string | null = null;
  eraser = false;
  /** walkability paint: open = walkable, block = blocked, reset = back to the map's own collision */
  walkBrush: 'open' | 'block' | 'reset' | null = null;
  /** move exits to other maps */
  exits = false;
  /** the whole map with a free camera: zoom and drag around without the player */
  overview = false;
  /** set by the world scene: zoom the view by a factor (the panel's + / − buttons) */
  zoomBy: (f: number) => void = () => {};
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
  set(patch: Partial<Pick<EditorState, 'brush' | 'eraser' | 'grid' | 'info' | 'walkBrush' | 'exits' | 'overview'>>) {
    Object.assign(this, patch);
    this.emit();
  }
}
export const editor = new EditorState();
