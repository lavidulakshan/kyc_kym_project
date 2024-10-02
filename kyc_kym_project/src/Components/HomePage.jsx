import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaShieldAlt, FaLock, FaRocket, FaIndustry, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaArrowRight, FaFileSignature, FaUserShield, FaGlobe } from "react-icons/fa";
import BarChart from "./ BarChart";
import './HomePage.css';
import MapSection from "./ MapSection";
import ApiPurpose from "./ApiPurpose";
import { useLocation } from 'react-router-dom';



import data from '../images/back.gif'; // Correct image import
import WhyChooseUs from "./WhyChooseUs";
import AnimatedButton from "./AnimatedButton ";
import Services from "./Services";
import TypingEffect from "./TypingEffect";


const Homepage = () => {


  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#about") {
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);


  useEffect(() => {
    if (location.hash === "#service") {
      const aboutSection = document.getElementById("service");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  


  useEffect(() => {
    if (location.hash === "#contactus") {
      const aboutSection = document.getElementById("contactus");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);



  useEffect(() => {
    if (location.hash === "#/") {
      const aboutSection = document.getElementById("service");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);



  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section
  className="hero d-flex justify-content-center align-items-center text-center"
  style={{
    height: "80vh",
    backgroundImage: `url(${data})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    position: 'relative',
    overflow: 'hidden'
  }}
>
  <div className="hero-overlay"></div> {/* Adds a gradient overlay */}
  <div className="hero-content bg-dark bg-opacity-50 p-4 rounded animated fadeInUp" data-aos="fade-up">
    <TypingEffect text="Fast & Secure KYM/KYC Verification" />
    {/* <h1 className="display-4 text-white hero-title animated fadeInDown" data-aos="fade-down" data-aos-duration="1000">
      Fast & Secure KYM/KYC Verification
    </h1> */}
    <p className="lead text-white hero-subtitle animated fadeInRight" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
      Seamless verification process that ensures compliance and trust between businesses and customers.
    </p>
    {/* Interactive message with hover effect */}
    <p className="hero-message text-white animated fadeInLeft" data-aos="fade-left" data-aos-delay="600" data-aos-duration="1000">
      <strong>Ready to enhance your business security?</strong><br />
      Our KYM/KYC verification platform ensures compliance, trust, and seamless user verification.
    </p>
    {/* Add a subtle hover effect */}
    <a href="#about" className="btn btn-gradient btn-lg mt-3" data-aos="zoom-in" data-aos-delay="900" data-aos-duration="1000">
      Learn More About Us <FaArrowRight />
    </a>
  </div>
</section>



      {/* About Us Section */}
      <section className="about-us container my-5" id="about">
        <div className="row align-items-center">
          <div className="col-md-6" data-aos="fade-right">
            <h2 className="text-primary">About Us</h2>
            <p>Our platform is dedicated to making KYM/KYC verification simple, fast, and secure. We believe in ensuring compliance while building trust between businesses and customers.</p>
            <p>With years of experience, our goal is to help businesses stay compliant with global regulations, providing reliable and easy-to-use tools that foster confidence, security, and peace of mind.</p>
            <button className="btn btn-primary learn-more-btn">Learn More</button>

          </div>
          <div className="col-md-6" data-aos="fade-left">
            <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?fit=crop&w=800&q=80" alt="About Us" className="img-fluid rounded" />
          </div>
        </div>
      </section>

      


      {/* Services Section */}
      <Services/>
    
      {/* <section className="services container my-5 text-center" id="service">
        <h2 data-aos="fade-up" className="text-primary">Our Services</h2>
        <div className="row my-4">
          <div className="col-12 col-md-4" data-aos="fade-up" data-aos-delay="200">
            <div className="service-item bg-white p-4 rounded shadow">
              <FaFileSignature className="service-icon display-4 text-primary" />
              <h3>KYC Verification</h3>
              <p>We provide secure KYC (Know Your Customer) verification to ensure compliance and identity validation.</p>
            </div>
          </div>
          <div className="col-12 col-md-4" data-aos="fade-up" data-aos-delay="400">
            <div className="service-item bg-white p-4 rounded shadow">
              <FaUserShield className="service-icon display-4 text-primary" />
              <h3>Fraud Prevention</h3>
              <p>Our fraud prevention tools protect your business from financial crimes and malicious activities.</p>
            </div>
          </div>
          <div className="col-12 col-md-4" data-aos="fade-up" data-aos-delay="600">
            <div className="service-item bg-white p-4 rounded shadow">
              <FaGlobe className="service-icon display-4 text-primary" />
              <h3>Global Compliance</h3>
              <p>Our platform supports businesses across multiple countries with comprehensive global compliance solutions.</p>
            </div>
          </div>
        </div>
      </section> */}




      {/* Why Choose Us Section */}
      <WhyChooseUs />



      {/* Why Choose Us Section */}



      {/* How It Works Section */}
      <section className="how-it-works container my-5 ">
        <h2 data-aos="fade-up" className="text-center text-primary">How It Works?</h2>
        <div className="steps-container d-flex justify-content-between align-items-center my-4">
          <div className="step-item" data-aos="zoom-in" data-aos-delay="200">
            <div className="step-circle">1</div>
            <p>Sign Up or Log In</p>
          </div>
          <div className="arrow" data-aos="zoom-in" data-aos-delay="300">
            <FaArrowRight />
          </div>
          <div className="step-item" data-aos="zoom-in" data-aos-delay="400">
            <div className="step-circle">2</div>
            <p>Fill Out the Information</p>
          </div>
          <div className="arrow" data-aos="zoom-in" data-aos-delay="500">
            <FaArrowRight />
          </div>
          <div className="step-item" data-aos="zoom-in" data-aos-delay="600">
            <div className="step-circle">3</div>
            <p>Upload Documents</p>
          </div>
          <div className="arrow" data-aos="zoom-in" data-aos-delay="700">
            <FaArrowRight />
          </div>
          <div className="step-item" data-aos="zoom-in" data-aos-delay="800">
            <div className="step-circle">4</div>
            <p>Get Verified & Start</p>
          </div>
        </div>
        <BarChart /> {/* Add the bar chart here */}
      </section>

      {/* our trusted parners */}
      <section className="partners container my-5">
        <h2 className="text-center text-primary" data-aos="fade-up">Our Trusted Partners</h2>
        <p className="partner-description text-center" data-aos="fade-up">
          We are proud to collaborate with leading organizations worldwide to deliver the best KYM/KYC solutions.
        </p>
        <div className="partner-logos row justify-content-center">
          <div className="logo-item col-md-2" data-aos="fade-up" data-aos-delay="200">
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/05/Visa_Inc._logo.svg" alt="Visa" className="img-fluid logo" />
          </div>
          <div className="logo-item col-md-2" data-aos="fade-up" data-aos-delay="400">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Alipay_logo.svg" alt="Alipay" className="img-fluid logo" />
          </div>
          <div className="logo-item col-md-2" data-aos="fade-up" data-aos-delay="600">
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/PayPal_Logo.svg" alt="PayPal" className="img-fluid logo" />
          </div>
          <div className="logo-item col-md-2" data-aos="fade-up" data-aos-delay="800">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/16/Mastercard-logo.svg" alt="MasterCard" className="img-fluid logo" />
          </div>
          <div className="logo-item col-md-2" data-aos="fade-up" data-aos-delay="1000">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/83/Stripe_logo.png" alt="Stripe" className="img-fluid logo" />
          </div>
        </div>
      </section>

      {/* our trusted parners */}




      {/* frequently asked questions */}

      <section className="faq container my-5">
        <h2 className="text-center text-primary" data-aos="fade-up">Frequently Asked Questions</h2>
        <div className="faq-item" data-aos="fade-up" data-aos-delay="200">
          <h3>What is KYM/KYC verification?</h3>
          <p>KYM (Know Your Merchant) and KYC (Know Your Customer) are regulatory processes used to verify the identity of businesses and customers to prevent fraud and ensure compliance with regulations.</p>
        </div>
        <div className="faq-item" data-aos="fade-up" data-aos-delay="400">
          <h3>How long does the verification process take?</h3>
          <p>The KYM/KYC verification process typically takes a few minutes once all documents have been uploaded correctly. However, it may take longer depending on the complexity of the review.</p>
        </div>
        <div className="faq-item" data-aos="fade-up" data-aos-delay="600">
          <h3>Is my data secure?</h3>
          <p>Yes, we use industry-standard encryption to ensure your data is protected during the verification process. Your information is never shared without your consent.</p>
        </div>
      </section>

      {/* frequently asked questions */}




      {/* purpose section */}

      <ApiPurpose />


      {/* purpose section */}


      {/* Contact Us Section */}
      <section className="contact-us container my-5" id="contactus">
        <h2 data-aos="fade-up" className="text-center text-primary">Contact Us</h2>
        <div className="contact-info row justify-content-center">
          <div className="contact-item col-md-3" data-aos="fade-up" data-aos-delay="200">
            <FaPhoneAlt className="contact-icon" />
            <h3>Phone</h3>
            <p>+1 234 567 890</p>
          </div>
          <div className="contact-item col-md-3" data-aos="fade-up" data-aos-delay="400">
            <FaEnvelope className="contact-icon" />
            <h3>Email</h3>
            <p>support@example.com</p>
          </div>
          <div className="contact-item col-md-3" data-aos="fade-up" data-aos-delay="600">
            <FaMapMarkerAlt className="contact-icon" />
            <h3>Address</h3>
            <p>1234 Main St, Suite 100, City, Country</p>
          </div>
        </div>
        <form className="contact-form" data-aos="fade-up" data-aos-delay="800">
          <input type="text" placeholder="Your Name" required className="form-control" />
          <input type="email" placeholder="Your Email" required className="form-control" />
          <textarea placeholder="Your Message" rows="5" required className="form-control"></textarea>
          <button type="submit" className="btn btn-primary">Send Message</button>
        </form>
      </section>
      <MapSection />



    </div>
  );
};

export default Homepage;
