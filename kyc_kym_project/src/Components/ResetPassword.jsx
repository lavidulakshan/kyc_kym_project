import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEye, faEyeSlash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { initializeApp } from 'firebase/app';
import { getAuth, confirmPasswordReset } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

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

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false); // For showing the loader
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // React Router's navigate function
    const location = useLocation(); // Get the current location, needed for the oobCode (reset code)

    const showLoader = () => {
        setLoading(true);
    };

    const hideLoader = () => {
        setLoading(false);
    };

    const showPopupMessage = (message, isError = false) => {
        if (isError) {
            toast.error(message);
        } else {
            toast.success(message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            showPopupMessage('Passwords do not match', true);
            return;
        }

        // Get the oobCode (out-of-band code) from the URL
        const queryParams = new URLSearchParams(location.search);
        const oobCode = queryParams.get('oobCode');

        if (!oobCode) {
            showPopupMessage('Invalid or expired reset link', true);
            return;
        }

        showLoader();

        confirmPasswordReset(auth, oobCode, newPassword)
            .then(() => {
                hideLoader();
                showPopupMessage('Password has been reset successfully');
                setTimeout(() => {
                    navigate('/'); // Redirect to the homepage
                }, 2000);
            })
            .catch((error) => {
                hideLoader();
                showPopupMessage('Error: ' + error.message, true);
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={styles.gradientBackground}>
            <ToastContainer /> {/* Toast notification container */}
            {loading && (
                <div style={styles.loaderContainer}>
                    <div className="spinner-border" style={styles.loader} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
            {!loading && (
                <div className="card p-5 position-relative" style={styles.cardStyle}>
                    {/* Close Button */}
                    <button className="close-button" onClick={() => navigate('/')} style={styles.closeButton}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>

                    <div className="mb-4">
                        <FontAwesomeIcon icon={faLock} size="3x" className="text-primary" style={styles.iconStyle} />
                    </div>
                    <h1 className="h4 mb-3" style={styles.headingStyle}>Reset Password</h1>
                    <p className="text-muted mb-4" style={styles.textMuted}>Enter your new password below.</p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3" style={styles.inputGroup}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" style={styles.inputIcon}>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                style={styles.inputField}
                            />
                        </div>

                        <div className="input-group mb-3" style={styles.inputGroup}>
                            <div className="input-group-prepend">
                                <span className="input-group-text" style={styles.inputIcon}>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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

export default ResetPassword;
