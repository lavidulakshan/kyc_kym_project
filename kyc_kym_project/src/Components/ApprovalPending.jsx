import React, { useEffect } from 'react';
import './ApprovalPending.css'; 
import axios from 'axios';

const ApprovalPending = () => {

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');

    if (loggedUser) {
      const userObject = JSON.parse(loggedUser);
      console.log("User ID is: " + userObject.uid);

      const interval = setInterval( async() => {
        const response = await checkApproved(userObject.uid);
        console.log(response);
        if(response==true){
          clearInterval(interval);
          window.location.href = '/success'; 
        }
      }, 5000);

    } else {
      console.log('No user is logged in.');
    }
  }, []);

  // Make userObject.uid a parameter to pass to the function
  const checkApproved = async (uid) => {
    // alert(uid);
    try {
      const response = await axios.post(`http://localhost:5000/checkApproved/`,{uid});
      // console.log(response);
      return response.data.message;
      
    } catch (error) {
      console.error('Error checking approval status:', error);
    }
  };

  return (
    <div className="approval-pending-container">
      <div className="loading-animation">
        <div className="outer-circle">
          <div className="inner-circle"></div>
        </div>
      </div>
      <h2 className='h2'>Your form is being reviewed...</h2>
      <p>Please stay on this page until the admin approves your form.</p>
    </div>
  );
};

export default ApprovalPending;
