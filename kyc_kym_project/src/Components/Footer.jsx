import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white ">
      <div className="container text-center">
        <h2 className="footer-title">Boswin Group</h2>
        <p className="footer-address">
          Address: 117/15, 1st Lane, Duwa Rd, Baddagana Rd, Pita Kotte.
        </p>
        <a href="https://maps.app.goo.gl/hJr1H1yg9s8DdjMM9" target="_blank" rel="noopener noreferrer" className="footer-map">
          View on Google Maps
        </a>
        <div className="footer-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="icon">
            <FaLinkedin />
          </a>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Boswin Group. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
