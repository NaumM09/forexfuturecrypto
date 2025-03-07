import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Events.css';

// Sample event data
const eventData = [
  {
    id: 1,
    title: "Weekly Forex Forecast & Strategy Session",
    date: "2025-03-15T16:00:00",
    type: "webinar",
    host: "Thomas Mkize",
    hostTitle: "Senior Forex Analyst",
    description: "Join our weekly strategy session as we analyze key forex pairs and set up our trading plan for the week ahead. We'll cover technical patterns, fundamental drivers, and potential trade setups.",
    participants: 76,
    image: "https://placehold.co/800x450/111827/00cc99?text=Forex+Forecast"
  },
  {
    id: 2,
    title: "Crypto Trading Masterclass: Bitcoin & Altcoins",
    date: "2025-03-18T18:30:00",
    type: "workshop",
    host: "Sarah Ndlovu",
    hostTitle: "Crypto Specialist",
    description: "A deep dive into crypto market cycles, key support/resistance levels, and emerging patterns. Learn how to identify high-probability setups across major cryptocurrencies.",
    participants: 42,
    image: "https://placehold.co/800x450/111827/0066cc?text=Crypto+Masterclass"
  },
  {
    id: 3,
    title: "Johannesburg Traders Meetup",
    date: "2025-03-25T18:00:00",
    type: "in-person",
    host: "Trading Community Team",
    hostTitle: "Community Organizers",
    description: "Connect with fellow traders in Johannesburg! Join us for networking, trading discussions, and insights sharing. All experience levels welcome. Location: The Capital on the Park, Sandton.",
    participants: 35,
    image: "https://placehold.co/800x450/111827/cc6600?text=JHB+Meetup"
  },
  {
    id: 4,
    title: "Advanced Price Action Trading Strategies",
    date: "2025-04-02T17:00:00",
    type: "workshop",
    host: "David Osei",
    hostTitle: "Professional Trader",
    description: "Master the art of price action trading. We'll cover candlestick patterns, order flow analysis, market structure, and how to execute high-probability trades based on pure price movement.",
    participants: 58,
    image: "https://placehold.co/800x450/111827/a855f7?text=Price+Action"
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

// Event card component
const EventCard = ({ event }) => {
  const timeRemaining = getTimeRemaining(event.date);
  
  return (
    <motion.div 
      className="event-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="event-image">
        <img src={event.image} alt={event.title} />
        <EventTypeBadge type={event.type} />
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
        
        <p className="event-description">{event.description}</p>
        
        <div className="event-footer">
          <div className="participants">
            <span className="participant-count">{event.participants}</span>
            <span className="participant-label">registered</span>
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
          
          <button className="register-btn">
            {timeRemaining.isPast ? 'View Recording' : 'Register Now'}
          </button>
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
            Upcoming <span className="highlight">Community Events</span>
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