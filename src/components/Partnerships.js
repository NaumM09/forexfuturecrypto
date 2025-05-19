import React from 'react';
import { motion } from 'framer-motion';
import "../styles/Partnerships.css";
import BingX from "../images/bingx.png";
import Chelsea from "../images/bingx_banner.png";

// Animation variants for consistent animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.7, 
      delay: custom * 0.1,
      ease: "easeOut"
    }
  })
};

// Trust signals data
const trustSignals = [
  {
    icon: "users-icon",
    number: "5M+",
    label: "Users Worldwide"
  },
  {
    icon: "security-badge-icon",
    number: "100%",
    label: "Secure & Regulated"
  },
  {
    icon: "customer-icon",
    number: "24/7",
    label: "Customer Support"
  }
];

// Trust Item Component
const TrustItem = ({ icon, number, label }) => (
  <div className="trust-item">
    <div className={`trust-icon ${icon}`}></div>
    <div className="trust-text">
      <span className="trust-number">{number}</span>
      <span className="trust-label">{label}</span>
    </div>
  </div>
);

// Main BingX Partnership Component - Premium Design
const PartnershipSection = () => {
  // Referral link - could be extracted to an environment variable
  const referralLink = "https://bingx.pro/en/rewards/?ref=BPVD6A";
  
  return (
    <section className="bingx-partnership-section">
      <div className="partnership-container">
        {/* Modern Heading with Gradient Underline */}
        <motion.div 
          className="partnership-header"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          <h2 className="partnership-title">
            Trade Crypto with <span className="highlight">BingX</span>
          </h2>
          <p className="partnership-subtitle">
            Official Crypto Exchange Partner of Chelsea FC
          </p>
          <div className="title-underline"></div>
        </motion.div>
        
        {/* Premium Card Design */}
        <motion.div 
          className="bingx-card"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          {/* Chelsea FC & BingX Header */}
          <div className="bingx-card-header">
            <div className="logos-container">
              <img 
                src={Chelsea}
                alt="BingX Chelsea FC Partnership" 
                className="bingx-logo"
                loading="lazy"
              />
              <div className="logo-divider"></div>
              <img 
                src={BingX}
                alt="BingX Logo" 
                className="chelsea-logo"
                loading="lazy"
              />
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="bingx-card-content">
            <div className="bingx-card-body">
            </div>
            
            <div className="bingx-cta">
              <div className="bonus-badge">
                <div className="badge-content">
                  <span className="bonus-amount">1300+</span>
                  <span className="bonus-text">USDT in Rewards</span>
                </div>
              </div>
              
              <a 
                href={referralLink}
                target="_blank" 
                rel="noopener noreferrer" 
                className="cta-button"
                aria-label="Trade on BingX"
              >
                Trade on BingX
                <svg className="arrow-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
        
        {/* Chelsea Partnership Banner */}
        <motion.div 
          className="chelsea-banner"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
        </motion.div>
        
        {/* Trust Signals */}
        <motion.div 
          className="trust-signals"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          {trustSignals.map((signal, index) => (
            <TrustItem 
              key={index}
              icon={signal.icon}
              number={signal.number}
              label={signal.label}
            />
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default PartnershipSection;