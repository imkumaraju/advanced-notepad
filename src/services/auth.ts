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
    apiKey: "AIzaSyDROHN9kiqHBR_1pn_qzlQbh9J0KmN-NIU",
    authDomain: "advanced-notepad-597f8.firebaseapp.com",
    projectId: "advanced-notepad-597f8",
    storageBucket: "advanced-notepad-597f8.firebasestorage.app",
    messagingSenderId: "55103653446",
    appId: "1:55103653446:web:badb2859cb5f0ab098ac47",
    measurementId: "G-HH2T3L5EKW"
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
