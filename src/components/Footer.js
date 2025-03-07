import React from 'react';
import { FaTiktok, FaInstagram, FaTwitter, FaTelegram } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h3 className="footer-logo">ForexFuturesCrypto</h3>
            <p className="footer-tagline">Empowering traders across Africa</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/community">Community</a></li>
                <li><a href="/challenges">Challenges</a></li>
                <li><a href="/resources">Resources</a></li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h4>Legal</h4>
              <ul>
                <li><a href="/disclaimer">Disclaimer</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="footer-social">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <a
                href="https://www.tiktok.com/@fxfuturescrypto" 
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
              <a
                href="https://www.instagram.com/fxfuturescrypto/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://x.com/FXFuturesCrypto"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a
                href="https://t.me/forexfuturescryptofree"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link telegram"
                aria-label="Telegram"
              >
                <FaTelegram />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} ForexFuturesCrypto. All Rights Reserved.</p>
          <p className="footer-disclaimer">
            Trading involves significant risk. Past performance is not indicative of future results.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;