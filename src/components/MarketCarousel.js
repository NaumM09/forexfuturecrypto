import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

const MarketACarousel = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMarketData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY; // Fetching the API key from the environment
      const symbols = ["EURUSD", "USDJPY", "GBPUSD", "USDCAD", "AUDUSD", "NZDUSD", "USDMXN", "USDCHF", "EURGBP", "GBPJPY"];
      const requests = symbols.map(symbol =>
        axios.get(`https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=${symbol}&to_symbol=USD&interval=5min&apikey=${apiKey}`)
      );

      try {
        const responses = await Promise.all(requests);
        const data = responses.map((response, index) => {
          const symbol = symbols[index];
          const timeSeries = response.data["Time Series FX (5min)"];
          const lastTime = Object.keys(timeSeries)[0];
          const price = timeSeries[lastTime]["1. open"];
          return { symbol, price };
        });
        setMarketData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  return (
    <div className="market-carousel">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Carousel interval={3000} controls={false} indicators={false}>
          {marketData.map((data, index) => (
            <Carousel.Item key={index}>
              <div className="carousel-item-content">
                <h4>{data.symbol}</h4>
                <p>${data.price}</p>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default MarketACarousel;
