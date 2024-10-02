import React from 'react';

const SuccessUpload = () => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#00A1B1',
    animation: 'fadeIn 1s ease-in-out',
  };

  const messageBoxStyle = {
    backgroundColor: '#E0F7FA',
    padding: '30px',
    borderRadius: '15px',
    textAlign: 'center',
    boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
    transform: 'scale(1)',
    transition: 'transform 0.3s ease-in-out',
  };

  const checkMarkStyle = {
    fontSize: '100px',
    color: '#43A047',
  };

  const badgeStyle = {
    width: '150px',
    height: '150px',
    backgroundColor: '#FFC107',
    borderRadius: '50%',
    position: 'relative',
    display: 'inline-block',
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    animation: 'bounce 1s ease-in-out infinite',
    animationDelay: '5s', // Start bounce after 5 seconds delay
  };

  const checkContainerStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  // Hover effect for the message box
  const handleMouseOver = (e) => {
    e.currentTarget.style.transform = 'scale(1.05)';
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.transform = 'scale(1)';
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-30px);
            }
            60% {
              transform: translateY(-15px);
            }
          }
        `}
      </style>

      <div
        style={messageBoxStyle}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <h2 style={{ color: '#333', marginBottom: '20px' }}>
          Admin Approved Your Details!!
        </h2>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div style={badgeStyle}>
            <div style={checkContainerStyle}>
              <span style={checkMarkStyle}>&#10003;</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessUpload;
