import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import "../styles/Auth.css";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [oobCode, setOobCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState(""); // Feedback message
  const [loading, setLoading] = useState(false); // Button loading state
  const [isCodeVerified, setIsCodeVerified] = useState(false); // Track code verification

  useEffect(() => {
    const code = searchParams.get("oobCode");
    if (!code) {
      setStatus("Invalid or missing reset password link.");
      console.error("Reset Password Error: Missing oobCode in URL.");
      return;
    }

    setOobCode(code);

    // Verify the reset password code
    verifyPasswordResetCode(auth, code)
      .then(() => {
        setIsCodeVerified(true);
        setStatus("Please enter a new password to reset your account.");
      })
      .catch((err) => {
        console.error("Reset Password Error: Invalid or expired code.", err);
        setStatus("The reset password link is invalid or has expired. Please request a new one.");
        setIsCodeVerified(false);
      });
  }, [searchParams]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setStatus("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);
    try {
      // Confirm the password reset
      await confirmPasswordReset(auth, oobCode, newPassword);
      setStatus("Password reset successful! Redirecting to login...");
      setTimeout(() => navigate("/auth"), 3000); // Redirect after 3 seconds
    } catch (err) {
      console.error("Error resetting password:", err);
      setStatus("An error occurred while resetting your password. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Reset Password</h2>
        {status && <p className="status-message">{status}</p>}
        {isCodeVerified ? (
          <form onSubmit={handlePasswordReset}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </form>
        ) : (
          <p className="status-message">Please check your reset link or request a new one.</p>
        )}
        <p className="back-to-login" onClick={() => navigate("/auth")}>
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
