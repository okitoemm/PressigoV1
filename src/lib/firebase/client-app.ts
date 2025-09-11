import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "studio-9200686622-9f282",
  appId: "1:233728374686:web:1ab82ba5a6b3eb0df6888f",
  storageBucket: "studio-9200686622-9f282.firebasestorage.app",
  apiKey: "AIzaSyDn0c3JUC0PgAaHsByTcnREUQrCEa_7ktQ",
  authDomain: "studio-9200686622-9f282.firebaseapp.com",
  messagingSenderId: "233728374686",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
