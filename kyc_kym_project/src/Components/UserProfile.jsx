import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import './UserProfile.css'; // Add your custom CSS here

// Validation schema using Yup
const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  dateOfBirth: Yup.string().required('Date of Birth is required'),
  nationality: Yup.string().required('Nationality is required'),
  idType: Yup.string().required('Identity Type is required'),
  idNumber: Yup.string().required('Identification Number is required'),
  phoneNumber: Yup.string().required('Phone Number is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  occupation: Yup.string().required('Occupation is required'),
  sourceOfIncome: Yup.string().required('Source of Income is required'),
  purposeOfAccount: Yup.string().required('Purpose of Account is required'),
  gender: Yup.string().required('Gender is required'),
  bloodGroup: Yup.string().required('Blood Group is required'),
});

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Image file to upload

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = getUidFromLocalStorage();
        const response = await axios.get(`http://localhost:5000/users/${uid}`);
        setUserData(response.data);
        setProfileImage(response.data.profileImageUrl);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const getUidFromLocalStorage = () => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      return parsedUser.uid;
    }
    return null;
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: userData?.firstName || '',
      lastName: userData?.lastName || '',
      dateOfBirth: userData?.dateOfBirth || '',
      nationality: userData?.nationality || '',
      idType: userData?.identificationType || '',
      idNumber: userData?.idNumber || '',
      phoneNumber: userData?.phoneNumber || '',
      email: userData?.email || '',
      occupation: userData?.occupation || '',
      sourceOfIncome: userData?.sourceOfIncome || '',
      purposeOfAccount: userData?.purposeOfAccount || '',
      gender: userData?.gender || '',
      bloodGroup: userData?.bloodGroup || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const uid = getUidFromLocalStorage();

        const formData = new FormData(); // FormData for image and fields
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('dateOfBirth', values.dateOfBirth);
        formData.append('nationality', values.nationality);
        formData.append('idType', values.idType);
        formData.append('idNumber', values.idNumber);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('email', values.email);
        formData.append('occupation', values.occupation);
        formData.append('sourceOfIncome', values.sourceOfIncome);
        formData.append('purposeOfAccount', values.purposeOfAccount);
        formData.append('gender', values.gender);
        formData.append('bloodGroup', values.bloodGroup);

        if (imageFile) {
          formData.append('profileImage', imageFile); // Include profile image
        }

        await axios.put(`http://localhost:5000/users/${uid}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Required for file uploads
          },
        });

        alert('Profile updated successfully!');
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('An error occurred while updating the profile.');
      }
    },
  });

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file); // Save the image file to state
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target.result); // Show the preview of the new image
      };
      reader.readAsDataURL(file);
    }
  };

  const enableEditing = () => setIsEditing(true);
  const cancelEditing = () => {
    setIsEditing(false);
    formik.resetForm();
    setProfileImage(userData?.profileImageUrl || null); // Reset profile image
  };

  const downloadPDF = () => {
    const pdfContent = document.getElementById('user-profile-content');
    const options = {
      margin: 10,
      filename: 'user-profile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };
    html2pdf().from(pdfContent).set(options).save();
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="container mt-5 shadow-lg p-4 user-profile-container rounded bg-light">
      <h2 className="mb-4 text-center text-primary">User Profile</h2>

      <div id="user-profile-content">
        <div className="row">
          <div className="col-md-4 text-center">
            <div className="profile-upload-container position-relative">
              {/* Show rounded image in edit form only */}
              <img
                src={profileImage || 'https://via.placeholder.com/150'}
                alt="Profile"
                className={isEditing ? "rounded-circle border border-primary profile-img mb-3" : "img-fluid mb-3"} // Only rounded in edit mode
                width={isEditing ? "150" : "100%"}
                height={isEditing ? "150" : "auto"}
              />
              {isEditing && (
                <div className=" bottom-0 end-0 text-center">
                  <label htmlFor="profileImageUpload" className="btn btn-outline-primary btn-sm">Change</label>
                  <input
                    type="file"
                    id="profileImageUpload"
                    className="d-none"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="col-md-8">
            {isEditing ? (
              <form onSubmit={formik.handleSubmit}>
                {/* Form fields */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
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

                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
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

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Date of Birth</label>
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

                  <div className="col-md-6">
                    <label className="form-label">Nationality</label>
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

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Identity Type</label>
                    <select
                      className={`form-select ${formik.touched.idType && formik.errors.idType ? 'is-invalid' : ''}`}
                      name="idType"
                      value={formik.values.idType}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      <option value="">Select Identity Type</option>
                      <option value="Passport">Passport</option>
                      <option value="National ID">National ID</option>
                      <option value="Driver’s License">Driver’s License</option>
                    </select>
                    {formik.touched.idType && formik.errors.idType && (
                      <div className="invalid-feedback">{formik.errors.idType}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">ID Number</label>
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

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
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

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      placeholder="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled={true} // Disable email field during editing
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">{formik.errors.email}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Occupation</label>
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

                  <div className="col-md-6">
                    <label className="form-label">Source of Income</label>
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

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Purpose of Account</label>
                    <input
                      type="text"
                      className={`form-control ${formik.touched.purposeOfAccount && formik.errors.purposeOfAccount ? 'is-invalid' : ''}`}
                      name="purposeOfAccount"
                      placeholder="Purpose of Account"
                      value={formik.values.purposeOfAccount}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.purposeOfAccount && formik.errors.purposeOfAccount && (
                      <div className="invalid-feedback">{formik.errors.purposeOfAccount}</div>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Gender</label>
                    <input
                      type="text"
                      className={`form-control ${formik.touched.gender && formik.errors.gender ? 'is-invalid' : ''}`}
                      name="gender"
                      placeholder="Gender"
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.gender && formik.errors.gender && (
                      <div className="invalid-feedback">{formik.errors.gender}</div>
                    )}
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Blood Group</label>
                    <input
                      type="text"
                      className={`form-control ${formik.touched.bloodGroup && formik.errors.bloodGroup ? 'is-invalid' : ''}`}
                      name="bloodGroup"
                      placeholder="Blood Group"
                      value={formik.values.bloodGroup}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.bloodGroup && formik.errors.bloodGroup && (
                      <div className="invalid-feedback">{formik.errors.bloodGroup}</div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-danger me-2" onClick={cancelEditing}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-success">Save</button>
                </div>
              </form>
            ) : (
              <div>
                <p><strong>First Name:</strong> {formik.values.firstName || 'N/A'}</p>
                <p><strong>Last Name:</strong> {formik.values.lastName || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> {formik.values.dateOfBirth || 'N/A'}</p>
                <p><strong>Nationality:</strong> {formik.values.nationality || 'N/A'}</p>
                <p><strong>Phone Number:</strong> {formik.values.phoneNumber || 'N/A'}</p>
                <p><strong>Email:</strong> {formik.values.email || 'N/A'}</p>
                <p><strong>Identity Type:</strong> {formik.values.idType || 'N/A'}</p>
                <p><strong>ID Number:</strong> {formik.values.idNumber || 'N/A'}</p>
                <p><strong>Occupation:</strong> {formik.values.occupation || 'N/A'}</p>
                <p><strong>Source of Income:</strong> {formik.values.sourceOfIncome || 'N/A'}</p>
                <p><strong>Purpose of Account:</strong> {formik.values.purposeOfAccount || 'N/A'}</p>
                <p><strong>Gender:</strong> {formik.values.gender || 'N/A'}</p>
                <p><strong>Blood Group:</strong> {formik.values.bloodGroup || 'N/A'}</p>

                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-primary me-2" onClick={enableEditing}>
                    Edit
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={downloadPDF}>
                    Download as PDF
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Display images from the API */}
        <div className="row mt-4">
          <div className="col-md-4 text-center">
            <h5>Front of ID</h5>
            <img
              src={userData?.idCardFrontUrl || 'https://via.placeholder.com/150'}
              alt="Front of ID"
              className="img-fluid mb-3"
            />
          </div>
          <div className="col-md-4 text-center">
            <h5>Back of ID</h5>
            <img
              src={userData?.idCardBackUrl || 'https://via.placeholder.com/150'}
              alt="Back of ID"
              className="img-fluid mb-3"
            />
          </div>
          <div className="col-md-4 text-center">
            <h5>Proof of Address</h5>
            <img
              src={userData?.addressDocumentUrl || 'https://via.placeholder.com/150'}
              alt="Proof of Address"
              className="img-fluid mb-3"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
