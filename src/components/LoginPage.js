import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import the AuthContext
import "../styles/Auth.css"; // Import CSS for styling

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, error } = useAuth(); // Get login and error from AuthContext
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
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

  const getFriendlyErrorMessage = (firebaseError) => {
    if (firebaseError.includes("auth/user-not-found")) {
      return "No account found with this email. Please sign up.";
    } else if (firebaseError.includes("auth/wrong-password")) {
      return "Incorrect password. Please try again.";
    } else if (firebaseError.includes("auth/too-many-requests")) {
      return "Too many login attempts. Please try again later.";
    } else {
      return "An error occurred during login. Please try again.";
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Login</h2>
        {error && <p className="error-message">{getFriendlyErrorMessage(error)}</p>}
        <form onSubmit={handleSubmit}>
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
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide Password" : "Show Password"}
            </span>
          </div>
          <button type="submit" className="auth-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <p>
          Don't have an account? <span onClick={() => navigate("/signup")}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
