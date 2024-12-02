import React, { useState } from "react";
import "../styles/FAQ.css"; // Ensure to link the new CSS

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "If I send you money, will you trade for me?",
      answer:
        "No, we do not offer trading services or manage funds. We focus on teaching you how to trade and providing you with the skills to trade independently. Avoid anyone promising guaranteed returns or offering to trade for you.",
    },
    {
      question: "What type of trading do you cover?",
      answer:
        "We cover Forex, Futures, and Cryptocurrency trading strategies, helping you understand market dynamics and develop your own trading style.",
    },
    {
      question: "Do I need prior experience to join?",
      answer:
        "Not at all! Our mentorship is designed for beginners and experienced traders alike. We start with the basics and build up to advanced strategies.",
    },
    {
      question: "How do I access the mentorship materials?",
      answer:
        "Once you sign up, you'll gain access to our course materials, live streams, and the private community forum via your dashboard.",
    },
    {
      question: "Are there any guarantees of profit?",
      answer:
        "No, trading carries inherent risks, and past performance is not indicative of future results. Our goal is to equip you with knowledge, not to promise financial outcomes.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section">
         <Helmet>
                <title>Frequently Asked Questions</title>
                <meta 
                    name="description" 
                    content="Get answers to common questions about our trading mentorship programs." 
                />
            </Helmet>
      <h2 className="faq-title">Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? "active" : ""}`}
            onClick={() => toggleFAQ(index)}
          >
            <div className="faq-question">
              {faq.question} <span>▼</span>
            </div>
            <div className="faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
