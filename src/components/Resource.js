import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Resource.css';

// Sample resource data
const resourcesData = [
  {
    id: 1,
    title: "Beginner's Guide to Technical Analysis",
    type: "guide",
    description: "Master the fundamentals of chart reading, indicators, and price action to make more informed trading decisions.",
    downloadCount: 1245,
    image: "https://placehold.co/600x400/111827/00cc99?text=Technical+Analysis",
    previewLink: "#preview",
    downloadLink: "/resources/beginners-guide-technical-analysis.pdf"
  },
  {
    id: 2,
    title: "African Market Hours Trading Calendar",
    type: "tool",
    description: "A comprehensive calendar showing trading hours for all major markets, with time zone conversions for African countries.",
    downloadCount: 875,
    image: "https://placehold.co/600x400/111827/0066cc?text=Trading+Calendar",
    previewLink: "#preview",
    downloadLink: "/resources/african-market-hours-calendar.pdf"
  },
  {
    id: 3,
    title: "Risk Management Calculator",
    type: "calculator",
    description: "Calculate position sizes, stop losses, and risk-to-reward ratios to maintain proper risk management in your trading.",
    downloadCount: 2103,
    image: "https://placehold.co/600x400/111827/a855f7?text=Risk+Calculator",
    previewLink: "#preview",
    downloadLink: "/resources/risk-management-calculator.xlsx"
  },
  {
    id: 4,
    title: "Candlestick Patterns Cheat Sheet",
    type: "cheatsheet",
    description: "Visual guide to identifying and trading the most effective candlestick patterns with real-world examples.",
    downloadCount: 1876,
    image: "https://placehold.co/600x400/111827/cc6600?text=Candlestick+Patterns",
    previewLink: "#preview",
    downloadLink: "/resources/candlestick-patterns-cheatsheet.pdf"
  },
  {
    id: 5,
    title: "Prop Firm Challenge Preparation Guide",
    type: "guide",
    description: "Step-by-step approach to prepare for and pass proprietary trading firm challenges with practical strategies.",
    downloadCount: 932,
    image: "https://placehold.co/600x400/111827/ff4757?text=Prop+Firm+Guide",
    previewLink: "#preview",
    downloadLink: "/resources/prop-firm-challenge-guide.pdf"
  },
  {
    id: 6,
    title: "Trading Journal Template",
    type: "template",
    description: "Track your trades, analyze performance, and improve your trading with this comprehensive journal template.",
    downloadCount: 1542,
    image: "https://placehold.co/600x400/111827/00cc99?text=Trading+Journal",
    previewLink: "#preview",
    downloadLink: "/resources/trading-journal-template.xlsx"
  }
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

// Resource card component
const ResourceCard = ({ resource, index }) => {
  return (
    <motion.div 
      className="resource-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="resource-image">
        <img src={resource.image} alt={resource.title} />
        <ResourceTypeBadge type={resource.type} />
      </div>
      
      <div className="resource-content">
        <h3 className="resource-title">{resource.title}</h3>
        <p className="resource-description">{resource.description}</p>
        
        <div className="resource-meta">
          <div className="download-count">
            <span className="download-icon">⬇️</span>
            <span className="count-value">{resource.downloadCount}</span>
            <span className="count-label">downloads</span>
          </div>
        </div>
        
        <div className="resource-actions">
          <a href={resource.previewLink} className="preview-btn">Preview</a>
          <a href={resource.downloadLink} className="download-btn" download>Download</a>
        </div>
      </div>
    </motion.div>
  );
};

// Filter buttons for resource types
const ResourceFilters = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { id: 'all', label: 'All Resources' },
    { id: 'guide', label: 'Guides' },
    { id: 'tool', label: 'Tools' },
    { id: 'calculator', label: 'Calculators' },
    { id: 'cheatsheet', label: 'Cheat Sheets' },
    { id: 'template', label: 'Templates' }
  ];
  
  return (
    <div className="resource-filters">
      {filters.map((filter) => (
        <button
          key={filter.id}
          className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
          onClick={() => setActiveFilter(filter.id)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

// Featured resource component
const FeaturedResource = () => {
  return (
    <div className="featured-resource">
      <div className="featured-content">
        <div className="featured-label">Featured Resource</div>
        <h3 className="featured-title">Complete Forex Trading Strategy Blueprint</h3>
        <p className="featured-description">
          This comprehensive guide covers everything you need to build a profitable trading strategy from scratch, 
          including entry/exit rules, risk management, backtesting methodology, and optimization techniques.
        </p>
        <ul className="featured-highlights">
          <li>Step-by-step strategy development framework</li>
          <li>Proven entry and exit techniques</li>
          <li>Position sizing and risk management formulas</li>
          <li>Backtesting and optimization templates</li>
        </ul>
        <div className="featured-actions">
          <a href="#preview-featured" className="preview-btn">Preview</a>
          <a href="/resources/forex-strategy-blueprint.pdf" className="download-featured-btn" download>
            Download Free Guide
          </a>
        </div>
      </div>
      <div className="featured-image">
        <img src="https://placehold.co/800x600/111827/00cc99?text=Strategy+Blueprint" alt="Trading Strategy Blueprint" />
        <div className="featured-overlay"></div>
      </div>
    </div>
  );
};

// Search component
const ResourceSearch = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="resource-search">
      <input
        type="text"
        placeholder="Search for trading resources..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <button className="search-btn">
        <span className="search-icon">🔍</span>
      </button>
    </div>
  );
};

// Main component
const Resources = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter resources based on active filter and search query
  const filteredResources = resourcesData
    .filter(resource => {
      // Filter by type
      if (activeFilter !== 'all' && resource.type !== activeFilter) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        return (
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
    
  return (
    <section id="resources" className="trading-resources-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            Free Trading <span className="highlight">Resources</span>
          </h2>
          <p className="section-description">
            Access our library of free trading tools, guides, and templates to enhance your trading journey.
          </p>
        </div>
        
        <FeaturedResource />
        
        <div className="resources-controls">
          <ResourceSearch 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <ResourceFilters 
            activeFilter={activeFilter} 
            setActiveFilter={setActiveFilter}
          />
        </div>
        
        <div className="resources-grid">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))
          ) : (
            <div className="no-resources">
              <p>No resources found matching your criteria.</p>
              <button 
                className="reset-filters-btn"
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
        
        <div className="resources-footer">
          <div className="premium-resources">
            <h3>Need More Advanced Resources?</h3>
            <p>
              Upgrade to premium for access to our complete library of advanced trading tools, 
              proprietary indicators, and strategy templates.
            </p>
            <button className="premium-btn">Explore Premium Resources</button>
          </div>
          
          <div className="suggestion-box">
            <h3>Can't Find What You Need?</h3>
            <p>
              Let us know what trading resources would help you most, and we'll work on creating them.
            </p>
            <button className="suggest-resource-btn">Suggest a Resource</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;