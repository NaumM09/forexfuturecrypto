import React, { useState } from 'react';
import '../styles/Contact.css'; // For styling


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');
  const [charCount, setCharCount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message') {
      setCharCount(value.length);
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      setStatus('Invalid email address. Please enter a valid email.');
      return;
    }

    // Send data to backend API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setCharCount(0);
      } else {
        const { error } = await response.json();
        setStatus(`Error: ${error || 'Something went wrong. Please try again later.'}`);
      }
    } catch (error) {
      setStatus('Oops! Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="contact-section">
      <h2>Contact Us</h2>
      <p>Have questions or need assistance? Reach out to us!😊</p>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            maxLength="1600"
            required
          />
          <div className="char-count">{1600 - charCount} characters remaining</div>
        </div>
        <button type="submit" className="submit-btn">Send Message</button>
      </form>

      {status && <div className={`status-message ${status.includes('error') ? 'error' : 'success'}`}>{status}</div>}
    </div>
  );
};

export default Contact;
