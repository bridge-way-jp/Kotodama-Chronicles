/** Tiny typed event bus connecting the Phaser world and the React UI. */
type Handler = (payload: any) => void;

class Bus {
  private map = new Map<string, Set<Handler>>();
  on(evt: string, fn: Handler) {
    if (!this.map.has(evt)) this.map.set(evt, new Set());
    this.map.get(evt)!.add(fn);
    return () => this.off(evt, fn);
  }
  off(evt: string, fn: Handler) {
    this.map.get(evt)?.delete(fn);
  }
  emit(evt: string, payload?: any) {
    for (const fn of [...(this.map.get(evt) ?? [])]) fn(payload);
  }
}

export const bus = new Bus();

export interface ToastMsg {
  text: string;
  kind?: 'info' | 'quest' | 'learn' | 'level' | 'item' | 'warn';
}

export function toast(text: string, kind: ToastMsg['kind'] = 'info') {
  bus.emit('toast', { text, kind } as ToastMsg);
}
