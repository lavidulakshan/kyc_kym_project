// src/components/Header.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Header.css';
import logo from '../images/logo.png';
import { FaEye, FaEyeSlash, FaShieldAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';


// import {Toaster } from './Toaster '
import Toaster from './Toaster '
import { auth } from '../firebase'; // Import Firebase Auth instance
import { signInWithEmailAndPassword } from 'firebase/auth'; // Import only signIn method

function Header() {

  const location = useLocation();
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false); // Track if it's Sign-In or Registration
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMerchant, setIsMerchant] = useState(false);
  const [user, setUser] = useState(null); // Logged-in user state
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState({ message: '', type: '' });

  const showToast = (message, type) => {
    setToastMessage({ message, type });

    // Clear the toast after 5 seconds
    setTimeout(() => {
      setToastMessage({ message: '', type: '' });
    }, 5000);
  };

  useEffect(() => {
    // Fetch logged-in user from local storage
    const loggedUser = JSON.parse(localStorage.getItem('user')) || null;
    setUser(loggedUser);
  }, []);

//close this form
  useEffect(() => {
    if (location.pathname === '/adminlogin') {
      setShowModal(false);
    }
  }, [location.pathname]);
//close this form



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
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/';
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




  // Handle Sign-In and Registration
  const handleSubmit = async () => {
    let valid = true;

    // Validate Email
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Validate Password
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      valid = false;
    } else {
      setPasswordError('');
    }

    // Validate Confirm Password for Registration
    if (!isSignIn && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }
    // alert("jkkd")

    if (valid) {

      if (isSignIn) {

        // Sign-In Logic using Firebase Auth
        try {

          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const idToken = await userCredential.user.getIdToken(); // Get Firebase ID Token
          // alert("success");


          // Send the ID token to your backend for verification
          const response = await axios.post('http://localhost:5000/api/verifyToken', { idToken });

          console.log(response.data)



          if (response.status === 200) {
            const userData = response.data.userData; // Assuming userData is coming from the backend
            console.log(userData);

            showToast('Logged in successfully!', 'success');



            // Store user data in local storage and update state
            const loggedInUser = {
              // Replace with actual data from the API
              imageUrl: 'https://firebasestorage.googleapis.com/v0/b/open-kyckym-system.appspot.com/o/images%2Fother_images%2FdefaultProfile.png?alt=media&token=c15e5145-d6a5-4072-992b-338a27972b98', // Placeholder image or fetched from API
              // userData,
              // userType: 'customer', // Replace with actual data from the API
              uid: userData.uid,
              email: userData.email,
              userType: userData.userType,
              detailsSubmitted: userData.detailsSubmitted,  // Replace with actual data from the API

            };
            setUser(loggedInUser);
            localStorage.setItem('user', JSON.stringify(loggedInUser)); // Store user in local storage
            // alert("pk")

            console.log(loggedInUser);




            if (userData.userType === 'customer') {
              if (userData.detailsSubmitted) {
                if (userData.adminApproved) {
                  window.location.href = '/userprofile';

                } else {
                  alert("pk")
                  window.location.href = '/approvePending';
                }

              } else {
                window.location.href = '/kycRegistration';
              }
            } else if (userData.userType === 'merchant') {
              if (userData.detailsSubmitted) {
                window.location.href = '/userprofile';

              } else {
                window.location.href = '/kymregistration';
              }
            }

          } else {
            showToast('Token verification failed.', 'error');
          }

        } catch (error) {
          showToast(error.message || 'An error occurred during sign-in', 'error');
        }
      } else {
        // Registration Logic via Backend
        try {
          const userPayload = {
            email,
            password, // Ensure secure handling on the backend (e.g., hashing)
            userType: isMerchant ? 'merchant' : 'customer',
          };
          console.log(userPayload);

          const response = await axios.post('http://localhost:5000/users/auth', userPayload);
          console.log(response.data);



          if (response.status === 200) {
            console.log(response);
            showToast('User registered successfully!', 'success');


            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);




            if (userPayload.userType === 'merchant') {
              setTimeout(() => {
                window.location.href = '/kymregistration';
              }, 2000);
            } else if (userPayload.userType === 'customer') {
              setTimeout(() => {
                window.location.href = '/kycregistration';
              }, 2000);
            }

            handleCloseModal();
          } else {
            showToast('Failed to register.', 'error');
          }
        } catch (error) {
          showToast(error.response?.data || 'An error occurred during registration', 'error');
        }
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
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default anchor behavior
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
                        onClick={(e) => {
                          e.preventDefault(); // Prevent default anchor behavior
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


                    src='https://firebasestorage.googleapis.com/v0/b/open-kyckym-system.appspot.com/o/images%2Fother_images%2FdefaultProfile.png?alt=media&token=c15e5145-d6a5-4072-992b-338a27972b98'
                    alt="User"
                    style={{ borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer' }}
                    onClick={toggleProfileDropdown}
                  />
                  {/* <span style={{ color: '#333', fontWeight: 'bold', marginLeft: '10px', cursor: 'pointer' }} onClick={toggleProfileDropdown}>
                    {user.name}
                  </span> */}

                  {showProfileDropdown && (
                    <ul className="dropdown-menu show" style={dropdownMenuStyle}>
                      <li>
                        <a className="dropdown-item" href="/userprofile">
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
                    <a href="/forgotpassword" style={forgotPasswordStyle}>
                      Forgot Password?
                    </a>
                  </div>
                )}

                <button className="btn btn-primary w-100 mb-3" style={continueButtonStyle} onClick={handleSubmit}>
                  {isSignIn ? 'Sign In' : 'Register'}
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

              <Link to="/adminlogin"> 
                <label htmlFor="">
                  <i
                    className="fas fa-user-shield"
                    style={{ marginRight: '5px', width: '100px', fontSize: '2rem' }}
                  ></i>
                </label>
              </Link>



            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Toaster Notification Component (You can uncomment and use it separately if needed)
/*
const Toaster = ({ message, type }) => {
 const toasterStyle = {
   position: 'fixed',
   bottom: '20px',
   right: '20px',
   zIndex: '9999',
   padding: '10px 20px',
   backgroundColor: type === 'success' ? '#4CAF50' : '#F44336',
   color: '#fff',
   borderRadius: '5px',
   boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
 };

 return <div style={toasterStyle}>{message}</div>;
};
*/

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
