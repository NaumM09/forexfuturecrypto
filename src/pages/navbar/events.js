import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet'; // For SEO optimization
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaClock, FaFilter, FaSearch, FaRegBookmark, FaBookmark } from 'react-icons/fa';
import '../styles/events.css';

// Sample event data - expanded with additional fields
const eventData = [
  {
    id: 1,
    title: "Weekly Forex Forecast & Strategy Session",
    date: "2025-03-15T16:00:00",
    type: "webinar",
    category: "forex",
    host: "Thomas Mkize",
    hostTitle: "Senior Forex Analyst",
    description: "Join our weekly strategy session as we analyze key forex pairs and set up our trading plan for the week ahead. We'll cover technical patterns, fundamental drivers, and potential trade setups.",
    detailedDescription: "In this intensive 90-minute webinar, we'll break down the current market conditions for major forex pairs including EUR/USD, GBP/USD, USD/JPY, and key commodity currencies. Thomas will share his proprietary market analysis framework that combines technical indicators, market structure, and fundamental catalysts to identify high-probability trading opportunities for the coming week. This workshop includes real-time chart analysis, specific entry/exit criteria, and risk management guidelines tailored to the current market environment.",
    participants: 76,
    maxParticipants: 100,
    location: "Zoom (link provided after registration)",
    duration: "90 minutes",
    prerequisites: "Basic understanding of forex markets and technical analysis",
    difficulty: "Intermediate",
    image: "https://placehold.co/800x450/111827/00cc99?text=Forex+Forecast",
    featured: true,
    isFree: false,
    price: "R150",
    isSaved: false,
    tags: ["forex", "technical analysis", "weekly forecast", "strategy"]
  },
  {
    id: 2,
    title: "Crypto Trading Masterclass: Bitcoin & Altcoins",
    date: "2025-03-18T18:30:00",
    type: "workshop",
    category: "crypto",
    host: "Sarah Ndlovu",
    hostTitle: "Crypto Specialist",
    description: "A deep dive into crypto market cycles, key support/resistance levels, and emerging patterns. Learn how to identify high-probability setups across major cryptocurrencies.",
    detailedDescription: "This comprehensive crypto trading workshop is perfect for traders looking to capitalize on the upcoming 2025 bull cycle. Sarah will walk through her methodical approach to crypto market analysis, focusing on Bitcoin's cyclical patterns and how they influence the broader altcoin market. You'll learn specific criteria for identifying accumulation phases, breakout signals, and when to secure profits. The workshop includes a hands-on portion where Sarah will analyze current setups in real-time and provide practical entry/exit strategies that you can implement immediately in your trading.",
    participants: 42,
    maxParticipants: 50,
    location: "Online - Interactive Workshop Platform",
    duration: "2 hours",
    prerequisites: "Familiarity with basic crypto concepts and trading fundamentals",
    difficulty: "Intermediate to Advanced",
    image: "https://placehold.co/800x450/111827/0066cc?text=Crypto+Masterclass",
    featured: false,
    isFree: false,
    price: "R250",
    isSaved: false,
    tags: ["crypto", "bitcoin", "altcoins", "trading strategy", "technical analysis"]
  },
  {
    id: 3,
    title: "Johannesburg Traders Meetup",
    date: "2025-03-25T18:00:00",
    type: "in-person",
    category: "networking",
    host: "Trading Community Team",
    hostTitle: "Community Organizers",
    description: "Connect with fellow traders in Johannesburg! Join us for networking, trading discussions, and insights sharing. All experience levels welcome. Location: The Capital on the Park, Sandton.",
    detailedDescription: "Our monthly Johannesburg Traders Meetup is the perfect opportunity to expand your trading network and learn from experienced market participants. This casual, in-person gathering brings together retail and professional traders from all backgrounds to share insights, discuss market conditions, and form valuable connections. The evening includes a structured networking session, followed by a panel discussion with successful local traders, and concludes with open networking and refreshments. Whether you're just starting your trading journey or are a seasoned professional, you'll find value in connecting with our diverse community of African traders.",
    participants: 35,
    maxParticipants: 50,
    location: "The Capital on the Park, 101 Katherine St, Sandown, Sandton, 2031",
    duration: "3 hours",
    prerequisites: "None - all experience levels welcome",
    difficulty: "All Levels",
    image: "https://placehold.co/800x450/111827/cc6600?text=JHB+Meetup",
    featured: true,
    isFree: true,
    price: "Free",
    isSaved: false,
    tags: ["networking", "in-person", "johannesburg", "community"]
  },
  {
    id: 4,
    title: "Advanced Price Action Trading Strategies",
    date: "2025-04-02T17:00:00",
    type: "workshop",
    category: "technical-analysis",
    host: "David Osei",
    hostTitle: "Professional Trader",
    description: "Master the art of price action trading. We'll cover candlestick patterns, order flow analysis, market structure, and how to execute high-probability trades based on pure price movement.",
    detailedDescription: "In this advanced workshop, David will share his refined price action methodology that has helped him consistently extract profits from the markets for over a decade. You'll learn his systematic approach to identifying market structure shifts, recognizing institutional order flow, and using candlestick patterns as part of a complete trading strategy. This is not a theoretical session - David will demonstrate his approach using real-time charts and recent trade examples, breaking down his exact entry criteria, stop placement tactics, and profit-taking strategies. By the end of this workshop, you'll have a clear framework for implementing advanced price action concepts into your existing trading approach.",
    participants: 58,
    maxParticipants: 75,
    location: "Online Streaming Platform",
    duration: "2.5 hours",
    prerequisites: "Understanding of basic technical analysis and trading fundamentals",
    difficulty: "Advanced",
    image: "https://placehold.co/800x450/111827/a855f7?text=Price+Action",
    featured: false,
    isFree: false,
    price: "R350",
    isSaved: false,
    tags: ["price action", "technical analysis", "advanced", "trading strategy"]
  },
  {
    id: 5,
    title: "Beginner's Guide to Trading: First Steps",
    date: "2025-03-28T15:00:00",
    type: "webinar",
    category: "education",
    host: "Grace Moyo",
    hostTitle: "Trading Educator",
    description: "A perfect starting point for new traders. Learn the foundations of market analysis, basic terminology, and how to set up your first trading account.",
    detailedDescription: "Starting your trading journey can be overwhelming with the sheer amount of information available. This beginner-friendly webinar cuts through the noise to give you a clear roadmap for your first steps in the markets. Grace will walk you through the essentials every new trader needs to know, from understanding different market types (forex, stocks, crypto) to setting up your first trading platform. You'll learn the basic terminology you need to understand trading discussions, how to analyze simple price charts, and most importantly - how to protect your capital while you're learning. This session also includes a detailed Q&A portion where Grace will address common beginner questions and concerns.",
    participants: 92,
    maxParticipants: 200,
    location: "Online - Live Stream",
    duration: "2 hours",
    prerequisites: "None - designed for complete beginners",
    difficulty: "Beginner",
    image: "https://placehold.co/800x450/111827/ff6b6b?text=Beginners+Guide",
    featured: true,
    isFree: true,
    price: "Free",
    isSaved: false,
    tags: ["beginner", "education", "fundamentals", "introduction"]
  },
  {
    id: 6,
    title: "Risk Management Masterclass",
    date: "2025-04-10T17:30:00",
    type: "workshop",
    category: "risk-management",
    host: "Michael Dlamini",
    hostTitle: "Risk Management Specialist",
    description: "The most critical aspect of trading success: managing risk. Learn position sizing, setting proper stop losses, and portfolio management techniques.",
    detailedDescription: "Risk management is the cornerstone of trading longevity, yet it's often overlooked in favor of entry strategies and technical indicators. In this essential workshop, Michael will demonstrate why most traders fail due to poor risk management and how you can avoid the same fate. You'll learn practical, mathematical approaches to position sizing based on your account size, how to properly set stop losses based on market volatility, and techniques to manage your overall trading portfolio to minimize drawdowns. This workshop includes downloadable risk management calculators and templates that you can immediately implement in your trading business. If you want to survive and thrive as a trader long-term, this session is non-negotiable.",
    participants: 45,
    maxParticipants: 60,
    location: "Zoom Workshop",
    duration: "2 hours",
    prerequisites: "Basic trading experience",
    difficulty: "All Levels",
    image: "https://placehold.co/800x450/111827/4c75e6?text=Risk+Management",
    featured: false,
    isFree: false,
    price: "R180",
    isSaved: false,
    tags: ["risk management", "position sizing", "stop loss", "portfolio management"]
  },
  {
    id: 7,
    title: "Cape Town Traders Social",
    date: "2025-04-15T18:30:00",
    type: "in-person",
    category: "networking",
    host: "WC Trading Community",
    hostTitle: "Community Leaders",
    description: "An evening of networking and market discussions with Cape Town's trading community. Includes guest speaker and refreshments.",
    detailedDescription: "Join us for an evening of connection, learning, and relaxation with Cape Town's vibrant trading community. This quarterly social event brings together traders from all backgrounds to share insights, discuss the markets, and build meaningful relationships in a casual setting. The evening kicks off with structured networking, followed by a short presentation from a successful local trader sharing their market insights, and concludes with open networking and complimentary refreshments. Located in the beautiful Waterfront area, this is the perfect opportunity to step away from your charts and connect with others on the same journey. Limited spots available - register early to secure your place!",
    participants: 28,
    maxParticipants: 40,
    location: "Life Grand Café, V&A Waterfront, Cape Town",
    duration: "3 hours",
    prerequisites: "None",
    difficulty: "All Levels",
    image: "https://placehold.co/800x450/111827/45aaf2?text=Cape+Town+Social",
    featured: false,
    isFree: true,
    price: "Free",
    isSaved: false,
    tags: ["networking", "cape town", "in-person", "social"]
  },
  {
    id: 8,
    title: "Futures Trading for South African Markets",
    date: "2025-04-05T10:00:00",
    type: "webinar",
    category: "futures",
    host: "Jabu Nkosi",
    hostTitle: "Futures Specialist",
    description: "A specialized session on trading futures contracts on the JSE and international markets, focusing on strategies relevant to South African traders.",
    detailedDescription: "This specialized webinar focuses on the unique aspects of trading futures contracts as a South African trader. Jabu will break down the structure of local JSE futures contracts as well as how to access and trade international futures markets. You'll learn the contract specifications, margin requirements, and tax implications specific to SA traders. The session includes practical demonstrations of futures trading platforms, analysis of seasonality patterns in key contracts, and strategies for using futures for both speculation and hedging. Whether you're interested in index futures, commodities, or currency futures, this session will provide the knowledge you need to confidently incorporate these instruments into your trading arsenal.",
    participants: 32,
    maxParticipants: 50,
    location: "Online Webinar",
    duration: "2.5 hours",
    prerequisites: "Understanding of basic market principles",
    difficulty: "Intermediate",
    image: "https://placehold.co/800x450/111827/26de81?text=SA+Futures",
    featured: false,
    isFree: false,
    price: "R220",
    isSaved: false,
    tags: ["futures", "JSE", "south african markets", "derivatives"]
  }
];

