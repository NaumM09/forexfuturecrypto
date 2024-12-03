import React, { useState } from 'react';
import '../styles/Testimonial.css';  // Import the styles for the testimonial section

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      text: "The mentorship program has completely changed my perspective on Forex trading. I now approach each trade with confidence.",
      author: "Sipho Mthembu",
      province: "KwaZulu-Natal",
    },
    {
      text: "I was struggling with trading before joining, but now I feel much more in control of my decisions. The strategies are practical and effective.",
      author: "Zanele Khumalo",
      province: "Gauteng",
    },
    {
      text: "I’ve been in trading for years, but the community here has helped me fine-tune my strategy and improve my results significantly.",
      author: "Thabo Ndlovu",
      province: "Limpopo",
    },
    {
      text: "The support and mentorship have been outstanding. It’s like having a personal coach with you at every step.",
      author: "Kgomotso Lesiamo",
      province: "Free State",
    },
    {
      text: "I was skeptical at first, but after applying the techniques taught, my trading results speak for themselves. Highly recommended.",
      author: "Lebogang Dlamini",
      province: "Western Cape",
    },
  ];

  const goToNextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const goToPrevTestimonial = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="testimonial">
      <div className="testimonial-header">
        <h2>What Our Traders Are Saying</h2>
        <p>Real experiences from real traders who have transformed their trading journey with us.</p>
      </div>

      <div className="testimonial-carousel">
        <button className="carousel-button prev" onClick={goToPrevTestimonial}>←</button>

        <div className="testimonial-slide">
          <p className="testimonial-text">"{testimonials[currentIndex].text}"</p>
          <p className="testimonial-author">- {testimonials[currentIndex].author}, {testimonials[currentIndex].province}</p>
        </div>

        <button className="carousel-button next" onClick={goToNextTestimonial}>→</button>
      </div>
    </section>
  );
};

export default Testimonial;
