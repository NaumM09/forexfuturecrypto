import React, { useState, useEffect } from 'react';
import '../styles/Testimonial.css'; // Import your CSS for styling

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "This mentorship has transformed my approach to Forex trading. Highly recommended!",
      author: "John Doe",
    },
    {
      text: "The strategies taught here are incredible. I finally feel confident in my trades.",
      author: "Jane Smith",
    },
    {
      text: "I’ve learned more in a month than I did in years of trial and error. Amazing!",
      author: "Samuel Lee",
    },
    {
      text: "The community support is unmatched. This is the best place to learn trading!",
      author: "Alex Johnson",
    },
    {
      text: "The mentors are top-notch, and the materials are clear and concise. Absolutely worth it.",
      author: "Jessica Brown",
    },
    // Add more testimonials here
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [testimonials.length]);

  return (
    <section className="testimonial">
      <div className="testimonial-header">
        <h2>What Our Traders Are Saying</h2>
        <p>Real experiences from real traders who have transformed their trading journey with us.</p>
      </div>

      <div className="testimonial-carousel">
        {testimonials.map((testimonial, index) => (
          <div
            className={`testimonial-slide ${index === currentIndex ? 'active' : ''}`}
            key={index}
          >
            <p className="testimonial-text">"{testimonial.text}"</p>
            <p className="testimonial-author">- {testimonial.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
