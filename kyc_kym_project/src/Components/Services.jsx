import React from 'react';
import { FaFileSignature, FaUserShield, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Services = () => {
  // Animation variants for icons with color and position changes
  const iconVariants = {
    hidden: { opacity: 0, x: -100, scale: 0.5, rotate: 90 }, // Initial state
    visible: { opacity: 1, x: 0, scale: 1, rotate: 0 },     // Final state
  };

  // Animation variants for the background of each service item
  const bgVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  // Set up intersection observer with useInView for triggering animations
  const [ref, inView] = useInView({
    triggerOnce: false,   // Allow animation every time it's in view
    threshold: 0.3,       // Trigger when 30% of the section is visible
  });

  return (
    <section className="services container my-5 text-center" id="service" ref={ref}>
      <h2 className="text-primary mb-5">Our Modern Services</h2>
      <div className="row my-4">
        {/* Service 1 */}
        <div className="col-12 col-md-4">
          <motion.div
            className="service-item bg-white p-4 rounded shadow"
            variants={bgVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05, backgroundColor: "#f0f8ff" }}  // Hover effect for item
          >
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.2, color: "#3498db" }}  // Hover effect for icon
            >
              <FaFileSignature className="service-icon display-4 text-primary" />
            </motion.div>
            <h3 className="mt-3">KYC Verification</h3>
            <p>We provide secure KYC (Know Your Customer) verification to ensure compliance and identity validation.</p>
          </motion.div>
        </div>

        {/* Service 2 */}
        <div className="col-12 col-md-4">
          <motion.div
            className="service-item bg-white p-4 rounded shadow"
            variants={bgVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ scale: 1.05, backgroundColor: "#ffe4b2" }}  // Hover effect for item
          >
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.2, color: "#e67e22" }}  // Hover effect for icon
            >
              <FaUserShield className="service-icon display-4 text-primary" />
            </motion.div>
            <h3 className="mt-3">Fraud Prevention</h3>
            <p>Our fraud prevention tools protect your business from financial crimes and malicious activities.</p>
          </motion.div>
        </div>

        {/* Service 3 */}
        <div className="col-12 col-md-4">
          <motion.div
            className="service-item bg-white p-4 rounded shadow"
            variants={bgVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ scale: 1.05, backgroundColor: "#eaf2f8" }}  // Hover effect for item
          >
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ scale: 1.2, color: "#1abc9c" }}  // Hover effect for icon
            >
              <FaGlobe className="service-icon display-4 text-primary" />
            </motion.div>
            <h3 className="mt-3">Global Compliance</h3>
            <p>Our platform supports businesses across multiple countries with comprehensive global compliance solutions.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Services;
