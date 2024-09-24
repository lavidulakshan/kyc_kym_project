import React, { useState } from 'react';
import './AdminPage.css'; // Custom CSS for styling
import { Table, Badge, Button, Pagination, ButtonGroup, DropdownButton, Dropdown, FormControl, Form, Row, Col, InputGroup } from 'react-bootstrap'; // Bootstrap components

const AdminPage = () => {
  const [activePage, setActivePage] = useState(1);
  const [searchEmail, setSearchEmail] = useState('');
  const [searchStatus, setSearchStatus] = useState('');
  const [searchDateFrom, setSearchDateFrom] = useState('');
  const [searchDateTo, setSearchDateTo] = useState('');
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: 'Suresh Bandara',
      email: 'Dilushka10@gmailcom',
      status: 'Pending',
      joined: '2024-08-10',
      profilePic: 'https://via.placeholder.com/40', // Placeholder for profile image
    },
    {
      id: 2,
      name: 'Dilushka Banadara',
      email: 'Dilushka10@gmailcom',
      status: 'Blocked',
      joined: '2024-08-10',
      profilePic: 'https://via.placeholder.com/40',
    },
    {
      id: 3,
      name: 'Kamal Silva',
      email: 'kamal.silva@gmail.com',
      status: 'Accepted',
      joined: '2024-07-15',
      profilePic: 'https://via.placeholder.com/40',
    },
  ]);

  // Function to filter customers based on email, status, and date range (from and to)
  const filteredCustomers = customers.filter((customer) => {
    const matchesEmail = searchEmail === '' || customer.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchesStatus = searchStatus === '' || customer.status === searchStatus;
    const matchesDateFrom = searchDateFrom === '' || new Date(customer.joined) >= new Date(searchDateFrom);
    const matchesDateTo = searchDateTo === '' || new Date(customer.joined) <= new Date(searchDateTo);
    return matchesEmail && matchesStatus && matchesDateFrom && matchesDateTo;
  });

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const acceptUser = (customerId) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === customerId ? { ...customer, status: 'Accepted' } : customer
      )
    );
    alert(`Accepted user with ID: ${customerId}`);
  };

  const ignoreUser = (customerId) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === customerId ? { ...customer, status: 'Ignored' } : customer
      )
    );
    alert(`Ignored user with ID: ${customerId}`);
  };

  const blockUser = (customerId) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === customerId ? { ...customer, status: 'Blocked' } : customer
      )
    );
    alert(`Blocked user with ID: ${customerId}`);
  };

  const viewDetails = (customer) => {
    alert(`View details of ${customer.name}`);
  };

  const editCustomer = (customer) => {
    alert(`Edit customer ${customer.name}`);
  };

  return (
    <div className="admin-page">
      <div className="header">
        <div className="notification-icons">
          {/* Notification Bell with Badge */}
          <div className="notifications">
            <i className="fas fa-bell"></i>
            <span className="badge">18</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="profile-section">
          <img src="https://via.placeholder.com/40" alt="Profile" className="profile-pic" />
          <span className="profile-name">Suresh Bandara</span>
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>

      <div className="content">
        {/* Search Filters */}
        <Form className="mb-4">
          <Row>
            {/* Search by Email */}
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text><i className="fas fa-envelope"></i></InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Search by email"
                  value={searchEmail}
                  onChange={(e) => setSearchEmail(e.target.value)}
                />
              </InputGroup>
            </Col>
            {/* Filter by Status */}
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text><i className="fas fa-filter"></i></InputGroup.Text>
                <FormControl
                  as="select"
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                >
                  <option value="">Filter by status</option>
                  <option value="Pending">Pending</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Ignored">Ignored</option>
                  <option value="Blocked">Blocked</option>
                </FormControl>
              </InputGroup>
            </Col>
            {/* Filter by Date From */}
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>From</InputGroup.Text>
                <FormControl
                  type="date"
                  placeholder="From"
                  value={searchDateFrom}
                  onChange={(e) => setSearchDateFrom(e.target.value)}
                />
              </InputGroup>
            </Col>
            {/* Filter by Date To */}
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text>To</InputGroup.Text>
                <FormControl
                  type="date"
                  placeholder="To"
                  value={searchDateTo}
                  onChange={(e) => setSearchDateTo(e.target.value)}
                />
              </InputGroup>
            </Col>
          </Row>
        </Form>

        {/* Customer Table */}
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Joined at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={customer.id}>
                <td>{index + 1}</td>
                <td>
                  <img src={customer.profilePic} alt="Profile" className="profile-pic" /> {customer.name}
                </td>
                <td>{customer.email}</td>
                <td>
                  <Badge
                    variant={
                      customer.status === 'Accepted'
                        ? 'success'
                        : customer.status === 'Blocked'
                        ? 'danger'
                        : customer.status === 'Ignored'
                        ? 'secondary'
                        : 'warning'
                    }
                  >
                    {customer.status}
                  </Badge>
                </td>
                <td>{customer.joined}</td>
                <td>
                  <ButtonGroup>
                    {/* Accept Button */}
                    <Button
                      variant="success"
                      className="action-button"
                      onClick={() => acceptUser(customer.id)}
                    >
                      Accept
                    </Button>
                    {/* Ignore Button */}
                    <Button
                      variant="secondary"
                      className="action-button"
                      onClick={() => ignoreUser(customer.id)}
                    >
                      Ignore
                    </Button>
                    {/* Dropdown for more actions */}
                    <DropdownButton
                      as={ButtonGroup}
                      title="More"
                      variant="warning"
                      id="bg-nested-dropdown"
                    >
                      <Dropdown.Item onClick={() => blockUser(customer.id)}>Block</Dropdown.Item>
                      <Dropdown.Item onClick={() => viewDetails(customer)}>
                        View More
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => editCustomer(customer)}>Edit</Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Pagination */}
        <Pagination className="pagination">
          <Pagination.First onClick={() => handlePageChange(1)} />
          <Pagination.Prev
            onClick={() => handlePageChange(activePage > 1 ? activePage - 1 : 1)}
          />
          <Pagination.Item active>{1}</Pagination.Item>
          <Pagination.Item>{2}</Pagination.Item>
          <Pagination.Item>{3}</Pagination.Item>
          <Pagination.Next
            onClick={() => handlePageChange(activePage < 3 ? activePage + 1 : 3)}
          />
          <Pagination.Last onClick={() => handlePageChange(3)} />
        </Pagination>
      </div>
    </div>
  );
};

export default AdminPage;
