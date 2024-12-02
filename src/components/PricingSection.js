import React from "react";
import PricingPlan from "./PricingPlan";
import "../styles/PricingSection.css";

const PricingSection = () => {
  const plans = [
    {
      name: "Basic",
      price: 49,
      features: [
        "Access to beginner courses",
        "Weekly group sessions",
        "Email support",
      ],
    },
    {
      name: "Advanced",
      price: 99,
      features: [
        "All beginner features",
        "One-on-one mentorship",
        "Advanced trading strategies",
      ],
    },
    {
      name: "Pro",
      price: 149,
      features: [
        "All advanced features",
        "24/7 support",
        "Live market trading sessions",
      ],
    },
  ];

  return (
    <section className="pricing-section">
      <h2>Choose Your Plan</h2>
      <div className="pricing-wrapper">
        {plans.map((plan, index) => (
          <PricingPlan
            key={index}
            name={plan.name}
            price={plan.price}
            features={plan.features}
          />
        ))}
      </div>
    </section>
  );
};

export default PricingSection;
