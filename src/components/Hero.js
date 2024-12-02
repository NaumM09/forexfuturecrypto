import React from 'react';
import '../styles/Hero.css';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Unlock Your Trading Potential</h1>
        <p className="tagline">Learn Forex, Futures & Crypto with Expert Guidance</p>
        <a href="#cta" className="cta-btn">Start Your Trading Journey</a>
      </div>
    </section>
  );
};

export default HeroSection;

