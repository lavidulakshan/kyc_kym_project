import React, { useState } from 'react';
import './MerchantList.css'; // Import CSS for styling
import { FaSearch, FaArrowLeft, FaArrowRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'; // Import icons

const initialMerchants = [
  {
    id: "MER001",
    name: "John's Electronics",
    email: "john@electronics.com",
    phone: "+1-234-567-890",
    date: "2023-09-10",
    status: 'Active', // Merchant status
  },
  {
    id: "MER002",
    name: "BestBuy Groceries",
    email: "info@bestbuy.com",
    phone: "+1-123-456-7890",
    date: "2023-08-15",
    status: 'Blocked',
  },
  {
    id: "MER003",
    name: "Elegant Fashion",
    email: "contact@elegantfashion.com",
    phone: "+1-321-654-0987",
    date: "2023-09-20",
    status: 'Active',
  },
  // Add more merchants here to simulate a large dataset
];

const MerchantList = () => {
  const [searchEmail, setSearchEmail] = useState(''); // Search by email state
  const [searchId, setSearchId] = useState(''); // Search by merchant ID state
  const [startDate, setStartDate] = useState(''); // From date
  const [endDate, setEndDate] = useState(''); // To date
  const [searchStatus, setSearchStatus] = useState(''); // Search by status state
  const [merchants, setMerchants] = useState(initialMerchants); // Merchants state

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const merchantsPerPage = 2; // Change this value to display more or fewer merchants per page

  // Function to block/unblock a merchant and update the status column
  const toggleMerchantStatus = (id) => {
    const updatedMerchants = merchants.map((merchant) =>
      merchant.id === id
        ? { ...merchant, status: merchant.status === 'Active' ? 'Blocked' : 'Active' }
        : merchant
    );
    setMerchants(updatedMerchants);
  };

  // Filter merchants based on search criteria
  const filteredMerchants = merchants.filter((merchant) => {
    const matchesEmail = searchEmail === '' || merchant.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchesId = searchId === '' || merchant.id.toLowerCase().includes(searchId.toLowerCase());
    const matchesDate = (!startDate || new Date(merchant.date) >= new Date(startDate)) && (!endDate || new Date(merchant.date) <= new Date(endDate));
    const matchesStatus = searchStatus === '' || merchant.status.toLowerCase() === searchStatus.toLowerCase();

    return matchesEmail && matchesId && matchesDate && matchesStatus;
  });

  // Pagination logic
  const indexOfLastMerchant = currentPage * merchantsPerPage;
  const indexOfFirstMerchant = indexOfLastMerchant - merchantsPerPage;
  const currentMerchants = filteredMerchants.slice(indexOfFirstMerchant, indexOfLastMerchant);
  const totalPages = Math.ceil(filteredMerchants.length / merchantsPerPage);

  // Change page function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination Arrow Functions
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="merchant-list container">
      <h3 className="text-center mb-4">Merchants</h3>

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
        <div className="col-md-3 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="From Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="col-md-3 mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="To Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {/* Search by Status Dropdown with arrow */}
        <div className="col-md-3 mb-3">
          <div className="dropdown">
            <select
              className="form-control custom-select"
              value={searchStatus}
              onChange={(e) => setSearchStatus(e.target.value)}
            >
              <option value="">Search by status</option>
              <option value="Active">Active</option>
              <option value="Blocked">Blocked</option>
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
      <div className="row merchant-row-header d-none d-md-flex">
        <div className="col-md-1"><strong>Merchant ID</strong></div>
        <div className="col-md-2"><strong>Merchant Name</strong></div>
        <div className="col-md-2"><strong>Business Email</strong></div>
        <div className="col-md-2"><strong>Phone Number</strong></div>
        <div className="col-md-2"><strong>Date Registered</strong></div>
        <div className="col-md-1"><strong>Status</strong></div>
        <div className="col-md-2"><strong>Action</strong></div>
      </div>

      {/* Merchant rows */}
      {currentMerchants.length > 0 ? (
        currentMerchants.map((merchant, index) => (
          <div className="row merchant-row mb-3" key={index}>
            <div className="col-12 col-md-1">
              <strong className="d-md-none">Merchant ID: </strong>
              {merchant.id}
            </div>
            <div className="col-12 col-md-2">
              <strong className="d-md-none">Merchant Name: </strong>
              {merchant.name}
            </div>
            <div className="col-12 col-md-2">
              <strong className="d-md-none">Email: </strong>
              {merchant.email}
            </div>
            <div className="col-12 col-md-2">
              <strong className="d-md-none">Phone: </strong>
              {merchant.phone}
            </div>
            <div className="col-12 col-md-2">
              <strong className="d-md-none">Date: </strong>
              {merchant.date}
            </div>
            <div className="col-12 col-md-1">
              {/* Status Column */}
              <strong className="status-text">{merchant.status}</strong>
            </div>
            <div className="col-12 col-md-2 text-md-right d-flex justify-content-between">
              {/* Toggle button to block/unblock */}
              <button
                className={`btn ${merchant.status === 'Active' ? 'btn-danger' : 'btn-success'} btn-sm`}
                onClick={() => toggleMerchantStatus(merchant.id)}
              >
                {merchant.status === 'Active' ? 'Block' : 'Unblock'}
              </button>

              {/* See More button at the end of the row */}
              <button className="btn btn-info btn-sm see-more-btn ml-2">See More</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No merchants found</p>
      )}

      {/* Pagination */}
      {filteredMerchants.length > merchantsPerPage && (
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

export default MerchantList;
