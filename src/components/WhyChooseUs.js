import React from 'react';
import '../styles/WhyChooseUs.css';
import { FaHandshake, FaShieldAlt, FaUsers } from 'react-icons/fa'; // Import icons from react-icons

const WhyChooseUs = () => {
  return (
    <div className="why-choose-us">
      <h2>Why Choose Us</h2>
      <div className="features">
        <div className="feature">
          <FaHandshake className="feature-icon" />
          <h3>Community Meetups</h3>
          <p>
            Connect with other traders in your area to exchange strategies, network, and grow in a supportive environment.
          </p>
        </div>
        <div className="feature">
          <FaShieldAlt className="feature-icon" />
          <h3>Avoid Quick Rich Schemes</h3>
          <p>
            Learn sustainable trading strategies that focus on consistency over time instead of unrealistic promises.
          </p>
        </div>
        <div className="feature">
          <FaUsers className="feature-icon" />
          <h3>24/7 Community Support</h3>
          <p>
            Join a community of like-minded traders where you can share your wins, learn from losses, and grow together.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;



