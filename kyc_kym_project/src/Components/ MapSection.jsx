import React from 'react';
import './MapSection.css';

const MapSection = () => {
  return (
    <section className="map-section container my-5">
      <h2 className="text-center text-primary" data-aos="fade-up">Find Us Here</h2>
      <div className="map-container">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12619.488392047842!2d79.912306!3d6.890077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593be134c07d%3A0x30e202c605f632b6!2zNi44OTAwNzcsIDc5LjkxMjMwNg!5e0!3m2!1sen!2slk!4v1630668650503!5m2!1sen!2slk"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default MapSection;
