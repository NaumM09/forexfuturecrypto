import React from "react";
import "../styles/Analysis.css"; // Import the CSS file

const WeeklyAnalysis = () => {
  const videos = [
    {
      id: "oS4YoboIgI4",
      title: "Live Forex Forcast",
      description: "Understand the fundamentals of trading this week.",
    },
    {
      id: "i7zhpeLlnfQ?si",
      title: "Live Swing Trading Updates",
      description: "Learn about market trends and predictions.",
    },
    {
      id: "hHvOKIOSajQ?si",
      title: "XAU Analysis",
      description: "A deep dive into market corrections.",
    },
    {
      id: "AGKYguqcTVk?si",
      title: "What is a real Order Block",
      description: "Analyzing the impact of global events on markets.",
    },
    {
      id: "hJ6LSDNnZlw?si",
      title: "Secret to trading US Oil like a Pro",
      description: "Strategies for maximizing profits this week.",
    },
  ];

  return (
    <section className="weekly-analysis">
      <h2 className="weekly-analysis-header">Weekly Analysis</h2>
      <div className="video-grid">
        {videos.map((video, index) => (
          <div key={index} className="video-card">
            <iframe
              className="video-player"
              src={`https://www.youtube.com/embed/${video.id}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="video-description">
              <h3 className="video-title">{video.title}</h3>
              <p className="video-text">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WeeklyAnalysis;
