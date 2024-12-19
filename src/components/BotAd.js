import React from "react";
import "../styles/BotAd.css";
import botImage from "../images/bot-image.png";
const BotAdvertisement = () => {
  return (
    <section className="bot-ad">
      <div className="bot-content">
        <h1 className="bot-title">Unlock Your Trading Potential with Our Smart Bot!</h1>
        <p className="bot-description">
        💰 <strong>Designed for trading XAU/USD, US100, US30</strong>  
        <br/>
          🚀 <strong>Proven Success Track Record </strong>
          <br />
          💡 <strong>Easy Setup, No Experience Needed</strong>
          <br />
          📈 <strong>Real-Time Market Analysis</strong>
          <br />
          ⚡ <strong>Lightning-Fast, Secure Trades</strong>
          <br />
          📊 <strong>Risk Management for Consistent Profits</strong>
          <br />
          🔥 <strong>Limited Time Offer: <span class="original-price"><strike>R6,900</strike></span> <span class="discounted-price">R4,500</span></strong>
        </p>
        <button className="cta-button">
            <a   href="https://wa.me/+27810593062" 
            target="_blank" 
            rel="noopener noreferrer">
            </a>
          Request Bot
        </button>
      </div>
      <div className="bot-animation">
        <img src={botImage} alt="Trading Bot" className="bot-image" />
      </div>
    </section>
  );
};

export default BotAdvertisement;
