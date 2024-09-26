import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './KymRegistration.css'; // Custom CSS for additional styling
import SectionWithBackground from './SectionWithBackground';

const KymRegistration = () => {
    const [businessFields, setBusinessFields] = useState([]);
    const [ownerContactNo, setOwnerContactNo] = useState("");

    const addBusinessField = () => {
        setBusinessFields([...businessFields, { name: '', value: '' }]);
    };

    const handleBusinessFieldChange = (index, e) => {
        const updatedFields = [...businessFields];
        updatedFields[index][e.target.name] = e.target.value;
        setBusinessFields(updatedFields);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted');
    };

    return (
        
        <div className="container mt-5 mb-5">
             <SectionWithBackground/>
            <h2 className="text-center mb-4 text-primary mt-2">Merchant Registration Form</h2>
            <form onSubmit={handleSubmit}>
                {/* Business Information Section */}
                <div className="form-section">
                    <h4><i className="bi bi-building"></i> Business Information</h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="businessName" className="form-label">Business Name</label>
                            <input type="text" className="form-control" id="businessName" placeholder="Enter business name" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="businessType" className="form-label">Business Type</label>
                            <select className="form-select" id="businessType" required>
                                <option selected disabled>Select business type</option>
                                <option>Retail</option>
                                <option>Service</option>
                                <option>Wholesale</option>
                            </select>
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="businessRegNum" className="form-label">Business Registration Number</label>
                            <input type="text" className="form-control" id="businessRegNum" placeholder="Enter Business Registration Number" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="businessLicense" className="form-label">Business License Document</label>
                            <input type="file" className="form-control" id="businessLicense" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="websiteURL" className="form-label">Website URL (Not Mandotory)</label>
                            <input type="text" className="form-control" id="websiteURL" placeholder="Enter Website URL" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="yearsInBusiness" className="form-label">Start Year</label>
                            <input type="text" className="form-control" id="yearsInBusiness" placeholder="Enter The Buisness Start Year" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="businessEmail" className="form-label">Business Email</label>
                            <input type="email" className="form-control" id="businessEmail" placeholder="Enter Business Email" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="contactNo" className="form-label">Contact No.</label>
                            <input type="text" className="form-control" id="contactNo" placeholder="Enter Contact No." required />
                        </div>
                    </div>
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={addBusinessField}>
                        <i className="bi bi-plus-circle"></i> Add More Fields
                    </button>
                    {businessFields.map((field, index) => (
                        <div className="row mb-3" key={index}>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter field name"
                                    name="name"
                                    value={field.name}
                                    onChange={(e) => handleBusinessFieldChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter field value"
                                    name="value"
                                    value={field.value}
                                    onChange={(e) => handleBusinessFieldChange(index, e)}
                                    required
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Merchant Information Section */}
                <div className="form-section">
                    <h4><i className="bi bi-person-badge"></i> Merchant Information</h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="ownerName" className="form-label">Owner's Name</label>
                            <input type="text" className="form-control" id="ownerName" placeholder="Enter owner's name" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="ownerEmail" className="form-label">Email Address</label>
                            <input type="email" className="form-control" id="ownerEmail" placeholder="Enter email address" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="ownerContactNo" className="form-label">Contact No.</label>
                            <input type="text" className="form-control" id="ownerContactNo" placeholder="Enter Contact No." value={ownerContactNo} onChange={(e) => setOwnerContactNo(e.target.value)} required />
                        </div>
                    </div>
                </div>

                {/* Business Address Section */}
                <div className="form-section">
                    <h4><i className="bi bi-geo-alt"></i> Business Address</h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="businessAddress" className="form-label">Business Address</label>
                            <input type="text" className="form-control" id="businessAddress" placeholder="Enter business address" required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="city" className="form-label">City</label>
                            <input type="text" className="form-control" id="city" placeholder="Enter city" required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="state" className="form-label">State</label>
                            <input type="text" className="form-control" id="state" placeholder="Enter state" required />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="zip" className="form-label">ZIP Code</label>
                            <input type="text" className="form-control" id="zip" placeholder="Enter ZIP code" required />
                        </div>
                    </div>
                </div>

                {/* Financial Details Section */}
                <div className="form-section">
                    <h4><i className="bi bi-wallet2"></i> Financial Details   (Not Mandotory)</h4>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label htmlFor="bankAccount" className="form-label">Bank Account</label>
                            <input type="text" className="form-control" id="bankAccount" placeholder="Enter bank account details" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label htmlFor="paymentGateway" className="form-label">Payment Gateway</label>
                            <input type="text" className="form-control" id="paymentGateway" placeholder="Enter PayPal/Stripe account" required />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-lg">
                        <i className="bi bi-check-circle"></i> Register Merchant
                    </button>
                </div>
            </form>
        </div>
    );
};

export default KymRegistration;
