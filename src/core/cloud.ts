import { FIREBASE_CONFIG } from '../cloud.config';
import { bus, toast } from './events';
import { validateEnvelope, type SaveEnvelope } from './save';

/**
 * Cloud save: Google sign-in (Firebase Auth) + one save document per user in Firestore
 * (users/{uid}/saves/main, previous version kept in .../backup).
 *
 * Safety rules:
 *  - a push never overwrites a cloud save that was written by another device after the
 *    version this device last loaded/pushed (`baseAt`); that becomes a conflict the player resolves
 *  - the overwritten cloud save is always kept in the backup document
 * Firebase is loaded lazily, so the game starts without it.
 */

/** test builds (VITE_FIREBASE_EMU=1) talk to the local Firebase emulators instead */
const EMU = !!import.meta.env.VITE_FIREBASE_EMU;
const CONFIG = EMU ? { apiKey: 'demo-key', authDomain: 'localhost', projectId: 'demo-kotodama', appId: 'demo' } : FIREBASE_CONFIG;

export const cloudEnabled = !!CONFIG;

export interface CloudUser { uid: string; email: string | null; name: string | null }

export const cloud = {
  ready: false,
  user: null as CloudUser | null,
  state: 'idle' as 'idle' | 'syncing' | 'synced' | 'conflict' | 'error',
  error: '',
  lastSync: 0,
  /** savedAt of the newest cloud save this device knows it may overwrite */
  baseAt: 0,
  remote: null as SaveEnvelope | null,
};

const emit = () => bus.emit('cloud');

type FB = {
  auth: typeof import('firebase/auth');
  fs: typeof import('firebase/firestore/lite');
  authInst: import('firebase/auth').Auth;
  db: import('firebase/firestore/lite').Firestore;
};
let fbp: Promise<FB> | null = null;

function fb(): Promise<FB> {
  if (!CONFIG) return Promise.reject(new Error('Cloud save is not configured.'));
  fbp ??= (async () => {
    const [{ initializeApp }, auth, fs] = await Promise.all([import('firebase/app'), import('firebase/auth'), import('firebase/firestore/lite')]);
    const app = initializeApp(CONFIG!);
    const authInst = auth.getAuth(app);
    const db = fs.getFirestore(app);
    if (EMU) {
      auth.connectAuthEmulator(authInst, 'http://127.0.0.1:9099', { disableWarnings: true });
      fs.connectFirestoreEmulator(db, '127.0.0.1', 8080);
    }
    return { auth, fs, authInst, db };
  })();
  return fbp;
}

// ------------------------------------------------------------------ encoding (gzip when available)

async function encode(env: SaveEnvelope): Promise<{ gz?: Uint8Array; json?: string }> {
  const json = JSON.stringify(env);
  if (typeof CompressionStream === 'undefined') return { json };
  const stream = new Blob([json]).stream().pipeThrough(new CompressionStream('gzip'));
  return { gz: new Uint8Array(await new Response(stream).arrayBuffer()) };
}

async function decode(d: any): Promise<SaveEnvelope> {
  let json: string = d.json;
  if (d.gz) {
    const bytes: Uint8Array = d.gz.toUint8Array ? d.gz.toUint8Array() : d.gz;
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    json = await new Response(stream).text();
  }
  return validateEnvelope(JSON.parse(json));
}

function errText(e: unknown): string {
  const code = (e as any)?.code ?? '';
  if (code === 'permission-denied') return 'Dieses Konto ist für die Cloud nicht freigeschaltet.';
  if (code === 'unavailable') return 'Offline – wird später gesichert.';
  return (e as Error).message;
}

// ------------------------------------------------------------------ auth

/** Starts Firebase (if configured) and resolves once the login state is known. */
export async function initCloud(): Promise<void> {
  if (!cloudEnabled) return;
  try {
    const { auth, authInst } = await fb();
    await new Promise<void>((resolve) => {
      let first = true;
      auth.onAuthStateChanged(authInst, async (u) => {
        cloud.user = u ? { uid: u.uid, email: u.email, name: u.displayName } : null;
        cloud.remote = null;
        if (u) await refreshRemote();
        cloud.ready = true;
        emit();
        if (first) { first = false; resolve(); }
      });
    });
  } catch (e) {
    cloud.state = 'error';
    cloud.error = (e as Error).message;
    cloud.ready = true;
    emit();
  }
}

