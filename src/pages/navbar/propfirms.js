import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { FaEnvelope, FaAngleRight } from 'react-icons/fa';
import "../styles/propfirm.css";

const PropFirmComingSoon = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [daysLeft, setDaysLeft] = useState(30);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // Countdown timer to a date 30 days in the future
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setDaysLeft(days);
      setHoursLeft(hours);
      setMinutesLeft(minutes);
      setSecondsLeft(seconds);

      if (difference < 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      setIsSubmitted(true);
      // Here you would typically send this to your backend
      console.log('Email submitted:', email);
      setEmail('');
      
      // Reset the submission state after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <>
      <Helmet>
        <title>Prop Firm Partnerships - Coming Soon | FX Futures Crypto Africa</title>
        <meta name="description" content="We're partnering with top proprietary trading firms to bring you exclusive discounts and offers. Sign up to be notified when our prop firm partnerships launch." />
      </Helmet>

      <div className="prop-firm-coming-soon">
        <div className="propfirm-hero-section">
          <div className="propfirm-hero-content">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="propfirm-hero-title"
            >
              Prop Firm Partnerships <span className="propfirm-coming-soon-badge">Coming Soon</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="propfirm-hero-subtitle"
            >
              We're partnering with top proprietary trading firms to bring you exclusive discounts, 
              offers, and resources to help you succeed in your funded trader journey.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="propfirm-countdown-container"
            >
              <div className="propfirm-countdown-header">Launching In:</div>
              <div className="propfirm-countdown-timer">
                <div className="propfirm-countdown-item">
                  <div className="propfirm-countdown-value">{daysLeft}</div>
                  <div className="propfirm-countdown-label">Days</div>
                </div>
                <div className="propfirm-countdown-item">
                  <div className="propfirm-countdown-value">{hoursLeft < 10 ? `0${hoursLeft}` : hoursLeft}</div>
                  <div className="propfirm-countdown-label">Hours</div>
                </div>
                <div className="propfirm-countdown-item">
                  <div className="propfirm-countdown-value">{minutesLeft < 10 ? `0${minutesLeft}` : minutesLeft}</div>
                  <div className="propfirm-countdown-label">Minutes</div>
                </div>
                <div className="propfirm-countdown-item">
                  <div className="propfirm-countdown-value">{secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft}</div>
                  <div className="propfirm-countdown-label">Seconds</div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="propfirm-notification-signup"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <h3>Get Notified When We Launch</h3>
              <p>Be the first to know about our exclusive prop firm discounts and offers.</p>
              
              <form onSubmit={handleSubmit} className="propfirm-signup-form">
                <div className="propfirm-form-input-container">
                  <FaEnvelope className="propfirm-input-icon" />
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>
                <button type="submit" className="propfirm-submit-btn">
                  Notify Me <FaAngleRight />
                </button>
              </form>
              
              {isSubmitted && (
                <motion.div 
                  className="propfirm-success-message"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Thank you! We'll notify you when we launch.
                </motion.div>
              )}
              
              <p className="propfirm-privacy-note">* We respect your privacy and will never share your email.</p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropFirmComingSoon;