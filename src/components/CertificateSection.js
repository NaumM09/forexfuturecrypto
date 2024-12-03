import React from 'react';
import '../styles/CertificateSection.css'; // Import corresponding CSS
import certificateImage1 from "../images/alphacap.png"; // Import the image
import certificateImage2 from "../images/ftmo.JPG"; // Import the image
const CertificateSection = () => {
  return (
    <section className="certificate-section">
      <h2>Start Your Funded Journey With Us</h2>
      <div className="certificate-container">
        <div className="certificate">
        <img
          src={certificateImage1} // Use the imported image
          alt="Certificate 1"
          className="certificate-image"
        />
          <p>Our Funded Certificates - Alpha Capital</p>
        </div>
        <div className="certificate">
          <img
             src={certificateImage2}
            alt="Certificate 2"
            className="certificate-image"
          />
          <p>Our Funded Certificates - FTMO</p>
        </div>
      </div>
    </section>
  );
};

export default CertificateSection;
