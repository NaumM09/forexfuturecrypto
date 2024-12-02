import React from 'react';
import '../styles/WhyChooseUs.css';

const WhyChooseUs = () => {
  return (
    <div className="why-choose-us">
      <h2>Why Choose Us</h2>
      <div className="feature feature-1">
      <h3>Community Meetups</h3>
      <p>
          Meet other traders in your area to network, exchange strategies, and gain new insights in a supportive environment.
        </p>
      </div>
      <div className="feature feature-2">
        <h3>Avoid Quick Rich Schemes</h3>
        <p>
          Don't fall for scams promising "get rich quick" methods. Real trading takes time, dedication, and the right tools. We teach you how to trade consistently and effectively, so you can build a sustainable trading strategy over time.
        </p>
      </div>
      <div className="feature feature-3">
        <h3>24/7 Community Support</h3>
        <p>
          Trading can be a lonely journey. Join a community of like minded individuals where you can share your gains and even your losses.
        </p>
      </div>
    </div>
  );
};

export default WhyChooseUs;

