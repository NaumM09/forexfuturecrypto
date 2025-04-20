import React, { useState } from "react";
import { motion } from "framer-motion";
import "../styles/Articles.css";

const Articles = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Enhanced articles data with images and categories
  const articles = [
    {
      title: "Trade Wars 2025: Global Market Impact & Strategic Opportunities",
      description:
        "Escalating trade tensions between major economies are reshaping global markets. Discover how these trade wars affect currency values, commodity prices, and create unique trading opportunities for the informed investor.",
      date: "April 20, 2025",
      link: "/articles/trade-wars-2025",
      image: "https://placehold.co/600x400/111827/e03c31?text=Trade+Wars",
      category: "Geopolitics",
      readTime: "7 min read",
      author: "Market Analysis Team",
    },
    {
      title: "The 2025 Bull Run: What to Expect",
      description:
        "As the global economy shows signs of recovery, the 2025 bull run could be a game-changer for investors. Explore why analysts believe it could be the most significant market event in years.",
      date: "January 1, 2025",
      link: "/articles/2025-bull-run",
      image: "https://placehold.co/600x400/111827/00cc99?text=2025+Bull+Run",
      category: "Market Analysis",
      readTime: "6 min read",
      author: "Market Analysis Team"
    },
    {
      title: "2025 Forex Market Outlook: Navigating Political Uncertainty",
      description:
        "Geopolitical shifts and economic policies in 2025 could significantly impact forex trading. Learn how to position yourself amidst changing interest rates, sanctions, and trade agreements.",
      date: "January 5, 2025",
      link: "/articles/2025-forex-outlook",
      image: "https://placehold.co/600x400/111827/0066cc?text=Forex+Outlook",
      category: "Forex",
      readTime: "8 min read",
      author: "Currency Analysis Desk"
    },
    {
      title: "Unveiling the AI Revolution in Trading",
      description:
        "Discover how artificial intelligence is reshaping trading strategies, enabling traders to predict market trends with unparalleled accuracy and efficiency. Are you ready to leverage this technology?",
      date: "January 10, 2025",
      link: "/articles/ai-in-trading",
      image: "https://placehold.co/600x400/111827/a855f7?text=AI+Trading",
      category: "Technology",
      readTime: "5 min read",
      author: "Tech Trends Team"
    },
  ];

  // Category badge component with dynamic styling
  const CategoryBadge = ({ category }) => {
    // Map categories to colors
    const categoryColors = {
      "Market Analysis": { bg: "rgba(0, 204, 153, 0.15)", text: "#00cc99" },
      "Forex": { bg: "rgba(0, 102, 204, 0.15)", text: "#0066cc" },
      "Technology": { bg: "rgba(168, 85, 247, 0.15)", text: "#a855f7" },
      "Crypto": { bg: "rgba(247, 147, 26, 0.15)", text: "#f7931a" },
      "Strategy": { bg: "rgba(204, 102, 0, 0.15)", text: "#cc6600" },
      "Geopolitics": { bg: "rgba(224, 60, 49, 0.15)", text: "#e03c31" }
    };
    
    const { bg, text } = categoryColors[category] || 
      { bg: "rgba(160, 174, 192, 0.15)", text: "#a0aec0" };
    
    return (
      <span className="article-category" style={{ backgroundColor: bg, color: text }}>
        {category}
      </span>
    );
  };

  return (
    <section className="articles-section">
      <div className="articles-container">
        <div className="articles-header">
          <h2 className="articles-title">
            Latest <span className="highlight">Articles</span>
          </h2>
          <p className="articles-subtitle">
            Stay ahead with our latest insights, analysis, and market forecasts
          </p>
          <a href="/articles" className="view-all-btn">View All Articles</a>
        </div>
        
        <div className="articles-grid">
          {articles.map((article, index) => (
            <motion.div 
              key={index} 
              className="article-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="article-image-container">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="article-image" 
                />
                <CategoryBadge category={article.category} />
              </div>
              
              <div className="article-content">
                <div className="article-meta">
                  <span className="article-date">{article.date}</span>
                  <span className="article-dot">•</span>
                  <span className="article-read-time">{article.readTime}</span>
                </div>
                
                <h3 className="article-title">{article.title}</h3>
                <p className="article-description">{article.description}</p>
                
                <div className="article-footer">
                  <span className="article-author">By {article.author}</span>
                  <motion.a 
                    href={article.link} 
                    className="article-link"
                    animate={{ x: hoveredIndex === index ? 5 : 0 }}
                  >
                    Read More <span className="arrow-icon">→</span>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;