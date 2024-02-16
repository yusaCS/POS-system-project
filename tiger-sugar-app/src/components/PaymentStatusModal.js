import React from 'react';

/**
 * @author Josh Mueck
 * PaymentStatusModal Component - Renders a modal for displaying payment status.
 * @author Josh Mueck
 * @constructor
 * @param {Object} props - The props passed to the component.
 * @param {string} props.message - The message to display in the modal.
 * @param {Function} props.onClose - The function to be called on modal close.
 * @returns {JSX.Element} - Returns the PaymentStatusModal component.
 */
const PaymentStatusModal = ({ message, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        zIndex: 9999,
        width: '300px',
        textAlign: 'center',
        fontFamily: 'Arial, sans-serif',
        color:'black'
      }}
    >
      <p style={{ fontSize: '18px', margin: '0 0 20px' }}>{message}</p>
      <button
        onClick={onClose}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
        }}
      >
        Close
      </button>
    </div>
  );
};

export default PaymentStatusModal;