export async function signIn(): Promise<void> {
  const { auth, authInst } = await fb();
  const provider = new auth.GoogleAuthProvider();
  if (EMU) {
    // emulator: fake Google account (the real popup needs apis.google.com)
    const email = localStorage.getItem('emu-email') ?? 'maria@example.com';
    await auth.signInWithCredential(authInst, auth.GoogleAuthProvider.credential(JSON.stringify({ sub: email, email, email_verified: true })));
    return;
  }
  try {
    await auth.signInWithPopup(authInst, provider);
  } catch (e: any) {
    if (e?.code === 'auth/popup-blocked' || e?.code === 'auth/operation-not-supported-in-this-environment') {
      await auth.signInWithRedirect(authInst, provider);
      return;
    }
    if (e?.code !== 'auth/popup-closed-by-user' && e?.code !== 'auth/cancelled-popup-request') throw e;
  }
}

export async function signOut(): Promise<void> {
  const { auth, authInst } = await fb();
  await auth.signOut(authInst);
}

// ------------------------------------------------------------------ data

async function refs() {
  const { fs, db } = await fb();
  if (!cloud.user) throw new Error('Not signed in.');
  return {
    fs, db,
    main: fs.doc(db, 'users', cloud.user.uid, 'saves', 'main'),
    backup: fs.doc(db, 'users', cloud.user.uid, 'saves', 'backup'),
  };
}

/** Downloads the cloud save (null if there is none). */
export async function refreshRemote(): Promise<SaveEnvelope | null> {
  try {
    const { fs, main } = await refs();
    const snap = await fs.getDoc(main);
    cloud.remote = snap.exists() ? await decode(snap.data()) : null;
    cloud.error = '';
  } catch (e) {
    cloud.state = 'error';
    cloud.error = errText(e);
  }
  emit();
  return cloud.remote;
}

/** This device continues from `savedAt` (the cloud save it loaded, or the one it chose to replace). */
export function adoptBase(savedAt: number) {
  cloud.baseAt = savedAt;
  if (cloud.state === 'conflict') cloud.state = 'idle';
  emit();
}

let pushing: Promise<void> | null = null;
let queued: SaveEnvelope | null = null;
let timer: ReturnType<typeof setTimeout> | null = null;

/** Uploads a save. Refuses (conflict) if another device saved newer data since `baseAt`, unless forced. */
export async function pushNow(env: SaveEnvelope, force = false): Promise<void> {
  if (!cloudEnabled || !cloud.user) return;
  if (cloud.state === 'conflict' && !force) return;
  if (pushing) { queued = env; return pushing; }
  cloud.state = 'syncing';
  emit();
  pushing = (async () => {
    try {
      const { fs, db, main, backup } = await refs();
      const data = await encode(env);
      const payload: any = {
        savedAt: env.savedAt,
        playerName: env.playerName,
        summary: env.summary,
        device: navigator.userAgent.slice(0, 120),
        ...(data.gz ? { gz: fs.Bytes.fromUint8Array(data.gz) } : { json: data.json }),
      };
      const res = await fs.runTransaction(db, async (tx) => {
        const cur = await tx.get(main);
        const curAt: number = cur.exists() ? cur.data().savedAt ?? 0 : 0;
        if (cur.exists() && curAt > cloud.baseAt && !force) return 'conflict' as const;
        if (cur.exists() && curAt !== env.savedAt) tx.set(backup, cur.data());
        tx.set(main, payload);
        return 'ok' as const;
      });
      if (res === 'conflict') {
        cloud.state = 'conflict';
        await refreshRemote();
        toast('☁ Auf einem anderen Gerät wurde weitergespielt – siehe Einstellungen › Cloud.', 'warn');
      } else {
        cloud.baseAt = env.savedAt;
        cloud.lastSync = Date.now();
        cloud.state = 'synced';
        cloud.error = '';
      }
    } catch (e) {
      cloud.state = 'error';
      cloud.error = errText(e);
    } finally {
      pushing = null;
      emit();
      if (queued) {
        const q = queued;
        queued = null;
        void pushNow(q);
      }
    }
  })();
  return pushing;
}

/** Called after every local save: uploads at most every 20 s (immediately when `soon`). */
export function schedulePush(env: SaveEnvelope, soon = false) {
  if (!cloudEnabled || !cloud.user) return;
  queuedEnv = env;
  if (timer) clearTimeout(timer);
  timer = setTimeout(flushPush, soon ? 0 : 20000);
}
let queuedEnv: SaveEnvelope | null = null;

export function flushPush() {
  if (timer) { clearTimeout(timer); timer = null; }
  if (queuedEnv) {
    const e = queuedEnv;
    queuedEnv = null;
    void pushNow(e);
  }
}
