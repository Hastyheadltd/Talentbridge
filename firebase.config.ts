import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Access environment variables
const firebaseConfig = {
  apiKey: "AIzaSyCT0VoLMLiuT5A2MIx9_C10EtaYH-_dQYM",
  authDomain: "flixrecruit.firebaseapp.com",
  projectId: "flixrecruit",
  storageBucket: "flixrecruit.firebasestorage.app",
  messagingSenderId: "773533963782",
  appId: "1:773533963782:web:d6d4b1214bec1176861587",
  measurementId: "G-E4BJ3WSL0E"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage, db };
