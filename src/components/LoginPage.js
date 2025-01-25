import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import the AuthContext
import { sendPasswordResetEmail } from "firebase/auth"; // Import password reset method
import { auth } from "../firebase"; // Firebase instance
import "../styles/Auth.css"; // Import CSS for styling

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetStatus, setResetStatus] = useState(""); // State for reset password status
  const [showReset, setShowReset] = useState(false); // Toggle between login and reset

  const { login, error } = useAuth(); // Get login and error from AuthContext
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } catch {
      // Error handled via the AuthContext error state
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setResetStatus("Please provide your email to reset your password.");
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setResetStatus(
        "A password reset link has been sent to your email. Please check your inbox."
      );
      setEmail(""); // Clear email field after successful operation
    } catch (err) {
      console.error("Error sending password reset email:", err);
      setResetStatus(
        "Unable to send the reset email. Please check your email or try again later."
      );
    } finally {
      setLoading(false);
      // Clear the reset status message after 5 seconds
      setTimeout(() => setResetStatus(""), 5000);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>{showReset ? "Reset Password" : "Login"}</h2>
        {resetStatus && <p className="reset-status">{resetStatus}</p>}
        {error && !showReset && (
          <p className="error-message">
            Incorrect email or password. Please try again.
          </p>
        )}

        <form onSubmit={showReset ? handlePasswordReset : handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {!showReset && (
            <div className="password-container">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide Password" : "Show Password"}
              </span>
            </div>
          )}
          <button type="submit" className="auth-button" disabled={loading}>
            {loading
              ? "Processing..."
              : showReset
              ? "Send Reset Link"
              : "Login"}
          </button>
        </form>
        {!showReset && (
          <p className="forgot-password" onClick={() => setShowReset(true)}>
            Forgot Password?
          </p>
        )}
        {showReset && (
          <p className="forgot-password" onClick={() => setShowReset(false)}>
            Back to Login
          </p>
        )}
        {!showReset && (
          <p>
            Don't have an account?{" "}
            <span onClick={() => navigate("/signup")}>Sign Up</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
