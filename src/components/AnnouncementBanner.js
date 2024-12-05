import React, { useState } from 'react';
import '../styles/AnnouncementBanner.css'; // Ensure this file includes the styles below

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showUndo, setShowUndo] = useState(false);

  // When the banner is collapsed
  const handleToggle = () => {
    setIsVisible(false);
    setShowUndo(true);

    // Hide the "Undo" button after 5 seconds
    setTimeout(() => {
      setShowUndo(false);
    }, 5000);  // 5 seconds to undo the collapse
  };

  // When the "Undo" button is clicked
  const handleUndo = () => {
    setIsVisible(true);
    setShowUndo(false);
  };

  return (
    <>
      {isVisible && (
        <div className="announcement-banner">
          <div className="content">
            <div className="logo">
              <span>Join FundedNext today and elevate your trading career! Use our referral link and enjoy exclusive benefits.</span>
            </div>
            <a
              href="https://fundednext.com/?fpr=mahlatse-naum96"
              className="cta-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Started
            </a>
          </div>
          <button className="close-btn" onClick={handleToggle} aria-label="Close Announcement">
            &times;
          </button>
        </div>
      )}

      {/* Show Undo button for 5 seconds */}
      {showUndo && (
        <div className="undo-container">
          <button className="undo-btn" onClick={handleUndo}>Undo</button>
        </div>
      )}
    </>
  );
};

export default AnnouncementBanner;
