import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import { applyActionCode } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../firebase";
import "../styles/Auth.css";

const VerificationPage = () => {
  const [searchParams] = useSearchParams(); // Get query parameters
  const [verificationStatus, setVerificationStatus] = useState(""); // Verification status message
  const [emailStatus, setEmailStatus] = useState(""); // Email resend status
  const [loading, setLoading] = useState(false); // Button loading state
  const [timeLeft, setTimeLeft] = useState(30); // Countdown timer
  const [emailSent, setEmailSent] = useState(false); // Track if email was sent recently
  
  const { currentUser, verifyEmail, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Email shown to user could come from different sources
  const userEmail = location.state?.email || currentUser?.email || "your email";
  
  // Handle verification link with oobCode
  useEffect(() => {
    const actionCode = searchParams.get("oobCode"); // Get the action code from the URL

    if (actionCode) {
      // We have a verification code, verify the email
      applyActionCode(auth, actionCode)
        .then(() => {
          setVerificationStatus("success");
          // Redirect to login after 3 seconds
          setTimeout(() => navigate("/auth"), 3000);
        })
        .catch((err) => {
          console.error("Error verifying email:", err);
          setVerificationStatus("error");
        });
    } else if (location.state?.email) {
      // We were redirected here after registration
      setVerificationStatus("pending");
    } else {
      // Neither code nor email provided - invalid state
      setVerificationStatus("invalid");
    }
  }, [searchParams, navigate, location.state]);

  // Countdown timer for resending verification email
  useEffect(() => {
    if (emailSent && timeLeft > 0) {
      const timerId = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    } else if (emailSent && timeLeft === 0) {
      setEmailSent(false);
      setTimeLeft(30);
    }
  }, [timeLeft, emailSent]);

  // Handle resend verification email
  const handleResendEmail = async () => {
    if (emailSent) return;
    
    setLoading(true);
    setEmailStatus("");
    
    try {
      if (currentUser) {
        // Use the verifyEmail method from AuthContext
        await verifyEmail();
        setEmailStatus("success");
        setEmailSent(true);
      } else {
        // No user is signed in
        setEmailStatus("no-user");
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
      setEmailStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // Handle redirect to login
  const handleLoginRedirect = async () => {
    try {
      // Log out current user to ensure fresh login
      if (currentUser) {
        await logout();
      }
      navigate('/auth');
    } catch (error) {
      console.error('Logout error:', error);
      navigate('/auth');
    }
  };

  // Render different content based on verification status
  const renderContent = () => {
    switch (verificationStatus) {
      case "success":
        return (
          <>
            <div className="verification-icon success">
              <i className="fas fa-check-circle"></i>
            </div>
            <p className="success-message">
              Your email has been successfully verified! Redirecting to login...
            </p>
          </>
        );
      
      case "error":
        return (
          <>
            <div className="verification-icon error">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <p className="error-message">
              The verification link is invalid or has expired. You can request a new verification email.
            </p>
            {renderResendButton()}
          </>
        );
      
      case "invalid":
        return (
          <>
            <div className="verification-icon error">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <p className="error-message">
              Invalid verification request. Please use the link from your email or request a new verification email.
            </p>
            {renderResendButton()}
          </>
        );
      
      case "pending":
      default:
        return (
          <>
            <div className="verification-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="verification-message">
              <p>
                We've sent a verification email to <strong>{userEmail}</strong>
              </p>
              <p>
                Please check your inbox and click the verification link to complete your registration.
              </p>
            </div>
            {renderEmailStatus()}
            {renderResendButton()}
          </>
        );
    }
  };

  // Render the email status message
  const renderEmailStatus = () => {
    switch (emailStatus) {
      case "success":
        return <p className="success-message">Verification email sent! Check your inbox.</p>;
      case "no-user":
        return <p className="error-message">No user is signed in. Please log in and try again.</p>;
      case "error":
        return <p className="error-message">Failed to send verification email. Please try again later.</p>;
      default:
        return null;
    }
  };

  // Render the resend button with appropriate state
  const renderResendButton = () => {
    return (
      <button 
        onClick={handleResendEmail} 
        disabled={loading || emailSent}
        className="resend-button"
      >
        {loading ? 'Sending...' : emailSent ? `Resend in ${timeLeft}s` : 'Resend Verification Email'}
      </button>
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-form verification-form">
        <h2>Verify Your Email</h2>
        
        {renderContent()}
        
        <div className="verification-actions">
          {verificationStatus !== "success" && (
            <button onClick={handleLoginRedirect} className="login-redirect-button">
              Back to Login
            </button>
          )}
        </div>
        
        <div className="verification-help">
          <p>
            <i className="fas fa-info-circle"></i> If you don't see the email, check your spam folder
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;