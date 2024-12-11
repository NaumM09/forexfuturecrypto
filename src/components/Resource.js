import React from 'react';
import '../styles/Resource.css'; // Reuse styles or add new styles here
import pdfIcon from '../images/pdf-icon.png'; // Add a relevant PDF icon

const FreeResource = () => {
    return (
        <div className="download-section">
            <h2>Get Your Free Resource</h2>
            <p>Download our free PDF guide to enhance your trading skills and knowledge.</p>
            <a 
                href="/Free-Beginners-Content.pdf" 
                className="download-button" 
                download
            >
                <img src={pdfIcon} alt="PDF Icon" className="pdf-icon" />
                Download Now
            </a>
        </div>
    );
};

export default FreeResource;

