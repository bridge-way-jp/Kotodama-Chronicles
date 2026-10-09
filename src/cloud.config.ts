/**
 * Firebase web config for the cloud save (Google login + Firestore).
 * These values are public by design (they identify the project, they are not secrets);
 * access is protected by the Firestore security rules in firestore.rules.
 * Leave as null to disable cloud saving — the game then only saves in the browser.
 */
export const FIREBASE_CONFIG: null | {
  apiKey: string;
  authDomain: string;
  projectId: string;
  appId: string;
  [k: string]: string;
} = {
  apiKey: 'AIzaSyDDi2LYCN0NhG_v2xQJL99yOvog2O-18Tk',
  authDomain: 'kotodama-chronicles.firebaseapp.com',
  projectId: 'kotodama-chronicles',
  storageBucket: 'kotodama-chronicles.firebasestorage.app',
  messagingSenderId: '17619480169',
  appId: '1:17619480169:web:3d021953ba24e64a5ffcf8',
};
