import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FaDownload, FaEye, FaStar, FaSearch, FaTimes, FaChevronDown, FaChartLine, FaBook, FaCalculator, FaFileAlt, FaTools } from 'react-icons/fa';
import '../styles/resources.css';

// Sample resource data - expanded with more details
const resourcesData = [
  {
    id: 1,
    title: "Beginner's Guide to Technical Analysis",
    type: "guide",
    category: "technical-analysis",
    description: "Master the fundamentals of chart reading, indicators, and price action to make more informed trading decisions.",
    longDescription: "This comprehensive guide introduces traders to the world of technical analysis in a systematic, easy-to-follow approach. Starting with the basic concepts of support, resistance, and trend lines, the guide gradually advances to complex chart patterns, indicators, and oscillators. Each concept is explained with clear examples, chart illustrations, and practical applications to real market scenarios. Whether you're brand new to trading or looking to solidify your technical foundation, this guide provides the knowledge you need to start making chart-based trading decisions.",
    level: "beginner",
    format: "PDF",
    pages: 48,
    fileSize: "3.2 MB",
    lastUpdated: "2024-12-10",
    downloadCount: 1245,
    rating: 4.7,
    isFeatured: false,
    isPremium: false,
    tags: ["technical analysis", "chart patterns", "indicators", "beginners"],
    image: "https://placehold.co/600x400/111827/00cc99?text=Technical+Analysis",
    previewImages: [
      "https://placehold.co/800x600/111827/00cc99?text=Preview+1",
      "https://placehold.co/800x600/111827/00cc99?text=Preview+2",
      "https://placehold.co/800x600/111827/00cc99?text=Preview+3"
    ],
    previewLink: "#preview",
    downloadLink: "/resources/beginners-guide-technical-analysis.pdf"
  },
  {
    id: 2,
    title: "African Market Hours Trading Calendar",
    type: "tool",
    category: "trading-tools",
    description: "A comprehensive calendar showing trading hours for all major markets, with time zone conversions for African countries.",
    longDescription: "Never miss a market opening or closing again with this specialized trading calendar designed specifically for African traders. This interactive calendar displays opening and closing times for all major global markets (forex, stocks, commodities, and crypto) with automatic time zone conversions for every African country. The calendar includes market overlaps, high volatility periods, important economic announcements, and holiday schedules. Set custom alerts for your preferred trading sessions and export schedule data to your personal calendar app. A must-have tool for traders who need to coordinate their trading activities across multiple international markets from anywhere in Africa.",
    level: "all-levels",
    format: "PDF & Excel",
    pages: 12,
    fileSize: "1.8 MB",
    lastUpdated: "2025-01-05",
    downloadCount: 875,
    rating: 4.5,
    isFeatured: false,
    isPremium: false,
    tags: ["market hours", "calendar", "time zones", "african markets"],
    image: "https://placehold.co/600x400/111827/0066cc?text=Trading+Calendar",
    previewImages: [
      "https://placehold.co/800x600/111827/0066cc?text=Preview+1",
      "https://placehold.co/800x600/111827/0066cc?text=Preview+2"
    ],
    previewLink: "#preview",
    downloadLink: "/resources/african-market-hours-calendar.pdf"
  },
  {
    id: 3,
    title: "Risk Management Calculator",
    type: "calculator",
    category: "risk-management",
    description: "Calculate position sizes, stop losses, and risk-to-reward ratios to maintain proper risk management in your trading.",
    longDescription: "Proper risk management is the foundation of successful trading, and this calculator removes all the guesswork from the process. This Excel-based tool provides simple inputs for account size, risk percentage, entry price, and stop loss to instantly calculate optimal position sizes across all instruments. Advanced features include correlation-based portfolio risk assessment, drawdown projections, and compounding calculators to help you visualize the long-term impact of your risk parameters. The tool also includes instructional guidance on appropriate risk levels for different trading styles and market conditions. By removing the emotion from position sizing, this calculator helps you maintain consistent risk control regardless of market volatility.",
    level: "all-levels",
    format: "Excel",
    pages: null,
    fileSize: "1.5 MB",
    lastUpdated: "2024-11-22",
    downloadCount: 2103,
    rating: 4.9,
    isFeatured: true,
    isPremium: false,
    tags: ["risk management", "position sizing", "calculator", "stop loss"],
    image: "https://placehold.co/600x400/111827/a855f7?text=Risk+Calculator",
    previewImages: [
      "https://placehold.co/800x600/111827/a855f7?text=Preview+1",
      "https://placehold.co/800x600/111827/a855f7?text=Preview+2",
      "https://placehold.co/800x600/111827/a855f7?text=Preview+3"
    ],
    previewLink: "#preview",
    downloadLink: "/resources/risk-management-calculator.xlsx"
  },
  {
    id: 4,
    title: "Candlestick Patterns Cheat Sheet",
    type: "cheatsheet",
    category: "technical-analysis",
    description: "Visual guide to identifying and trading the most effective candlestick patterns with real-world examples.",
    longDescription: "This detailed reference guide takes the complexity out of candlestick pattern recognition by providing clear, visual examples of the 21 most reliable patterns used by professional traders. Each pattern is illustrated with multiple examples, including the pattern formation, psychological interpretation, confirmation signals, and optimal entry/exit points. The guide is color-coded by reliability rating based on extensive backtest data across different market conditions. Also included are pattern combinations that significantly increase predictive accuracy and specific modifications for cryptocurrency markets. Keep this guide open during your trading sessions for quick pattern identification and execution guidance.",
    level: "intermediate",
    format: "PDF",
    pages: 28,
    fileSize: "4.5 MB",
    lastUpdated: "2024-12-15",
    downloadCount: 1876,
    rating: 4.6,
    isFeatured: false,
    isPremium: false,
    tags: ["candlestick patterns", "chart patterns", "price action", "technical analysis"],
    image: "https://placehold.co/600x400/111827/cc6600?text=Candlestick+Patterns",
    previewImages: [
      "https://placehold.co/800x600/111827/cc6600?text=Preview+1",
      "https://placehold.co/800x600/111827/cc6600?text=Preview+2"
    ],
    previewLink: "#preview",
    downloadLink: "/resources/candlestick-patterns-cheatsheet.pdf"
  },
  {
    id: 5,
    title: "Prop Firm Challenge Preparation Guide",
    type: "guide",
    category: "trading-psychology",
    description: "Step-by-step approach to prepare for and pass proprietary trading firm challenges with practical strategies.",
    longDescription: "Passing a prop firm challenge requires more than just good trading skills—it demands a specific approach to risk, drawdown management, and psychological discipline. This specialized guide walks you through the entire process of preparing for and passing these challenges to gain access to significant trading capital. The guide covers the different types of challenges offered by major firms, key rules and restrictions, optimal trading strategies that comply with challenge parameters, and psychological techniques to maintain discipline during the evaluation period. Learn how to adjust your existing trading style to match challenge requirements, manage daily drawdown limits, and demonstrate the consistent performance that prop firms are looking for. Includes case studies of successful challenge passes with detailed breakdowns of the trading approaches used.",
    level: "advanced",
    format: "PDF",
    pages: 35,
    fileSize: "2.9 MB",
    lastUpdated: "2025-01-10",
    downloadCount: 932,
    rating: 4.8,
    isFeatured: false,
    isPremium: true,
    tags: ["prop firm", "trading challenge", "funded account", "risk management"],
    image: "https://placehold.co/600x400/111827/ff4757?text=Prop+Firm+Guide",
    previewImages: [
      "https://placehold.co/800x600/111827/ff4757?text=Preview+1",
      "https://placehold.co/800x600/111827/ff4757?text=Preview+2"
    ],
    previewLink: "#preview",
    downloadLink: "/resources/prop-firm-challenge-guide.pdf"
  },
  {
    id: 6,
    title: "Trading Journal Template",
    type: "template",
    category: "trading-psychology",
    description: "Track your trades, analyze performance, and improve your trading with this comprehensive journal template.",
    longDescription: "Consistent journaling is one of the most powerful tools for trading improvement, and this template makes the process simple and insightful. This Excel-based trading journal goes beyond basic trade tracking to help you identify your strengths, weaknesses, and behavioral patterns. The template includes automated trade import from major platforms, custom tagging systems, emotional state tracking, market condition classification, and advanced performance metrics. Visual dashboards provide instant feedback on your trading performance across different instruments, timeframes, and strategies. The built-in review system helps you extract actionable insights from your data and create focused improvement plans. By maintaining this journal, you'll develop the self-awareness and performance data needed to systematically improve your trading results.",
    level: "all-levels",
    format: "Excel",
    pages: null,
    fileSize: "2.8 MB",
    lastUpdated: "2024-11-30",
    downloadCount: 1542,
    rating: 4.7,
    isFeatured: false,
    isPremium: false,
    tags: ["trading journal", "performance tracking", "trade analysis", "psychology"],
    image: "https://placehold.co/600x400/111827/00cc99?text=Trading+Journal",
    previewImages: [
      "https://placehold.co/800x600/111827/00cc99?text=Preview+1",
      "https://placehold.co/800x600/111827/00cc99?text=Preview+2",
      "https://placehold.co/800x600/111827/00cc99?text=Preview+3"
    ],
    previewLink: "#preview",
    downloadLink: "/resources/trading-journal-template.xlsx"
  },
  {
    id: 7,
    title: "South African Tax Guide for Traders",
    type: "guide",
    category: "trading-business",
    description: "Comprehensive guide to tax obligations, deductions, and reporting requirements for South African traders.",
    longDescription: "Trading taxation in South Africa has unique considerations, and this specialized guide helps you navigate the complexities with confidence. Written in collaboration with tax professionals who specialize in trading and investment income, this guide clarifies how different trading activities are classified by SARS and the tax implications of each classification. Learn about the differences between hobby trading, professional trading, and investment activities, along with the documentation requirements, allowable deductions, and optimal business structures for traders. The guide also covers foreign exchange considerations, offshore broker reporting, tax treatment of different instruments, and recent regulatory changes affecting traders. Includes sample tax calculations and record-keeping templates to help you maintain compliance while optimizing your tax position.",
    level: "all-levels",
    format: "PDF",
    pages: 42,
    fileSize: "3.5 MB",
    lastUpdated: "2025-01-15",
    downloadCount: 789,
    rating: 4.6,
    isFeatured: false,
    isPremium: true,
    tags: ["tax guide", "South Africa", "SARS", "trading business"],
    image: "https://placehold.co/600x400/111827/4ecdc4?text=Tax+Guide",
    previewImages: [
      "https://placehold.co/800x600/111827/4ecdc4?text=Preview+1",
      "https://placehold.co/800x600/111827/4ecdc4?text=Preview+2"
    ],
    previewLink: "#preview",
    downloadLink: "/resources/sa-tax-guide-for-traders.pdf"
  },
  {
    id: 8,
    title: "MT4/MT5 Indicator Pack for Smart Money Concepts",
    type: "tool",
    category: "technical-analysis",
    description: "Collection of custom indicators for identifying institutional order flow, liquidity, and market structure.",
    longDescription: "This comprehensive pack of custom MT4/MT5 indicators is specifically designed to help retail traders identify and trade alongside institutional order flow. The indicators visualize concepts such as liquidity sweeps, order blocks, breaker blocks, fair value gaps, and market structure shifts based on price action and volume analysis rather than lagging indicators. Each indicator is highly customizable to match different instruments and timeframes, with detailed installation instructions and usage guides. The pack also includes template chart setups for forex, indices, and crypto trading, allowing you to instantly implement an institutional trading approach. These tools bring professional-level order flow analysis to retail traders, helping you understand the 'why' behind price movements rather than just reacting to them.",
    level: "intermediate",
    format: "EX4/EX5 Files",
    pages: null,
    fileSize: "5.2 MB",
    lastUpdated: "2024-12-20",
    downloadCount: 1356,
    rating: 4.8,
    isFeatured: true,
    isPremium: true,
    tags: ["MT4", "MT5", "indicators", "smart money concepts", "institutional trading"],
    image: "https://placehold.co/600x400/111827/8a2be2?text=Indicator+Pack",
    previewImages: [
      "https://placehold.co/800x600/111827/8a2be2?text=Preview+1",
      "https://placehold.co/800x600/111827/8a2be2?text=Preview+2",
      "https://placehold.co/800x600/111827/8a2be2?text=Preview+3"
    ],
    previewLink: "#preview",
    downloadLink: "/resources/smc-indicator-pack.zip"
  },
  {
    id: 9,
    title: "Cryptocurrency Trading Fundamentals",
    type: "guide",
    category: "crypto",
    description: "Essential knowledge for trading Bitcoin and altcoins, including blockchain basics, market dynamics, and risk management.",
    longDescription: "This introductory guide bridges the gap between traditional financial markets and the unique ecosystem of cryptocurrency trading. Starting with the fundamental concepts of blockchain technology and tokenomics, the guide builds a solid foundation for understanding the driving forces behind crypto price movements. You'll learn about the relationship between Bitcoin and altcoins, market cycles, on-chain analysis basics, and exchange mechanics. The guide also covers crypto-specific considerations for technical analysis, risk management adjustments needed for high-volatility assets, and security best practices for protecting your digital assets. Whether you're a traditional trader expanding into crypto or completely new to trading, this resource provides the contextual knowledge needed to approach these markets with confidence.",
    level: "beginner",
    format: "PDF",
    pages: 56,
    fileSize: "4.8 MB",
    lastUpdated: "2024-11-15",
    downloadCount: 1105,
    rating: 4.5,
    isFeatured: false,
    isPremium: false,
    tags: ["cryptocurrency", "bitcoin", "altcoins", "blockchain", "crypto trading"],
    image: "https://placehold.co/600x400/111827/f7b731?text=Crypto+Trading",
    previewImages: [
      "https://placehold.co/800x600/111827/f7b731?text=Preview+1",
      "https://placehold.co/800x600/111827/f7b731?text=Preview+2"
    ],
    previewLink: "#preview",
    downloadLink: "/resources/crypto-trading-fundamentals.pdf"
  },
  {
    id: 10,
    title: "Complete Forex Trading Strategy Blueprint",
    type: "guide",
    category: "strategy",
    description: "Comprehensive framework for building, testing, and optimizing your own profitable trading strategies from scratch.",
    longDescription: "This definitive guide walks you through the entire process of creating robust, personalized trading strategies suited to your goals, personality, and lifestyle. Rather than providing a one-size-fits-all approach, the blueprint teaches you a systematic methodology for developing strategies that align with your specific requirements. Starting with foundational principles of effective strategy design, the guide takes you through identifying your edge, creating rule-based entry and exit criteria, establishing comprehensive risk parameters, and implementing proper position sizing formulas. The second section covers validation through backtesting, forward testing, and walk-forward analysis, with detailed instructions for avoiding common testing pitfalls. The final section focuses on strategy refinement, psychological implementation, and handling the inevitable evolution of market conditions. Includes worksheets, decision trees, and strategy templates to guide you through the development process.",
    level: "intermediate",
    format: "PDF & Excel",
    pages: 78,
    fileSize: "6.5 MB",
    lastUpdated: "2025-01-08",
    downloadCount: 2250,
    rating: 4.9,
    isFeatured: true,
    isPremium: false,
    tags: ["trading strategy", "system development", "forex", "backtesting"],
    image: "https://placehold.co/800x600/111827/00cc99?text=Strategy+Blueprint",
    previewImages: [
      "https://placehold.co/800x600/111827/00cc99?text=Preview+1",
      "https://placehold.co/800x600/111827/00cc99?text=Preview+2",
      "https://placehold.co/800x600/111827/00cc99?text=Preview+3",
      "https://placehold.co/800x600/111827/00cc99?text=Preview+4"
    ],
    previewLink: "#preview",
    downloadLink: "/resources/forex-strategy-blueprint.pdf"
  }
];

