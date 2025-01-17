import React from 'react';
import '../styles/Hero.css';
import heroImage from '../images/hero.png';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        {/* Text Column */}
        <div className="text-column">
          <h1 className="hero-title">
            Empower Your Trading Journey
          </h1>
          <p className="hero-tagline">
            Master Forex, Futures, and Crypto with Comprehensive Education
          </p>
          <div className="hero-buttons">
            <a 
              href="https://wa.me/+27810593062" 
              className="cta-btn button" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Get Started
            </a>
            <a 
              href="/Free-Beginners-Content.pdf" 
              className="download-btn button" 
              download
            >
              Download Free Resource
            </a>
          </div>
        </div>

        {/* Image Column */}
        <div className="image-column">
          <img src={heroImage} alt="Trading Education" className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

