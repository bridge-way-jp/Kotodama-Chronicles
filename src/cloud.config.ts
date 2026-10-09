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
} = null;
