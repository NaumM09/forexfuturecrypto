import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import the AuthContext
import { db } from "../firebase"; // Import Firestore instance
import "../styles/Auth.css"; // Import CSS for styling

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState(""); // State for user's name
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // State for error messages
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  const { signUp } = useAuth(); // Get signUp from AuthContext
  const navigate = useNavigate();

  // Get the selected plan from sessionStorage
  const selectedPlan = sessionStorage.getItem("selectedPlan");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      // Create user account
      const userCredential = await signUp(email, password);
      const userId = userCredential.user.uid;

      // Save user data to Firestore
      await db.collection("users").doc(userId).set({
        email,
        name, // Store user's name
        subscriptionRef: selectedPlan, // Store the selected plan
      });

      console.log("User and subscription linked successfully!");
      
      // Redirect to Paystack payment page based on selected plan
      if (selectedPlan === "beginner") {
        window.location.href = "https://paystack.com/pay/gvqh7jn0fw"; // Beginner plan payment link
      } else if (selectedPlan === "pro") {
        window.location.href = "https://paystack.com/pay/o1n28a55tk"; // Pro plan payment link
      } else if (selectedPlan === "bootcamp") {
        // Handle bootcamp redirection if necessary
        alert("Redirecting to bootcamp payment...");
        // Redirect to bootcamp payment link here if needed
      }
    } catch (err) {
      console.error("Error during signup:", err.message);
      setError("An error occurred. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword); // Toggle the password visibility
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Sign Up</h2>

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

          {/* Password visibility toggle */}
          <span className="password-toggle" onClick={handlePasswordToggle}>
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
