import React, { useState, useEffect } from 'react';
import '../styles/Podcast.css';
import podcast_image from "./../images/podcast-img.png";
// Import Firebase modules - make sure these are installed
// npm install firebase
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration - replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (do this only once)
let app;
let db;

// Function to ensure Firebase is initialized only once
const initializeFirebase = () => {
  if (!app) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
  return { app, db };
};

const PodcastSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState(null);
  
  // Initialize Firebase when component mounts
  useEffect(() => {
    try {
      initializeFirebase();
    } catch (error) {
      console.error("Error initializing Firebase:", error);
    }
  }, []);
  
  // Updated launch date to July 2025
  const launchDate = "July 2025";
  
  // Topics the podcast will cover - SEO optimized keywords
  const podcastTopics = [
    { icon: "comments", text: "Candid interviews with top-performing female traders" },
    { icon: "chart-line", text: "Deep dives into trading journeys, wins, and lessons" },
    { icon: "brain", text: "Conversations on mindset, strategy, and navigating male-dominated spaces" },
    { icon: "users", text: "Community-driven episodes and guest submissions" }
  ];

  // Sponsorship tiers
  const sponsorshipTiers = [
    { tier: "Platinum Partner", benefit: "Featured segments + brand mentions in all episodes" },
    { tier: "Gold Sponsor", benefit: "Regular brand mentions + dedicated feature episode" },
    { tier: "Silver Supporter", benefit: "Brand mentions + digital presence" }
  ];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubscribeError(null);
    
    try {
      // Initialize Firebase if not already initialized
      const { db } = initializeFirebase();
      
      // Add email to "podcast-subscribers" collection
      await addDoc(collection(db, "podcast-subscribers"), {
        email: email,
        timestamp: serverTimestamp(),
        source: "website"
      });
      
      // Success!
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
      
    } catch (error) {
      console.error("Error subscribing:", error);
      setSubscribeError("Subscription failed. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="podcast-section" id="podcast">
      <div className="podcast-container">
        <div className="podcast-header">
          <span className="podcast-badge">Coming Soon</span>
          <h2 className="podcast-section-title">
            <i className="fas fa-microphone-alt podcast-icon"></i> The Best Female Trader Podcast
          </h2>
          <p className="podcast-subtitle">
            <strong>Presented by FX Futures Crypto Africa</strong>
          </p>
        </div>

        <div className="podcast-content">
          <div className="podcast-artwork-container">
            <div className="podcast-artwork">
              <img 
                src={podcast_image}
                alt="The Best Female Trader Podcast by FX Futures Crypto Africa" 
                className="podcast-cover"
              />
              <div className="podcast-launch-date">Launching {launchDate}</div>
            </div>
          </div>
          
          <div className="podcast-info">
            <div className="podcast-description">
              <p>
                We're bringing the spotlight to the women making waves in the world of forex, futures, and crypto. 
                <strong> The Best Female Trader</strong> podcast is a platform dedicated to celebrating the sharpest minds, 
                boldest trades, and real stories from the female trading community.
              </p>
            </div>
            
            <div className="podcast-topics">
              <h4 className="podcast-topics-title">What to Expect:</h4>
              <ul className="podcast-topics-list">
                {podcastTopics.map((topic, index) => (
                  <li key={index} className="podcast-topic-item">
                    <i className={`fas fa-${topic.icon} podcast-topic-icon`}></i>
                    <span>{topic.text}</span>
                  </li>
                ))}
              </ul>
              <p className="podcast-audience">
                Whether you're a seasoned pro or just starting out, this is your space to get inspired, learn, and grow.
              </p>
            </div>
          </div>
        </div>
        
        <div className="podcast-sponsorship">
          <h3 className="podcast-sponsorship-title">
            <i className="fas fa-handshake"></i> Sponsorship Opportunities
          </h3>
          <p className="podcast-sponsorship-intro">
            Connect with our engaged community of female traders and finance professionals. We're currently seeking forward-thinking brands to partner with for our July 2025 launch.
          </p>
          
          <div className="sponsorship-tiers">
            {sponsorshipTiers.map((tier, index) => (
              <div key={index} className="sponsorship-tier">
                <span className="tier-name">{tier.tier}</span>
                <span className="tier-benefits">{tier.benefit}</span>
              </div>
            ))}
          </div>
          
          <p className="sponsorship-contact">
            Interested in sponsoring? <a href="mailto:naum@forexfuturescrypto.com" className="sponsorship-link">Contact us</a> for custom packages and opportunities.
          </p>
        </div>
        
        <div className="podcast-subscribe">
          <h3 className="podcast-subscribe-title">🎧 Launching Soon...</h3>
          <p className="podcast-subscribe-tagline">Stay tuned. The movement is just beginning.</p>
          
          {isSubscribed ? (
            <div className="podcast-success-message">
              <i className="fas fa-check-circle"></i>
              <p>Thank you for subscribing! We'll notify you when we launch.</p>
            </div>
          ) : (
            <form className="podcast-notify-form" onSubmit={handleSubmit}>
              <div className="podcast-form-group">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="podcast-notify-email" 
                  value={email}
                  onChange={handleEmailChange}
                  aria-label="Email for podcast notifications"
                  required
                />
                <button 
                  type="submit" 
                  className="podcast-notify-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Subscribing...' : 'Notify Me'}
                </button>
              </div>
              {subscribeError && (
                <div className="podcast-error-message">
                  <i className="fas fa-exclamation-circle"></i>
                  <span>{subscribeError}</span>
                </div>
              )}
              <div className="podcast-security-note">
                <i className="fas fa-shield-alt"></i>
                <span>Your email is securely stored on Firebase and will only be used for podcast notifications.</span>
              </div>
            </form>
          )}
          
          <div className="podcast-platforms">
            <p className="podcast-platforms-text"></p>
            <div className="podcast-platform-icons">
              <span className="podcast-platform-icon" title="Spotify">
                <i className="fab fa-spotify"></i>
              </span>
              <span className="podcast-platform-icon" title="Apple Podcasts">
                <i className="fab fa-apple"></i>
              </span>
              <span className="podcast-platform-icon" title="Google Podcasts">
                <i className="fab fa-google"></i>
              </span>
              <span className="podcast-platform-icon" title="All Podcast Platforms">
                <i className="fas fa-podcast"></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;