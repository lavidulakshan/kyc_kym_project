import React, { useEffect } from 'react';
import './Toaster.css';

const Toaster = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose(); // Automatically close the toast after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); // Clear the timeout when the component is unmounted
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`toaster ${type}`}>
      <p>{message}</p>
      <button onClick={onClose} className="close-btn">✖</button>
    </div>
  );
};

export default Toaster;
