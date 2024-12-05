import React from 'react';
import '../styles/AnnouncementBanner.css';


const AnnouncementBanner = () => {
  return (
    <div className="announcement-banner">
      <div className="logo">
        <span className="text">
          Join <strong>FundedNext</strong> today and elevate your trading career! Use our referral link and enjoy exclusive FundedNext benefits.
        </span>
      </div>
      <a
        href="https://fundednext.com/?fpr=mahlatse-naum96"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="cta-btn">Get Funded</button>
      </a>
    </div>
  );
};

export default AnnouncementBanner;
