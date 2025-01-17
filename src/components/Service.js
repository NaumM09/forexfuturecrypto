import React from 'react';
import '../styles/Service.css';

const Service = () => {
  const courses = [
    {
      title: 'Forex Trading',
      description:
        'Learn the fundamentals of Forex trading, market analysis, and risk management. Perfect for beginners and experienced traders.',
    },
    {
      title: 'Futures Trading',
      description:
        'Master the art of Futures trading, including commodities, indices, and risk-hedging strategies.',
    },
    {
      title: 'Crypto Trading',
      description:
        'Navigate the dynamic world of cryptocurrencies with expert strategies and insights.',
    },
  ];

  return (
    <section className="course-overview">
      <div className="course-header">
        <h2>Comprehensive Trading Courses</h2>
        <p>
          Dive into our expertly designed courses to master Forex, Futures, and Cryptocurrency trading. Whether you're a beginner or an experienced trader, our step-by-step modules will guide you to success.
        </p>
      </div>
      <div className="course-list">
        {courses.map((course, index) => (
          <div key={index} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <a href="/signup" className="learn-more-btn">
              Learn More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
