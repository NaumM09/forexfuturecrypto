import React from 'react';
import '../styles/Service.css';  // Import your CSS for styling

const Service = () => {
  return (
    <section className="services">
      <div className="service-header">
        <h2>Our Trading Mentorship Services</h2>
        <p>Unlock the secrets of Forex, Futures, and Crypto trading with personalized guidance and expert strategies.</p>
      </div>

      <div className="service-cards">
        <div className="service-card">
          <img src="path_to_icon_or_image" alt="One-on-One Coaching" />
          <h3>One-on-One Coaching</h3>
          <p>Get personalized coaching tailored to your trading goals and experience level. Let's work together to reach your full potential.</p>
        </div>

        <div className="service-card">
          <img src="path_to_icon_or_image" alt="Courses" />
          <h3>Comprehensive Courses</h3>
          <p>Master trading with our structured courses covering all aspects of Forex, Futures, and Crypto trading.</p>
        </div>

        <div className="service-card">
          <img src="path_to_icon_or_image" alt="Community Support" />
          <h3>24/7 Community Support</h3>
          <p>Join a vibrant community of traders and get access to real-time insights, strategies, and peer support.</p>
        </div>
      </div>

      <div className="cta">
        <a href="#contact" className="cta-btn">Get Started</a>
      </div>
    </section>
  );
};

export default Service;
