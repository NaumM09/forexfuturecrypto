import React from 'react';
import { FaTiktok, FaInstagram, FaTwitter } from 'react-icons/fa'; // Importing Facebook icon
import '../styles/Footer.css'; // For styling

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <p>&copy; 2025 ForexFutureCrypto. All Rights Reserved.</p>
        <div className="social-icons">
          <a
            href="https://www.tiktok.com/@fxfuturescrypto" 
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaTiktok className="social-icon" />
          </a>
          <a
            href="https://www.instagram.com/fxfuturescrypto/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaInstagram className="social-icon" />
          </a>
          <a
            href="https://x.com/FXFuturesCrypto"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FaTwitter className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
