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

    try {
      if (isSignUp) {
        // Sign-Up Logic
        if (formData.password !== formData.confirmPassword) {
          throw new Error("Passwords do not match!");
        }
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Save user to Firestore
        const userId = userCredential.user.uid;
        const subscriptionDocRef = doc(db, "subscriptions", userId);
        const subscriptionDoc = await getDoc(subscriptionDocRef);

        if (!subscriptionDoc.exists()) {
          throw new Error(
            "No active subscription found. Please subscribe first."
          );
        }

        await setDoc(doc(db, "users", userId), {
          email: formData.email,
          subscriptionRef: subscriptionDocRef.id,
        });

        alert("Sign-Up Successful!");
        navigate("/dashboard"); // Redirect to dashboard after sign-up
      } else {
        // Login Logic
        const userCredential = await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Check subscription status
        const userId = userCredential.user.uid;
        const subscriptionDoc = await getDoc(doc(db, "subscriptions", userId));

        if (subscriptionDoc.exists()) {
          const subscriptionData = subscriptionDoc.data();
          const expiresAt = subscriptionData.expiresAt.toDate();
          if (expiresAt < new Date()) {
            throw new Error("Your subscription has expired. Please renew.");
          }
          alert("Login Successful!");
          navigate("/dashboard"); // Redirect to dashboard after successful login
        } else {
          throw new Error("No active subscription found. Please subscribe.");
        }
      }
    } catch (err) {
      setError(err.message); // Display error message
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {isSignUp && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit" className="auth-button">
            {isSignUp ? "Sign Up" : "Sign In"}
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
