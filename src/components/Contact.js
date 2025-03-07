import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase'; // Import Firestore instance
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; // Firestore methods
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Clear status message after 5 seconds
  useEffect(() => {
    let timer;
    if (status) {
      timer = setTimeout(() => setStatus(''), 5000);
    }
    return () => clearTimeout(timer);
  }, [status]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('Invalid email address. Please try again.');
      return;
    }

    // Show loading status
    setIsSubmitting(true);
    setStatus('Subscribing...');

    try {
      // Check if the email already exists in the subscribers collection
      const q = query(collection(db, 'subscribers'), where('email', '==', formData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setStatus('You have already subscribed.');
        setIsSubmitting(false);
        return;
      }

      // Save email to Firestore if it's not already subscribed
      const docRef = await addDoc(collection(db, 'subscribers'), {
        email: formData.email,
        subscribedAt: new Date(),
      });

      console.log('Document written with ID: ', docRef.id);
      setStatus('Subscription successful! 🎉');
      setFormData({ email: '' });
      setIsSubmitting(false);

    } catch (error) {
      console.error('Error adding document: ', error);
      setStatus(`Oops! Something went wrong: ${error.message}`);
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">
            Subscribe to Our <span className="highlight">Newsletter</span>
          </h2>
          <p className="contact-description">
            Stay updated with the latest trading insights, tips, and community updates!
          </p>
        </div>

        <div className="subscription-card">
          <form onSubmit={handleSubmit} className="subscribe-form">
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                required
              />
            </div>
            
            <button 
              type="submit" 
              className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner"></span>
                  <span>Subscribing...</span>
                </>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          
          <AnimatePresence>
            {status && (
              <motion.div 
                className={`status-message ${status.includes('Error') || status.includes('Invalid') || status.includes('Oops') ? 'error' : status.includes('already') ? 'warning' : 'success'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {status.includes('Error') || status.includes('Invalid') || status.includes('Oops') ? (
                  <FaExclamationTriangle className="status-icon" />
                ) : status.includes('already') ? (
                  <FaExclamationTriangle className="status-icon" />
                ) : (
                  <FaCheckCircle className="status-icon" />
                )}
                <span>{status}</span>
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="newsletter-benefits">
            <div className="benefit-item">
              <span className="benefit-text">Weekly Live Streams</span>
            </div>
            <div className="benefit-item">
              <span className="benefit-text">Community event notifications</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;