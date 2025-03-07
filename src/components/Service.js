import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Service.css';

// Sample data for trending discussions
const trendingTopics = [
  {
    id: 1,
    title: "Gold's price action following Fed announcement",
    category: "Market Analysis",
    participants: 42,
    latestUpdate: "15 minutes ago",
    tags: ["Gold", "XAU", "Fed", "Interest Rates"]
  },
  {
    id: 2,
    title: "EURUSD technical breakdown ahead of ECB meeting",
    category: "Technical Analysis",
    participants: 28,
    latestUpdate: "2 hours ago",
    tags: ["Forex", "EUR", "ECB", "Technicals"]
  },
  {
    id: 3,
    title: "Bitcoin's support levels after recent pullback",
    category: "Crypto Analysis",
    participants: 53,
    latestUpdate: "1 hour ago",
    tags: ["Bitcoin", "BTC", "Crypto", "Support"]
  },
  {
    id: 4,
    title: "Oil market outlook amid geopolitical tensions",
    category: "Fundamental Analysis",
    participants: 31,
    latestUpdate: "4 hours ago",
    tags: ["Oil", "WTI", "Brent", "Geopolitics"]
  }
];

// Sample data for market insights
const marketInsights = [
  {
    id: 1,
    title: "Weekly Forex Outlook",
    description: "Key levels and potential setups for major currency pairs in the coming week.",
    author: "FX Team",
    postedDate: "Yesterday",
    readTime: "5 min read",
    imageUrl: "https://placehold.co/600x400/111827/00cc99?text=Forex+Outlook"
  },
  {
    id: 2,
    title: "Crypto Market Analysis",
    description: "Bitcoin, Ethereum, and altcoin market analysis with potential price targets.",
    author: "Crypto Desk",
    postedDate: "2 days ago",
    readTime: "6 min read",
    imageUrl: "https://placehold.co/600x400/111827/0066cc?text=Crypto+Analysis"
  },
  {
    id: 3,
    title: "Commodity Price Action",
    description: "Gold, silver, and oil price action analysis with technical levels to watch.",
    author: "Commodity Team",
    postedDate: "3 days ago",
    readTime: "4 min read",
    imageUrl: "https://placehold.co/600x400/111827/cc6600?text=Commodities"
  }
];

// Components
const CategoryBadge = ({ category }) => {
  // Set colors based on category
  const getCategoryColor = (category) => {
    switch(category) {
      case "Market Analysis":
        return { bg: "rgba(0, 204, 153, 0.15)", text: "#00cc99" };
      case "Technical Analysis":
        return { bg: "rgba(0, 102, 204, 0.15)", text: "#0066cc" };
      case "Fundamental Analysis":
        return { bg: "rgba(204, 102, 0, 0.15)", text: "#cc6600" };
      case "Crypto Analysis":
        return { bg: "rgba(247, 147, 26, 0.15)", text: "#f7931a" };
      default:
        return { bg: "rgba(160, 174, 192, 0.15)", text: "#a0aec0" };
    }
  };

  const { bg, text } = getCategoryColor(category);

  return (
    <span className="category-badge" style={{ backgroundColor: bg, color: text }}>
      {category}
    </span>
  );
};

const Tag = ({ text }) => (
  <span className="tag">{text}</span>
);

const TrendingTopicCard = ({ topic }) => (
  <motion.div 
    className="trending-topic-card"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="card-header">
      <CategoryBadge category={topic.category} />
      <div className="participants">
        <span className="participant-count">{topic.participants}</span>
        <span className="participant-label">traders</span>
      </div>
    </div>
    
    <h3 className="topic-title">{topic.title}</h3>
    
    <div className="topic-tags">
      {topic.tags.map((tag, index) => (
        <Tag key={index} text={tag} />
      ))}
    </div>
    
    <div className="topic-footer">
      <span className="latest-update">Updated {topic.latestUpdate}</span>
      <button className="join-discussion-btn">Join Discussion</button>
    </div>
  </motion.div>
);

const MarketInsightCard = ({ insight, index }) => (
  <motion.div 
    className="market-insight-card"
    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="insight-image">
      <img src={insight.imageUrl} alt={insight.title} />
    </div>
    
    <div className="insight-content">
      <h3 className="insight-title">{insight.title}</h3>
      <p className="insight-description">{insight.description}</p>
      
      <div className="insight-meta">
        <span className="insight-author">By {insight.author}</span>
        <div className="insight-details">
          <span className="insight-date">{insight.postedDate}</span>
          <span className="insight-read-time">{insight.readTime}</span>
        </div>
      </div>
      
      <button className="read-more-btn">Read Analysis</button>
    </div>
  </motion.div>
);

// Live Market Updates Component
const LiveMarketUpdates = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Format current time to show hours, minutes, seconds
  const formattedTime = currentTime.toLocaleTimeString();
  
  return (
    <div className="live-market-updates">
      <div className="live-indicator">
        <span className="pulse"></span>
        <span className="live-text">LIVE</span>
      </div>
      
      <div className="market-time">{formattedTime}</div>
      
      <div className="major-indices">
        <div className="index-item up">
          <span className="index-name">S&P 500</span>
          <span className="index-value">5,234.28</span>
          <span className="index-change">+0.38%</span>
        </div>
        <div className="index-item down">
          <span className="index-name">DOW</span>
          <span className="index-value">39,462.11</span>
          <span className="index-change">-0.12%</span>
        </div>
        <div className="index-item up">
          <span className="index-name">NASDAQ</span>
          <span className="index-value">16,384.59</span>
          <span className="index-change">+0.72%</span>
        </div>
      </div>
    </div>
  );
};

// Main component
const Service = () => {
  return (
    <section id="insights" className="trading-insights-section">
      <div className="background-dots"></div>
      
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            Trading Insights &amp; <span className="highlight">Community Discussions</span>
          </h2>
          <p className="section-description">
            Stay updated with the latest market analysis and join active discussions with fellow traders across Africa.
          </p>
        </div>
        
        <LiveMarketUpdates />
        
        <div className="content-grid">
          {/* Left Column - Trending Discussions */}
          <div className="trending-col">
            <div className="col-header">
              <h3>Trending Discussions</h3>
              <a href="/discussions" className="view-all-link">View All</a>
            </div>
            
            <div className="trending-topics">
              {trendingTopics.map((topic) => (
                <TrendingTopicCard key={topic.id} topic={topic} />
              ))}
            </div>
          </div>
          
          {/* Right Column - Market Insights */}
          <div className="insights-col">
            <div className="col-header">
              <h3>Latest Market Analysis</h3>
              <a href="/insights" className="view-all-link">View All</a>
            </div>
            
            <div className="market-insights-list">
              {marketInsights.map((insight, index) => (
                <MarketInsightCard key={insight.id} insight={insight} index={index} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="community-cta">
          <div className="cta-content">
            <h3 className="cta-title">Ready to elevate your trading?</h3>
            <p className="cta-description">
              Join our vibrant community of African traders sharing insights, strategies, and success stories.
            </p>
          </div>
          <a 
            href="https://wa.me/+27810593062" 
            className="cta-btn" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Join Our WhatsApp Community
          </a>
        </div>
      </div>
    </section>
  );
};

export default Service;