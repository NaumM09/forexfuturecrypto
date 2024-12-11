import React from 'react';
import '../styles/Hero.css';
import heroImage from '../images/hero.png';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="text-column">
          <h1 className="hero-title">Unlock Your Trading Potential</h1>
          <p className="hero-tagline">Learn Forex, Futures & Crypto with Expert Guidance</p>
          <a 
            href="https://wa.me/+27810593062" 
            className="cta-btn button" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Get Started
          </a>
          {/* Download Button */}
          <a 
            href="/Free-Beginners-Content.pdf" 
            className="download-btn button" 
            download
          >
            Download Free Resource
          </a>
        </div>
        <div className="image-column">
          <img src={heroImage} alt="Trading" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;



