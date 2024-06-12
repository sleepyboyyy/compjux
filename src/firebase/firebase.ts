// Firebase imports
import { initializeApp } from 'firebase/app';
// Auth
import {
    getAuth,
    onAuthStateChanged,
    NextOrObserver,
    User
} from 'firebase/auth';
// Firestore
import {
    getFirestore
} from 'firebase/firestore'
// Config
import { getFirebaseConfig } from "./firebase-config";

const app = initializeApp(getFirebaseConfig());
export const projectAuth = getAuth(app);
export const projectFirestore = getFirestore(app);

export const userStateListener = (callback:NextOrObserver<User>) => {
    return onAuthStateChanged(projectAuth, callback);
}
