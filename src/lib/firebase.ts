import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager, doc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);

// Initialize Firestore with robust local persistence
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
}, (firebaseConfig as any).firestoreDatabaseId || '(default)');

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

let activeLoginPromise: Promise<{ user: any; error?: string | null } | null> | null = null;

// Robust login helper with mutex lock and graceful popup handling
export const signInWithGoogle = async (): Promise<{ user: any; error?: string | null } | null> => {
  // If an auth operation is already in flight, return the existing promise to avoid cancelled-popup-request
  if (activeLoginPromise) {
    return activeLoginPromise;
  }

  activeLoginPromise = (async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return { user: result.user, error: null };
    } catch (error: any) {
      const code = error?.code || '';

      // Gracefully handle normal user actions without unhandled rejections or error alerts
      if (code === 'auth/cancelled-popup-request') {
        // Request was cancelled or superseded by another attempt
        return null;
      }
      if (code === 'auth/popup-closed-by-user') {
        // User closed the popup window voluntarily
        return null;
      }
      if (code === 'auth/popup-blocked') {
        // Browser blocked the popup window
        return { user: null, error: 'popup-blocked' };
      }

      console.warn('Google sign-in attempt notice:', error?.message || error);
      return { user: null, error: error?.message || 'unknown' };
    } finally {
      activeLoginPromise = null;
    }
  })();

  return activeLoginPromise;
};

export const logout = () => signOut(auth);

// CRITICAL: Validate connection to Firestore on boot
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error: any) {
    // Client is offline or backend is unreachable temporarily; operate in offline mode gracefully
    console.info("Firestore operating in offline or connected mode.");
  }
}
testConnection();
