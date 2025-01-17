// Import the Firebase libraries you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Authentication
import { getStorage } from "firebase/storage"; // Storage
import { getFirestore } from "firebase/firestore"; // Firestore

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBABoFFDDXgtjqVJpYrH1mrumzsDdZjCFA",
  authDomain: "mentorship-851db.firebaseapp.com",
  projectId: "mentorship-851db",
  storageBucket: "mentorship-851db.appspot.com",
  messagingSenderId: "302864406450",
  appId: "1:302864406450:web:b83a4ef27500ab4272f6ab",
  measurementId: "G-J3FNYYXP2W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Products
const auth = getAuth(app); // Authentication
const storage = getStorage(app); // Storage
const db = getFirestore(app); // Firestore

// Export Firebase instances
export { app, auth, storage, db };
