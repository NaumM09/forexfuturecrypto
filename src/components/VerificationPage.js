import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { applyActionCode, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase";
import "../styles/Auth.css";

const VerificationPage = () => {
  const [searchParams] = useSearchParams(); // Get query parameters
  const [status, setStatus] = useState(""); // Message to display
  const [loading, setLoading] = useState(false); // Button loading state
  const [resentStatus, setResentStatus] = useState(""); // Message for resending email
  const navigate = useNavigate();

  useEffect(() => {
    const actionCode = searchParams.get("oobCode"); // Get the action code from the URL

    if (!actionCode) {
      setStatus("Invalid or missing verification link.");
      return;
    }

    // Verify the email address using the action code
    applyActionCode(auth, actionCode)
      .then(() => {
        setStatus("Your email has been successfully verified! Redirecting to login...");
        setTimeout(() => navigate("/auth"), 3000); // Redirect to login after 3 seconds
      })
      .catch((err) => {
        console.error("Error verifying email:", err);
        setStatus("The verification link is invalid or has expired. You can resend the verification email.");
      });
  }, [searchParams, navigate]);

  const handleResendEmail = async () => {
    setLoading(true);
    setResentStatus(""); // Clear previous messages

    try {
      const user = auth.currentUser; // Get the current user
      if (!user) {
        setResentStatus("No user is signed in. Please log in and try again.");
        setLoading(false);
        return;
      }

      await sendEmailVerification(user); // Resend the email
      setResentStatus("A new verification email has been sent. Please check your inbox.");
    } catch (err) {
      console.error("Error resending verification email:", err);
      setResentStatus("Failed to resend verification email. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Email Verification</h2>
        {status && <p className="status-message">{status}</p>}
        {resentStatus && <p className="status-message">{resentStatus}</p>}
        <button
          onClick={handleResendEmail}
          className="auth-button"
          disabled={loading}
        >
          {loading ? "Resending..." : "Resend Verification Email"}
        </button>
        <p className="back-to-login" onClick={() => navigate("/auth")}>
          Back to Login
        </p>
      </div>
    </div>
  );
};

export default VerificationPage;
