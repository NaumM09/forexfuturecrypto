import React, { useState, useEffect } from 'react';
import '../styles/TradingMemeCarousel.css';  // Import the CSS for styling

// Import your meme images
import meme1 from '../images/meme1.PNG';
import meme2 from '../images/meme2.PNG';
import meme3 from '../images/meme3.PNG';
import meme4 from '../images/meme4.PNG';
import meme5 from '../images/meme5.PNG';

const TradingMemeCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Use the imported meme images in an array
  const memes = [meme1, meme2, meme3, meme4, meme5];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % memes.length);  // Automatically rotate memes
    }, 3000);  // Change meme every 3 seconds

    return () => clearInterval(interval);  // Cleanup on component unmount
  }, [memes.length]);

  return (
    <section className="trading-meme-gallery">
      <div className="meme-heading">
        <h2>Current Mood</h2>  {/* Heading for the meme section */}
      </div>
      <div className="meme-container">
        <div className="meme-images">
          <img src={memes[(currentIndex) % memes.length]} alt="Meme 1" className="meme" />
          <img src={memes[(currentIndex + 1) % memes.length]} alt="Meme 2" className="meme" />
          <img src={memes[(currentIndex + 2) % memes.length]} alt="Meme 3" className="meme" />
        </div>
      </div>
    </section>
  );
};

export default TradingMemeCarousel;
