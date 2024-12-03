import React from 'react';

const WhatsAppButton = () => {
  const phoneNumber = "+27810593062"; // Replace with your WhatsApp number
  const message = "Hi there! 👋 I need assistance."; // Your pre-filled message

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
        textDecoration: 'none',
      }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="Chat on WhatsApp"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          boxShadow: '0px 2px 10px rgba(0,0,0,0.3)',
        }}
      />
    </a>
  );
};

export default WhatsAppButton;
