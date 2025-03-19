import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  getFirestore 
} from "firebase/firestore";
import { app } from "../firebase"; // Ensure correct path to your firebase.js

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Global error state

  const auth = getAuth(app);
  const db = getFirestore(app);

  // Load user profile from Firestore - only used outside the auth state change
  const loadUserProfile = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        setUserProfile(userDoc.data());
        return userDoc.data();
      } else {
        return null;
      }
    } catch (err) {
      console.error("Error loading user profile:", err);
      return null;
    }
  };

  // Update user profile in Firestore
  const updateUserProfile = async (data) => {
    if (!currentUser) {
      throw new Error("No user is signed in");
    }
    
    try {
      const userDocRef = doc(db, "users", currentUser.uid);
      
      // Check if the profile exists
      const docSnap = await getDoc(userDocRef);
      
      if (docSnap.exists()) {
        // Update existing profile
        await updateDoc(userDocRef, {
          ...data,
          updatedAt: new Date().toISOString(),
          profileComplete: true
        });
      } else {
        // Create new profile
        await setDoc(userDocRef, {
          ...data,
          email: currentUser.email,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isVerified: false,
          profileComplete: true
        });
      }
      
      // Update local state
      setUserProfile(prev => ({
        ...prev,
        ...data,
        profileComplete: true,
        updatedAt: new Date().toISOString()
      }));
      
      // If display name was updated, also update auth profile
      if (data.displayName) {
        await updateProfile(currentUser, { displayName: data.displayName });
      }
      
      return true;
    } catch (err) {
      console.error("Profile update error:", err);
      setError(err.message);
      throw err;
    }
  };

  // Define fetchUserProfile inside useEffect to avoid dependency issues
  useEffect(() => {
    const fetchUserProfileData = async (userId) => {
      try {
        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
          return userDoc.data();
        } else {
          // If no profile exists, create a basic one
          const basicProfile = {
            displayName: currentUser?.displayName || currentUser?.email?.split('@')[0],
            email: currentUser?.email,
            createdAt: new Date().toISOString(),
            isVerified: false,
            profileComplete: false
          };
          
          await setDoc(userDocRef, basicProfile);
          setUserProfile(basicProfile);
          return basicProfile;
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        return null;
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user profile when auth state changes
        await fetchUserProfileData(user.uid);
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, [auth, currentUser, db]);

  const login = async (email, password) => {
    try {
      setError(null); // Reset error
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message);
      throw err;
    }
  };

  const signUp = async (email, password, displayName) => {
    try {
      setError(null); // Reset error
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Set display name if provided
      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }
      
      // Create user profile
      const userDocRef = doc(db, "users", userCredential.user.uid);
      await setDoc(userDocRef, {
        displayName: displayName || email.split('@')[0],
        email,
        createdAt: new Date().toISOString(),
        isVerified: false,
        profileComplete: false
      });
      
      return userCredential.user;
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.message);
      throw err;
    }
  };

  const googleSignIn = async () => {
    try {
      setError(null);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Check if user profile exists and create if not
      const userDocRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(userDocRef);
      
      if (!docSnap.exists()) {
        // Create profile for Google sign-in user
        await setDoc(userDocRef, {
          displayName: result.user.displayName || result.user.email.split('@')[0],
          email: result.user.email,
          photoURL: result.user.photoURL || "",
          createdAt: new Date().toISOString(),
          isVerified: false,
          profileComplete: false
        });
      }
      
      return result.user;
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError(err.message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      setError(null); // Reset error
      await signOut(auth);
    } catch (err) {
      console.error("Logout error:", err);
      setError(err.message);
    }
  };

  const resetPassword = async (email) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      console.error("Password reset error:", err);
      setError(err.message);
      throw err;
    }
  };

  const verifyEmail = async () => {
    try {
      setError(null);
      if (currentUser) {
        await sendEmailVerification(currentUser);
      } else {
        throw new Error("No user is signed in");
      }
    } catch (err) {
      console.error("Email verification error:", err);
      setError(err.message);
      throw err;
    }
  };

  // Admin function to verify a user
  const verifyUser = async (userId) => {
    try {
      const userDocRef = doc(db, "users", userId || currentUser.uid);
      await updateDoc(userDocRef, {
        isVerified: true,
        verifiedAt: new Date().toISOString()
      });
      
      if (userId === currentUser?.uid) {
        setUserProfile(prev => ({ ...prev, isVerified: true }));
      }
      
      return true;
    } catch (err) {
      console.error("User verification error:", err);
      setError(err.message);
      throw err;
    }
  };

  const value = {
    currentUser,
    userProfile,
    loading,
    login,
    signUp,
    googleSignIn,
    logout,
    resetPassword,
    verifyEmail,
    updateUserProfile,
    verifyUser,
    loadUserProfile,
    error, // Expose error for components to display
    clearError: () => setError(null),
    // Computed properties for easier access in components
    isAuthenticated: !!currentUser,
    isVerified: userProfile?.isVerified || false,
    isProfileComplete: userProfile?.profileComplete || false
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;