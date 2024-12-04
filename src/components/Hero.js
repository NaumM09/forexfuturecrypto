import React from 'react';
import '../styles/Hero.css';
import heroImage from '../images/hero.png'

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="text-column">
          <h1 className="hero-title">Unlock Your Trading Potential</h1>
          <p className="hero-tagline">Learn Forex, Futures & Crypto with Expert Guidance</p>
          <a href="#cta" className="cta-btn">Start Your Trading Journey</a>
        </div>
        <div className="image-column">
          <img src={heroImage} alt="Trading" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


