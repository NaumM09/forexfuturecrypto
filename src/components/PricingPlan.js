import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PricingPlan.css";

const PricingPlan = () => {
  const navigate = useNavigate();

  // Function to convert USD to ZAR (South African Rand)
  const convertToRands = (amountUSD) => {
    const exchangeRate = 18.5; // Example USD to ZAR exchange rate
    return Math.round(amountUSD * exchangeRate);
  };

  const handlePlanSelection = (plan) => {
    // Save the selected plan in sessionStorage
    sessionStorage.setItem("selectedPlan", plan);

    // Redirect to sign up page
    navigate("/signup"); // Direct to signup page after selecting plan
  };

  return (
    <section className="pricing">
      <div className="pricing-header">
        <h2>Choose Your Plan</h2>
        <p>Select the best plan for your trading journey.</p>
      </div>

      <div className="pricing-cards">
        <div className="pricing-card">
          <h3>Beginners Plan</h3>
          <p>R{convertToRands(10)} / month</p>
          <ul>
            <li>Introduction to trading</li>
            <li>Access to beginner strategies</li>
            <li>Join our trading community</li>
          </ul>
          <button onClick={() => handlePlanSelection("beginner")}>
            Subscribe Now
          </button>
        </div>

        <div className="pricing-card featured">
          <h3>Pro Plan</h3>
          <p>R{convertToRands(25)} / month</p>
          <ul>
            <li>Advanced trading strategies</li>
            <li>Exclusive signals</li>
            <li>One-on-one mentorship</li>
            <li>Live trading sessions</li>
          </ul>
          <button onClick={() => handlePlanSelection("pro")}>
            Subscribe Now
          </button>
        </div>

        <div className="pricing-card bootcamp">
          <h3>Bootcamp</h3>
          <p>R{convertToRands(2.7)} (One-time)</p>
          <ul>
            <li>Live price action analysis</li>
            <li>Trade forecasts</li>
            <li>Exclusive recordings</li>
          </ul>
          <button onClick={() => handlePlanSelection("bootcamp")}>
            Register Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;
