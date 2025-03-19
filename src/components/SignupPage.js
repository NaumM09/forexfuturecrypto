import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import the enhanced AuthContext
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

  const { signUp, googleSignIn, verifyEmail, error: authError, isAuthenticated, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from location state or default to homepage
  const from = location.state?.from || "/";

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
    // Clear any previous errors when component mounts
    return () => clearError();
  }, [isAuthenticated, navigate, from, clearError]);

  // Update local error state when auth error changes
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

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
      // Create user account with the enhanced signUp method
      await signUp(email, password, name.trim());
      
      // Send email verification
      await verifyEmail();
      
      setSuccessMessage(
        "A verification email has been sent to your email address. Please check your inbox and verify your email before logging in."
      );
      
      // Redirect to verification page or wait on this page
      setTimeout(() => {
        navigate("/verify-email", { state: { email } });
      }, 3000);
      
    } catch (err) {
      console.error("Error during signup:", err);
      
      // Handle errors with specific messages
      const errorMessages = {
        "auth/email-already-in-use": "The email address is already in use. Please log in.",
        "auth/weak-password": "The password provided is too weak. Please choose a stronger password.",
        "auth/invalid-email": "The email address provided is not valid. Please try again.",
        "auth/network-request-failed": "Network error. Please check your connection and try again.",
      };

      setError(errorMessages[err.code] || "An unexpected error occurred. Please contact support.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await googleSignIn();
      // User will be redirected by the useEffect
    } catch (err) {
      console.error("Google sign-in error:", err);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
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

        <button 
          type="button" 
          className="google-auth-button" 
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <i className="fab fa-google"></i> Continue with Google
        </button>

        <div className="auth-divider"><span>OR</span></div>

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
          <div className="password-container">
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
              className="toggle-password"
              onClick={handlePasswordToggle}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </span>
          </div>

          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/auth")}>Login</span>
        </p>
        
        {location.state?.from && (
          <p className="return-notice">
            <i className="fas fa-info-circle"></i> You'll be redirected to {location.state.from.replace('/', '')} after signup
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupPage;