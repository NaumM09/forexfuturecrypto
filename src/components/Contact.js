import React, { useState } from 'react';
import { FaTelegram } from 'react-icons/fa'; // Import Telegram icon
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
      return;
    }

    // Mock backend call
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email }),
      });

      if (response.ok) {
        setStatus('Subscription successful! 🎉 Check your inbox.');
        setFormData({ email: '' });
      } else {
        const { error } = await response.json();
        setStatus(`Error: ${error || 'Something went wrong. Please try again.'}`);
      }
    } catch (error) {
      setStatus('Oops! Something went wrong. Please try again later.');
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
