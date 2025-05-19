import React, { useState } from 'react';
import '../styles/Podcast.css';
import podcast_image from "./../images/podcast-img.png";
// Firebase imports
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase lazily - only when needed
let firebaseInstance = null;

const getFirebaseInstance = () => {
  if (!firebaseInstance) {
    try {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      firebaseInstance = { app, db };
    } catch (error) {
      console.error("Firebase initialization error:", error);
      return null;
    }
  }
  return firebaseInstance;
};

// Content data - separated for easier management
const PODCAST_DATA = {
  launchDate: "July 2025",
  podcastTopics: [
    { icon: "comments", text: "Candid interviews with top-performing female traders" },
    { icon: "chart-line", text: "Deep dives into trading journeys, wins, and lessons" },
    { icon: "brain", text: "Conversations on mindset, strategy, and navigating male-dominated spaces" },
    { icon: "users", text: "Community-driven episodes and guest submissions" }
  ],
  sponsorshipTiers: [
    { tier: "Platinum Partner", benefit: "Featured segments + brand mentions in all episodes" },
    { tier: "Gold Sponsor", benefit: "Regular brand mentions + dedicated feature episode" },
    { tier: "Silver Supporter", benefit: "Brand mentions + digital presence" }
  ],
  contactEmail: "naum@forexfuturescrypto.com",
  platforms: [
    { name: "Spotify", icon: "fab fa-spotify" },
    { name: "Apple Podcasts", icon: "fab fa-apple" },
    { name: "Google Podcasts", icon: "fab fa-google" },
    { name: "All Podcast Platforms", icon: "fas fa-podcast" }
  ]
};

