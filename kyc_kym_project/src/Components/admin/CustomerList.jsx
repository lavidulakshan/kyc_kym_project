import React, { useState } from 'react';
import './MerchantList.css'; // Import CSS for styling
import { FaSearch, FaArrowLeft, FaArrowRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'; // Import icons
import { Tab, Tabs } from 'react-bootstrap'; // Import Bootstrap Tabs
import moment from 'moment'; // Import moment for time formatting

const initialCustomers = [
  {
    id: "CUST001",
    name: "John Doe",
    email: "john@doe.com",
    phone: "+1-234-567-890",
    date: new Date(), // Registered just now
    status: 'Pending', // Customer status
  },
  {
    id: "CUST002",
    name: "Jane Smith",
    email: "jane@smith.com",
    phone: "+1-123-456-7890",
    date: new Date(new Date().getTime() - 60 * 60 * 1000), // Registered 1 hour ago
    status: 'Pending',
  },
  {
    id: "CUST003",
    name: "Sarah Lee",
    email: "sarah@lee.com",
    phone: "+1-321-654-0987",
    date: new Date(new Date().getTime() - 24 * 60 * 60 * 1000), // Registered 1 day ago
    status: 'Active',
  },
  // Add more customers here to simulate a large dataset
];

const CustomerList = () => {
  const [searchEmail, setSearchEmail] = useState(''); // Search by email state
  const [searchId, setSearchId] = useState(''); // Search by customer ID state
  const [startDate, setStartDate] = useState(''); // From date
  const [endDate, setEndDate] = useState(''); // To date
  const [searchStatus, setSearchStatus] = useState(''); // Search by status state
  const [customers, setCustomers] = useState(initialCustomers); // Customers state

  // New state for the selected tab
  const [selectedTab, setSelectedTab] = useState('all'); // 'all' or 'new'

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5; // Change this value to display more or fewer customers per page

  // Function to accept/reject a customer and update the status column
  const toggleCustomerStatus = (id, status) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === id
        ? { ...customer, status: status }
        : customer
    );
    setCustomers(updatedCustomers);
  };

  // Calculate how long ago a customer registered (e.g., 30 minutes ago)
  const getTimeAgo = (date) => {
    return moment(date).fromNow(); // e.g., "30 minutes ago"
  };

  // Filter customers based on search criteria
  const filteredCustomers = customers.filter((customer) => {
    const matchesEmail = searchEmail === '' || customer.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchesId = searchId === '' || customer.id.toLowerCase().includes(searchId.toLowerCase());
    const matchesDate = (!startDate || new Date(customer.date) >= new Date(startDate)) && (!endDate || new Date(customer.date) <= new Date(endDate));
    const matchesStatus = searchStatus === '' || customer.status.toLowerCase() === searchStatus.toLowerCase();

    return matchesEmail && matchesId && matchesDate && matchesStatus;
  });

  // Filter customers based on selected tab (show only customers with 'Pending' status for new customers)
  const displayedCustomers = filteredCustomers.filter((customer) => {
    if (selectedTab === 'new') {
      // Show only pending customers for the new tab
      return customer.status === 'Pending';
    }
    return true; // Show all customers for 'all' tab
  });

  // Pagination logic
  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
  const currentCustomers = displayedCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(displayedCustomers.length / customersPerPage);

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination Arrow Functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="customer-list container">
      <h3 className="text-center mb-4">Customers</h3>

      {/* Bootstrap Tabs for 'New' and 'All' customers */}
      <Tabs
        id="customer-tabs"
        activeKey={selectedTab}
        onSelect={(tab) => setSelectedTab(tab)}
        className="mb-4"
      >
        <Tab eventKey="all" title="All Customers">
          <div>All Customers</div>
        </Tab>
        <Tab eventKey="new" title="New Customers">
          <div>New Customers</div>
        </Tab>
      </Tabs>

      {/* Search Bar */}
      <div className="search-bar mb-4 row">
        <div className="col-md-3 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>
        <div className="col-md-2 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
       From
        <div className="col-md-2 mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="From Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
     To
        <div className="col-md-2 mb-3">
    
          <input
            type="date"
            className="form-control"
            placeholder="To Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Search by Status Dropdown with arrow */}
        <div className="col-md-2 mb-3">
          <div className="dropdown">
            <select
              className="form-control custom-select"
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <option value="">Search by status</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>

        <div className="col-md-12 d-flex justify-content-center">
          <button className="btn btn-primary search-btn">
            <FaSearch /> Search
          </button>
        </div>
      </div>

      {/* Header row */}
      <div className="row customer-row-header d-none d-md-flex merchant-row-header">
        <div className="col-md-1"><strong>Customer ID</strong></div>
        <div className="col-md-2"><strong>Customer Name</strong></div>
        <div className="col-md-2"><strong>Email</strong></div>
        <div className="col-md-2"><strong>Phone Number</strong></div>
        <div className="col-md-2"><strong>Date Registered</strong></div>
        <div className="col-md-1"><strong>Status</strong></div>
        <div className="col-md-2"><strong>Action</strong></div>
      </div>

      {/* Customer rows */}
      {currentCustomers.length > 0 ? (
        currentCustomers.map((customer, index) => (
          <div className="row customer-row mb-3" key={index}>
            <div className="col-12 col-md-1">
              <strong className="d-md-none">Customer ID: </strong>
              {customer.id}
            </div>
            <div className="col-12 col-md-2">
              <strong className="d-md-none">Customer Name: </strong>
              {customer.name}
            </div>
            <div className="col-12 col-md-2">
              <strong className="d-md-none">Email: </strong>
              {customer.email}
            </div>
            <div className="col-12 col-md-2">
              <strong className="d-md-none">Phone: </strong>
              {customer.phone}
            </div>
            <div className="col-12 col-md-2">
              <strong className="d-md-none">Date: </strong>
              {getTimeAgo(customer.date)}
            </div>
            <div className="col-12 col-md-1">
              {/* Status Column */}
              <strong className="status-text">{customer.status}</strong>
            </div>
            <div className="col-12 col-md-2 text-md-right d-flex justify-content-between">
              {selectedTab === 'new' ? (
                <>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => toggleCustomerStatus(customer.id, 'Active')}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-danger btn-sm ml-2"
                    onClick={() => toggleCustomerStatus(customer.id, 'Blocked')}
                  >
                    Reject
                  </button>
                </>
              ) : (
                <button
                  className={`btn ${customer.status === 'Active' ? 'btn-danger' : 'btn-success'} btn-sm`}
                  onClick={() => toggleCustomerStatus(customer.id, customer.status === 'Active' ? 'Blocked' : 'Active')}
                >
                  {customer.status === 'Active' ? 'Block' : 'Unblock'}
                </button>
              )}

              <button className="btn btn-info btn-sm see-more-btn ml-2">See More</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No customers found</p>
      )}

      {/* Pagination */}
      {displayedCustomers.length > customersPerPage && (
        <nav className="pagination-nav mt-4">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToFirstPage}>
                <FaAngleDoubleLeft />
              </button>
            </li>
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToPreviousPage}>
                <FaArrowLeft />
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToNextPage}>
                <FaArrowRight />
              </button>
            </li>
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button className="page-link" onClick={goToLastPage}>
                <FaAngleDoubleRight />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default CustomerList;