// Resource categories data
const categories = [
  { id: "all", label: "All Categories", icon: <FaChartLine /> },
  { id: "technical-analysis", label: "Technical Analysis", icon: <FaChartLine /> },
  { id: "trading-psychology", label: "Trading Psychology", icon: <FaBook /> },
  { id: "risk-management", label: "Risk Management", icon: <FaCalculator /> },
  { id: "strategy", label: "Trading Strategies", icon: <FaFileAlt /> },
  { id: "trading-tools", label: "Trading Tools", icon: <FaTools /> },
  { id: "trading-business", label: "Trading Business", icon: <FaFileAlt /> },
  { id: "crypto", label: "Cryptocurrency", icon: <FaChartLine /> }
];

// Resource type badge component
const ResourceTypeBadge = ({ type }) => {
  let bgColor, textColor, label;
  
  switch (type) {
    case 'guide':
      bgColor = 'rgba(0, 204, 153, 0.15)';
      textColor = '#00cc99';
      label = 'Guide';
      break;
    case 'tool':
      bgColor = 'rgba(0, 102, 204, 0.15)';
      textColor = '#0066cc';
      label = 'Tool';
      break;
    case 'calculator':
      bgColor = 'rgba(168, 85, 247, 0.15)';
      textColor = '#a855f7';
      label = 'Calculator';
      break;
    case 'cheatsheet':
      bgColor = 'rgba(204, 102, 0, 0.15)';
      textColor = '#cc6600';
      label = 'Cheat Sheet';
      break;
    case 'template':
      bgColor = 'rgba(0, 204, 153, 0.15)';
      textColor = '#00cc99';
      label = 'Template';
      break;
    default:
      bgColor = 'rgba(160, 174, 192, 0.15)';
      textColor = '#a0aec0';
      label = 'Resource';
  }
  
  return (
    <div className="resource-type-badge" style={{ backgroundColor: bgColor, color: textColor }}>
      {label}
    </div>
  );
};

