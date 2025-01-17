// JustMarketsPopup Component
import React, { useState, useEffect } from "react";
import "../styles/Popup.css"; // CSS file for styling
import JustMarketsLogo from "../images/justmarkets-logo.png"; // Path to JustMarkets logo

export const JustMarketsPopup = () => {
  const [isVisible, setIsVisible] = useState(false); // State to control visibility of the popup

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Show the popup after 10 seconds
    }, 10000);

    return () => clearTimeout(timer); // Cleanup the timer when the component unmounts
  }, []);

  const closePopup = () => {
    setIsVisible(false); // Hide the popup when the close button is clicked
  };

  return (
    isVisible && (
      <div className="popup-overlay">
        <div className="popup-container">
          <button className="popup-close" onClick={closePopup}>
            ✕
          </button>
          <img src={JustMarketsLogo} alt="JustMarkets Logo" className="popup-logo" />
          <h2>Get Started on Your Trading Journey</h2>
          <p>
            Open an account with <span className="highlight">JustMarkets</span> to access your trading bot
            and take your trading experience to the next level. Start trading with advanced tools today.
          </p>
          <a
            href="https://one.justmarkets.link/a/t39z70o8n9" // Replace with your referral link if needed
            target="_blank"
            rel="noopener noreferrer"
            className="popup-button"
          >
            Open an Account
          </a>
        </div>
      </div>
    )
  );
};

export default JustMarketsPopup;
