import React, { useState, useEffect } from 'react';
import './VerifyStroke.css';

const VerifyStroke = () => {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Hide animation after 3 seconds (optional if you want to remove animation later)
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);

    // Cleanup timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="checkmark-container">
      {showAnimation && (
        <div className="overlay">
          <div className="content">
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark-circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark-check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
            <p className="message">Please go to your profile</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyStroke;
