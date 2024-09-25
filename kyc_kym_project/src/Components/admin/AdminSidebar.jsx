import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaUsers, FaUserTie, FaKey, FaBars, FaTimes } from "react-icons/fa"; // Importing icons
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./AdminSidebar.css"; // Custom CSS
import MerchantList from './merchants'; // Importing the merchant list component

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState(null); // State to manage active component

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component); // Set the active component to display
    setIsSidebarOpen(false); // Close the sidebar after selection in mobile view
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <nav className={`sidebar bg-white ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header d-flex justify-content-between align-items-center p-3">
          <h3 className="text-dark">Admin Panel</h3>
          <button className="btn d-lg-none close-button" onClick={toggleSidebar}>
            <FaTimes className="close-icon" /> {/* Close icon */}
          </button>
        </div>
        <ul className="list-unstyled">
          <li>
            <Link
              to="#"
              className="nav-link text-dark"
              onClick={() => handleComponentChange('customers')}
            >
              <FaUsers className="me-2" /> Customers
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="nav-link text-dark"
              onClick={() => handleComponentChange('merchants')}
            >
              <FaUserTie className="me-2" /> Merchants
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="nav-link text-dark"
              onClick={() => handleComponentChange('admin')}
            >
              <FaUser className="me-2" /> Admin
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="nav-link text-dark"
              onClick={() => handleComponentChange('authorize')}
            >
              <FaKey className="me-2" /> Authorize Acquire
            </Link>
          </li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className={`content p-4 ${isSidebarOpen ? "content-shift" : ""}`}>
        <button className="btn btn-dark d-lg-none" onClick={toggleSidebar}>
          <FaBars /> Menu
        </button>

        {/* Rendering the merchant list based on the selected sidebar item */}
        {activeComponent === 'merchants' && <MerchantList />}
        {/* Other components like Customers, Admin, etc. can be rendered similarly */}
      </div>
    </div>
  );
};

export default AdminSidebar;
