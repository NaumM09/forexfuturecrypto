import React from 'react';
import '../styles/Footer.css'; // For styling

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <p>&copy; 2024 ForexFutureCrypto. All Rights Reserved.</p>
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