// Component for podcast topics to keep JSX clean
const PodcastTopics = ({ topics }) => (
  <div className="podcast-topics">
    <h4 className="podcast-topics-title">What to Expect:</h4>
    <ul className="podcast-topics-list">
      {topics.map((topic, index) => (
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
);

// Component for sponsorship tiers
const SponsorshipTiers = ({ tiers, contactEmail }) => {
  // Enhanced sponsorship benefits with additional details
  const sponsorshipBenefits = [
    {
      icon: "bullhorn",
      title: "Targeted Audience",
      description: "Reach an engaged community of female traders and finance professionals"
    },
    {
      icon: "chart-line",
      title: "Growing Platform",
      description: "Get in early with our rapidly expanding podcast audience"
    },
    {
      icon: "handshake",
      title: "Brand Association",
      description: "Align with diversity and empowerment in the trading space"
    }
  ];

  // Function to create properly encoded mailto links
  const createMailtoLink = (subject, body = '') => {
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);
    return `mailto:${contactEmail}?subject=${encodedSubject}&body=${encodedBody}`;
  };

  // Helper function for handling button clicks
  const handleEmailButtonClick = (tier) => {
    const subject = `Interest in ${tier} Sponsorship`;
    const body = `Hello,\n\nI would like more information about sponsoring "The Best Female Trader Podcast" as a ${tier}.\n\nLooking forward to your response.\n\nRegards,`;
    window.location.href = createMailtoLink(subject, body);
  };

  return (
    <div className="podcast-sponsorship">
      <div className="sponsorship-header">
        <h3 className="podcast-sponsorship-title">
          <i className="fas fa-handshake" aria-hidden="true"></i> Sponsorship Opportunities
        </h3>
        <p className="podcast-sponsorship-intro">
          Connect with our engaged community of female traders and finance professionals. 
          We're currently seeking forward-thinking brands to partner with for our {PODCAST_DATA.launchDate} launch.
        </p>
      </div>
      
      {/* New benefits section */}
      <div className="sponsorship-benefits">
        {sponsorshipBenefits.map((benefit, index) => (
          <div key={index} className="sponsorship-benefit">
            <div className="benefit-icon-container">
              <i className={`fas fa-${benefit.icon}`} aria-hidden="true"></i>
            </div>
            <h4 className="benefit-title">{benefit.title}</h4>
            <p className="benefit-description">{benefit.description}</p>
          </div>
        ))}
      </div>
      
      <h4 className="sponsorship-tiers-title">Partnership Tiers</h4>
      
      <div className="sponsorship-tiers">
        {tiers.map((tier, index) => (
          <div key={index} className="sponsorship-tier">
            <div className="tier-header">
              <span className="tier-name">{tier.tier}</span>
              {index === 0 && <span className="tier-badge">Most Popular</span>}
            </div>
            <div className="tier-content">
              <span className="tier-benefits">{tier.benefit}</span>
              <button 
                onClick={() => handleEmailButtonClick(tier.tier)}
                className="tier-cta-button"
                aria-label={`Get details about ${tier.tier} sponsorship`}
              >
                Get Details
                <i className="fas fa-arrow-right" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="sponsorship-contact-section">
        <div className="contact-section-content">
          <div className="contact-section-text">
            <h4 className="contact-section-title">Custom Packages Available</h4>
            <p className="contact-section-description">
              Looking for something unique? We can tailor a sponsorship package that aligns perfectly with your brand and objectives.
            </p>
          </div>
          <button 
            onClick={() => {
              const subject = "Custom Podcast Sponsorship Inquiry";
              const body = "Hello,\n\nI'm interested in discussing a custom sponsorship package for The Best Female Trader Podcast.\n\nPlease let me know what options are available.\n\nRegards,";
              window.location.href = createMailtoLink(subject, body);
            }}
            className="contact-section-button"
            aria-label="Contact about custom sponsorship packages"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

// Component for subscription form
const SubscriptionForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribeError, setSubscribeError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    // Clear any previous errors when user starts typing again
    if (subscribeError) setSubscribeError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    setIsSubmitting(true);
    setSubscribeError(null);
    
    try {
      const firebase = getFirebaseInstance();
      
      if (!firebase) {
        throw new Error("Subscription service unavailable");
      }
      
      // Add to Firestore
      await addDoc(collection(firebase.db, "subscribers"), {
        email: email.trim(),
        subscriptionDate: serverTimestamp(),
        source: "podcast-page",
        createdAt: new Date().toISOString()
      });
      
      // Success handling
      setIsSubscribed(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
      
    } catch (error) {
      console.error("Subscription error:", error);
      
      // User-friendly error message
      setSubscribeError(
        error.code === 'permission-denied' 
          ? "Sorry, we couldn't subscribe you at this time. Please try again later."
          : "Subscription failed. Please check your email and try again."
      );
      
      // Fallback to backup method
      submitBackupMethod(email);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const submitBackupMethod = (email) => {
    // Only use backup if primary method failed
    const subject = "Add to Podcast Subscribers";
    const body = `Please add this email to the podcast subscribers: ${email}`;
    const mailtoLink = `mailto:${PODCAST_DATA.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // We don't auto-open the email client as it could be disruptive
    // Just log the backup attempt
    console.log("Primary subscription method failed, backup link created:", mailtoLink);
  };

  return (
    <div className="podcast-subscribe">
      <h3 className="podcast-subscribe-title">🎧 Launching Soon...</h3>
      <p className="podcast-subscribe-tagline">Stay tuned. The movement is just beginning.</p>
      
      {isSubscribed ? (
        <div className="podcast-success-message" role="alert">
          <i className="fas fa-check-circle" aria-hidden="true"></i>
          <p>Thank you for subscribing! We'll notify you when we launch.</p>
        </div>
      ) : (
        <form className="podcast-notify-form" onSubmit={handleSubmit} noValidate>
          <div className="podcast-form-group">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="podcast-notify-email" 
              value={email}
              onChange={handleEmailChange}
              aria-label="Email for podcast notifications"
              aria-required="true"
              aria-invalid={subscribeError ? "true" : "false"}
              required
            />
            <button 
              type="submit" 
              className="podcast-notify-button"
              disabled={isSubmitting || !email.trim()}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Notify Me'}
            </button>
          </div>
          {subscribeError && (
            <div className="podcast-error-message" role="alert">
              <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
              <span>{subscribeError}</span>
            </div>
          )}
        </form>
      )}
      
      <div className="podcast-platforms">
        <p className="podcast-platforms-text">Will be available on:</p>
        <div className="podcast-platform-icons">
          {PODCAST_DATA.platforms.map((platform, index) => (
            <span key={index} className="podcast-platform-icon" title={platform.name}>
              <i className={platform.icon} aria-hidden="true"></i>
              <span className="sr-only">{platform.name}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Main component
const PodcastSection = () => {
  return (
    <section className="podcast-section" id="podcast">
      <div className="podcast-container">
        <div className="podcast-header">
          <span className="podcast-badge">Coming Soon</span>
          <h2 className="podcast-section-title">
            <i className="fas fa-microphone-alt podcast-icon" aria-hidden="true"></i> 
            The Best Female Trader Podcast
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
                loading="lazy"
              />
              <div className="podcast-launch-date">Launching {PODCAST_DATA.launchDate}</div>
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
            
            <PodcastTopics topics={PODCAST_DATA.podcastTopics} />
          </div>
        </div>
        
        <SponsorshipTiers 
          tiers={PODCAST_DATA.sponsorshipTiers} 
          contactEmail={PODCAST_DATA.contactEmail} 
        />
        
        <SubscriptionForm />
      </div>
    </section>
  );
};

export default PodcastSection;