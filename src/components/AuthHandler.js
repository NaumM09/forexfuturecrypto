import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { applyActionCode, verifyPasswordResetCode } from "firebase/auth";

const AuthHandler = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Processing...");

  const mode = searchParams.get("mode"); // Action mode: resetPassword, verifyEmail, etc.
  const oobCode = searchParams.get("oobCode"); // One-time action code

  const handlePasswordReset = useCallback(async () => {
    try {
      await verifyPasswordResetCode(auth, oobCode);
      navigate(`/reset-password?oobCode=${oobCode}`);
    } catch (err) {
      console.error("Error verifying password reset code:", err);
      setStatus("The password reset link is invalid or expired.");
    }
  }, [navigate, oobCode]);

  const handleEmailVerification = useCallback(async () => {
    try {
      await applyActionCode(auth, oobCode);
      setStatus("Email successfully verified! Redirecting to login...");
      setTimeout(() => navigate("/auth"), 3000);
    } catch (err) {
      console.error("Error verifying email:", err.message);
      setStatus(
        "The email verification link is invalid or expired. Please request a new one."
      );
    }
  }, [navigate, oobCode]);

  useEffect(() => {
    console.log("Mode:", mode);
    console.log("OOB Code:", oobCode);

    if (!mode || !oobCode) {
      setStatus("Invalid or missing action parameters.");
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
        setTimeout(() => navigate("/auth"), 3000);
        break;
    }
  }, [mode, oobCode, navigate, handlePasswordReset, handleEmailVerification]);

  return <div>{status}</div>;
};

export default AuthHandler;
