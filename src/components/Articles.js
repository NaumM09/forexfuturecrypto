import React from "react";
import "../styles/Articles.css"; // Link to the CSS file

const Articles = () => {
  const articles = [
    {
      title: "The 2025 Bull Run: What to Expect",
      description:
        "As the global economy shows signs of recovery, the 2025 bull run could be a game-changer for investors. Explore why analysts believe it could be the most significant market event in years.",
      date: "January 1, 2025",
      link: "/articles/2025-bull-run",
    },
    {
      title: "2025 Forex Market Outlook: Navigating Political Uncertainty",
      description:
        "Geopolitical shifts and economic policies in 2025 could significantly impact forex trading. Learn how to position yourself amidst changing interest rates, sanctions, and trade agreements.",
      date: "January 5, 2025",
      link: "/articles/2025-forex-outlook",
    },
    {
      title: "Unveiling the AI Revolution in Trading",
      description:
        "Discover how artificial intelligence is reshaping trading strategies, enabling traders to predict market trends with unparalleled accuracy and efficiency. Are you ready to leverage this technology?",
      date: "January 10, 2025",
      link: "/articles/ai-in-trading",
    },
  ];

  return (
    <div className="articles">
      <h2>Latest Articles</h2>
      <div className="articles-grid">
        {articles.map((article, index) => (
          <div key={index} className="article-item">
            <div className="article-description">
              <h3 className="article-title">{article.title}</h3>
              <p className="article-date">{article.date}</p>
              <p>{article.description}</p>
            </div>
            <a href={article.link} className="article-link">
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;
