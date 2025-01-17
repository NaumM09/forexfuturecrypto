import React, { useState } from 'react';
import { FaTelegram } from 'react-icons/fa'; // Import Telegram icon
import { db } from '../firebase'; // Import Firestore instance
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; // Firestore methods
import '../styles/Contact.css'; // Update styling file

const Contact = () => {
  const [formData, setFormData] = useState({ email: '' });
  const [status, setStatus] = useState('');

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
      setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds
      return;
    }

    // Show loading status
    setStatus('Subscribing...');
    setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds

    try {
      // Check if the email already exists in the subscribers collection
      const q = query(collection(db, 'subscribers'), where('email', '==', formData.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setStatus('You have already subscribed.');
        setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds
        return;
      }

      // Save email to Firestore if it's not already subscribed
      const docRef = await addDoc(collection(db, 'subscribers'), {
        email: formData.email,
        subscribedAt: new Date(),
      });

      console.log('Document written with ID: ', docRef.id); // Log the document ID for successful subscription
      setStatus('Subscription successful! 🎉');
      setFormData({ email: '' });

      setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds

    } catch (error) {
      console.error('Error adding document: ', error);
      setStatus(`Oops! Something went wrong: ${error.message}`);
      setTimeout(() => setStatus(''), 5000); // Clear status after 5 seconds
    }
  };

  return (
    <div className="subscribe-section">
      <h2>Subscribe to Our Newsletter</h2>
      <p>Stay updated with the latest trading insights, tips, and bootcamp updates!</p>

      <form onSubmit={handleSubmit} className="subscribe-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Subscribe</button>
      </form>

      {status && (
        <div className={`status-message ${status.includes('Error') ? 'error' : 'success'}`}>
          {status}
        </div>
      )}

      <div className="telegram-section">
        <a href="https://t.me/forexfuturescryptofree" target="_blank" rel="noopener noreferrer" className="telegram-link">
          <FaTelegram className="telegram-icon" />
          Join our free Telegram Group 
        </a>
      </div>
    </div>
  );
};

export default Contact;
