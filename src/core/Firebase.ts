import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import config from "config";

const app = initializeApp(config.firebaseConfig);

// Auth
export const FirebaseAuth = getAuth(app);
export const GoogleAuth = new GoogleAuthProvider();
export const GithubAuth = new GithubAuthProvider();

// Firestore
export const FirebaseStore = getFirestore(app);