// Level badge component
const LevelBadge = ({ level }) => {
  let bgColor, textColor, label;
  
  switch (level) {
    case 'beginner':
      bgColor = 'rgba(72, 187, 120, 0.15)';
      textColor = '#48bb78';
      label = 'Beginner';
      break;
    case 'intermediate':
      bgColor = 'rgba(237, 137, 54, 0.15)';
      textColor = '#ed8936';
      label = 'Intermediate';
      break;
    case 'advanced':
      bgColor = 'rgba(229, 62, 62, 0.15)';
      textColor = '#e53e3e';
      label = 'Advanced';
      break;
    case 'all-levels':
      bgColor = 'rgba(113, 128, 150, 0.15)';
      textColor = '#718096';
      label = 'All Levels';
      break;
    default:
      bgColor = 'rgba(113, 128, 150, 0.15)';
      textColor = '#718096';
      label = 'All Levels';
  }
  
  return (
    <div className="level-badge" style={{ backgroundColor: bgColor, color: textColor }}>
      {label}
    </div>
  );
};

// Premium badge component
const PremiumBadge = () => {
  return (
    <div className="premium-badge">
      <FaStar className="premium-icon" />
      <span>Premium</span>
    </div>
  );
};

// Resource card component
const ResourceCard = ({ resource, index, openModal }) => {
  return (
    <motion.div 
      className="resource-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onClick={() => openModal(resource.id)}
    >
      <div className="resource-image">
        <img src={resource.image} alt={resource.title} />
        <div className="resource-badges">
          <ResourceTypeBadge type={resource.type} />
          <LevelBadge level={resource.level} />
          {resource.isPremium && <PremiumBadge />}
        </div>
      </div>
      
      <div className="resource-content">
        <h3 className="resource-title">{resource.title}</h3>
        <p className="resource-description">{resource.description}</p>
        
        <div className="resource-meta">
          <div className="download-count">
            <FaDownload className="download-icon" />
            <span className="count-value">{resource.downloadCount.toLocaleString()}</span>
          </div>
          
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < Math.round(resource.rating) ? 'filled' : ''}`}>★</span>
            ))}
            <span className="rating-value">{resource.rating}</span>
          </div>
        </div>
        
        <div className="resource-tags">
          {resource.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="resource-tag">{tag}</span>
          ))}
          {resource.tags.length > 3 && (
            <span className="more-tags">+{resource.tags.length - 3}</span>
          )}
        </div>
      </div>
      
      <div className="card-actions">
        <button className="preview-btn" onClick={(e) => {
          e.stopPropagation();
          window.open(resource.previewLink, '_blank');
        }}>
          <FaEye /> Preview
        </button>
        <button 
          className={`download-btn ${resource.isPremium ? 'premium-download' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            if (resource.isPremium) {
              alert('This is a premium resource. Please upgrade to access.');
            } else {
              window.location.href = resource.downloadLink;
            }
          }}
        >
          {resource.isPremium ? 'Premium' : <><FaDownload /> Download</>}
        </button>
      </div>
    </motion.div>
  );
};

