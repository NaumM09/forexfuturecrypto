import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { applyActionCode, verifyPasswordResetCode } from "firebase/auth";
import "../styles/Auth.css";

const AuthHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Processing...");
  const [statusType, setStatusType] = useState("loading"); // loading, success, error

  const mode = searchParams.get("mode"); // Action mode: resetPassword, verifyEmail, etc.
  const oobCode = searchParams.get("oobCode"); // One-time action code

  const handlePasswordReset = useCallback(async () => {
    try {
      await verifyPasswordResetCode(auth, oobCode);
      navigate(`/reset-password?oobCode=${oobCode}`);
    } catch (err) {
      console.error("Error verifying password reset code:", err);
      setStatus("The password reset link is invalid or expired.");
      setStatusType("error");
    }
  }, [navigate, oobCode]);

  const handleEmailVerification = useCallback(async () => {
    try {
      await applyActionCode(auth, oobCode);
      setStatus("Email successfully verified! Redirecting to login...");
      setStatusType("success");
      setTimeout(() => navigate("/auth"), 3000);
    } catch (err) {
      console.error("Error verifying email:", err.message);
      setStatus(
        "The email verification link is invalid or expired. Please request a new one."
      );
      setStatusType("error");
    }
  }, [navigate, oobCode]);

  useEffect(() => {
    if (!mode || !oobCode) {
      setStatus("Invalid or missing action parameters.");
      setStatusType("error");
      return;
    }

    switch (mode) {
      case "resetPassword":
        handlePasswordReset();
        break;
      case "verifyEmail":
        handleEmailVerification();
        break;
      default:
        setStatus("Unknown action. Redirecting...");
        setStatusType("error");
        setTimeout(() => navigate("/auth"), 3000);
        break;
    }
  }, [mode, oobCode, navigate, handlePasswordReset, handleEmailVerification]);

  return (
    <div className="auth-container">
      <div className="auth-form verification-form">
        <h2>Account Action</h2>
        
        <div className={`verification-icon ${statusType}`}>
          {statusType === "loading" && <i className="fas fa-spinner fa-spin"></i>}
          {statusType === "success" && <i className="fas fa-check-circle"></i>}
          {statusType === "error" && <i className="fas fa-exclamation-circle"></i>}
        </div>
        
        <div className={`${statusType}-message`}>
          {status}
        </div>
        
        {statusType === "error" && (
          <button 
            onClick={() => navigate("/auth")} 
            className="auth-button"
          >
            Back to Login
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthHandler;