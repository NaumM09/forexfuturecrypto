import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Disclaimer.css';

const Disclaimer = () => {
  return (
    <section className="disclaimer-section">
      <div className="disclaimer-container">
        <motion.div 
          className="disclaimer-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="disclaimer-header">
            <div className="disclaimer-icon">⚠️</div>
            <h2>Important Disclaimer</h2>
          </div>
          
          <div className="disclaimer-body">
            <p>
              As part of the new regulations under the South African FSCA (Financial Sector Conduct Authority), 
              we are not licensed to provide signal services or financial advice. We do not offer financial 
              advice but instead provide tools, strategies, and mentorship to help individuals make informed 
              decisions and develop the skills necessary for profitability in the Forex market.
            </p>
            
            <p>
              Our goal is to equip you with the knowledge and skills to make better trading decisions, 
              but we do not guarantee profits. Please remember that trading involves significant risk, 
              and it is important to be aware of your financial situation before engaging in any trading activities.
            </p>
            
            <div className="risk-warning">
              <div className="warning-title">Risk Warning</div>
              <div className="warning-text">
                Trading foreign exchange, futures, and other financial instruments carries a high level of risk 
                and may not be suitable for all investors. Before deciding to trade, you should carefully consider 
                your investment objectives, level of experience, and risk appetite. The possibility exists that you 
                could sustain a loss of some or all of your initial investment and therefore you should not invest 
                money that you cannot afford to lose.
              </div>
            </div>
          </div>
          
          <div className="disclaimer-footer">
            <div className="acceptance-text">
              By using our website and services, you acknowledge that you have read, 
              understood, and agree to be bound by this disclaimer.
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Disclaimer;