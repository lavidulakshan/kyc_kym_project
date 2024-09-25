import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import './Header.css'; // Custom CSS for hover effects
import logo from '../images/logo.png';
import { FaEye, FaEyeSlash, FaShieldAlt } from 'react-icons/fa'; // Import eye and shield icons
import { Link } from 'react-router-dom';

function Header() {
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false); // Track if Sign In is clicked
  const [name, setName] = useState(''); // Name for registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm Password for registration
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility
  const [isMerchant, setIsMerchant] = useState(false); // State for registering as Merchant or User

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const closeNavbar = () => {
    setIsNavbarCollapsed(true); // Close navbar after clicking on a navlink
  };

  const handleShowModal = (isSignInMode) => {
    setIsSignIn(isSignInMode); // Set the mode to Sign In if Sign In button is clicked
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmailError(''); // Reset errors when modal is closed
    setPasswordError('');
    setConfirmPasswordError('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (isSignIn) {
      // Sign In Mode
      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters long.');
        valid = false;
      } else {
        setPasswordError('');
      }
    } else {
      // Register Mode
      if (name.trim() === '') {
        valid = false;
        alert('Name is required');
      }
      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters long.');
        valid = false;
      } else {
        setPasswordError('');
      }

      if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match.');
        valid = false;
      } else {
        setConfirmPasswordError('');
      }
    }

    if (valid) {
      // Proceed with form submission or next steps
      console.log('Form is valid.');
      console.log(isMerchant ? 'Registering as Merchant' : 'Registering as User');
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top" style={navbarStyle}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" style={{ maxWidth: '120px' }} /> {/* Replace with your logo */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
            aria-controls="navbarNav"
            aria-expanded={!isNavbarCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isNavbarCollapsed ? 'collapse' : 'show'}`} id="navbarNav">
            <ul className="navbar-nav ms-auto text-center">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page" style={linkStyle} onClick={closeNavbar}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/#about" className="nav-link" style={linkStyle} onClick={closeNavbar}>
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/#service" className="nav-link" style={linkStyle} onClick={closeNavbar}>
                  Service
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/#contactus" className="nav-link" style={linkStyle} onClick={closeNavbar}>
                  Contact Us
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link btn btn-signin mx-2"
                  href="#"
                  style={buttonSignInStyle}
                  onClick={() => {
                    handleShowModal(true); // Open modal in Sign In mode
                    closeNavbar();
                  }}
                >
                  Sign In
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link btn btn-register"
                  href="#"
                  style={buttonRegisterStyle}
                  onClick={() => {
                    handleShowModal(false); // Open modal in Register mode
                    closeNavbar();
                  }}
                >
                  Register
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Modal Component */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog" onClick={handleCloseModal}>
          <div className="modal-dialog modal-dialog-centered" role="document" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content" style={modalContentStyle}>
              <div className="modal-header">
                <h5 className="modal-title">{isSignIn ? 'Sign In' : 'Register'}</h5>
                <button type="button" className="btn-close" onClick={handleCloseModal} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center" style={modalBodyStyle}>
                <div style={highlightLabelStyle}>
                  <FaShieldAlt style={iconStyle} /> Your information is protected
                </div>

                {!isSignIn && (
                  <>
                    {/* Merchant or User Selection */}
                    <div className="mb-3">
                      <label htmlFor="role-select" className="form-label">
                        Register As:
                      </label>
                      <select
                        id="role-select"
                        className="form-select"
                        value={isMerchant ? 'merchant' : 'user'}
                        onChange={(e) => setIsMerchant(e.target.value === 'merchant')}
                      >
                        <option value="user">User</option>
                        <option value="merchant">Merchant</option>
                      </select>
                    </div>

                    {/* Name Field */}
                    <input
                      type="text"
                      className="form-control my-3"
                      placeholder="Full Name"
                      value={name}
                      onChange={handleNameChange}
                      style={inputStyle}
                    />
                  </>
                )}

                {/* Email Field */}
                <input
                  type="email"
                  className="form-control my-3"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  style={inputStyle}
                />
                {emailError && <p style={errorTextStyle}>{emailError}</p>}

                {/* Password Field with Eye Icon */}
                <div className="input-group my-3">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={inputStyle}
                  />
                  <span className="input-group-text password-toggle-icon" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {passwordError && <p style={errorTextStyle}>{passwordError}</p>}

                {!isSignIn && (
                  <>
                    {/* Confirm Password Field with Eye Icon */}
                    <div className="input-group my-3">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        className="form-control"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        style={inputStyle}
                      />
                      <span
                        className="input-group-text password-toggle-icon"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </span>
                    </div>
                    {confirmPasswordError && <p style={errorTextStyle}>{confirmPasswordError}</p>}
                  </>
                )}

                {isSignIn && (
                  <div className="text-start">
                    <a href="#" style={forgotPasswordStyle}>
                      Forgot Password?
                    </a>
                  </div>
                )}

                <button className="btn btn-primary w-100 mb-3" style={continueButtonStyle} onClick={handleSubmit}>
                  Continue
                </button>
                <button className="btn btn-google w-100" style={googleButtonStyle}>
                  <i className="fab fa-google"></i> Continue with Google
                </button>
              </div>
              <div className="modal-footer">
                <p className="text-muted">
                  By continuing, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const navbarStyle = {
  backgroundColor: '#ffffff', // White background for header
  padding: '8px 16px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow to separate header
  color: '#333', // Darker text for contrast
};

const linkStyle = {
  color: '#333', // Dark text color for links
  marginRight: '15px',
  textDecoration: 'none',
  transition: 'color 0.3s ease',
};

const buttonSignInStyle = {
  background: 'linear-gradient(135deg, #1CB5E0 0%, #000851 100%)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '50px',
  padding: '8px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
};

const buttonRegisterStyle = {
  background: 'linear-gradient(135deg, #FFD700 0%, #FF8C00 100%)',
  color: '#ffffff',
  border: 'none',
  borderRadius: '50px',
  padding: '8px 20px',
  fontSize: '16px',
  fontWeight: 'bold',
};

const modalContentStyle = {
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: '#f3f4f6',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)', // Add some depth to the modal
};

const modalBodyStyle = {
  padding: '20px',
  backgroundColor: '#fff',
  borderRadius: '10px',
};

const inputStyle = {
  borderRadius: '25px',
  padding: '10px',
  border: '1px solid #ccc',
};

const errorTextStyle = {
  color: 'red',
  fontSize: '14px',
  fontWeight: 'bold',
};

const continueButtonStyle = {
  backgroundColor: '#f06292',
  borderRadius: '25px',
  padding: '10px 0',
  fontSize: '16px',
  fontWeight: 'bold',
};

const googleButtonStyle = {
  backgroundColor: '#4285F4',
  color: '#ffffff',
  border: 'none',
  padding: '10px 0',
  borderRadius: '25px',
  fontSize: '16px',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const highlightLabelStyle = {
  backgroundColor: '#e7f3ff',
  color: '#007bff',
  borderRadius: '25px',
  padding: '10px',
  fontWeight: 'bold',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '15px',
};

const iconStyle = {
  color: '#28a745',
  marginRight: '10px',
  fontSize: '1.5rem', // Adjust the size of the icons
};

const forgotPasswordStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '14px',
};

// Additional CSS for the eye icon inside the password field
const passwordToggleIconStyle = {
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
};

export default Header;
