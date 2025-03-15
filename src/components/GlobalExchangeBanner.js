import React, { useState, useEffect, useCallback, useMemo } from 'react';
import '../styles/GlobalExchangeBanner.css';

// Data for major global exchanges with their trading hours (in UTC)
// More comprehensive data with additional information
const EXCHANGE_DATA = [
  {
    name: "New York (NYSE)",
    timezone: "America/New_York",
    flag: "US",
    flagIcon: "🇺🇸",
    region: "Americas",
    hours: { open: 14.5, close: 21 }, // 9:30 AM - 4:00 PM ET in UTC hours
    offset: -4, // EDT offset from UTC (changes with daylight savings)
    mainIndex: "S&P 500",
    tradingDays: [1, 2, 3, 4, 5], // Monday to Friday
    lunch: null, // No lunch break
  },
  {
    name: "NASDAQ",
    timezone: "America/New_York",
    flag: "US",
    flagIcon: "🇺🇸",
    region: "Americas",
    hours: { open: 14.5, close: 21 }, // 9:30 AM - 4:00 PM ET in UTC hours
    offset: -4,
    mainIndex: "NASDAQ Composite",
    tradingDays: [1, 2, 3, 4, 5],
    lunch: null,
  },
  {
    name: "Toronto (TSX)",
    timezone: "America/Toronto",
    flag: "CA",
    flagIcon: "🇨🇦",
    region: "Americas",
    hours: { open: 14.5, close: 21 }, // 9:30 AM - 4:00 PM ET in UTC hours
    offset: -4,
    mainIndex: "S&P/TSX Composite",
    tradingDays: [1, 2, 3, 4, 5],
    lunch: null,
  },
  {
    name: "São Paulo (B3)",
    timezone: "America/Sao_Paulo",
    flag: "BR",
    flagIcon: "🇧🇷",
    region: "Americas",
    hours: { open: 14, close: 21 }, // 10:00 AM - 5:00 PM BRT in UTC hours
    offset: -3,
    mainIndex: "Bovespa",
    tradingDays: [1, 2, 3, 4, 5],
    lunch: null,
  },
  {
    name: "London (LSE)",
    timezone: "Europe/London",
    flag: "GB",
    flagIcon: "🇬🇧",
    region: "Europe",
    hours: { open: 8, close: 16.5 }, // 8:00 AM - 4:30 PM BST in UTC hours
    offset: 1, // BST offset from UTC
    mainIndex: "FTSE 100",
    tradingDays: [1, 2, 3, 4, 5],
    lunch: null,
  },
  {
    name: "Euronext",
    timezone: "Europe/Paris",
    flag: "EU",
    flagIcon: "🇪🇺",
    region: "Europe",
    hours: { open: 7, close: 15.5 }, // 9:00 AM - 5:30 PM CEST in UTC hours
    offset: 2, // CEST offset from UTC
    mainIndex: "CAC 40",
    tradingDays: [1, 2, 3, 4, 5],
    lunch: null,
  },
  {
    name: "Frankfurt (XETRA)",
    timezone: "Europe/Berlin",
    flag: "DE",
    flagIcon: "🇩🇪",
    region: "Europe",
    hours: { open: 7, close: 15.5 }, // 9:00 AM - 5:30 PM CEST in UTC hours
    offset: 2,
    mainIndex: "DAX",
    tradingDays: [1, 2, 3, 4, 5],
    lunch: null,
  },
  {
    name: "Johannesburg (JSE)",
    timezone: "Africa/Johannesburg",
    flag: "ZA",
    flagIcon: "🇿🇦",
    region: "Africa",
    hours: { open: 7, close: 15 }, // 9:00 AM - 5:00 PM SAST in UTC hours
    offset: 2, // SAST offset from UTC
    mainIndex: "JSE Top 40",
    tradingDays: [1, 2, 3, 4, 5],
    lunch: null,
  },
  {
    name: "Hong Kong (HKEX)",
    timezone: "Asia/Hong_Kong",
    flag: "HK",
    flagIcon: "🇭🇰",
    region: "Asia",
    hours: { open: 1.5, close: 8 }, // 9:30 AM - 4:00 PM HKT in UTC hours
    offset: 8, // HKT offset from UTC
    mainIndex: "Hang Seng",
    tradingDays: [1, 2, 3, 4, 5],
    lunch: { start: 4, end: 5 }, // Lunch break: 12:00-13:00 local time
  },
  {
    name: "Shanghai (SSE)",
    timezone: "Asia/Shanghai",
    flag: "CN",
    flagIcon: "🇨🇳",
    region: "Asia",
    hours: { open: 1.5, close: 7 }, // 9:30 AM - 3:00 PM CST in UTC hours
    offset: 8, // CST offset from UTC
    mainIndex: "SSE Composite",
    tradingDays: [1, 2, 3, 4, 5],
    lunch: { start: 3.5, end: 5 }, // Lunch break: 11:30-13:00 local time
  },
  {
    name: "Tokyo (TSE)",
    timezone: "Asia/Tokyo",
    flag: "JP",
    flagIcon: "🇯🇵",
    region: "Asia",
    hours: { open: 0, close: 6 }, // 9:00 AM - 3:00 PM JST in UTC hours
    offset: 9, // JST offset from UTC
    mainIndex: "Nikkei 225",
    tradingDays: [1, 2, 3, 4, 5],
    lunch: { start: 2.5, end: 3.5 }, // Lunch break: 11:30-12:30 local time
  },
  {
    name: "Sydney (ASX)",
    timezone: "Australia/Sydney",
    flag: "AU",
    flagIcon: "🇦🇺",
    region: "Oceania",
    hours: { open: 0, close: 6 }, // 10:00 AM - 4:00 PM AEST in UTC hours
    offset: 10, // AEST offset from UTC
    mainIndex: "ASX 200",
    tradingDays: [1, 2, 3, 4, 5],
    lunch: null,
  },
];

