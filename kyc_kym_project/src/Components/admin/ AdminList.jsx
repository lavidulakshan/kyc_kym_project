import React, { useState } from 'react';
import './AdminList.css'; // Import the enhanced CSS
import { Tab, Tabs } from 'react-bootstrap'; // Bootstrap tabs
import { FaTrash, FaCloudUploadAlt, FaTimesCircle } from 'react-icons/fa'; // Icons for file upload and deletion

const AdminList = () => {
  // State for admins
  const [admins, setAdmins] = useState([]);
  const [selectedTab, setSelectedTab] = useState('create'); // State for tab switching

  // Form state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [profilePreview, setProfilePreview] = useState(null); // Preview for profile image

  // Handle admin creation
  const handleCreateAdmin = (e) => {
    e.preventDefault();

    const newAdmin = {
      id: Date.now(), // Generate unique id using timestamp
      firstName,
      lastName,
      email,
      password,
      profilePhoto,
    };

    setAdmins([...admins, newAdmin]);

    // Clear form fields
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setProfilePhoto(null);
    setProfilePreview(null);
  };

  // Handle file input for profile photo (drag-and-drop or regular upload)
  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setProfilePreview(URL.createObjectURL(file)); // Preview the selected image
    }
  };

  // Handle removing the profile photo
  const handleRemoveProfilePhoto = () => {
    setProfilePhoto(null);
    setProfilePreview(null);
  };

  // Handle admin deletion
  const handleDeleteAdmin = (id) => {
    const updatedAdmins = admins.filter((admin) => admin.id !== id);
    setAdmins(updatedAdmins);
  };

  return (
    <div className="admin-list container">
      <h3 className="text-center mb-4">Admin Management</h3>

      {/* Tabs for creating and viewing admins */}
      <Tabs
        id="admin-tabs"
        activeKey={selectedTab}
        onSelect={(tab) => setSelectedTab(tab)}
        className="mb-4"
      >
        <Tab eventKey="create" title="Create Admin">
          {/* Create Admin Form */}
          <form onSubmit={handleCreateAdmin} className="create-admin-form">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            {/* Profile Photo Upload Section */}
            <div className="form-group profile-upload">
              <label>Profile Photo</label>
              <div className="upload-area">
                {profilePreview ? (
                  <div className="profile-preview-wrapper">
                    <img
                      src={profilePreview}
                      alt="Profile Preview"
                      className="profile-preview"
                    />
                    <button
                      type="button"
                      className="btn btn-danger remove-photo-btn"
                      onClick={handleRemoveProfilePhoto}
                    >
                      <FaTimesCircle /> Remove
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    <FaCloudUploadAlt size={50} />
                    <p>Drag & drop or click to upload</p>
                    <input
                      type="file"
                      className="file-input"
                      onChange={handleProfilePhotoChange}
                      accept="image/*"
                    />
                  </div>
                )}
              </div>
            </div>

            <button type="submit" className="btn btn-primary mt-3">
              Create Admin
            </button>
          </form>
        </Tab>

        <Tab eventKey="all" title="All Admins">
          {/* All Admins List */}
          <div className="all-admins-list">
            {admins.length > 0 ? (
              admins.map((admin) => (
                <div className="admin-item row mb-3 p-3 bg-light" key={admin.id}>
                  <div className="col-md-2">
                    {admin.profilePhoto ? (
                      <img
                        src={URL.createObjectURL(admin.profilePhoto)}
                        alt={`${admin.firstName} ${admin.lastName}`}
                        className="admin-photo"
                      />
                    ) : (
                      <span>No Photo</span>
                    )}
                  </div>
                  <div className="col-md-8">
                    <p><strong>Name:</strong> {admin.firstName} {admin.lastName}</p>
                    <p><strong>Email:</strong> {admin.email}</p>
                    <p><strong>Password:</strong> {admin.password}</p>
                  </div>
                  <div className="col-md-2 d-flex justify-content-end">
                    <button
                      className="btn btn-danger deletebtn"
                      onClick={() => handleDeleteAdmin(admin.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center">No admins found.</p>
            )}
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default AdminList;
