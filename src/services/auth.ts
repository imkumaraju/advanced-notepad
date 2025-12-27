import { initializeApp } from 'firebase/app';
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    OAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    type User
} from 'firebase/auth';

// Replace with actual Firebase config from Firebase Console
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const authService = {
    async signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    },

    async signInWithGithub() {
        const provider = new GithubAuthProvider();
        return signInWithPopup(auth, provider);
    },

    async signInWithMicrosoft() {
        const provider = new OAuthProvider('microsoft.com');
        return signInWithPopup(auth, provider);
    },

    async logout() {
        return signOut(auth);
    },

    onAuthChange(callback: (user: User | null) => void) {
        return onAuthStateChanged(auth, callback);
    }
};