// Helper for formatting dates
const formatEventDate = (dateString) => {
  const date = new Date(dateString);
  const options = { 
    weekday: 'long', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
};

// Calculate time remaining until event
const getTimeRemaining = (dateString) => {
  const eventTime = new Date(dateString).getTime();
  const currentTime = new Date().getTime();
  
  // If event has passed
  if (eventTime < currentTime) {
    return { days: 0, hours: 0, minutes: 0, isPast: true };
  }
  
  const totalSeconds = Math.floor((eventTime - currentTime) / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  
  return { days, hours, minutes, isPast: false };
};

// Type badge component
const EventTypeBadge = ({ type, featured }) => {
  let bgColor, textColor, label;
  
  switch (type) {
    case 'webinar':
      bgColor = 'rgba(0, 204, 153, 0.15)';
      textColor = '#00cc99';
      label = 'Live Webinar';
      break;
    case 'workshop':
      bgColor = 'rgba(0, 102, 204, 0.15)';
      textColor = '#0066cc';
      label = 'Workshop';
      break;
    case 'in-person':
      bgColor = 'rgba(204, 102, 0, 0.15)';
      textColor = '#cc6600';
      label = 'In-Person Event';
      break;
    default:
      bgColor = 'rgba(160, 174, 192, 0.15)';
      textColor = '#a0aec0';
      label = 'Event';
  }
  
  return (
    <div className="event-badges">
      <div className="event-type-badge" style={{ backgroundColor: bgColor, color: textColor }}>
        {label}
      </div>
      {featured && (
        <div className="featured-badge">
          Featured
        </div>
      )}
    </div>
  );
};

// Event card component
const EventCard = ({ event, onToggleSave, openEventDetails }) => {
  const timeRemaining = getTimeRemaining(event.date);
  
  return (
    <motion.div 
      className="event-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onClick={() => openEventDetails(event.id)}
    >
      <div className="event-image">
        <img src={event.image} alt={event.title} />
        <EventTypeBadge type={event.type} featured={event.featured} />
        <button 
          className="save-event-btn" 
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave(event.id);
          }}
        >
          {event.isSaved ? <FaBookmark /> : <FaRegBookmark />}
        </button>
        {!event.isFree && (
          <div className="event-price">{event.price}</div>
        )}
      </div>
      
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        
        <div className="event-meta">
          <div className="event-date">
            <FaCalendarAlt className="meta-icon" />
            <span>{formatEventDate(event.date)}</span>
          </div>
          
          <div className="event-duration">
            <FaClock className="meta-icon" />
            <span>{event.duration}</span>
          </div>
          
          {event.type === 'in-person' && (
            <div className="event-location">
              <FaMapMarkerAlt className="meta-icon" />
              <span>{event.location.split(',')[0]}</span>
            </div>
          )}
        </div>
        
        <div className="event-host">
          <span className="host-name">{event.host}</span>
          <span className="host-title">{event.hostTitle}</span>
        </div>
        
        <p className="event-description">{event.description}</p>
        
        <div className="event-footer">
          <div className="participants">
            <FaUsers className="participants-icon" />
            <span className="participant-count">{event.participants}</span>
            <span className="participant-label">/ {event.maxParticipants} registered</span>
          </div>
          
          {!timeRemaining.isPast ? (
            <div className="countdown">
              <div className="countdown-item">
                <span className="count-value">{timeRemaining.days}</span>
                <span className="count-label">days</span>
              </div>
              <div className="countdown-item">
                <span className="count-value">{timeRemaining.hours}</span>
                <span className="count-label">hours</span>
              </div>
              <div className="countdown-item">
                <span className="count-value">{timeRemaining.minutes}</span>
                <span className="count-label">mins</span>
              </div>
            </div>
          ) : (
            <div className="event-past">Event has ended</div>
          )}
        </div>
      </div>
      
      <button 
        className="register-btn"
        onClick={(e) => {
          e.stopPropagation();
          alert(`Registration for "${event.title}" would happen here!`);
        }}
      >
        {timeRemaining.isPast ? 'View Recording' : 'Register Now'}
      </button>
      
      <div className="difficulty-level" data-level={event.difficulty.toLowerCase()}>
        {event.difficulty}
      </div>
    </motion.div>
  );
};