// Holiday calendar - just an example of some major market holidays
const HOLIDAY_CALENDAR = [
  { date: "2025-01-01", exchanges: ["New York (NYSE)", "NASDAQ", "London (LSE)"], name: "New Year's Day" },
  { date: "2025-01-20", exchanges: ["New York (NYSE)", "NASDAQ"], name: "Martin Luther King Jr. Day" },
  { date: "2025-02-17", exchanges: ["New York (NYSE)", "NASDAQ"], name: "Presidents' Day" },
  { date: "2025-04-10", exchanges: ["London (LSE)"], name: "Good Friday" },
  { date: "2025-05-25", exchanges: ["New York (NYSE)", "NASDAQ"], name: "Memorial Day" },
  { date: "2025-07-04", exchanges: ["New York (NYSE)", "NASDAQ"], name: "Independence Day" },
];

// Flag component for cross-platform display
const FlagDisplay = ({ country }) => {
  const flagUrl = `https://flagcdn.com/w20/${country.toLowerCase()}.png`;
  
  return (
    <div className="flag-container">
      <img src={flagUrl} alt={country} className="country-flag" />
    </div>
  );
};

const GlobalExchangeBanner = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeRegion, setActiveRegion] = useState('all');
  const [view, setView] = useState('status'); // 'status' or 'regions'
  const [showHolidays, setShowHolidays] = useState(false);
  
  // Update time every 30 seconds for more accurate timing
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 30000);
    
    return () => clearInterval(timer);
  }, []);
  
  // Get current UTC hours with decimal for minutes
  const getUTCHours = useCallback((date) => {
    return date.getUTCHours() + (date.getUTCMinutes() / 60);
  }, []);
  
  // Check if today is a holiday for the exchange
  const isHoliday = useCallback((exchange) => {
    const today = currentTime.toISOString().split('T')[0];
    return HOLIDAY_CALENDAR.some(holiday => 
      holiday.date === today && holiday.exchanges.includes(exchange.name)
    );
  }, [currentTime]);
  
  // Get holiday name if today is a holiday
  const getHolidayName = useCallback((exchange) => {
    const today = currentTime.toISOString().split('T')[0];
    const holiday = HOLIDAY_CALENDAR.find(holiday => 
      holiday.date === today && holiday.exchanges.includes(exchange.name)
    );
    return holiday ? holiday.name : null;
  }, [currentTime]);

  // Format the time difference between current time and target time
  const formatTimeDifference = useCallback((currentHours, targetHours) => {
    let hoursDiff = targetHours - currentHours;
    const hours = Math.floor(hoursDiff);
    const minutes = Math.round((hoursDiff - hours) * 60);
    
    if (hours === 0) {
      return `${minutes}m`;
    }
    return `${hours}h ${minutes}m`;
  }, []);
  
  // Check if an exchange is currently open, accounting for holidays and lunch breaks
  const isExchangeOpen = useCallback((exchange) => {
    // Check if today is a holiday
    if (isHoliday(exchange)) {
      return false;
    }
    
    const currentUTCHours = getUTCHours(currentTime);
    const currentDay = currentTime.getUTCDay(); // 0-6, where 0 is Sunday
    
    // Check if today is a trading day for this exchange
    if (!exchange.tradingDays.includes(currentDay)) {
      return false;
    }
    
    // Handle cases where market crosses midnight UTC
    let isInTradingHours;
    if (exchange.hours.open > exchange.hours.close) {
      isInTradingHours = currentUTCHours >= exchange.hours.open || currentUTCHours < exchange.hours.close;
    } else {
      isInTradingHours = currentUTCHours >= exchange.hours.open && currentUTCHours < exchange.hours.close;
    }
    
    // Check for lunch break
    if (isInTradingHours && exchange.lunch) {
      if (currentUTCHours >= exchange.lunch.start && currentUTCHours < exchange.lunch.end) {
        return false; // Lunch break
      }
    }
    
    return isInTradingHours;
  }, [currentTime, getUTCHours, isHoliday]);
  
  // Calculate time until open or close
  const getTimeUntilChange = useCallback((exchange) => {
    if (isHoliday(exchange)) {
      return "Closed for holiday";
    }
    
    const open = isExchangeOpen(exchange);
    const currentUTCHours = getUTCHours(currentTime);
    let targetHour;
    
    if (open) {
      // If we're in trading hours, calculate time to close
      targetHour = exchange.hours.close;
      
      // Check if we need to consider lunch break
      if (exchange.lunch && currentUTCHours < exchange.lunch.start) {
        // If lunch break is coming before close
        targetHour = exchange.lunch.start;
        return `Lunch in ${formatTimeDifference(currentUTCHours, targetHour)}`;
      }
      
      if (targetHour < currentUTCHours) {
        targetHour += 24; // Add 24 hours if the closing time is tomorrow
      }
      
      return `Closes in ${formatTimeDifference(currentUTCHours, targetHour)}`;
    } else {
      // If we're in lunch break
      if (exchange.lunch && 
          currentUTCHours >= exchange.lunch.start && 
          currentUTCHours < exchange.lunch.end) {
        return `Reopens in ${formatTimeDifference(currentUTCHours, exchange.lunch.end)}`;
      }
      
      // Check if market is closed for the day and will open tomorrow
      const currentDay = currentTime.getUTCDay();
      if (!exchange.tradingDays.includes(currentDay)) {
        // Find the next trading day
        let nextTradingDay = currentDay;
        let daysToAdd = 0;
        
        do {
          nextTradingDay = (nextTradingDay + 1) % 7;
          daysToAdd++;
        } while (!exchange.tradingDays.includes(nextTradingDay));
        
        return `Opens in ${daysToAdd} day${daysToAdd > 1 ? 's' : ''}`;
      }
      
      // Regular closed -> open transition
      targetHour = exchange.hours.open;
      if (targetHour < currentUTCHours) {
        targetHour += 24; // Add 24 hours if the opening time is tomorrow
      }
      
      return `Opens in ${formatTimeDifference(currentUTCHours, targetHour)}`;
    }
  }, [currentTime, formatTimeDifference, getUTCHours, isExchangeOpen, isHoliday]);
  
  // Format the local time for an exchange
  const formatExchangeTime = useCallback((exchange) => {
    // Create a date object for the current time in the exchange's timezone
    const options = { 
      hour: '2-digit', 
      minute: '2-digit', 
      timeZone: exchange.timezone,
      hour12: true
    };
    
    return currentTime.toLocaleTimeString([], options);
  }, [currentTime]);
  
  // Format day of week based on exchange timezone
  const getExchangeDay = useCallback((exchange) => {
    const options = { 
      weekday: 'short', 
      timeZone: exchange.timezone 
    };
    return currentTime.toLocaleDateString([], options);
  }, [currentTime]);
  
  // Get trading status text with more detail
  const getStatusText = useCallback((exchange) => {
    if (isHoliday(exchange)) {
      return `Holiday: ${getHolidayName(exchange)}`;
    }
    
    if (isExchangeOpen(exchange)) {
      return "Open";
    }
    
    // Check if in lunch break
    if (exchange.lunch) {
      const currentUTCHours = getUTCHours(currentTime);
      if (currentUTCHours >= exchange.lunch.start && currentUTCHours < exchange.lunch.end) {
        return "Lunch Break";
      }
    }
    
    const currentDay = currentTime.getUTCDay();
    if (!exchange.tradingDays.includes(currentDay)) {
      return "Weekend";
    }
    
    return "Closed";
  }, [currentTime, getHolidayName, getUTCHours, isExchangeOpen, isHoliday]);
  
  // Format market hours in local time
  const formatMarketHours = useCallback((exchange) => {
    const options = { 
      hour: 'numeric', 
      minute: 'numeric',
      hour12: true
    };
    
    const openTime = new Date();
    openTime.setUTCHours(Math.floor(exchange.hours.open));
    openTime.setUTCMinutes((exchange.hours.open % 1) * 60);
    
    const closeTime = new Date();
    closeTime.setUTCHours(Math.floor(exchange.hours.close));
    closeTime.setUTCMinutes((exchange.hours.close % 1) * 60);
    
    return `${openTime.toLocaleTimeString([], options)} - ${closeTime.toLocaleTimeString([], options)}`;
  }, []);
  
  // Filter exchanges based on active region
  const filteredExchanges = useMemo(() => {
    return activeRegion === 'all' 
      ? EXCHANGE_DATA 
      : EXCHANGE_DATA.filter(exchange => exchange.region === activeRegion);
  }, [activeRegion]);
  
  // Group exchanges by their open/closed status
  const openExchanges = useMemo(() => {
    return filteredExchanges.filter(exchange => isExchangeOpen(exchange));
  }, [filteredExchanges, isExchangeOpen]);
  
  const closedExchanges = useMemo(() => {
    return filteredExchanges.filter(exchange => !isExchangeOpen(exchange));
  }, [filteredExchanges, isExchangeOpen]);
  
  // Group exchanges by region for region view
  const exchangesByRegion = useMemo(() => {
    const regions = {};
    
    filteredExchanges.forEach(exchange => {
      if (!regions[exchange.region]) {
        regions[exchange.region] = [];
      }
      regions[exchange.region].push(exchange);
    });
    
    return regions;
  }, [filteredExchanges]);
  
  // Sort regions alphabetically and ensure "all" comes first
  const regions = useMemo(() => {
    return ['all', ...new Set(EXCHANGE_DATA.map(exchange => exchange.region))].sort();
  }, []);
  
  // Current date in a readable format
  const formattedDate = currentTime.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Find upcoming holidays in the next 7 days
  const upcomingHolidays = useMemo(() => {
    const today = new Date(currentTime);
    const nextWeek = new Date(currentTime);
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const todayStr = today.toISOString().split('T')[0];
    const nextWeekStr = nextWeek.toISOString().split('T')[0];
    
    return HOLIDAY_CALENDAR.filter(holiday => 
      holiday.date >= todayStr && holiday.date <= nextWeekStr
    ).sort((a, b) => a.date.localeCompare(b.date));
  }, [currentTime]);
  
  return (
    <div className="global-exchange-banner">
      <div className="exchange-banner-header">
        <div className="exchange-title">
          <span className="world-icon">
            <i className="fas fa-globe-americas"></i>
          </span>
          Global Market Hours
        </div>
        <div className="view-toggle">
          <button 
            className={`view-button ${view === 'status' ? 'active' : ''}`} 
            onClick={() => setView('status')}
          >
            Status View
          </button>
          <button 
            className={`view-button ${view === 'regions' ? 'active' : ''}`} 
            onClick={() => setView('regions')}
          >
            Region View
          </button>
        </div>
        <div className="exchange-time">
          <div>{formattedDate}</div>
          <div>{currentTime.toLocaleTimeString()} Local Time</div>
        </div>
      </div>
      
      <div className="exchange-filters">
        {regions.map(region => (
          <button 
            key={region}
            className={`region-filter ${activeRegion === region ? 'active' : ''}`}
            onClick={() => setActiveRegion(region)}
          >
            {region === 'all' ? 'All Regions' : region}
          </button>
        ))}
        
        <button 
          className={`holiday-toggle ${showHolidays ? 'active' : ''}`}
          onClick={() => setShowHolidays(!showHolidays)}
        >
          {showHolidays ? 'Hide Holidays' : 'Show Holidays'}
        </button>
      </div>
      
      {/* Holiday panel that can be toggled */}
      {showHolidays && upcomingHolidays.length > 0 && (
        <div className="holiday-panel">
          <h3>Upcoming Market Holidays</h3>
          <div className="holiday-list">
            {upcomingHolidays.map((holiday, index) => (
              <div className="holiday-item" key={index}>
                <div className="holiday-date">
                  {new Date(holiday.date).toLocaleDateString(undefined, {
                    month: 'short', day: 'numeric'
                  })}
                </div>
                <div className="holiday-name">{holiday.name}</div>
                <div className="holiday-markets">
                  Affects: {holiday.exchanges.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {view === 'status' ? (
        <div className="exchanges-container">
          <div className="exchanges-section open">
            <h3 className="section-title">
              <span className="status-indicator open"></span>
              Open Markets ({openExchanges.length})
            </h3>
            
            <div className="exchanges-grid">
              {openExchanges.length > 0 ? (
                openExchanges.map(exchange => (
                  <div key={exchange.name} className="exchange-card open">
                    <div className="exchange-flag">
                      <FlagDisplay country={exchange.flag} />
                    </div>
                    <div className="exchange-info">
                      <div className="exchange-name">{exchange.name}</div>
                      <div className="exchange-details">
                        <span className="local-time">{formatExchangeTime(exchange)}</span>
                        <span className="day">{getExchangeDay(exchange)}</span>
                      </div>
                      <div className="exchange-index">{exchange.mainIndex}</div>
                    </div>
                    <div className="exchange-status">
                      <div className="status open">Open</div>
                      <div className="time-remaining">{getTimeUntilChange(exchange)}</div>
                      <div className="trading-hours">{formatMarketHours(exchange)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-exchanges">No markets currently open in this region.</div>
              )}
            </div>
          </div>
          
          <div className="exchanges-section closed">
            <h3 className="section-title">
              <span className="status-indicator closed"></span>
              Closed Markets ({closedExchanges.length})
            </h3>
            
            <div className="exchanges-grid">
              {closedExchanges.length > 0 ? (
                closedExchanges.map(exchange => (
                  <div key={exchange.name} className="exchange-card closed">
                    <div className="exchange-flag">
                      <FlagDisplay country={exchange.flag} />
                    </div>
                    <div className="exchange-info">
                      <div className="exchange-name">{exchange.name}</div>
                      <div className="exchange-details">
                        <span className="local-time">{formatExchangeTime(exchange)}</span>
                        <span className="day">{getExchangeDay(exchange)}</span>
                      </div>
                      <div className="exchange-index">{exchange.mainIndex}</div>
                    </div>
                    <div className="exchange-status">
                      <div className="status closed">{getStatusText(exchange)}</div>
                      <div className="time-remaining">{getTimeUntilChange(exchange)}</div>
                      <div className="trading-hours">{formatMarketHours(exchange)}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-exchanges">All markets are currently open in this region.</div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="exchanges-container region-view">
          {Object.entries(exchangesByRegion).map(([region, exchanges]) => (
            <div key={region} className="region-section">
              <h3 className="region-title">{region}</h3>
              <div className="exchanges-grid">
                {exchanges.map(exchange => (
                  <div 
                    key={exchange.name} 
                    className={`exchange-card ${isExchangeOpen(exchange) ? 'open' : 'closed'}`}
                  >
                    <div className="exchange-flag">
                      <FlagDisplay country={exchange.flag} />
                    </div>
                    <div className="exchange-info">
                      <div className="exchange-name">{exchange.name}</div>
                      <div className="exchange-details">
                        <span className="local-time">{formatExchangeTime(exchange)}</span>
                        <span className="day">{getExchangeDay(exchange)}</span>
                      </div>
                      <div className="exchange-index">{exchange.mainIndex}</div>
                    </div>
                    <div className="exchange-status">
                      <div className={`status ${isExchangeOpen(exchange) ? 'open' : 'closed'}`}>
                        {getStatusText(exchange)}
                      </div>
                      <div className="time-remaining">{getTimeUntilChange(exchange)}</div>
                      <div className="trading-hours">{formatMarketHours(exchange)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="banner-footer">
        <div className="time-zones">
          <div className="time-zone">
            <div className="zone-name">New York</div>
            <div className="zone-time">
              {new Date().toLocaleTimeString([], {timeZone: 'America/New_York'})}
            </div>
          </div>
          <div className="time-zone">
            <div className="zone-name">London</div>
            <div className="zone-time">
              {new Date().toLocaleTimeString([], {timeZone: 'Europe/London'})}
            </div>
          </div>
          <div className="time-zone">
            <div className="zone-name">Tokyo</div>
            <div className="zone-time">
              {new Date().toLocaleTimeString([], {timeZone: 'Asia/Tokyo'})}
            </div>
          </div>
          <div className="time-zone">
            <div className="zone-name">Sydney</div>
            <div className="zone-time">
              {new Date().toLocaleTimeString([], {timeZone: 'Australia/Sydney'})}
            </div>
          </div>
        </div>
        <div className="data-info">
          Market hours data current as of March 2025. Times adjust automatically for DST where applicable.
        </div>
      </div>
    </div>
  );
};

export default GlobalExchangeBanner;