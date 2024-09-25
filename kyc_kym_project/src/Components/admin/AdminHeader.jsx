import React from 'react';
import { FaBell, FaCommentAlt } from 'react-icons/fa'; // React icons for bell and comment
import { Dropdown } from 'react-bootstrap'; // Bootstrap Dropdown
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './AdminHeader.css';

const AdminHeader = () => {
  const notifications = 5; // Notification count

  return (
    <header className="admin-header d-flex justify-content-end align-items-center p-3 shadow-sm fixed-top">
      {/* Notification Bell with Badge */}
      <div className="position-relative me-4">
        <FaBell size={20} />
        {notifications > 0 && (
          <span className="badge badge-danger position-absolute top-0 start-100 translate-middle bg-danger rounded-circle" style={{ fontSize: '12px', padding: '8px 15px' }}>
          {notifications}
        </span>
        )}
      </div>

      

      {/* Profile Dropdown */}
      <Dropdown align="end">
        <Dropdown.Toggle variant="light" id="dropdown-basic" className="d-flex align-items-center">
          <img
            src="https://via.placeholder.com/40" // Placeholder for profile image
            alt="Profile"
            className="rounded-circle me-2"
            width="40"
            height="40"
          />
          <span>Lavidu Lakshan</span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </header>
  );
};

export default AdminHeader;
