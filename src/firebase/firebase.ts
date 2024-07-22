// Firebase imports
import { initializeApp } from 'firebase/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
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
import firebase from "firebase/compat/app";
import Timestamp = firebase.firestore.Timestamp;

const app = initializeApp(getFirebaseConfig());
export const projectAuth = getAuth(app);
export const projectFirestore = getFirestore(app);
export const timestamp = Timestamp;

export const userStateListener = (callback:NextOrObserver<User>) => {
    return onAuthStateChanged(projectAuth, callback);
}
