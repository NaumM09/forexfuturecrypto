import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification
} from "firebase/auth";
import { app } from "../firebase"; // Ensure correct path to your firebase.js

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Global error state

  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

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

  const signUp = async (email, password) => {
    try {
      setError(null); // Reset error
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (err) {
      console.error("Signup error:", err);
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

  const value = {
    currentUser,
    loading,
    login,
    signUp,
    logout,
    resetPassword,
    verifyEmail,
    error, // Expose error for components to display
    clearError: () => setError(null)
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;