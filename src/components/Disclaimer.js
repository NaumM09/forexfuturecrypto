import React from 'react';
import '../styles/Disclaimer.css';  // Import the CSS for styling

const Disclaimer = () => {
  return (
    <section className="disclaimer">
      <div className="disclaimer-content">
        <h2>Disclaimer</h2>
        <p>As part of the new regulations under the South African FSCA (Financial Sector Conduct Authority), we are not licensed to provide signal services or financial advice. We do not offer financial advice but instead provide tools, strategies, and mentorship to help individuals make informed decisions and develop the skills necessary for profitability in the Forex market.</p>
        <p>Our goal is to equip you with the knowledge and skills to make better trading decisions, but we do not guarantee profits. Please remember that trading involves significant risk, and it is important to be aware of your financial situation before engaging in any trading activities.</p>
      </div>
    </section>
  );
};

export default Disclaimer;
