import React from "react";
import { FaRocket, FaShieldAlt, FaLock, FaIndustry } from "react-icons/fa";
import './WhyChooseUs.css';

const WhyChooseUs = () => {
  return (
    <section className="container my-5">
      <h2 className="text-center text-primary" data-aos="fade-up">Why Choose Us?</h2> {/* Ensure title is visible */}
      <div className="row my-4 justify-content-center">
        <div className="col-12 col-sm-6 col-md-3 mb-4" data-aos="fade-up" data-aos-delay="200">
          <div className="glass-card text-white h-100 p-4 shadow text-center">
            <FaRocket className="display-4 mb-3 icon" /> {/* Correct icon placement */}
            <h3>Fast Verification</h3>
            <p>Complete the process in just minutes with real-time updates.</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-4" data-aos="fade-up" data-aos-delay="400">
          <div className="glass-card text-white h-100 p-4 shadow text-center">
            <FaShieldAlt className="display-4 mb-3 icon" />
            <h3>Secure & Reliable</h3>
            <p>Your data is protected with industry-leading encryption.</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-4" data-aos="fade-up" data-aos-delay="600">
          <div className="glass-card text-white h-100 p-4 shadow text-center">
            <FaLock className="display-4 mb-3 icon" />
            <h3>Regulatory Compliant</h3>
            <p>Fully compliant with international KYM/KYC regulations and standards.</p>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-md-3 mb-4" data-aos="fade-up" data-aos-delay="800">
          <div className="glass-card text-white h-100 p-4 shadow text-center">
            <FaIndustry className="display-4 mb-3 icon" />
            <h3>Wide Industry Support</h3>
            <p>Supporting various sectors including finance, e-commerce, and more.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
