import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/Strategy.css';  // Import the CSS for styling

// Import images for strategy icons
import trendlineIcon from '../images/strategy2.png';
import ictIcon from '../images/strategy3.jpg';
import scalpingIcon from '../images/strategy1.jpg';
import priceActionIcon from '../images/strategy4.jpg';

const Strategy = () => {
  return (
    <section className="strategy">
       <Helmet>
                <title>Proven Trading Strategies for Success | Learn Forex, Crypto, and Meme Coin Techniques</title>
                <meta 
                    name="description" 
                    content="Discover proven trading strategies for forex, crypto, and meme coins. Our expert mentorship teaches you the techniques to succeed in today's markets." 
                />
            </Helmet>
      <div className="strategy-header">
        <h2>Trading Strategies for Every Trader</h2>
        <p>From trendline strategies to advanced ICT methods, we help you find the method that suits your time and trading needs.</p>
      </div>

      <div className="strategy-cards">
        <div className="strategy-card">
          <img src={trendlineIcon} alt="Trendline Strategies" className="strategy-icon" />
          <h3>Trendline Strategies</h3>
          <p>Trendline strategies focus on identifying the market's direction by drawing lines that connect key highs and lows. It's simple, effective, and perfect for traders looking for clear, visual indicators.</p>
        </div>

        <div className="strategy-card">
          <img src={ictIcon} alt="ICT Strategies" className="strategy-icon" />
          <h3>ICT Strategies</h3>
          <p>ICT (Inner Circle Trader) strategies are a more advanced method, incorporating smart money concepts, order blocks, and market structure analysis. Ideal for traders who want to understand the deeper movements of the market.</p>
        </div>

        <div className="strategy-card">
          <img src={scalpingIcon} alt="Scalping" className="strategy-icon" />
          <h3>Scalping</h3>
          <p>Scalping focuses on quick trades for small profits. If you're looking for a fast-paced approach with high frequency, this might be your go-to method for quick results and less market exposure.</p>
        </div>

        <div className="strategy-card">
          <img src={priceActionIcon} alt="Price Action" className="strategy-icon" />
          <h3>Price Action</h3>
          <p>Price action trading eliminates reliance on indicators, focusing solely on reading the market's natural movements. A great choice for traders who prefer a pure, hands-on approach without relying on extra tools.</p>
        </div>
      </div>
    </section>
  );
};

export default Strategy;

