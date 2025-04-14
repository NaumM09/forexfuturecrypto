import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Events.css';
import WikiFinance from '../images/wiki.jpg';

// Updated event data with expanded WikiFinance description
const eventData = [
  {
    id: 7,
    title: "Cape Town Traders Social",
    date: "2025-04-15T18:30:00",
    type: "in-person",
    host: "WC Trading Community",
    hostTitle: "Community Leaders",
    description: "An evening of networking and market discussions with Cape Town's trading community. Includes guest speaker and refreshments.",
    participants: 28,
    image: "https://placehold.co/800x450/111827/45aaf2?text=Cape+Town+Social",
    registrationUrl: "#" // Placeholder URL for Cape Town event
  },
  {
    id: 9,
    title: "WIKI FINANCE EXPO JOHANNESBURG 2025",
    date: "2025-08-16T09:00:00",
    type: "in-person",
    host: "Wiki Global",
    hostTitle: "Event Organizers",
    description: "Join the Pinnacle of Global Fintech Innovation! WIKI FINANCE EXPO JOHANNESBURG 2025 lands in Johannesburg on August 16, 2025, delivering an unparalleled financial technology experience. As the world's largest fintech event, this expo will bring together over 10,000 attendees and 3,000 top-tier companies, showcasing the latest trends and breakthroughs in Fintech, Forex, Crypto, Stocks, Payments, and AI.",
    detailedDescription: {
      whoShouldAttend: [
        "Forex and Crypto traders, KOLs, Brokers, Affiliates & IBs, Fund managers, Bankers, Project Owners",
        "Web3.0, Blockchain, Online trading platform developers and users",
        "AI, Fintech, Liquidity, Financial Services providers and professionals",
        "Entrepreneurs, VCs who are eager to master global financial trends"
      ]
    },
    participants: "10,000+", // Changed to string to show it's an estimate
    image: WikiFinance,
    registrationUrl: "https://www.wikiexpo.com/Africa/2025/en/index.html?c=RDfUy8WM",
    isExternalEvent: true // Flag to indicate this is an external event
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
const EventTypeBadge = ({ type }) => {
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
    <div className="event-type-badge" style={{ backgroundColor: bgColor, color: textColor }}>
      {label}
    </div>
  );
};

// Featured Badge component for special events
const FeaturedBadge = () => (
  <div className="featured-badge" style={{ 
    position: 'absolute', 
    top: '16px', 
    left: '16px',
    backgroundColor: 'rgba(255, 215, 0, 0.9)',
    color: '#000',
    padding: '6px 12px',
    borderRadius: '30px',
    fontWeight: 'bold',
    fontSize: '0.75rem',
    zIndex: 5,
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  }}>
    Featured Event
  </div>
);

// Event card component
const EventCard = ({ event }) => {
  const timeRemaining = getTimeRemaining(event.date);
  const [expanded, setExpanded] = useState(false);
  
  const isWikiFinanceEvent = event.id === 9; // Check if this is the WikiFinance event
  
  return (
    <motion.div 
      className={`event-card ${isWikiFinanceEvent ? 'featured-event' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={isWikiFinanceEvent ? { borderColor: 'rgba(255, 215, 0, 0.3)', borderWidth: '2px' } : {}}
    >
      <div className="event-image">
        <img src={event.image} alt={event.title} />
        <EventTypeBadge type={event.type} />
        {isWikiFinanceEvent && <FeaturedBadge />}
      </div>
      
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        
        <div className="event-meta">
          <div className="event-host">
            <span className="host-name">{event.host}</span>
            <span className="host-title">{event.hostTitle}</span>
          </div>
          
          <div className="event-date">
            <span className="date-icon">📅</span>
            <span className="date-text">{formatEventDate(event.date)}</span>
          </div>
        </div>
        
        <div className="event-description">
          <p>{event.description}</p>
          
          {/* Show detailed info for WikiFinance event */}
          {isWikiFinanceEvent && expanded && (
            <div className="expanded-content" style={{ marginTop: '15px' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>Who Should Attend?</h4>
              <ul style={{ paddingLeft: '20px' }}>
                {event.detailedDescription.whoShouldAttend.map((item, index) => (
                  <li key={index} style={{ marginBottom: '8px', color: 'var(--text-secondary)' }}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Show/Hide details button for WikiFinance */}
          {isWikiFinanceEvent && (
            <button 
              onClick={() => setExpanded(!expanded)} 
              style={{ 
                background: 'none',
                border: 'none',
                color: 'var(--primary-color)',
                cursor: 'pointer',
                padding: '5px 0',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginTop: '10px'
              }}
            >
              {expanded ? 'Show Less' : 'Show More Details'}
            </button>
          )}
        </div>
        
        <div className="event-footer">
          <div className="participants">
            <span className="participant-count">{event.participants}</span>
            <span className="participant-label">
              {event.isExternalEvent ? 'expected' : 'registered'}
            </span>
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
          
          <a 
            href={event.registrationUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="register-btn"
            style={isWikiFinanceEvent ? { background: 'linear-gradient(to right, #0066cc, #ffd700)' } : {}}
          >
            {timeRemaining.isPast ? 'View Recording' : 'Register Now'}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

// Filter buttons for event types
const EventFilters = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { id: 'all', label: 'All Events' },
    { id: 'webinar', label: 'Webinars' },
    { id: 'workshop', label: 'Workshops' },
    { id: 'in-person', label: 'In-Person' }
  ];
  
  return (
    <div className="event-filters">
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

// Main component
const Events = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Filter events based on active filter
  const filteredEvents = activeFilter === 'all'
    ? eventData
    : eventData.filter(event => event.type === activeFilter);
    
  return (
    <section id="events" className="community-events-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
           <span className="highlight1">Upcoming</span> <span className="highlight">Community Events</span>
          </h2>
          <p className="section-description">
            Join live trading sessions, webinars, and meetups to enhance your skills and connect with fellow African traders.
          </p>
        </div>
        
        <EventFilters 
          activeFilter={activeFilter} 
          setActiveFilter={setActiveFilter}
        />
        
        <div className="events-grid">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <div className="no-events">
              <p>No {activeFilter} events scheduled at the moment.</p>
              <button 
                className="view-all-btn"
                onClick={() => setActiveFilter('all')}
              >
                View all events
              </button>
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
              <span className="calendar-icon">📅</span>
              Subscribe to Event Calendar
            </button>
            <p className="calendar-info">Never miss an event! Add our community calendar to your Google or iCal.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;