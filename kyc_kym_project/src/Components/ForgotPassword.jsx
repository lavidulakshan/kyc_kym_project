import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY0_s_Jh4EuYfn4oWsXKxlDjJnt4XM8cY",
  authDomain: "open-kyckym-system.firebaseapp.com",
  projectId: "open-kyckym-system",
  storageBucket: "open-kyckym-system.appspot.com",
  messagingSenderId: "940447057656",
  appId: "1:940447057656:web:391fcf69e5936bb8679d0d",
  measurementId: "G-GBG9V70FY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false); // For showing the loader
    const [isVisible, setIsVisible] = useState(true); // For showing and hiding the form
    const navigate = useNavigate(); // Initialize navigate from React Router

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show loader when starting the request
    
        try {
            // Firebase function to send the password reset email
            await sendPasswordResetEmail(auth, email);
            toast.success(`Password reset link sent to ${email}`);
            setErrorMessage('');
        setEmail('')//clear the email after the email sending has finished
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error sending password reset email: ' + error.message);
            setErrorMessage('Error sending password reset email. ' + error.message);
        } finally {
            setLoading(false); // Hide loader when request completes
        }
    };

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e) => {
        const email = e.target.value;
        setEmail(email);
        if (!validateEmail(email)) {
            setErrorMessage('Invalid email address! Please enter a valid email address.');
        } else {
            setErrorMessage('');
        }
    };

    const handleClose = () => {
        setIsVisible(false);
        navigate('/');  // Navigate to homepage when close button is clicked
    };

    if (!isVisible) return null; // If the form is not visible, don't render anything

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={styles.gradientBackground}>
            <ToastContainer /> {/* Toast notification container */}
            {loading && 
                <div style={styles.loaderContainer}>
                    <div className="spinner-border" style={styles.loader} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
            {!loading && (
                <div className="card p-5 position-relative" style={styles.cardStyle}>
                    {/* Close Button */}
                    <button className="close-button" onClick={handleClose} style={styles.closeButton}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    <div className="mb-4">
                        <FontAwesomeIcon icon={faExclamationCircle} size="3x" className="text-primary" style={styles.iconStyle} />
                    </div>
                    <h1 className="h4 mb-3" style={styles.headingStyle}>Forgot Password?</h1>
                    <p className="text-muted mb-4" style={styles.textMuted}>Enter your email and we'll send you a link to reset your password.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3" style={styles.inputGroup}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" style={styles.inputIcon}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                            </div>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email"
                                value={email}
                                onChange={handleChange}
                                required
                                style={styles.inputField}
                            />
                        </div>
                        <button type="submit" className="btn btn-block" style={styles.submitButton} disabled={loading}>
                            Submit
                        </button>
                        {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
                    </form>

                    <a href="/" className="d-block mt-4" style={styles.backLink}>Back to Login</a>

                    <div className="mt-4" style={styles.footerStyle}>©️ 2024 Your Company. All rights reserved.</div>
                </div>
            )}
        </div>
    );
};

// Define the styles object
const styles = {
    gradientBackground: {
        background: 'linear-gradient(135deg, #1E90FF 0%, #87CEEB 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        padding: '20px',
    },
    cardStyle: {
        width: '100%',
        maxWidth: '400px',
        backgroundColor: '#fff',
        borderRadius: '15px',
        boxShadow: '0px 15px 25px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        position: 'relative',
        animation: 'fadeIn 1s ease-in-out',
    },
    closeButton: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        border: 'none',
        backgroundColor: 'transparent',
        fontSize: '20px',
        cursor: 'pointer',
        color: '#888',
        transition: 'color 0.3s ease',
    },
    iconStyle: {
        color: '#1E90FF',
        animation: 'bounce 1.2s infinite',
    },
    headingStyle: {
        fontWeight: 'bold',
        color: '#333',
        fontSize: '24px',
    },
    textMuted: {
        color: '#777',
    },
    inputGroup: {
        marginBottom: '1.5rem',
        position: 'relative',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    inputIcon: {
        backgroundColor: '#f0f8ff',
        borderRadius: '10px 0 0 10px',
        padding: '10px',
        color: '#666',
    },
    inputField: {
        border: 'none',
        padding: '12px',
        fontSize: '16px',
        borderRadius: '0 10px 10px 0',
        outline: 'none',
        boxShadow: 'none',
        transition: 'all 0.3s ease',
    },
    submitButton: {
        background: 'linear-gradient(90deg, #28a745, #218838)',
        color: '#fff',
        border: 'none',
        padding: '12px',
        borderRadius: '30px',
        fontSize: '16px',
        transition: 'background-color 0.3s ease, transform 0.3s ease',
        cursor: 'pointer',
        width: '100%',
        boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)',
    },
    footerStyle: {
        color: '#888',
        fontSize: '12px',
    },
    loaderContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 10,
    },
    loader: {
        width: '50px',
        height: '50px',
        borderWidth: '5px',
        borderColor: '#1E90FF transparent #1E90FF transparent',
    },
};

export default ForgotPassword;
