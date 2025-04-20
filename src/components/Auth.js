import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../firebase"; // Import Firebase auth and Firestore
import { doc, getDoc, setDoc } from "firebase/firestore"; // Firestore operations
import "../styles/Auth.css";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError("");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        // Sign-Up Logic
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match!");
        }
        
        // First create the user account
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        const userId = userCredential.user.uid;
        
        // Create a basic user profile in Firestore
        await setDoc(doc(db, "users", userId), {
          email: formData.email,
          createdAt: new Date(),
          displayName: formData.email.split('@')[0], // Simple default display name
          hasActiveSubscription: false // Users start without subscription
        });

        // Navigate to subscription page or dashboard
        navigate("/subscription"); // Create a subscription page to direct users to subscribe
      } else {
        // Login Logic
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Successfully logged in - check if they have subscription
        const userId = userCredential.user.uid;
        const userDoc = await getDoc(doc(db, "users", userId));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          // Optional: Check subscription status
          if (userData.hasActiveSubscription) {
            // User has an active subscription
            navigate("/dashboard");
          } else {
            // User does not have an active subscription
            navigate("/subscription");
          }
        } else {
          // User record doesn't exist in Firestore (unlikely but possible)
          await setDoc(doc(db, "users", userId), {
            email: formData.email,
            createdAt: new Date(),
            hasActiveSubscription: false
          });
          navigate("/subscription");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      
      // Provide user-friendly error messages
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered. Please sign in instead.");
      } else if (err.code === 'auth/invalid-email') {
        setError("Please enter a valid email address.");
      } else if (err.code === 'auth/weak-password') {
        setError("Password should be at least 6 characters.");
      } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError("Invalid email or password.");
      } else {
        setError(err.message || "An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : (isSignUp ? "Sign Up" : "Sign In")}
          </button>
        </form>
        <p onClick={toggleForm} className="toggle-form">
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </p>
      </div>
    </div>
  );
};

export default Auth;