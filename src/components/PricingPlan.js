import React from 'react';
import '../styles/PricingPlan.css'; // Import your CSS for styling

const PricingPlan = () => {
  return (
    <section className="pricing">
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

        {/* Bootcamp Plan */}
        <div className="pricing-card bootcamp">
          <div className="coming-soon-banner">Coming Soon</div>
          <div className="pricing-card-header">
            <h3>Bootcamp</h3>
            <span className="price">R1999</span>
            <p>1 month</p>
          </div>
          <ul>
            <li>Live price action analysis</li>
            <li>Weekly Trade Forecasts</li>
            <li>Access to recordings</li>
            <li>Join Telegram Community</li>
          </ul>
          <button className="btn-select" disabled>
            Not Available
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;