// Filter buttons for event types
const EventFilters = ({ 
  activeTypeFilter, 
  setActiveTypeFilter,
  activeCategoryFilter,
  setActiveCategoryFilter,
  activeDifficultyFilter,
  setActiveDifficultyFilter,
  showFreeOnly,
  setShowFreeOnly,
  showSavedOnly, 
  setShowSavedOnly,
  isFilterMenuOpen,
  setIsFilterMenuOpen
}) => {
  const typeFilters = [
    { id: 'all', label: 'All Types' },
    { id: 'webinar', label: 'Webinars' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'in-person', label: 'In-Person' }
  ];
  
  const categoryFilters = [
    { id: 'all', label: 'All Categories' },
    { id: 'forex', label: 'Forex' },
    { id: 'crypto', label: 'Crypto' },
    { id: 'technical-analysis', label: 'Technical Analysis' },
    { id: 'risk-management', label: 'Risk Management' },
    { id: 'education', label: 'Education' },
    { id: 'networking', label: 'Networking' },
    { id: 'futures', label: 'Futures' }
  ];
  
  const difficultyFilters = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];
  
  return (
    <div className="filters-container">
      <div className="main-filters">
        <div className="type-filters">
          {typeFilters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${activeTypeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveTypeFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>
        
        <div className="filter-toggles">
          <button 
            className={`advanced-filter-btn ${isFilterMenuOpen ? 'active' : ''}`}
            onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
          >
            <FaFilter /> Advanced Filters
          </button>
          
          <label className="toggle-label">
            <input 
              type="checkbox" 
              checked={showFreeOnly}
              onChange={() => setShowFreeOnly(!showFreeOnly)}
            />
            <span className="toggle-text">Free Events Only</span>
          </label>
          
          <label className="toggle-label">
            <input 
              type="checkbox" 
              checked={showSavedOnly}
              onChange={() => setShowSavedOnly(!showSavedOnly)}
            />
            <span className="toggle-text">Saved Events</span>
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
              <div className="filter-options">
                {categoryFilters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`category-filter ${activeCategoryFilter === filter.id ? 'active' : ''}`}
                    onClick={() => setActiveCategoryFilter(filter.id)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="filter-group">
              <h4>Difficulty</h4>
              <div className="filter-options">
                {difficultyFilters.map((filter) => (
                  <button
                    key={filter.id}
                    className={`difficulty-filter ${activeDifficultyFilter === filter.id ? 'active' : ''}`}
                    onClick={() => setActiveDifficultyFilter(filter.id)}
                  >
                    {filter.label}
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

// Event Detail Modal
const EventDetailModal = ({ event, isOpen, onClose, onRegister, onToggleSave }) => {
  if (!event) return null;
  
  const timeRemaining = getTimeRemaining(event.date);
  
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
            className="event-detail-modal"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={onClose}>×</button>
            
            <div className="modal-image">
              <img src={event.image} alt={event.title} />
              <EventTypeBadge type={event.type} featured={event.featured} />
              {!event.isFree && (
                <div className="event-price modal-price">{event.price}</div>
              )}
            </div>
            
            <div className="modal-content">
              <div className="modal-header">
                <h2>{event.title}</h2>
                <button 
                  className="modal-save-btn"
                  onClick={() => onToggleSave(event.id)}
                >
                  {event.isSaved ? <FaBookmark /> : <FaRegBookmark />}
                  <span>{event.isSaved ? 'Saved' : 'Save Event'}</span>
                </button>
              </div>
              
              <div className="modal-meta">
                <div className="meta-item">
                  <FaCalendarAlt className="meta-icon" />
                  <span>{formatEventDate(event.date)}</span>
                </div>
                
                <div className="meta-item">
                  <FaClock className="meta-icon" />
                  <span>{event.duration}</span>
                </div>
                
                <div className="meta-item">
                  <FaMapMarkerAlt className="meta-icon" />
                  <span>{event.location}</span>
                </div>
                
                <div className="meta-item">
                  <FaUsers className="meta-icon" />
                  <span>{event.participants} / {event.maxParticipants} Registered</span>
                </div>
              </div>
              
              <div className="modal-host">
                <h3>Hosted by</h3>
                <div className="host-info">
                  <div className="host-avatar">
                    {event.host.charAt(0)}
                  </div>
                  <div className="host-details">
                    <p className="host-name">{event.host}</p>
                    <p className="host-title">{event.hostTitle}</p>
                  </div>
                </div>
              </div>
              
              <div className="modal-description">
                <h3>About This Event</h3>
                <p>{event.detailedDescription}</p>
              </div>
              
              <div className="modal-details">
                <div className="detail-item">
                  <h4>Prerequisites</h4>
                  <p>{event.prerequisites}</p>
                </div>
                
                <div className="detail-item">
                  <h4>Difficulty Level</h4>
                  <p className={`difficulty-tag ${event.difficulty.toLowerCase()}`}>
                    {event.difficulty}
                  </p>
                </div>
                
                <div className="detail-item">
                  <h4>Tags</h4>
                  <div className="tag-list">
                    {event.tags.map((tag, index) => (
                      <span key={index} className="event-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {!timeRemaining.isPast ? (
                <div className="modal-countdown">
                  <h3>Event Starts In</h3>
                  <div className="countdown large">
                    <div className="countdown-item">
                      <span className="count-value">{timeRemaining.days}</span>
                      <span className="count-label">days</span>
                    </div>
                    <div className="countdown-item">
                      <span className="count-value">{timeRemaining.hours}</span>
                      <span className="count-label">hours</span>
                    </div>
                    <div className="countdown-item">
                      <span className="count-value">{timeRemaining.minutes}</span>
                      <span className="count-label">minutes</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="event-past-notice">
                  <h3>Event has ended</h3>
                  <p>Recording may be available for registered participants.</p>
                </div>
              )}
              
              <div className="modal-actions">
                <button 
                  className="register-btn large"
                  onClick={() => onRegister(event)}
                >
                  {timeRemaining.isPast ? 'View Recording' : `Register Now ${!event.isFree ? `• ${event.price}` : ''}`}
                </button>
                
                {!timeRemaining.isPast && (
                  <button className="add-calendar-btn">
                    <FaCalendarAlt /> Add to Calendar
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// SearchBar component
const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="search-container">
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search for events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button 
            className="clear-search" 
            onClick={() => setSearchQuery("")}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

// Featured Events Section
const FeaturedEvents = ({ events, onToggleSave, openEventDetails }) => {
  const featuredEvents = events.filter(event => event.featured);
  
  return featuredEvents.length > 0 ? (
    <div className="featured-events-section">
      <h2>Featured Events</h2>
      <div className="featured-events-container">
        {featuredEvents.map(event => (
          <EventCard 
            key={event.id} 
            event={event} 
            onToggleSave={onToggleSave}
            openEventDetails={openEventDetails}
          />
        ))}
      </div>
    </div>
  ) : null;
};

// Main component
const Eventspage = () => {
  // Filter states
  const [activeTypeFilter, setActiveTypeFilter] = useState('all');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [activeDifficultyFilter, setActiveDifficultyFilter] = useState('all');
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState(eventData);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('grid'); // 'grid' or 'list'
  
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    
    // Initialize events with data
    setEvents(eventData.map(event => ({
      ...event,
      isSaved: false
    })));
  }, []);
  
  // Toggle save event
  const handleToggleSave = (eventId) => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === eventId 
          ? { ...event, isSaved: !event.isSaved } 
          : event
      )
    );
  };
  
  // Open event details modal
  const openEventDetails = (eventId) => {
    const event = events.find(e => e.id === eventId);
    if (event) {
      setSelectedEvent(event);
      setIsModalOpen(true);
      // Add a class to the body to prevent scrolling
      document.body.classList.add('modal-open');
    }
  };
  
  // Close event details modal
  const closeEventDetails = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    // Remove the modal-open class from the body
    document.body.classList.remove('modal-open');
  };
  
  // Handle event registration
  const handleRegister = (event) => {
    // In a real app, this would open a registration form or redirect to payment
    alert(`Registration process for "${event.title}" would start here.`);
  };
  
  // Apply all filters to events
  const filteredEvents = events.filter(event => {
    // Filter by type
    if (activeTypeFilter !== 'all' && event.type !== activeTypeFilter) {
      return false;
    }
    
    // Filter by category
    if (activeCategoryFilter !== 'all' && event.category !== activeCategoryFilter) {
      return false;
    }
    
    // Filter by difficulty
    if (activeDifficultyFilter !== 'all' && event.difficulty.toLowerCase() !== activeDifficultyFilter) {
      return false;
    }
    
    // Filter by free events
    if (showFreeOnly && !event.isFree) {
      return false;
    }
    
    // Filter by saved events
    if (showSavedOnly && !event.isSaved) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      return (
        event.title.toLowerCase().includes(query) ||
        event.description.toLowerCase().includes(query) ||
        event.host.toLowerCase().includes(query) ||
        event.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  
  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });
  
  // Group events by month for the list view
  const groupedEvents = sortedEvents.reduce((groups, event) => {
    const date = new Date(event.date);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    
    groups[monthYear].push(event);
    return groups;
  }, {});
  
  return (
    <>
      <Helmet>
        <title>Trading Events & Webinars - FX Futures Crypto Africa</title>
        <meta name="description" content="Join our live trading webinars, workshops, and in-person events. Learn from experienced traders and connect with the African trading community." />
      </Helmet>
      
      <section className="events-page">
        <div className="page-header">
          <div className="header-content">
            <h1>Trading Events & Webinars</h1>
            <p>
              Enhance your trading skills by joining our live sessions, workshops, and community meetups. 
              Connect with fellow African traders and learn directly from experienced professionals.
            </p>
          </div>
        </div>
        
        <div className="page-content">
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          
          <EventFilters 
            activeTypeFilter={activeTypeFilter} 
            setActiveTypeFilter={setActiveTypeFilter}
            activeCategoryFilter={activeCategoryFilter}
            setActiveCategoryFilter={setActiveCategoryFilter}
            activeDifficultyFilter={activeDifficultyFilter}
            setActiveDifficultyFilter={setActiveDifficultyFilter}
            showFreeOnly={showFreeOnly}
            setShowFreeOnly={setShowFreeOnly}
            showSavedOnly={showSavedOnly}
            setShowSavedOnly={setShowSavedOnly}
            isFilterMenuOpen={isFilterMenuOpen}
            setIsFilterMenuOpen={setIsFilterMenuOpen}
          />
          
          {/* View toggle and results count */}
          <div className="view-controls">
            <div className="results-count">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
            </div>
            
            <div className="view-toggle">
              <button 
                className={`view-btn ${currentView === 'grid' ? 'active' : ''}`}
                onClick={() => setCurrentView('grid')}
              >
                Grid View
              </button>
              <button 
                className={`view-btn ${currentView === 'list' ? 'active' : ''}`}
                onClick={() => setCurrentView('list')}
              >
                List View
              </button>
            </div>
          </div>
          
          {/* Featured Events Section - Only show when no filters are applied */}
          {activeTypeFilter === 'all' && 
           activeCategoryFilter === 'all' && 
           activeDifficultyFilter === 'all' && 
           !showFreeOnly && 
           !showSavedOnly && 
           searchQuery === '' && (
            <FeaturedEvents 
              events={events} 
              onToggleSave={handleToggleSave}
              openEventDetails={openEventDetails}
            />
          )}
          
          {/* Main event listing */}
          {currentView === 'grid' ? (
            <div className="events-grid">
              {sortedEvents.length > 0 ? (
                sortedEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    onToggleSave={handleToggleSave}
                    openEventDetails={openEventDetails}
                  />
                ))
              ) : (
                <div className="no-events">
                  <h3>No events match your filters</h3>
                  <p>Try adjusting your filters or search criteria</p>
                  <button 
                    className="reset-filters-btn"
                    onClick={() => {
                      setActiveTypeFilter('all');
                      setActiveCategoryFilter('all');
                      setActiveDifficultyFilter('all');
                      setShowFreeOnly(false);
                      setShowSavedOnly(false);
                      setSearchQuery('');
                    }}
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="events-list">
              {Object.keys(groupedEvents).length > 0 ? (
                Object.entries(groupedEvents).map(([monthYear, monthEvents]) => (
                  <div className="month-group" key={monthYear}>
                    <h3 className="month-header">{monthYear}</h3>
                    
                    <div className="month-events">
                      {monthEvents.map(event => (
                        <div 
                          key={event.id} 
                          className="list-event-item" 
                          onClick={() => openEventDetails(event.id)}
                        >
                          <div className="list-event-date">
                            <div className="event-day">
                              {new Date(event.date).getDate()}
                            </div>
                            <div className="event-weekday">
                              {new Date(event.date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                          </div>
                          
                          <div className="list-event-content">
                            <div className="list-event-tags">
                              <div className={`event-type-tag ${event.type}`}>
                                {event.type === 'webinar' ? 'Webinar' : 
                                 event.type === 'workshop' ? 'Workshop' : 'In-Person'}
                              </div>
                              {event.isFree && (
                                <div className="free-tag">Free</div>
                              )}
                              {event.featured && (
                                <div className="featured-tag">Featured</div>
                              )}
                            </div>
                            
                            <h4 className="list-event-title">{event.title}</h4>
                            
                            <div className="list-event-meta">
                              <div className="list-event-time">
                                <FaClock className="meta-icon" />
                                {new Date(event.date).toLocaleTimeString('en-US', { 
                                  hour: '2-digit', 
                                  minute: '2-digit' 
                                })}
                                <span className="duration-span"> • {event.duration}</span>
                              </div>
                              
                              {event.type === 'in-person' && (
                                <div className="list-event-location">
                                  <FaMapMarkerAlt className="meta-icon" />
                                  {event.location.split(',')[0]}
                                </div>
                              )}
                              
                              <div className="list-event-host">
                                By {event.host}
                              </div>
                            </div>
                          </div>
                          
                          <div className="list-event-actions">
                            {!event.isFree && (
                              <div className="list-event-price">{event.price}</div>
                            )}
                            
                            <button 
                              className="mini-save-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleSave(event.id);
                              }}
                            >
                              {event.isSaved ? <FaBookmark /> : <FaRegBookmark />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-events">
                  <h3>No events match your filters</h3>
                  <p>Try adjusting your filters or search criteria</p>
                  <button 
                    className="reset-filters-btn"
                    onClick={() => {
                      setActiveTypeFilter('all');
                      setActiveCategoryFilter('all');
                      setActiveDifficultyFilter('all');
                      setShowFreeOnly(false);
                      setShowSavedOnly(false);
                      setSearchQuery('');
                    }}
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="events-footer">
          <div className="suggest-event">
            <h3>Have an idea for a community event?</h3>
            <p>We're always looking for traders who want to share their knowledge and insights with the community.</p>
            <button className="suggest-btn">Suggest an Event</button>
          </div>
          
          <div className="event-calendar">
            <button className="calendar-btn">
              <FaCalendarAlt className="calendar-icon" />
              Subscribe to Event Calendar
            </button>
            <p className="calendar-info">Never miss an event! Add our community calendar to your Google or iCal.</p>
          </div>
        </div>
      </section>
      
      <EventDetailModal 
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeEventDetails}
        onRegister={handleRegister}
        onToggleSave={handleToggleSave}
      />
    </>
  );
};

export default Eventspage;