import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './AdminLogin.css';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email && password) {
            alert('Login successful');
        } else {
            alert('Please fill in all fields');
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        navigate('/'); // Redirect to the login page
    };

    if (!isOpen) {
        return null; // If form is closed, return nothing
    }

    return (
        <div className="login-container">
            <div className="login-box">
                {/* Close icon inside the form at the top-right */}
                <div className="close-icon-wrapper">
                    <i className="fas fa-times close-icon" onClick={handleClose}></i>
                </div>

                {/* Admin Login Header */}
                <div className="login-header">
                    <h2>Admin Login</h2>
                </div>

                {/* Admin image at the top */}
                <img src="https://www.w3schools.com/w3images/avatar2.png" alt="Admin" className="admin-img" />

                <form onSubmit={handleSubmit}>
                    <div className="input-group email-wrapper">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="email-input"
                            required
                        />
                        <div className="icon-wrapper">
                            {/* User icon */}
                            <i className="fas fa-user"></i>
                        </div>
                    </div>

                    <div className="input-group password-wrapper">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="password-input"
                            required
                        />
                        <div className="eye-icon-wrapper">
                            {/* Eye icon to toggle password visibility */}
                            <i
                                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} password-toggle`}
                                onClick={() => setShowPassword(!showPassword)}
                            ></i>
                        </div>
                    </div>

                    <a href="#" className="forgot-password">Forgot?</a>
                    <button type="submit" className="btn-login">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
