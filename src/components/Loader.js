import React, { useState, useEffect } from 'react';
import '../styles/Loader.css'; // Add styles here
import loaderImage from '../images/logo-loader.png';

const Loader = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return oldProgress + 10; // Increment by 10% every 300ms
            });
        }, 300);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loader-container">
            <img src={loaderImage} alt="Loader" className="loader-image" />
            <div className="progress-bar">
                <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="loader-text">Profitable Trader Loading... {progress}%</p>
        </div>
    );
};

export default Loader;
