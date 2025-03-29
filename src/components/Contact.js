import React from 'react';
import { FaDiscord, FaUsers, FaChartLine, FaLightbulb, FaFemale } from 'react-icons/fa';
import '../styles/Contact.css';

const Contact = () => {
  return (
    <section className="community-section">
      <div className="community-container">
        <div className="community-header">
          <h2 className="community-title">
            Join Our <span className="highlight">Trading Community</span>
          </h2>
          <p className="community-description">
            Connect with like-minded traders, share insights, and grow together in our supportive community.
          </p>
        </div>

        <div className="community-cards">
          {/* Main Discord Community Card */}
          <div className="community-card discord-card">
            <div className="card-icon">
              <FaDiscord />
            </div>
            <h3>Trading Discord Community</h3>
            <p>Join thousands of traders worldwide sharing strategies, market analysis, and trading opportunities in real-time.</p>
            <ul className="community-benefits">
              <li><FaUsers className="benefit-icon" /> <span>24/7 active trading chat</span></li>
              <li><FaChartLine className="benefit-icon" /> <span>Daily market analysis</span></li>
              <li><FaLightbulb className="benefit-icon" /> <span>Strategy sharing sessions</span></li>
            </ul>
            <a href="https://discord.gg/bfznewv9" target="_blank" rel="noopener noreferrer" className="discord-btn">
              Join Our Discord
            </a>
          </div>

          {/* Female Traders Community Card */}
          <div className="community-card female-traders-card">
            <div className="card-header">
              <span className="special-badge">Women in Trading</span>
            </div>
            <h3>Female Forex Traders Network</h3>
            <p>A dedicated space for women in the forex trading industry to connect, collaborate, and empower each other.</p>
            <div className="female-traders-features">
              <div className="feature">
                <FaFemale className="feature-icon" />
                <span>Women-led trading sessions</span>
              </div>
              <div className="feature">
                <FaFemale className="feature-icon" />
                <span>Mentorship opportunities</span>
              </div>
              <div className="feature">
                <FaFemale className="feature-icon" />
                <span>Support network</span>
              </div>
            </div>
            <a href="https://wa.me/+27810593062" target="_blank" rel="noopener noreferrer" className="female-traders-btn">
              Join Female Traders Network
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;