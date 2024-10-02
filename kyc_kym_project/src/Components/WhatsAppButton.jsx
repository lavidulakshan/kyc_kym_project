import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css'; // Add necessary styling
import logo from '../images/logo.png'; // Import your logo

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle chat window visibility
  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  // Open WhatsApp when "Start Chat" is clicked
  const openWhatsApp = () => {
    const phoneNumber = "+94771234567"; // Replace with your WhatsApp number
    const message = "Hi there! I would like to know more about your services.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="whatsapp-chat-container">
      {/* Floating "Message Us" Button */}
      <div className="whatsapp-button" onClick={toggleChatWindow}>
        <FaWhatsapp className="whatsapp-icon" />
        <span>Message Us</span>
      </div>

      {/* Chat window - toggle based on isOpen state */}
      {isOpen && (
        <div className="whatsapp-chat-window">
          <div className="chat-header">
            <img src={logo} alt="Boswin Group Logo" className="company-logo" /> {/* Replace with your company logo */}
            <div className="chat-title">
              <h5>Boswin Group</h5>
              <span>Typically replies within seconds</span>
            </div>
            {/* Customized Close Button */}
            <button className="close-chat" onClick={toggleChatWindow}>✖</button>
          </div>
          <div className="chat-body">
            <div className="chat-message">
              <p>Hi there! How can I help you?</p>
            </div>
            <button className="start-chat-button" onClick={openWhatsApp}>
              <FaWhatsapp /> Start Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppButton;
