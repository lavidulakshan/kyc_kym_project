import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <motion.button
        whileHover={{ scale: 1.2, backgroundColor: '#3498db', color: '#fff' }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 1, backgroundColor: '#e74c3c', color: '#fff' }}
        transition={{ type: 'spring', stiffness: 300 }}
        style={{
          padding: '10px 20px',
          fontSize: '18px',
          borderRadius: '5px',
          border: 'none',
          cursor: 'pointer',
          outline: 'none',
        }}
      >
        Hover Me!
      </motion.button>
    </div>
  );
};

export default AnimatedButton;