// Filter component for resource types
const ResourceFilters = ({ 
  activeTypeFilter, 
  setActiveTypeFilter, 
  activeCategoryFilter,
  setActiveCategoryFilter,
  activeLevelFilter,
  setActiveLevelFilter,
  showPremiumOnly,
  setShowPremiumOnly,
  isFilterMenuOpen,
  setIsFilterMenuOpen
}) => {
  const types = [
    { id: 'all', label: 'All Types' },
    { id: 'guide', label: 'Guides' },
    { id: 'tool', label: 'Tools' },
    { id: 'calculator', label: 'Calculators' },
    { id: 'cheatsheet', label: 'Cheat Sheets' },
    { id: 'template', label: 'Templates' }
  ];
  
  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];
  
  return (
    <div className="filters-container">
      <div className="main-filters">
        <div className="type-filters">
          {types.map((type) => (
            <button
              key={type.id}
              className={`filter-btn ${activeTypeFilter === type.id ? 'active' : ''}`}
              onClick={() => setActiveTypeFilter(type.id)}
            >
              {type.label}
            </button>
          ))}
        </div>
        
        <div className="advanced-filters-toggle">
          <button 
            className={`advanced-filter-btn ${isFilterMenuOpen ? 'active' : ''}`}
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            More Filters <FaChevronDown className={`toggle-icon ${isFilterMenuOpen ? 'open' : ''}`} />
          </button>
          
          <label className="toggle-label">
            <input 
              type="checkbox" 
              checked={showPremiumOnly}
              onChange={() => setShowPremiumOnly(!showPremiumOnly)}
            />
            <span className="toggle-text">Premium Resources</span>
          </label>
        </div>
      </div>
      
      <AnimatePresence>
        {isFilterMenuOpen && (
          <motion.div 
            className="advanced-filters"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filter-group">
              <h4>Categories</h4>
              <div className="category-options">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className={`category-filter ${activeCategoryFilter === category.id ? 'active' : ''}`}
                    onClick={() => setActiveCategoryFilter(category.id)}
                  >
                    {category.icon} {category.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <h4>Experience Level</h4>
              <div className="level-options">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    className={`level-filter ${activeLevelFilter === level.id ? 'active' : ''}`}
                    onClick={() => setActiveLevelFilter(level.id)}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Featured resources section
const FeaturedResources = ({ resources, openModal }) => {
  const featuredResources = resources.filter(resource => resource.isFeatured);
  
  if (featuredResources.length === 0) return null;
  
  return (
    <div className="featured-resources-section">
      <h2 className="section-title">Featured Resources</h2>
      
      <div className="featured-resources-grid">
        {featuredResources.map((resource, index) => (
          <motion.div 
            key={resource.id}
            className="featured-resource-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onClick={() => openModal(resource.id)}
          >
            <div className="featured-image">
              <img src={resource.image} alt={resource.title} />
              <div className="featured-overlay"></div>
              <div className="featured-badge">Featured</div>
              {resource.isPremium && <PremiumBadge />}
            </div>
            
            <div className="featured-content">
              <h3 className="featured-title">{resource.title}</h3>
              <p className="featured-description">{resource.description}</p>
              
              <div className="featured-meta">
                <ResourceTypeBadge type={resource.type} />
                <LevelBadge level={resource.level} />
                
                <div className="featured-stats">
                  <div className="download-count">
                    <FaDownload className="download-icon" />
                    <span>{resource.downloadCount.toLocaleString()}</span>
                  </div>
                  
                  <div className="rating">
                    <span className="star filled">★</span>
                    <span className="rating-value">{resource.rating}</span>
                  </div>
                </div>
              </div>
              
              <div className="featured-actions">
                <button className="preview-btn" onClick={(e) => {
                  e.stopPropagation();
                  window.open(resource.previewLink, '_blank');
                }}>
                  <FaEye /> Preview
                </button>
                <button 
                  className={`download-btn ${resource.isPremium ? 'premium-download' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (resource.isPremium) {
                      alert('This is a premium resource. Please upgrade to access.');
                    } else {
                      window.location.href = resource.downloadLink;
                    }
                  }}
                >
                  {resource.isPremium ? 'Upgrade to Access' : 'Download Now'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Search component
const ResourceSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-container">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for trading resources..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="clear-search" 
            onClick={() => setSearchQuery("")}
          >
            <FaTimes />
          </button>
        )}
      </div>
    </div>
  );
};

// Resource Modal component
const ResourceModal = ({ resource, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [currentPreviewImage, setCurrentPreviewImage] = useState(0);
  
  if (!resource) return null;
  
  const handleDownload = () => {
    if (resource.isPremium) {
      alert('This is a premium resource. Please upgrade to access.');
    } else {
      window.location.href = resource.downloadLink;
    }
  };
  
  const nextPreviewImage = (e) => {
    e.stopPropagation();
    if (currentPreviewImage < resource.previewImages.length - 1) {
      setCurrentPreviewImage(currentPreviewImage + 1);
    } else {
      setCurrentPreviewImage(0);
    }
  };
  
  const prevPreviewImage = (e) => {
    e.stopPropagation();
    if (currentPreviewImage > 0) {
      setCurrentPreviewImage(currentPreviewImage - 1);
    } else {
      setCurrentPreviewImage(resource.previewImages.length - 1);
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className="resource-modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>×</button>
            
            <div className="modal-header">
              <div className="modal-badges">
                <ResourceTypeBadge type={resource.type} />
                <LevelBadge level={resource.level} />
                {resource.isFeatured && <div className="featured-badge">Featured</div>}
                {resource.isPremium && <PremiumBadge />}
              </div>
              
              <h2 className="modal-title">{resource.title}</h2>
              
              <div className="modal-meta">
                <div className="meta-item">
                  <span className="meta-label">Format:</span>
                  <span className="meta-value">{resource.format}</span>
                </div>
                
                {resource.pages && (
                  <div className="meta-item">
                    <span className="meta-label">Pages:</span>
                    <span className="meta-value">{resource.pages}</span>
                  </div>
                )}
                
                <div className="meta-item">
                  <span className="meta-label">Size:</span>
                  <span className="meta-value">{resource.fileSize}</span>
                </div>
                
                <div className="meta-item">
                  <span className="meta-label">Updated:</span>
                  <span className="meta-value">{resource.lastUpdated}</span>
                </div>
                
                <div className="meta-item">
                  <span className="meta-label">Downloads:</span>
                  <span className="meta-value">{resource.downloadCount.toLocaleString()}</span>
                </div>
                
                <div className="rating large">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < Math.round(resource.rating) ? 'filled' : ''}`}>★</span>
                  ))}
                  <span className="rating-value">{resource.rating}</span>
                </div>
              </div>
            </div>
            
            <div className="modal-tabs">
              <button 
                className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Details
              </button>
              <button 
                className={`tab-btn ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </button>
            </div>
            
            <div className="tab-content">
              {activeTab === 'details' ? (
                <div className="details-tab">
                  <div className="description-section">
                    <h3>Description</h3>
                    <p className="long-description">{resource.longDescription}</p>
                  </div>
                  
                  <div className="tags-section">
                    <h3>Tags</h3>
                    <div className="tags-list">
                      {resource.tags.map((tag, index) => (
                        <span key={index} className="resource-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="preview-tab">
                  {resource.previewImages && resource.previewImages.length > 0 ? (
                    <div className="preview-gallery">
                      <div className="main-preview">
                        <img src={resource.previewImages[currentPreviewImage]} alt={`${resource.title} preview`} />
                        
                        {resource.previewImages.length > 1 && (
                          <>
                            <button className="prev-button" onClick={prevPreviewImage}>‹</button>
                            <button className="next-button" onClick={nextPreviewImage}>›</button>
                          </>
                        )}
                      </div>
                      
                      {resource.previewImages.length > 1 && (
                        <div className="preview-thumbnails">
                          {resource.previewImages.map((image, index) => (
                            <div 
                              key={index} 
                              className={`thumbnail ${index === currentPreviewImage ? 'active' : ''}`}
                              onClick={() => setCurrentPreviewImage(index)}
                            >
                              <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="no-preview">
                      <p>No preview images available. Please download the resource to view its contents.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button 
                className={`download-btn large ${resource.isPremium ? 'premium-download' : ''}`}
                onClick={handleDownload}
              >
                {resource.isPremium ? (
                  <>
                    <FaStar /> Upgrade to Access
                  </>
                ) : (
                  <>
                    <FaDownload /> Download Resource
                  </>
                )}
              </button>
              
              {!resource.isPremium && (
                <p className="download-note">Free download - no registration required</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Upgrade banner component
const UpgradeBanner = () => {
  return (
    <div className="upgrade-banner">
      <div className="banner-content">
        <h3>Unlock All Premium Resources</h3>
        <p>
          Gain access to our complete library of advanced trading tools, proprietary indicators, 
          and comprehensive strategy guides with a premium subscription.
        </p>
        <ul className="premium-benefits">
          <li>Access to all premium trading resources</li>
          <li>New resources added every month</li>
          <li>Premium indicators and templates</li>
          <li>Advanced strategy guides</li>
        </ul>
      </div>
      
      <div className="banner-action">
        <div className="pricing">
          <span className="price">R800</span>
          <span className="period">/ 3 months</span>
        </div>
        <button className="upgrade-btn">Upgrade Now</button>
      </div>
    </div>
  );
};

// Main Resources component
const Resourcespage = () => {
  // State for filters
  const [activeTypeFilter, setActiveTypeFilter] = useState('all');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [activeLevelFilter, setActiveLevelFilter] = useState('all');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for modal
  const [selectedResource, setSelectedResource] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Apply all filters to resources
  const filteredResources = resourcesData.filter(resource => {
    // Filter by type
    if (activeTypeFilter !== 'all' && resource.type !== activeTypeFilter) {
      return false;
    }
    
    // Filter by category
    if (activeCategoryFilter !== 'all' && resource.category !== activeCategoryFilter) {
      return false;
    }
    
    // Filter by level
    if (activeLevelFilter !== 'all' && resource.level !== activeLevelFilter) {
      return false;
    }
    
    // Filter by premium status
    if (showPremiumOnly && !resource.isPremium) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        resource.title.toLowerCase().includes(query) ||
        resource.description.toLowerCase().includes(query) ||
        resource.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  // Open resource modal
  const openResourceModal = (resourceId) => {
    const resource = resourcesData.find(r => r.id === resourceId);
    if (resource) {
      setSelectedResource(resource);
      setIsModalOpen(true);
      // Add a class to the body to prevent scrolling
      document.body.style.overflow = 'hidden';
    }
  };
  
  // Close resource modal
  const closeResourceModal = () => {
    setIsModalOpen(false);
    setSelectedResource(null);
    // Remove the no-scroll class from the body
    document.body.style.overflow = '';
  };
  
  // Reset all filters
  const resetFilters = () => {
    setActiveTypeFilter('all');
    setActiveCategoryFilter('all');
    setActiveLevelFilter('all');
    setShowPremiumOnly(false);
    setSearchQuery('');
    setIsFilterMenuOpen(false);
  };
  
  // Handle clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };
  
  // Effect to scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <Helmet>
        <title>Trading Resources & Tools - FX Futures Crypto Africa</title>
        <meta name="description" content="Download free trading tools, guides, templates and calculators to help improve your trading skills and increase profitability." />
      </Helmet>
      
      <section className="resources-page">
        <div className="page-header">
          <div className="header-content">
            <h1>Trading Resources & Tools</h1>
            <p>
              Access our library of free trading tools, guides, templates, and calculators to enhance your trading journey. 
              From beginner guides to advanced strategy templates, we have resources for traders at every level.
            </p>
          </div>
        </div>
        
        <div className="page-content">
          <ResourceSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <ResourceFilters 
            activeTypeFilter={activeTypeFilter} 
            setActiveTypeFilter={setActiveTypeFilter}
            activeCategoryFilter={activeCategoryFilter}
            setActiveCategoryFilter={setActiveCategoryFilter}
            activeLevelFilter={activeLevelFilter}
            setActiveLevelFilter={setActiveLevelFilter}
            showPremiumOnly={showPremiumOnly}
            setShowPremiumOnly={setShowPremiumOnly}
            isFilterMenuOpen={isFilterMenuOpen}
            setIsFilterMenuOpen={setIsFilterMenuOpen}
          />
          
          {/* Active filters display */}
          {(activeTypeFilter !== 'all' || 
            activeCategoryFilter !== 'all' || 
            activeLevelFilter !== 'all' || 
            showPremiumOnly || 
            searchQuery) && (
            <div className="active-filters">
              <div className="filters-applied">
                <span>Filters applied:</span>
                
                {activeTypeFilter !== 'all' && (
                  <div className="filter-tag">
                    Type: {activeTypeFilter.charAt(0).toUpperCase() + activeTypeFilter.slice(1)}
                    <button 
                      className="remove-filter" 
                      onClick={() => setActiveTypeFilter('all')}
                    >
                      ×
                    </button>
                  </div>
                )}
                
                {activeCategoryFilter !== 'all' && (
                  <div className="filter-tag">
                    Category: {categories.find(c => c.id === activeCategoryFilter)?.label}
                    <button 
                      className="remove-filter" 
                      onClick={() => setActiveCategoryFilter('all')}
                    >
                      ×
                    </button>
                  </div>
                )}
                
                {activeLevelFilter !== 'all' && (
                  <div className="filter-tag">
                    Level: {activeLevelFilter.charAt(0).toUpperCase() + activeLevelFilter.slice(1)}
                    <button 
                      className="remove-filter" 
                      onClick={() => setActiveLevelFilter('all')}
                    >
                      ×
                    </button>
                  </div>
                )}
                
                {showPremiumOnly && (
                  <div className="filter-tag">
                    Premium Only
                    <button 
                      className="remove-filter" 
                      onClick={() => setShowPremiumOnly(false)}
                    >
                      ×
                    </button>
                  </div>
                )}
                
                {searchQuery && (
                  <div className="filter-tag">
                    Search: "{searchQuery}"
                    <button 
                      className="remove-filter" 
                      onClick={handleClearSearch}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
              
              <button 
                className="clear-all-filters"
                onClick={resetFilters}
              >
                Clear All Filters
              </button>
            </div>
          )}
          
          {/* Results count */}
          <div className="results-count">
            {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
          </div>
          
          {/* Featured Resources Section - Only show when no filters are applied */}
          {activeTypeFilter === 'all' && 
           activeCategoryFilter === 'all' && 
           activeLevelFilter === 'all' && 
           !showPremiumOnly && 
           !searchQuery && (
            <FeaturedResources 
              resources={resourcesData} 
              openModal={openResourceModal}
            />
          )}
          
          {/* Premium banner - Show when no search is active */}
          {!searchQuery && !showPremiumOnly && (
            <UpgradeBanner />
          )}
          
          {/* Main resources grid */}
          <div className="resources-grid">
            {filteredResources.length > 0 ? (
              filteredResources.map((resource, index) => (
                <ResourceCard 
                  key={resource.id} 
                  resource={resource} 
                  index={index} 
                  openModal={openResourceModal}
                />
              ))
            ) : (
              <div className="no-resources">
                <h3>No resources match your criteria</h3>
                <p>Try adjusting your filters or search terms to find what you're looking for.</p>
                <button 
                  className="reset-filters-btn"
                  onClick={resetFilters}
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
        
        <div className="resources-footer">
          <div className="suggestion-box">
            <h3>Can't Find What You Need?</h3>
            <p>
              Let us know what trading resources would help you most, and we'll work on creating them.
            </p>
            <button className="suggest-resource-btn">Suggest a Resource</button>
          </div>
          
          <div className="newsletter-signup">
            <h3>Get New Resources in Your Inbox</h3>
            <p>Subscribe to our newsletter to be the first to know when we release new trading tools and guides.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="subscribe-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
      
      <ResourceModal 
        resource={selectedResource}
        isOpen={isModalOpen}
        onClose={closeResourceModal}
      />
    </>
  );
};

export default Resourcespage;