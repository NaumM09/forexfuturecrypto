import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Challenge.css';

// Realistic trading challenge data
const challengesData = [
  {
    id: 1,
    title: "EURUSD Price Action Analysis",
    description: "Analyze EURUSD 4H chart using pure price action. Identify key support/resistance levels, market structure, and potential entry points with detailed reasoning.",
    difficulty: "intermediate",
    participants: 48,
    daysLeft: 3,
    prize: "1-Month VIP Signal Access",
    image: "https://placehold.co/600x400/f5f5f5/333333?text=EURUSD+Analysis"
  },
  {
    id: 2,
    title: "2% Risk Management Challenge",
    description: "Trade 10 days with maximum 2% risk per position. Document each trade with entry/exit points, position sizing calculation, and risk:reward ratio. Highest return wins.",
    difficulty: "advanced",
    participants: 32,
    daysLeft: 5,
    prize: "TradingView Pro Account (1-year)",
    image: "https://placehold.co/600x400/f5f5f5/333333?text=Risk+Management"
  },
  {
    id: 3,
    title: "Supply & Demand Zone Identification",
    description: "Mark key supply and demand zones on 5 provided charts (GBPUSD, USDJPY, Gold, BTC, Oil). Explain the rationale for each zone and how you'd trade them.",
    difficulty: "beginner",
    participants: 75,
    daysLeft: 7,
    prize: "Smart Money Concepts Course ($297 value)",
    image: "https://placehold.co/600x400/f5f5f5/333333?text=Supply+Demand"
  }
];

// Top traders leaderboard data
const leaderboardData = [
  { 
    rank: 1, 
    name: "TradeMaster254", 
    country: "Kenya", 
    points: 1250,
    winRate: "68%",
    speciality: "Forex",
    avatar: "https://placehold.co/100x100/f5f5f5/333333?text=TM" 
  },
  { 
    rank: 2, 
    name: "ForexQueen", 
    country: "South Africa", 
    points: 1180,
    winRate: "65%",
    speciality: "Indices",
    avatar: "https://placehold.co/100x100/f5f5f5/333333?text=FQ" 
  },
  { 
    rank: 3, 
    name: "ChartWizard", 
    country: "Nigeria", 
    points: 965,
    winRate: "72%",
    speciality: "Crypto",
    avatar: "https://placehold.co/100x100/f5f5f5/333333?text=CW" 
  }
];

// Difficulty badge component
const DifficultyBadge = ({ level }) => {
  let bgColor, textColor;
  
  switch (level) {
    case 'beginner':
      bgColor = 'rgba(0, 204, 153, 0.15)';
      textColor = '#00cc99';
      break;
    case 'intermediate':
      bgColor = 'rgba(0, 102, 204, 0.15)';
      textColor = '#0066cc';
      break;
    case 'advanced':
      bgColor = 'rgba(204, 102, 0, 0.15)';
      textColor = '#cc6600';
      break;
    default:
      bgColor = 'rgba(160, 174, 192, 0.15)';
      textColor = '#a0aec0';
  }
  
  return (
    <div className="difficulty-badge" style={{ backgroundColor: bgColor, color: textColor }}>
      {level.charAt(0).toUpperCase() + level.slice(1)}
    </div>
  );
};

// Challenge card component
const ChallengeCard = ({ challenge, index }) => {
  return (
    <motion.div 
      className="challenge-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="challenge-image">
        <img src={challenge.image} alt={challenge.title} />
        <DifficultyBadge level={challenge.difficulty} />
      </div>
      
      <div className="challenge-content">
        <h3 className="challenge-title">{challenge.title}</h3>
        <p className="challenge-description">{challenge.description}</p>
        
        <div className="challenge-meta">
          <div className="meta-item participants">
            <span className="meta-value">{challenge.participants}</span>
            <span className="meta-label">Participants</span>
          </div>
          
          <div className="meta-item time-left">
            <span className="meta-value">{challenge.daysLeft}</span>
            <span className="meta-label">Days Left</span>
          </div>
        </div>
        
        <div className="challenge-prize">
        </div>
        
        <button className="join-challenge-btn">Enter Challenge</button>
      </div>
    </motion.div>
  );
};

// Combined leaderboard component
const LeaderboardBanner = () => {
  return (
    <div className="leaderboard-banner">
      <div className="leaderboard-header">
        <h3>Top Traders This Month</h3>
      </div>
      
      <div className="leaderboard-content">
        {leaderboardData.map((trader, index) => (
          <div key={index} className="leaderboard-item">
            <div className="rank">
              <span className={`trophy rank-${index + 1}`}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
              </span>
            </div>
            
            <div className="trader-avatar">
              <img src={trader.avatar} alt={trader.name} />
            </div>
            
            <div className="trader-info">
              <div className="trader-name">{trader.name}</div>
              <div className="trader-country">{trader.country}</div>
              <div className="trader-stats">
                <span className="win-rate">{trader.winRate} win rate</span>
                <span className="trader-speciality">{trader.speciality}</span>
              </div>
            </div>
            
            <div className="trader-points">
              <span className="points-value">{trader.points}</span>
              <span className="points-label">pts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Upcoming challenges preview
const UpcomingChallenges = () => {
  return (
    <div className="upcoming-challenges">
      <h3>Coming Soon</h3>
      <div className="upcoming-list">
        <div className="upcoming-item">
          <div className="upcoming-date">Apr 15</div>
          <div className="upcoming-info">
            <h4>Multi-Timeframe Analysis Challenge</h4>
            <p>Align H4, H1 and M15 charts to find high-probability setups</p>
          </div>
        </div>
        <div className="upcoming-item">
          <div className="upcoming-date">Apr 22</div>
          <div className="upcoming-info">
            <h4>Gold Trading Masterclass</h4>
            <p>Special event with professional gold traders and live analysis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main component
const Challenges = () => {
  return (
    <section id="challenges" className="trading-challenges-section">
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            Trading <span className="highlight">Challenges</span>
          </h2>
          <p className="section-description">
            Test your analysis skills, compete with fellow traders, and win valuable trading resources.
          </p>
        </div>
        
        <div className="challenges-grid">
          {challengesData.map((challenge, index) => (
            <ChallengeCard 
              key={challenge.id} 
              challenge={challenge}
              index={index}
            />
          ))}
        </div>
        
        <div className="challenges-sidebar">
          <LeaderboardBanner />
          <UpcomingChallenges />
        </div>
        
        <div className="challenge-rules-summary">
          <h3>How Challenges Work</h3>
          <ul>
            <li>Enter any active challenge before the deadline</li>
            <li>Submit your analysis or trading results via the member dashboard</li>
            <li>Our team reviews all submissions based on defined criteria</li>
            <li>Winners are announced within 3 days after the challenge closes</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Challenges;