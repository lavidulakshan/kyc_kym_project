import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './UserProfile.css';

// Validation schema using Yup
const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    dateOfBirth: Yup.string().required('Date of Birth is required'),
    nationality: Yup.string().required('Nationality is required'),
    idType: Yup.string().required('Identification Type is required'),
    idNumber: Yup.string().required('Identification Number is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    occupation: Yup.string().required('Occupation is required'),
    sourceOfIncome: Yup.string().required('Source of Income is required'),
    purposeOfAccount: Yup.string().required('Purpose of Account is required'),
    gender: Yup.string().required('Gender is required'),
    bloodGroup: Yup.string().required('Blood Group is required'),
    idDocumentFront: Yup.mixed().when('idType', {
        is: (idType) => ['Passport', 'National ID', 'Driver’s License'].includes(idType),
        then: Yup.mixed().required('Front-side document image is required'),
        otherwise: Yup.mixed().notRequired(),
    }),
    idDocumentBack: Yup.mixed().when('idType', {
        is: (idType) => ['Passport', 'National ID', 'Driver’s License'].includes(idType),
        then: Yup.mixed().required('Back-side document image is required'),
        otherwise: Yup.mixed().notRequired(),
    }),
});

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [showDocumentUpload, setShowDocumentUpload] = useState(false);

    const initialValues = {
        firstName: 'Lavidu',
        lastName: 'Perera',
        dateOfBirth: '1990-01-01',
        nationality: 'Sri Lankan',
        idType: '',
        idNumber: '123456789V',
        phoneNumber: '0712345678',
        email: 'lavidu@example.com',
        occupation: 'Software Engineer',
        sourceOfIncome: 'Salary',
        purposeOfAccount: 'Personal',
        gender: 'Male',
        bloodGroup: 'O+',
        idDocumentFront: null,
        idDocumentBack: null,
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values) => {
            alert('Profile updated successfully!');
            console.log(values);
            setIsEditing(false);
        },
    });

    const enableEditing = () => setIsEditing(true);
    const cancelEditing = () => {
        setIsEditing(false);
        formik.resetForm();
    };

    const downloadAsPDF = () => {
        const formElement = document.getElementById('user-profile-preview');
        html2canvas(formElement).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0, 210, canvas.height * 210 / canvas.width);
            pdf.save('user-profile.pdf');
        });
    };

    const handleIdTypeChange = (e) => {
        const value = e.target.value;
        formik.handleChange(e);
        setShowDocumentUpload(['Passport', 'National ID', 'Driver’s License'].includes(value));
    };

    const handleProfileImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="container mt-5 shadow-lg p-4 user-profile-container rounded bg-light">
            <div className="position-relative">
                {/* Back Cover Image */}
                <div className="back-cover">
                    <img src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fGJpbGxlZHRpbWV8ZW58MHx8fHwxNjYyOTQ4Nzg5&ixlib=rb-1.2.1&q=80&w=1080" alt="Background Cover" className="img-fluid rounded-top" />
                </div>

                {/* Profile Image Section */}
                <div className="profile-image-wrapper position-absolute top-50 start-50 translate-middle">
                    <img
                        src={profileImage || 'https://via.placeholder.com/140'}
                        alt="Profile"
                        className="profile-image rounded-circle border border-light"
                        width="140"
                        height="140"
                    />
                    <div className="mt-2">
                        <label htmlFor="profileImage" className="btn btn-outline-light">
                            Update Profile Picture
                        </label>
                        <input
                            type="file"
                            id="profileImage"
                            className="d-none"
                            onChange={handleProfileImageChange}
                        />
                    </div>
                </div>
            </div>

            <h2 className="mb-4 text-center">User Profile</h2>

            {/* Preview Section */}
            <div id="user-profile-preview" className={isEditing ? "d-none" : "mb-4"}>
                <h4 className="text-primary">User Information</h4>
                <div className="row user-information">
                    <div className="col-md-6">
                        <p><strong>First Name:</strong> {formik.values.firstName || 'N/A'}</p>
                        <p><strong>Last Name:</strong> {formik.values.lastName || 'N/A'}</p>
                        <p><strong>Date of Birth:</strong> {formik.values.dateOfBirth || 'N/A'}</p>
                        <p><strong>Nationality:</strong> {formik.values.nationality || 'N/A'}</p>
                        <p><strong>ID Type:</strong> {formik.values.idType || 'N/A'}</p>
                        <p><strong>ID Number:</strong> {formik.values.idNumber || 'N/A'}</p>
                    </div>
                    <div className="col-md-6">
                        <p><strong>Phone Number:</strong> {formik.values.phoneNumber || 'N/A'}</p>
                        <p><strong>Email:</strong> {formik.values.email || 'N/A'}</p>
                        <p><strong>Occupation:</strong> {formik.values.occupation || 'N/A'}</p>
                        <p><strong>Source of Income:</strong> {formik.values.sourceOfIncome || 'N/A'}</p>
                        <p><strong>Purpose of Account:</strong> {formik.values.purposeOfAccount || 'N/A'}</p>
                        <p><strong>Gender:</strong> {formik.values.gender || 'N/A'}</p>
                        <p><strong>Blood Group:</strong> {formik.values.bloodGroup || 'N/A'}</p>
                    </div>
                </div>

                <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-primary me-2" onClick={enableEditing}>Edit</button>
                    <button type="button" className="btn btn-secondary" onClick={downloadAsPDF}>Download as PDF</button>
                </div>
            </div>

            {/* Form Section */}
            {isEditing && (
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        {/* First Name */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">First Name <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                                    name="firstName"
                                    placeholder="First Name"
                                    value={formik.values.firstName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.firstName && formik.errors.firstName && (
                                    <div className="invalid-feedback">{formik.errors.firstName}</div>
                                )}
                            </div>
                        </div>

                        {/* Last Name */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Last Name <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-user"></i></span>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                                    name="lastName"
                                    placeholder="Last Name"
                                    value={formik.values.lastName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.lastName && formik.errors.lastName && (
                                    <div className="invalid-feedback">{formik.errors.lastName}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Date of Birth */}
                        <div className="col-md-6 mb-3">
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
                                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                                    <div className="invalid-feedback">{formik.errors.dateOfBirth}</div>
                                )}
                            </div>
                        </div>

                        {/* Nationality */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Nationality <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-flag"></i></span>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.nationality && formik.errors.nationality ? 'is-invalid' : ''}`}
                                    name="nationality"
                                    placeholder="Nationality"
                                    value={formik.values.nationality}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.nationality && formik.errors.nationality && (
                                    <div className="invalid-feedback">{formik.errors.nationality}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* ID Type */}
                        <div className="col-md-6 mb-3">
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
                                    <option value="">Select ID Type</option>
                                    <option value="Passport">Passport</option>
                                    <option value="National ID">National ID</option>
                                    <option value="Driver’s License">Driver’s License</option>
                                </select>
                                {formik.touched.idType && formik.errors.idType && (
                                    <div className="invalid-feedback">{formik.errors.idType}</div>
                                )}
                            </div>
                        </div>

                        {/* ID Number */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Identification Number <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-id-badge"></i></span>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.idNumber && formik.errors.idNumber ? 'is-invalid' : ''}`}
                                    name="idNumber"
                                    placeholder="ID Number"
                                    value={formik.values.idNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.idNumber && formik.errors.idNumber && (
                                    <div className="invalid-feedback">{formik.errors.idNumber}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Document Uploads */}
                    {showDocumentUpload && (
                        <>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Upload Front-side of Document <span className="text-danger">*</span></label>
                                    <input
                                        type="file"
                                        className={`form-control ${formik.touched.idDocumentFront && formik.errors.idDocumentFront ? 'is-invalid' : ''}`}
                                        name="idDocumentFront"
                                        onChange={(event) => formik.setFieldValue('idDocumentFront', event.currentTarget.files[0])}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.idDocumentFront && formik.errors.idDocumentFront && (
                                        <div className="invalid-feedback">{formik.errors.idDocumentFront}</div>
                                    )}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label className="form-label">Upload Back-side of Document <span className="text-danger">*</span></label>
                                    <input
                                        type="file"
                                        className={`form-control ${formik.touched.idDocumentBack && formik.errors.idDocumentBack ? 'is-invalid' : ''}`}
                                        name="idDocumentBack"
                                        onChange={(event) => formik.setFieldValue('idDocumentBack', event.currentTarget.files[0])}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.idDocumentBack && formik.errors.idDocumentBack && (
                                        <div className="invalid-feedback">{formik.errors.idDocumentBack}</div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}

                    <div className="row">
                        {/* Phone Number */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Phone Number <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-phone"></i></span>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.phoneNumber && formik.errors.phoneNumber ? 'is-invalid' : ''}`}
                                    name="phoneNumber"
                                    placeholder="Phone Number"
                                    value={formik.values.phoneNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                                    <div className="invalid-feedback">{formik.errors.phoneNumber}</div>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                                <input
                                    type="email"
                                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                                    name="email"
                                    placeholder="Email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="invalid-feedback">{formik.errors.email}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Occupation */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Occupation <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-briefcase"></i></span>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.occupation && formik.errors.occupation ? 'is-invalid' : ''}`}
                                    name="occupation"
                                    placeholder="Occupation"
                                    value={formik.values.occupation}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.occupation && formik.errors.occupation && (
                                    <div className="invalid-feedback">{formik.errors.occupation}</div>
                                )}
                            </div>
                        </div>

                        {/* Source of Income */}
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Source of Income <span className="text-danger">*</span></label>
                            <div className="input-group">
                                <span className="input-group-text"><i className="fas fa-dollar-sign"></i></span>
                                <input
                                    type="text"
                                    className={`form-control ${formik.touched.sourceOfIncome && formik.errors.sourceOfIncome ? 'is-invalid' : ''}`}
                                    name="sourceOfIncome"
                                    placeholder="Source of Income"
                                    value={formik.values.sourceOfIncome}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.sourceOfIncome && formik.errors.sourceOfIncome && (
                                    <div className="invalid-feedback">{formik.errors.sourceOfIncome}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Purpose of Account */}
                        <div className="col-md-6 mb-3">
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
                                {formik.touched.purposeOfAccount && formik.errors.purposeOfAccount && (
                                    <div className="invalid-feedback">{formik.errors.purposeOfAccount}</div>
                                )}
                            </div>
                        </div>

                        {/* Gender */}
                        <div className="col-md-6 mb-3">
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
                                {formik.touched.gender && formik.errors.gender && (
                                    <div className="invalid-feedback">{formik.errors.gender}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* Blood Group */}
                        <div className="col-md-6 mb-3">
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
                                {formik.touched.bloodGroup && formik.errors.bloodGroup && (
                                    <div className="invalid-feedback">{formik.errors.bloodGroup}</div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-danger me-2" onClick={cancelEditing}>Cancel</button>
                        <button type="submit" className="btn btn-success">Save</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UserProfile;
