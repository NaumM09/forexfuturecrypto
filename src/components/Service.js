import React from 'react';
import '../styles/Service.css';  // Import your styling file
import forexImage from '../images/forex.jpg';
import futuresImage from '../images/futures.jpg';
import cryptoImage from '../images/crypto.jpg';

const Services = () => {
  return (
    <section className="service">
      <div className="service-header">
        <h2>Our Services</h2>
        <p>We offer a range of services designed to help you succeed in Forex, Futures, and Crypto trading. Our strategies are tailored to meet your unique needs and goals.</p>
      </div>

      <div className="service-grid">
        <div className="service-item">
          <div className="service-image">
            <img src={forexImage} alt="Forex Trading" />
          </div>
          <div className="service-content">
            <h3>Forex Trading</h3>
            <p>Our Forex trading service offers personalized strategies and expert analysis to help you navigate the global currency markets. Whether you’re new to trading or an experienced investor, we’ll help you make informed decisions with up-to-date insights and risk management strategies.</p>
          </div>
        </div>
        
        <div className="service-item">
          <div className="service-image">
            <img src={futuresImage} alt="Futures Trading" />
          </div>
          <div className="service-content">
            <h3>Futures Trading</h3>
            <p>Futures trading can be complex, but we make it easy. Our services provide you with advanced strategies and techniques to trade commodities, indices, and other assets. Learn how to predict market trends and hedge against risk with expert guidance and analysis.</p>
          </div>
        </div>
        
        <div className="service-item">
          <div className="service-image">
            <img src={cryptoImage} alt="Crypto Trading" />
          </div>
          <div className="service-content">
            <h3>Crypto Trading</h3>
            <p>The world of cryptocurrencies is ever-evolving. Our Crypto trading service equips you with the knowledge to navigate the volatile crypto markets. From Bitcoin to Altcoins, we offer the tools and insights you need to make confident, informed decisions in your crypto investments.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
