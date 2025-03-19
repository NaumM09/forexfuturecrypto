// Import the Firebase libraries you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Authentication
import { getStorage } from "firebase/storage"; // Storage
import { getFirestore } from "firebase/firestore"; // Firestore

// Your Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Products
const auth = getAuth(app); // Authentication
const storage = getStorage(app); // Storage
const db = getFirestore(app); // Firestore

// Admin emails configuration
// You can add multiple admin emails to this array
const adminEmails = [
  "globalexpedyte@gmail.com",  // Original admin email
  // Add your current email here
];

// Helper function to check if a user is an admin
const isUserAdmin = (email) => {
  return adminEmails.includes(email);
};

// Export Firebase instances and admin helper
export { app, auth, storage, db, isUserAdmin };