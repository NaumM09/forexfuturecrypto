import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/Hero.css';
// Always import the heroImage to avoid the undefined error
import heroImage from '../images/hero.png';

// SVG background pattern component for more visual interest
const BackgroundPattern = () => (
  <div className="background-pattern">
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

// Market ticker component with real-time animation
const MarketTicker = () => {
  const [tickerItems, setTickerItems] = useState([
    { pair: 'EURUSD', value: 1.0925, change: 0.15, direction: 'up' },
    { pair: 'GBPUSD', value: 1.2640, change: -0.08, direction: 'down' },
    { pair: 'USDJPY', value: 149.85, change: 0.22, direction: 'up' },
    { pair: 'Gold', value: 2332.40, change: 0.45, direction: 'up' },
    { pair: 'BTC', value: 61250, change: 1.20, direction: 'up' },
    { pair: 'ETH', value: 3120, change: -0.65, direction: 'down' }
  ]);

  // Simulated price updates - in a real app this would connect to an API
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerItems(prevItems => 
        prevItems.map(item => {
          // Random micro fluctuation to simulate live market
          const fluctuation = (Math.random() - 0.5) * 0.2;
          const newChange = parseFloat((item.change + fluctuation).toFixed(2));
          const direction = newChange >= 0 ? 'up' : 'down';
          
          // Calculate new value based on change percentage
          const baseValue = item.value / (1 + (item.change / 100));
          const newValue = baseValue * (1 + (newChange / 100));
          
          return {
            ...item,
            value: parseFloat(newValue.toFixed(item.pair === 'BTC' || item.pair === 'ETH' ? 0 : 2)),
            change: newChange,
            direction,
            // Add flash effect for visual indication of change
            flash: true
          };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="market-ticker">
      <div className="ticker-header">
        <span className="ticker-label">LIVE MARKET</span>
      </div>
      <div className="ticker-wrapper">
        {tickerItems.map((item, index) => (
          <motion.div 
            key={`${item.pair}-${index}`}
            className={`ticker-item ${item.direction}`}
            initial={{ opacity: 0.8 }}
            animate={{ 
              opacity: [0.8, 1, 0.8],
              y: item.flash ? [0, -2, 0] : 0 
            }}
            transition={{ duration: 0.5 }}
          >
            <span className="ticker-pair">{item.pair}</span>
            <span className={`ticker-value ${item.direction}`}>{item.value.toLocaleString()}</span>
            <span className={`ticker-change ${item.direction}`}>
              {item.direction === 'up' ? '▲' : '▼'} {Math.abs(item.change)}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Community stats with animated counters
const CommunityStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      // Use observer.disconnect() instead of trying to unobserve specific elements
      // This ensures all observed elements are properly cleaned up
      observer.disconnect();
    };
  }, []);

  return (
    <div className="community-stats" ref={statsRef}>
      {[
        { number: 1200, label: 'Active Members', plus: true },
        { number: 18, label: 'African Countries', plus: false },
        { number: 24, label: 'Hour Support', suffix: '/7' }
      ].map((stat, index) => (
        <motion.div 
          className="stat-item" 
          key={index}
          initial={{ y: 20, opacity: 0 }}
          animate={isVisible ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: index * 0.2, duration: 0.5 }}
        >
          <span className="stat-number">
            {isVisible ? (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {stat.number}
                {stat.plus && '+'}
                {stat.suffix && stat.suffix}
              </motion.span>
            ) : (
              <span>0</span>
            )}
          </span>
          <span className="stat-label">{stat.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

// Main HeroSection component
const HeroSection = ({ useHeroImage = false }) => {
  const heroRef = useRef(null);
  
  // Animation for section entrance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Store the current ref value to use in the cleanup function
    const currentRef = heroRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      // Properly clean up by disconnecting the observer
      // This prevents trying to access the ref value that might have changed
      observer.disconnect();
    };
  }, []);

  // Dynamic time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <BackgroundPattern />
      
      <div className="hero-content">
        {/* Text Column */}
        <motion.div 
          className="text-column"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero-greeting">
            <span>{getGreeting()}, trader</span>
          </div>
          
          <h1 className="hero-title">
            Africa's Premier
            <motion.span 
              className="highlight"
              initial={{ backgroundSize: '0% 100%' }}
              animate={{ backgroundSize: '100% 100%' }}
              transition={{ delay: 0.5, duration: 0.8 }}
            > Trading Community</motion.span>
          </h1>
          
          <p className="hero-tagline">
            Connect with expert traders across the continent to share insights, 
            strategies, and build your path to success in global markets.
          </p>
          
          <motion.div 
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <a 
              href="https://wa.me/+27810593062" 
              className="cta-btn button" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Join our community via WhatsApp"
            >
              <span className="button-icon">💬</span>
              Join Our Community
            </a>
            <a 
              href="/Free-Trading-Resources.pdf" 
              className="download-btn button" 
              download
              aria-label="Download free trading resources"
            >
              <span className="button-icon">📊</span>
              Free Resources
            </a>
          </motion.div>
          
          {/* Trading focus areas with icons */}
          <motion.div 
            className="trading-focus"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="focus-item">
              <span className="focus-icon">💱</span>
              <span className="focus-text">Forex</span>
            </div>
            <div className="focus-item">
              <span className="focus-icon">📈</span>
              <span className="focus-text">Futures</span>
            </div>
            <div className="focus-item">
              <span className="focus-icon">🪙</span>
              <span className="focus-text">Crypto</span>
            </div>
            <div className="focus-item">
              <span className="focus-icon">📊</span>
              <span className="focus-text">Stocks</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Image Column with animated elements */}
        <motion.div 
          className="image-column"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {useHeroImage ? (
            <div className="image-wrapper">
              <img 
                src={heroImage || 'https://placehold.co/600x400/111827/CCCCCC?text=Trading+Community'} 
                alt="Traders collaborating on market analysis" 
                className="hero-image" 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400/111827/CCCCCC?text=Trading+Community';
                }}
              />
              <div className="image-overlay"></div>
            </div>
          ) : (
            <div className="visual-element">
              <div className="trading-chart">
                {/* Stylized chart visualization */}
                <svg 
                  viewBox="0 0 400 200" 
                  width="100%" 
                  className="chart-svg"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--accent-color)" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="var(--accent-color)" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  
                  {/* Chart grid lines */}
                  {[0, 1, 2, 3, 4].map(i => (
                    <line 
                      key={`grid-${i}`}
                      x1="0" 
                      y1={i * 50} 
                      x2="400" 
                      y2={i * 50} 
                      stroke="rgba(255,255,255,0.1)" 
                      strokeDasharray="4 4"
                    />
                  ))}
                  
                  {/* Animated price chart */}
                  <motion.path
                    d="M0,150 C20,140 40,110 60,130 C80,150 100,160 120,140 C140,120 160,80 180,60 C200,40 220,30 240,50 C260,70 280,100 300,90 C320,80 340,60 360,40 C380,20 400,10 400,10"
                    fill="none"
                    stroke="var(--accent-color)"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                  
                  {/* Area fill under the line */}
                  <motion.path
                    d="M0,150 C20,140 40,110 60,130 C80,150 100,160 120,140 C140,120 160,80 180,60 C200,40 220,30 240,50 C260,70 280,100 300,90 C320,80 340,60 360,40 C380,20 400,10 400,10 L400,200 L0,200 Z"
                    fill="url(#chartGradient)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.3 }}
                    transition={{ delay: 1, duration: 1 }}
                  />
                  
                  {/* Price markers */}
                  {[
                    { x: 60, y: 130 }, 
                    { x: 180, y: 60 }, 
                    { x: 300, y: 90 }, 
                    { x: 360, y: 40 }
                  ].map((point, i) => (
                    <motion.circle
                      key={`marker-${i}`}
                      cx={point.x}
                      cy={point.y}
                      r="6"
                      fill="var(--bg-color)"
                      stroke="var(--accent-color)"
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 1.5 + (i * 0.2), duration: 0.3 }}
                    />
                  ))}
                </svg>
                
                {/* Chart analysis annotations */}
                <motion.div 
                  className="chart-annotations"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2, duration: 0.5 }}
                >
                  <div className="chart-annotation entry" style={{ top: '40%', left: '15%' }}>
                    Entry
                  </div>
                  <div className="chart-annotation resistance" style={{ top: '20%', left: '45%' }}>
                    Resistance
                  </div>
                  <div className="chart-annotation target" style={{ top: '10%', right: '10%' }}>
                    Target
                  </div>
                </motion.div>
              </div>
              
              {/* Community stats display */}
              <CommunityStats />
            </div>
          )}
        </motion.div>
      </div>
      
      {/* Live market ticker */}
      <MarketTicker />
    </section>
  );
};

export default HeroSection;