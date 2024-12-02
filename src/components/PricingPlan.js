import React from 'react';
import '../styles/PricingPlan.css';  // Import your CSS for styling

const PricingPlan = () => {
  return (
    <section className="pricing">
       <Helmet>
                <title>Affordable Trading Plans | Start Your Trading Journey Today</title>
                <meta 
                    name="description" 
                    content="Explore our affordable trading mentorship plans. Learn forex, crypto, and meme coin strategies from experts and start your trading journey now." 
                />
            </Helmet>
      <div className="pricing-header">
        <h2>Choose Your Pricing Plan</h2>
        <p>Find the perfect plan for your trading journey. Whether you're just starting or are a seasoned pro, we have the right option for you!</p>
      </div>

      <div className="pricing-cards">
        <div className="pricing-card">
          <div className="pricing-card-header">
            <h3>Basic Plan</h3>
            <span className="price">R1499</span>
            <p>once off</p>
          </div>
          <ul>
            <li>Access to basic trading strategies</li>
            <li>1-on-1 mentorship (limited)</li>
            <li>Join Telegram Community</li>
          </ul>
          <button className="btn-select">Select Plan</button>
        </div>

        <div className="pricing-card featured">
          <div className="pricing-card-header">
            <h3>Pro Plan</h3>
            <span className="price">R2599</span>
            <p>once off</p>
          </div>
          <ul>
            <li>Advanced trading strategies</li>
            <li>3 Months 1-on-1 mentorship</li>
            <li>Join Telegram Community</li>
          </ul>
          <button className="btn-select">Select Plan</button>
        </div>

        <div className="pricing-card">
          <div className="pricing-card-header">
            <h3>Ultimate Plan</h3>
            <span className="price">R6500</span>
            <p>once off</p>
          </div>
          <ul>
            <li>Exclusive advanced strategies</li>
            <li>6 Months VIP mentorship sessions</li>
            <li>Join Telegram Community</li>
            <li>Live Stream</li>
          </ul>
          <button className="btn-select">Select Plan</button>
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;

