import React, { useState, useEffect } from 'react';
import '../styles/Podcast.css';
import podcast_image from "./../images/podcast-img.png";
// Import Firebase modules
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Use environment variables for Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
let firebaseApp;
let firestore;

try {
  firebaseApp = initializeApp(firebaseConfig);
  firestore = getFirestore(firebaseApp);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

const PodcastSection = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState(null);
  
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

  // Firebase submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubscribeError(null);
    
    if (!firestore) {
      console.error("Firebase not initialized");
      setSubscribeError("Subscription service unavailable. Please try again later.");
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Log for debugging
      console.log("Attempting to add email to subscribers collection:", email);
      
      // Save to your existing 'subscribers' collection
      const docRef = await addDoc(collection(firestore, "subscribers"), {
        email: email,
        subscriptionDate: serverTimestamp(),
        source: "podcast-page",
        createdAt: new Date().toISOString()
      });
      
      console.log("Document written with ID: ", docRef.id);
      
      // Success!
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
    } catch (error) {
      console.error("Error adding subscriber:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      setSubscribeError(`Subscription failed: ${error.message}`);
      
      // Try backup submission method as fallback
      try {
        submitBackupMethod(email);
      } catch (backupError) {
        console.error("Backup submission also failed:", backupError);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Backup submission method
  const submitBackupMethod = (email) => {
    // Create a mailto link as a last resort backup
    const subject = "Add to Podcast Subscribers";
    const body = `Please add this email to the podcast subscribers: ${email}`;
    const mailtoLink = `mailto:naum@forexfuturescrypto.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink);
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
            </form>
          )}
          
          <div className="podcast-platforms">
            <p className="podcast-platforms-text">Will be available on:</p>
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