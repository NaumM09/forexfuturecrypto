import React from 'react';
import '../styles/WhyChooseUs.css'; // CSS for this section

const WhyChooseUs = () => {
  const features = [
    {
      title: 'Comprehensive Trading Curriculum',
      description: 'Our programs are meticulously designed to cover every aspect of trading, from foundational principles to advanced technical analysis and risk management strategies.',
    },
    {
      title: 'Expert-Led Education',
      description: 'Learn directly from industry professionals with years of proven experience in Forex, Futures, and Cryptocurrency markets. Gain insights from real-world trading scenarios.',
    },
    {
      title: 'Tailored Training Solutions',
      description: 'Whether you’re a beginner or an advanced trader, our courses adapt to your skill level, ensuring a personalized learning experience that aligns with your goals.',
    },
    {
      title: 'Risk-Free Learning Environment',
      description: 'Our unique approach ensures you gain knowledge and confidence in a simulated, investment-free zone before committing capital to live markets.',
    },
    {
      title: 'Interactive Learning Platform',
      description: 'Engage with cutting-edge tools, including live webinars, interactive quizzes, and in-depth video tutorials, designed to keep you ahead of market trends.',
    },
  ];

  return (
    <section className="why-choose-us">
      <h2>WHAT SETS US APART AS THE LEADING TRADING ACADEMY?</h2>
      <div className="features">
        {features.map((feature, index) => (
          <div key={index} className="feature">
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;

