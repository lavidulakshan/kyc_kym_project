import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css';
import logo from '../images/logo.png';
import { FaEye, FaEyeSlash, FaShieldAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import Toaster from './Toaster ';

function Header() {
  const location = useLocation();
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  const [user, setUser] = useState(null); // User state for logged-in user
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', type: '' });

  const showToast = (message, type) => {
    setToastMessage({ message, type });

    // Set timeout to clear the toast after 3 seconds
    setTimeout(() => {
      setToastMessage({ message: '', type: '' });
    }, 5000); // Change 3000 to the time (in ms) you want the toaster to last
  };

  useEffect(() => {
    // Simulate fetching logged-in user from local storage/session or API
    const loggedUser = JSON.parse(localStorage.getItem('user')) || null;
    setUser(loggedUser);
  }, []);

  const toggleNavbar = () => {
    setIsNavbarCollapsed(!isNavbarCollapsed);
  };

  const closeNavbar = () => {
    setIsNavbarCollapsed(true);
  };

  const handleShowModal = (isSignInMode) => {
    setIsSignIn(isSignInMode);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleLogout = () => {
   // Remove specific data from local storage
   localStorage.removeItem('userToken');
  
   // Optionally, clear all local storage
   localStorage.clear();
 
   // Redirect user to the login page or home page
   window.location.href = '/'; // or use React Router's `useNavigate()` for redirection
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

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async () => {
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (isSignIn) {
      if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters long.');
        valid = false;
      } else {
        setPasswordError('');
      }
    } else {
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

    const userType = isMerchant ? 'merchant' : 'customer';

    if (valid) {
      try {
        const userPayload = {
          email,
          password,
          userType,
        };

        const response = await axios.post('http://localhost:5000/users/auth', userPayload);

        if (response.status === 200) {
          // showToast({ message: 'User registered successfully!', type: 'success' });
          showToast('Form submitted successfully!', 'success');

          // Store user data in local storage and update state
          const registeredUser = {
            name: 'Lavidu Lakshan', // Replace with actual data from the API
            imageUrl: 'https://via.placeholder.com/40', // Placeholder image
            email,
            userType,
          };
          setUser(registeredUser);
          localStorage.setItem('user', JSON.stringify(registeredUser)); // Store user in local storage

          // Redirect based on user type
          if (userType === 'merchant') {
            window.location.href = '/kymregistration';
          } else if (userType === 'customer') {
            window.location.href = '/kycregistration';
          }

          handleCloseModal();
        } else {
          setToastMessage({ message: 'Failed to register.', type: 'error' });
        }
      } catch (error) {
        setToastMessage({ message: error.response?.data || 'An error occurred', type: 'error' });
      }
    }
  };

  const hideButtons = location.pathname === '/userprofile';

  return (
    <div>
      <nav className="navbar navbar-expand-lg fixed-top" style={navbarStyle}>
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img src={logo} alt="Logo" style={{ maxWidth: '120px' }} />
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
              {!user ? (
                !hideButtons && (
                  <>
                    <li className="nav-item">
                      <a
                        className="nav-link btn btn-signin mx-2"
                        href="#"
                        style={buttonSignInStyle}
                        onClick={() => {
                          handleShowModal(true);
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
                          handleShowModal(false);
                          closeNavbar();
                        }}
                      >
                        Register
                      </a>
                    </li>
                  </>
                )
              ) : (
                <li className="nav-item dropdown d-flex align-items-center position-relative">
                  <img
                    src={user.imageUrl}
                    alt="User"
                    style={{ borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}
                    onClick={toggleProfileDropdown}
                  />
                  <span style={{ color: '#333', fontWeight: 'bold', marginLeft: '10px', cursor: 'pointer' }} onClick={toggleProfileDropdown}>
                    {user.name}
                  </span>

                  {showProfileDropdown && (
                    <ul className="dropdown-menu show" style={dropdownMenuStyle}>
                      <li>
                        <a className="dropdown-item" href="#">
                          <FaUser style={iconDropdownStyle} /> Your Profile
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#" onClick={handleLogout}>
                          <FaSignOutAlt style={iconDropdownStyle} /> Logout
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Toaster Notification */}
      {toastMessage.message && <Toaster message={toastMessage.message} type={toastMessage.type} />}

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
                  <div className="mb-3">
                    <label htmlFor="role-select" className="form-label">
                      Register As:
                    </label>
                    <select
                      id="role-select"
                      className="form-select"
                      value={isMerchant ? 'merchant' : 'customer'}
                      onChange={(e) => setIsMerchant(e.target.value === 'merchant')}
                    >
                      <option value="customer">Customer</option>
                      <option value="merchant">Merchant</option>
                    </select>
                  </div>
                )}

                <input
                  type="email"
                  className="form-control my-3"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  style={inputStyle}
                />
                {emailError && <p style={errorTextStyle}>{emailError}</p>}

                <div className="input-group my-3">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    style={inputStyle}
                  />
                  <span
                    className="input-group-text password-toggle-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                {passwordError && <p style={errorTextStyle}>{passwordError}</p>}

                {!isSignIn && (
                  <>
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

// Toaster Notification Component
// const Toaster = ({ message, type }) => {
//   const toasterStyle = {
//     position: 'fixed',
//     bottom: '20px',
//     right: '20px',
//     zIndex: '9999',
//     padding: '10px 20px',
//     backgroundColor: type === 'success' ? '#4CAF50' : '#F44336',
//     color: '#fff',
//     borderRadius: '5px',
//     boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
//   };

//   return <div style={toasterStyle}>{message}</div>;
// };

// Styles (you can also use a separate CSS file)
const navbarStyle = {
  backgroundColor: '#ffffff',
  padding: '8px 16px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  color: '#333',
};

const linkStyle = {
  color: '#333',
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
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
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
};

const forgotPasswordStyle = {
  color: '#007bff',
  textDecoration: 'none',
  fontSize: '14px',
};

const dropdownMenuStyle = {
  position: 'absolute',
  top: '50px',
  right: '0px',
  backgroundColor: '#fff',
  borderRadius: '5px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  zIndex: 1000,
  minWidth: '160px',
};

const iconDropdownStyle = {
  marginRight: '10px',
};

export default Header;
