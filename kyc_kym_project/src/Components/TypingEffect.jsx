import React, { useState, useEffect } from "react";
// import './TypingEffect.css'; // You can add this for optional CSS, or include styles in your main CSS file

const TypingEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      setIndex((prev) => prev + 1);
    }, 100); // Adjust typing speed here

    if (index === text.length) {
      clearInterval(typingInterval);
      setTimeout(() => {
        setDisplayedText(""); // Reset text after 3 seconds delay
        setIndex(0);
      }, 3000); // Wait for 3 seconds before restarting
    }

    return () => clearInterval(typingInterval);
  }, [index, text]);

  return <h1 className="display-4 text-white hero-title typing-effect">{displayedText}</h1>;
};

export default TypingEffect;