import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/Challenge.css';

// Sample challenge data
const challengesData = [
  {
    id: 1,
    title: "Weekly Price Action Challenge",
    description: "Trade solely based on price action patterns without indicators. Post your best setup and analysis.",
    difficulty: "intermediate",
    participants: 48,
    daysLeft: 3,
    prize: "1-Month Premium Membership",
    image: "https://placehold.co/600x400/111827/00cc99?text=Price+Action"
  },
  {
    id: 2,
    title: "Risk Management Showdown",
    description: "Achieve the highest profit with maximum 2% risk per trade. Document your risk:reward on each position.",
    difficulty: "advanced",
    participants: 32,
    daysLeft: 5,
    prize: "Trading Journal Pro License",
    image: "https://placehold.co/600x400/111827/0066cc?text=Risk+Management"
  },
  {
    id: 3,
    title: "Beginner's Chart Reading Contest",
    description: "Identify support/resistance levels and key patterns on provided charts. Perfect for new traders!",
    difficulty: "beginner",
    participants: 75,
    daysLeft: 7,
    prize: "Technical Analysis E-Book",
    image: "https://placehold.co/600x400/111827/a855f7?text=Chart+Reading"
  },
  {
    id: 4,
    title: "Forex Forecasting Competition",
    description: "Predict weekly high/low ranges for major currency pairs with detailed analysis of your methodology.",
    difficulty: "advanced",
    participants: 29,
    daysLeft: 2,
    prize: "1-Hour Mentoring Session",
    image: "https://placehold.co/600x400/111827/cc6600?text=Forex+Forecast"
  }
];

// Leaderboard data
const leaderboardData = [
  { 
    rank: 1, 
    name: "TradeMaster254", 
    country: "Kenya", 
    points: 1250,
    avatar: "https://placehold.co/100x100/111827/00cc99?text=TM" 
  },
  { 
    rank: 2, 
    name: "ForexQueen", 
    country: "South Africa", 
    points: 1180,
    avatar: "https://placehold.co/100x100/111827/0066cc?text=FQ" 
  },
  { 
    rank: 3, 
    name: "ChartWizard", 
    country: "Nigeria", 
    points: 965,
    avatar: "https://placehold.co/100x100/111827/a855f7?text=CW" 
  },
  { 
    rank: 4, 
    name: "PipHunter", 
    country: "Ghana", 
    points: 830,
    avatar: "https://placehold.co/100x100/111827/cc6600?text=PH" 
  },
  { 
    rank: 5, 
    name: "MarketMaster", 
    country: "Egypt", 
    points: 795,
    avatar: "https://placehold.co/100x100/111827/ff4757?text=MM" 
  }
];

// Past winners data
const pastWinnersData = [
  {
    challenge: "Price Action Mastery",
    winner: "TradeMaster254",
    prize: "Trading Course Access",
    date: "February 2025",
    testimonial: "The competition pushed me to refine my naked chart analysis. Learned so much from other participants!"
  },
  {
    challenge: "Risk-to-Reward Challenge",
    winner: "ForexQueen",
    prize: "$100 Prop Firm Voucher",
    date: "January 2025",
    testimonial: "This challenge completely changed how I approach position sizing and risk management."
  },
  {
    challenge: "Crypto Trading Tournament",
    winner: "ChartWizard",
    prize: "Exclusive Indicators Pack",
    date: "December 2024",
    testimonial: "The competition format made learning crypto trading patterns both fun and insightful."
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
            <span className="meta-icon">👥</span>
            <span className="meta-value">{challenge.participants}</span>
            <span className="meta-label">Participants</span>
          </div>
          
          <div className="meta-item time-left">
            <span className="meta-icon">⏱️</span>
            <span className="meta-value">{challenge.daysLeft}</span>
            <span className="meta-label">Days Left</span>
          </div>
        </div>
        
        <div className="challenge-prize">
          <div className="prize-label">Prize:</div>
          <div className="prize-value">{challenge.prize}</div>
        </div>
        
        <button className="join-challenge-btn">Join Challenge</button>
      </div>
    </motion.div>
  );
};

// Leaderboard component
const Leaderboard = () => {
  return (
    <div className="leaderboard">
      <div className="leaderboard-header">
        <h3>Community Leaderboard</h3>
        <span className="month-label">March 2025</span>
      </div>
      
      <div className="leaderboard-content">
        {leaderboardData.map((trader, index) => (
          <div 
            key={index} 
            className={`leaderboard-item ${index < 3 ? 'top-rank' : ''}`}
          >
            <div className="rank">
              {index < 3 ? (
                <span className={`trophy rank-${index + 1}`}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </span>
              ) : (
                <span className="rank-number">{trader.rank}</span>
              )}
            </div>
            
            <div className="trader-avatar">
              <img src={trader.avatar} alt={trader.name} />
            </div>
            
            <div className="trader-info">
              <div className="trader-name">{trader.name}</div>
              <div className="trader-country">{trader.country}</div>
            </div>
            
            <div className="trader-points">
              <span className="points-value">{trader.points}</span>
              <span className="points-label">pts</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="leaderboard-footer">
        <button className="view-full-leaderboard">View Full Leaderboard</button>
      </div>
    </div>
  );
};

// Past winners component
const PastWinners = () => {
  return (
    <div className="past-winners">
      <div className="winners-header">
        <h3>Past Challenge Winners</h3>
      </div>
      
      <div className="winners-content">
        {pastWinnersData.map((winner, index) => (
          <div key={index} className="winner-item">
            <div className="winner-challenge">{winner.challenge}</div>
            <div className="winner-name">{winner.winner}</div>
            <div className="winner-prize">{winner.prize}</div>
            <div className="winner-date">{winner.date}</div>
            <div className="winner-testimonial">"{winner.testimonial}"</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main component
const Challenges = () => {
  return (
    <section id="challenges" className="trading-challenges-section">
      <div className="challenges-background">
        <div className="bg-graphic left"></div>
        <div className="bg-graphic right"></div>
      </div>
      
      <div className="section-container">
        <div className="section-header">
          <h2 className="section-title">
            Trading <span className="highlight">Challenges</span> & Competitions
          </h2>
          <p className="section-description">
            Test your skills, compete with fellow traders, and win prizes in our community trading challenges.
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
        
        <div className="challenges-secondary-content">
          <Leaderboard />
          <PastWinners />
        </div>
        
        <div className="suggest-challenge">
          <div className="suggest-content">
            <h3>Have an idea for a fun trading challenge?</h3>
            <p>We're always looking for creative ideas to help our community learn and improve together.</p>
          </div>
          <button className="suggest-btn">Suggest a Challenge</button>
        </div>
        
        <div className="challenge-rules">
          <div className="rules-header">
            <h3>Challenge Rules & Guidelines</h3>
            <button className="toggle-rules-btn">View Rules</button>
          </div>
          
          <div className="rules-content">
            <div className="rule-item">
              <h4>Fair Play</h4>
              <p>All participants must follow ethical trading practices. No fake screenshots or manipulated results.</p>
            </div>
            
            <div className="rule-item">
              <h4>Submission Deadlines</h4>
              <p>All challenge entries must be submitted before the deadline. Late submissions will not be considered.</p>
            </div>
            
            <div className="rule-item">
              <h4>Judging Criteria</h4>
              <p>Entries are judged based on analysis quality, risk management, and adherence to challenge rules.</p>
            </div>
            
            <div className="rule-item">
              <h4>Community Voting</h4>
              <p>Some challenges include a community voting component. One vote per community member.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Challenges;