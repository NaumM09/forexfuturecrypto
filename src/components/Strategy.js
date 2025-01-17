import React from 'react';
import '../styles/Strategy.css'; // CSS for styling

// Import strategy and crypto images
import strategyImage1 from '../images/strategy1.jpg';
import strategyImage2 from '../images/strategy3.png';
import cryptoImage1 from '../images/crypto1.png';


const Strategy = () => {
  const tradingStrategies = [
    {
      title: 'Trendline Strategies',
      description: `Master the art of using trendlines to identify market direction. Learn how to connect key highs and lows for clear, visual trading insights.`,
      features: [
        'Identify key support and resistance levels',
        'Simplify market direction using trendlines',
        'Perfect for beginners',
      ],
      image: strategyImage1,
      link: '/signup',
    },
    {
      title: 'Smart Money Concepts',
      description: `Explore advanced trading techniques like smart money concepts, order blocks, and market structure analysis to refine your strategy.`,
      features: [
        'Understand smart money concepts',
        'Master order blocks and liquidity zones',
        'Gain deeper insights into institutional trading',
      ],
      image: strategyImage2,
      link: '/signup',
    },
  ];

  const cryptoStrategies = [
    {
      title: 'Crypto Trading Bots with AI',
      description: `Leverage AI-powered chatbots like ChatGPT to develop intelligent trading bots that execute trades based on predefined strategies.`,
      features: [
        'Integrate APIs for real-time market analysis',
        'Use ChatGPT for predictive market trend analysis',
        'Create custom strategies tailored to your goals',
      ],
      image: cryptoImage1,
      link: '/signup',
    },
  ];

  return (
    <div>
      {/* Trading Strategies Section */}
      <section className="strategy">
        <h2>Trading Strategies</h2>
        {tradingStrategies.map((strategy, index) => (
          <div key={index} className={`strategy-item ${index % 2 === 0 ? '' : 'reverse'}`}>
            <div className="strategy-content">
              <h3>{strategy.title}</h3>
              <p>{strategy.description}</p>
              <ul>
                {strategy.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <a href={strategy.link} className="strategy-btn">
                Start Course
              </a>
            </div>
            <div className="strategy-image">
              <img src={strategy.image} alt={strategy.title} />
            </div>
          </div>
        ))}
      </section>

      
      {/* Crypto Strategies Section */}
      <section className="crypto-strategies">
        <h2>Comprehensive Crypto Trading Approaches</h2>
        <ul className="crypto-strategy-list">
          {cryptoStrategies.map((strategy, index) => (
            <li key={index} className="crypto-strategy-item">
              <div className="crypto-strategy-image">
                <img src={strategy.image} alt={strategy.title} />
              </div>
              <div className="crypto-strategy-content">
                <h3>{strategy.title}</h3>
                <p>{strategy.description}</p>
                <ul>
                  {strategy.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
                <p className="additional-info">{strategy.additionalInfo}</p>
                <a href={strategy.link} className="strategy-btn">
                  Start Course
                </a>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Strategy;
