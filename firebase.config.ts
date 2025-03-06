import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Access environment variables
const firebaseConfig = {
  apiKey: "AIzaSyCv-k_I3wqihg91jA7cKDqeqwO5q2nlb04",
  authDomain: "talentbridge-99.firebaseapp.com",
  projectId: "talentbridge-99",
  storageBucket: "talentbridge-99.firebasestorage.app",
  messagingSenderId: "962923159662",
  appId: "1:962923159662:web:032e0d35309ede6c48467f",
  measurementId: "G-RRX63TDEBW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, storage, db };
