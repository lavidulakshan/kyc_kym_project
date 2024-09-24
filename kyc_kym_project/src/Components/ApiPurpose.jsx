import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import './ApiPurpose.css';
import { FaArrowRight } from 'react-icons/fa'; // Importing arrow icon

import real from '../images/real.gif'; // Correct image import
import security from '../images/security.gif'; // Correct image import
import data from '../images/data1.gif'; // Correct image import

const ApiPurpose = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1200 });
    const popUpButton = document.querySelector('.see-more-btn');
    const interval = setInterval(() => {
      popUpButton.classList.add('animate-pop');
      setTimeout(() => {
        popUpButton.classList.remove('animate-pop');
      }, 1000);
    }, 3000); // Repeat animation every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className="feature-section py-5">
        <div className="container">
          <h2 className="text-center mb-5" data-aos="fade-up">Purpose of Our Site</h2>

          {/* Purpose 1 */}
          <div className="row purpose-row align-items-center mb-5" data-aos="fade-right" data-aos-delay="200">
            <div className="col-md-4 text-center">
              <img
                src={data}
                alt="Seamless Data Integration"
                className="feature-image img-fluid"
                style={{ maxWidth: '80%' }}
              />
            </div>
            <div className="col-md-8">
              <h3 className="purpose-title">Seamless Data Integration</h3>
              <p className="purpose-description">
                Our platform ensures seamless data integration with advanced API systems, enabling smooth collaboration between multiple data sources. This seamless integration reduces manual errors and enhances operational efficiency.
              </p>
            </div>
          </div>

          {/* Purpose 2 */}
          <div className="row purpose-row align-items-center mb-5" data-aos="fade-left" data-aos-delay="400">
            <div className="col-md-4 text-center">
              <img
                src={real}
                alt="Real-Time Verification"
                className="feature-image img-fluid"
                style={{ maxWidth: '80%' }}
              />
            </div>
            <div className="col-md-8">
              <h3 className="purpose-title">Real-Time Verification</h3>
              <p className="purpose-description">
                Real-time verification allows instant customer identity validation, enhancing customer onboarding and reducing fraud risks.
              </p>
            </div>
          </div>

          {/* Purpose 3 */}
          <div className="row purpose-row align-items-center mb-5" data-aos="fade-right" data-aos-delay="600">
            <div className="col-md-4 text-center">
              <img
                src={security}
                alt="Enhanced Security"
                className="feature-image img-fluid"
                style={{ maxWidth: '80%' }}
              />
            </div>
            <div className="col-md-8">
              <h3 className="purpose-title">Enhanced Security</h3>
              <p className="purpose-description">
                Our platform uses industry-leading encryption and security protocols, ensuring the protection of sensitive customer data during every transaction.
              </p>
            </div>
          </div>

          {/* See More Button */}
          <div className="text-center">
            <button className="btn btn-primary see-more-btn" onClick={handleOpenModal}>
              See More Details <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>How Our API Works</h2>
            <p>
              Our API simplifies the KYC process by providing seamless integration, real-time data verification, and enhanced security.
            </p>
            <ol>
              <li><strong>Data Submission:</strong> Customers submit their data through a secure form.</li>
              <li><strong>Real-Time Verification:</strong> Our API validates the data instantly using trusted databases.</li>
              <li><strong>API Response:</strong> The verification status is sent back, enabling swift onboarding or necessary actions.</li>
              <li><strong>Enhanced Security:</strong> All data is encrypted and securely transmitted to ensure confidentiality.</li>
            </ol>
          </div>
        </div>
      )}
    </>
  );
};

export default ApiPurpose;
