import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase"; // Import Firebase instances
import { createUserWithEmailAndPassword, sendEmailVerification, deleteUser } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Firestore functions
import "../styles/Auth.css"; // Import CSS for styling

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("The passwords entered do not match. Please try again.");
      return;
    }

    setLoading(true);

    try {
      // Create user account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);
      setSuccessMessage(
        "A verification email has been sent to your email address. Please check your inbox and verify your email before logging in."
      );

      // Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        email,
        name: name.trim(),
        verified: false, // Track verification status
        createdAt: new Date(),
      });

      setLoading(false);
    } catch (err) {
      console.error("Error during signup:", err);

      // Rollback: Delete the created user if signup fails
      if (auth.currentUser) {
        await deleteUser(auth.currentUser).catch((deleteError) =>
          console.error("Failed to delete user after signup error:", deleteError)
        );
      }

      // Handle errors with specific messages
      const errorMessages = {
        "auth/email-already-in-use": "The email address is already in use. Please log in.",
        "auth/weak-password": "The password provided is too weak. Please choose a stronger password.",
        "auth/invalid-email": "The email address provided is not valid. Please try again.",
        "auth/network-request-failed": "Network error. Please check your connection and try again.",
      };

      setError(errorMessages[err.code] || "An unexpected error occurred. Please contact support.");
      setLoading(false);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>

        {/* Display success or error message */}
        {successMessage && <p className="success-message">{successMessage}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <span
            className="password-toggle"
            onClick={handlePasswordToggle}
            role="button"
            aria-label={showPassword ? "Hide Password" : "Show Password"}
          >
            {showPassword ? "Hide" : "Show"} Password
          </span>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <span onClick={() => navigate("/auth")}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
