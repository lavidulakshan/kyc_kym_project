import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './formStyles.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SectionWithBackground from './SectionWithBackground'; // Import the background section component
import { Link } from 'react-router-dom';
import axios from 'axios';

// Validation schema using Yup
const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    dateOfBirth: Yup.string().required('Date of Birth is required'),
    nationality: Yup.string().required('Nationality is required'),
    idType: Yup.string().required('Identification Type is required'),
    idNumber: Yup.string().required('Identification Number is required'),
    idDocumentFront: Yup.mixed().required('Front-side document image is required'),
    idDocumentBack: Yup.mixed().required('Back-side document image is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    occupation: Yup.string().required('Occupation is required'),
    sourceOfIncome: Yup.string().required('Source of Income is required'),
    proofOfAddress: Yup.mixed().required('Proof of Address document is required'),
    purposeOfAccount: Yup.string().required('Purpose of Account is required'),
    declaration: Yup.boolean().oneOf([true], 'You must confirm the declaration'),
    gender: Yup.string().required('Gender is required'),
    bloodGroup: Yup.string().required('Blood Group is required'),
});

const KYMRegistration = () => {
    const [step, setStep] = useState(1);
    const [activeTab, setActiveTab] = useState('newUser'); // State for tab navigation
    const [showDocumentUpload, setShowDocumentUpload] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [globalErrorMessage, setGlobalErrorMessage] = useState(''); // Global error message state

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Clear error message after 5 seconds using useEffect
    useEffect(() => {
        if (globalErrorMessage) {
            const timeout = setTimeout(() => {
                setGlobalErrorMessage(''); // Clear the error message after 5 seconds
            }, 5000);

            return () => clearTimeout(timeout); // Clear timeout if component unmounts or globalErrorMessage changes
        }
    }, [globalErrorMessage]);

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            nationality: '',
            idType: '',
            idNumber: '',
            idDocumentFront: null,
            idDocumentBack: null,
            phoneNumber: '',
            email: '',
            occupation: '',
            sourceOfIncome: '',
            purposeOfAccount: '',
            proofOfAddress: null,
            declaration: false,
            gender: '',
            bloodGroup: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                // Create a FormData object to handle the file uploads
                const formData = new FormData();
                
                // Append form values to the FormData object
                formData.append("firstName", values.firstName);
                formData.append("lastName", values.lastName);
                formData.append("dateOfBirth", values.dateOfBirth);
                formData.append("nationality", values.nationality);
                formData.append("gender", values.gender);
                formData.append("bloodGroup", values.bloodGroup);
                formData.append("phoneNumber", values.phoneNumber);
                formData.append("email", values.email);
                formData.append("idType", values.idType);
                formData.append("idNumber", values.idNumber);
                formData.append("occupation", values.occupation);
                formData.append("sourceOfIncome", values.sourceOfIncome);
                formData.append("purposeOfAccount", values.purposeOfAccount);
        
                // Append files (if they exist)
                if (values.idDocumentFront) {
                    formData.append("idDocumentFront", values.idDocumentFront);
                }
                if (values.idDocumentBack) {
                    formData.append("idDocumentBack", values.idDocumentBack);
                }
                if (values.proofOfAddress) {
                    formData.append("proofOfAddress", values.proofOfAddress);
                }
        
                // Send form data via Axios
                const response = await axios.post("http://localhost:5000/users", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });
        
                if (response.status === 201) { // Expecting a 201 for created resources
                    console.log(response.data);
                    alert("Form submitted successfully!");
                } else {
                    console.error("Error submitting form", response.statusText);
                    alert("Failed to submit the form.");
                }
            } catch (error) {
                console.error("Error submitting form:", error);
                alert("An error occurred while submitting the form.");
            }
        },
        
        
    });

    const handleIdTypeChange = (e) => {
        const value = e.target.value;
        formik.handleChange(e);
        if (['Passport', 'National ID', 'Driver’s License'].includes(value)) {
            setShowDocumentUpload(true);
        } else {
            setShowDocumentUpload(false);
        }
    };

    const nextStep = async () => {
        setGlobalErrorMessage(''); // Clear previous global error message

        if (step === 1) {
            formik.setTouched({
                firstName: true,
                lastName: true,
                dateOfBirth: true,
                nationality: true,
            });

            const step1Errors = await formik.validateForm();
            if (step1Errors.firstName || step1Errors.lastName || step1Errors.dateOfBirth || step1Errors.nationality) {
                setGlobalErrorMessage('Please fill in all the required fields before proceeding.');
                return;
            }
            setStep(step + 1);
        } else if (step === 2) {
            formik.setTouched({
                gender: true,
                bloodGroup: true,
                phoneNumber: true,
                email: true,
            });

            const step2Errors = await formik.validateForm();
            if (step2Errors.gender || step2Errors.bloodGroup || step2Errors.phoneNumber || step2Errors.email) {
                setGlobalErrorMessage('Please ensure that all required contact details are filled in.');
                return;
            }
            setStep(step + 1);
        } else if (step === 3) {
            formik.setTouched({
                idType: true,
                idNumber: true,
                idDocumentFront: true,
                idDocumentBack: true,
            });

            const step3Errors = await formik.validateForm();
            if (step3Errors.idType || step3Errors.idNumber || (showDocumentUpload && (step3Errors.idDocumentFront || step3Errors.idDocumentBack))) {
                setGlobalErrorMessage('Please upload the required documents and fill in all fields.');
                return;
            }
            setStep(step + 1);
        }
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };

    const renderStep = (stepNumber = step) => {
        switch (stepNumber) {
            case 1:
                return (
                    <>
                        {/* Personal Information */}
                        <div className="row mb-3">
                            <div className="col-md-6 ">
                                <label className="form-label">First Name <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="John"
                                    />
                                </div>
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <div className="invalid-feedback">{formik.errors.firstName}</div>
                                )}
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Last Name <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    <input
                                        type="text"
                                        className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        placeholder="Doe"
                                    />
                                </div>
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <div className="invalid-feedback">{formik.errors.lastName}</div>
                                )}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Date of Birth <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-calendar-alt"></i></span>
                                <input
                                    type="date"
                                    className={`form-control ${formik.touched.dateOfBirth && formik.errors.dateOfBirth ? 'is-invalid' : ''}`}
                                    name="dateOfBirth"
                                    value={formik.values.dateOfBirth}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                                <div className="invalid-feedback">{formik.errors.dateOfBirth}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Nationality <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-flag"></i></span>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.nationality && formik.errors.nationality ? 'is-invalid' : ''}`}
                                    name="nationality"
                                    value={formik.values.nationality}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Sri Lankan"
                                />
                            </div>
                            {formik.touched.nationality && formik.errors.nationality && (
                                <div className="invalid-feedback">{formik.errors.nationality}</div>
                            )}
                        </div>
                    </>
                );
            case 2:
                return (
                    <>
                        {/* Identification and Contact Details */}
                        <div className="mb-3">
                            <label className="form-label">Gender <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-venus-mars"></i></span>
                                <select
                                    className={`form-select ${formik.touched.gender && formik.errors.gender ? 'is-invalid' : ''}`}
                                    name="gender"
                                    value={formik.values.gender}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            {formik.touched.gender && formik.errors.gender && (
                                <div className="invalid-feedback">{formik.errors.gender}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Blood Group <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-tint"></i></span>
                                <select
                                    className={`form-select ${formik.touched.bloodGroup && formik.errors.bloodGroup ? 'is-invalid' : ''}`}
                                    name="bloodGroup"
                                    value={formik.values.bloodGroup}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select Blood Group</option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                </select>
                            </div>
                            {formik.touched.bloodGroup && formik.errors.bloodGroup && (
                                <div className="invalid-feedback">{formik.errors.bloodGroup}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-phone"></i></span>
                                <input
                                    type="tel"
                                    className={`form-control ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'is-invalid' : ''}`}
                                    name="phoneNumber"
                                    placeholder="+94785620531"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                <div className="invalid-feedback">{formik.errors.phoneNumber}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email Address (Mandatory)</label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                <input
                                    type="email"
                                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                    name="email"
                                    placeholder="john.doe@email.com"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <div className="invalid-feedback">{formik.errors.email}</div>
                            )}
                        </div>
                    </>
                );
            case 3:
                return (
                    <>
                        {/* Identification Type and Number */}
                        <div className="mb-3">
                            <label className="form-label">Identification Type <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-id-card"></i></span>
                                <select
                                    className={`form-select ${formik.touched.idType && formik.errors.idType ? 'is-invalid' : ''}`}
                                    name="idType"
                                    value={formik.values.idType}
                                    onChange={handleIdTypeChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select Identification Type</option>
                                    <option value="Passport">Passport</option>
                                    <option value="National ID">National ID</option>
                                    <option value="Driver’s License">Driver’s License</option>
                                </select>
                            </div>
                            {formik.touched.idType && formik.errors.idType && (
                                <div className="invalid-feedback">{formik.errors.idType}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Identification Number <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-id-badge"></i></span>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.idNumber && formik.errors.idNumber ? 'is-invalid' : ''}`}
                                    name="idNumber"
                                    placeholder="Enter your ID number"
                                    value={formik.values.idNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.idNumber && formik.errors.idNumber && (
                                <div className="invalid-feedback">{formik.errors.idNumber}</div>
                            )}
                        </div>

                        {showDocumentUpload && (
                            <>
                                <div className="mb-3">
                                    <label className="form-label">Upload Front-side of the Document <span className="text-danger">*</span></label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-file-upload"></i></span>
                                        <input
                                            type="file"
                                            className={`form-control ${formik.touched.idDocumentFront && formik.errors.idDocumentFront ? 'is-invalid' : ''}`}
                                            name="idDocumentFront"
                                            onChange={(event) => formik.setFieldValue('idDocumentFront', event.currentTarget.files?.[0])}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.touched.idDocumentFront && formik.errors.idDocumentFront && (
                                        <div className="invalid-feedback">{formik.errors.idDocumentFront}</div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Upload Back-side of the Document <span className="text-danger">*</span></label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-file-upload"></i></span>
                                        <input
                                            type="file"
                                            className={`form-control ${formik.touched.idDocumentBack && formik.errors.idDocumentBack ? 'is-invalid' : ''}`}
                                            name="idDocumentBack"
                                            onChange={(event) => formik.setFieldValue('idDocumentBack', event.currentTarget.files?.[0])}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                    {formik.touched.idDocumentBack && formik.errors.idDocumentBack && (
                                        <div className="invalid-feedback">{formik.errors.idDocumentBack}</div>
                                    )}
                                </div>
                            </>
                        )}
                    </>
                );
            case 4:
                return (
                    <>
                        {/* Occupation, Income, Proof of Address */}
                        <div className="mb-3">
                            <label className="form-label">Occupation <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-briefcase"></i></span>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.occupation && formik.errors.occupation ? 'is-invalid' : ''}`}
                                    name="occupation"
                                    value={formik.values.occupation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Software Engineer"
                                />
                            </div>
                            {formik.touched.occupation && formik.errors.occupation && (
                                <div className="invalid-feedback">{formik.errors.occupation}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Source of Income <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-dollar-sign"></i></span>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.sourceOfIncome && formik.errors.sourceOfIncome ? 'is-invalid' : ''}`}
                                    name="sourceOfIncome"
                                    placeholder="Salary"
                                    value={formik.values.sourceOfIncome}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.sourceOfIncome && formik.errors.sourceOfIncome && (
                                <div className="invalid-feedback">{formik.errors.sourceOfIncome}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Proof of Address Document <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-home"></i></span>
                                <input
                                    type="file"
                                    className={`form-control ${formik.touched.proofOfAddress && formik.errors.proofOfAddress ? 'is-invalid' : ''}`}
                                    name="proofOfAddress"
                                    onChange={(event) => formik.setFieldValue('proofOfAddress', event.currentTarget.files?.[0])}
                                    onBlur={formik.handleBlur}
                                />
                            </div>
                            {formik.touched.proofOfAddress && formik.errors.proofOfAddress && (
                                <div className="invalid-feedback">{formik.errors.proofOfAddress}</div>
                            )}
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Purpose of Account <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-question-circle"></i></span>
                                <select
                                    className={`form-select ${formik.touched.purposeOfAccount && formik.errors.purposeOfAccount ? 'is-invalid' : ''}`}
                                    name="purposeOfAccount"
                                    value={formik.values.purposeOfAccount}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                >
                                    <option value="">Select Purpose</option>
                                    <option value="Personal">Personal</option>
                                    <option value="Business">Business</option>
                                    <option value="Savings">Savings</option>
                                </select>
                            </div>
                            {formik.touched.purposeOfAccount && formik.errors.purposeOfAccount && (
                                <div className="invalid-feedback">{formik.errors.purposeOfAccount}</div>
                            )}
                        </div>

                        <div className="form-check mb-3">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="declaration"
                                checked={formik.values.declaration}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <label className="form-check-label">
                                I confirm the accuracy of the information and consent to verification. <span className="text-danger">*</span>
                            </label>
                            {formik.touched.declaration && formik.errors.declaration && (
                                <div className="invalid-feedback">{formik.errors.declaration}</div>
                            )}
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="">
            {/* SectionWithBackground Component */}
            <SectionWithBackground />

            {/* Global Error Message */}
            {globalErrorMessage && (
                <div className="alert alert-danger text-center" role="alert">
                    <span className="text-danger">{globalErrorMessage}</span>
                </div>
            )}

            {/* Tabs */}
            {/* <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${activeTab === 'newUser' ? 'active' : ''}`}
                        onClick={() => setActiveTab('newUser')}
                    >
                        New to Swift?
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${activeTab === 'alreadySubscribed' ? 'active' : ''}`}
                        onClick={() => setActiveTab('alreadySubscribed')}
                    >
                        Already Subscribed?
                    </button>
                </li>
            </ul> */}

            <div className="row">
                <div className="col-md-6">
                    <div className="card shadow-lg p-4 mb-5 bg-white rounded form-card">
                        <h3 className="text-center mb-4 form-title">KYC Registration</h3>
                        {/* Conditional Form based on Tab */}
                        {activeTab === 'newUser' && (
                            <form onSubmit={formik.handleSubmit} className="form-body">
                                {isMobile ? (
                                    <>
                                        {renderStep()}
                                        <div className="d-flex justify-content-between mt-4">
                                            {step > 1 && <button type="button" className="btn btn-secondary" onClick={prevStep}>Back</button>}
                                            {step < 4 ? (
                                                <button type="button" className="btn btn-primary" onClick={nextStep}>Next</button>
                                            ) : (
                                                <button type="submit" className="btn btn-success">Submit</button>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {renderStep(1)}
                                        {renderStep(2)}
                                        {renderStep(3)}
                                        {renderStep(4)}
                                        <button type="submit" className="btn btn-success mt-4">Submit</button>
                                    </>
                                )}
                            </form>
                        )}

                        {activeTab === 'alreadySubscribed' && (
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" placeholder="Enter email" />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input type="password" className="form-control" placeholder="Enter password" />
                                </div>
                                <Link to="/userprofile" className="btn btn-primary w-100">
                                    Sign In
                                </Link>
                            </form>
                        )}
                    </div>
                </div>

                {/* Right side section */}
                <div className="col-md-6">
                    <div className="what-you-receive p-4 bg-gradient rounded shadow-lg">
                        <h3 className="mb-4 text-primary font-weight-bold text-center">What you will receive:</h3>
                        <ul className="list-unstyled">
                            <li className="mb-3 d-flex align-items-center">
                                <i className="fas fa-check-circle text-success fa-2x me-3"></i>
                                <span className="text-secondary fw-bold">Invitations to major events</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <i className="fas fa-check-circle text-success fa-2x me-3"></i>
                                <span className="text-secondary fw-bold">Updates on new products and services</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <i className="fas fa-check-circle text-success fa-2x me-3"></i>
                                <span className="text-secondary fw-bold">The latest industry news</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <i className="fas fa-check-circle text-success fa-2x me-3"></i>
                                <span className="text-secondary fw-bold">Fintech trends and R&D</span>
                            </li>
                            <li className="mb-3 d-flex align-items-center">
                                <i className="fas fa-check-circle text-success fa-2x me-3"></i>
                                <span className="text-secondary fw-bold">Updates on cyber security</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default KYMRegistration;

