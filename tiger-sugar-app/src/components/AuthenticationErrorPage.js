import React, { useState, useEffect } from 'react';

/**
 * @author Josh Mueck
 * Represents the Authentication Error Page component.
 * @author Josh Mueck
 * @constructor
 * @returns {JSX.Element} JSX for the Authentication Error Page component.
 */
const AuthenticationErrorPage = () => {
  const [images, setImages] = useState([]);

  /**
   * Fetches images from sources.json file and sets them in the state.
   * @returns {void}
   */
  const fetchImages = async () => {
    setImages(require('./sources.json')); // pull image paths
    // console.log(images);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  /**
   * Redirects to the customer side webpage.
   * @returns {void}
   */
  const returnToCustomerSide = () => {
    window.location.href = 'https://zero9p-tiger-sugar-app.onrender.com/';
  };

  /**
   * Handles mouse over event.
   * @param {Event} event - Mouse over event object.
   * @returns {void}
   */
  const handleMouseOver = (event) => {
    event.target.style.color = 'white'; // Change text color to white on hover
  };

  /**
   * Handles mouse out event.
   * @param {Event} event - Mouse out event object.
   * @returns {void}
   */
  const handleMouseOut = (event) => {
    event.target.style.color = 'black'; // Change text color back to black on mouse out
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'gold', // Background color set to gold
        minHeight: '100vh', // Ensure the whole viewport height is filled
        padding: '100px 0', // Add padding to the content area
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {/* Placeholder for an image */}
        <img
          src={images['Tiger']}
          alt="Tiger"
          style={{ width: '200px', height: '200px', borderRadius: '50%' }}
        />
        <h1 style={{ color: 'black' }}>Authentication Error</h1>
        <p style={{ color: 'black' }}>
          Sorry, there was an error with your employee authentication. Please try again.
        </p>
      </div>
      <button
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: 'orange',
          color: 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onClick={returnToCustomerSide}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        Return to Customer Side
      </button>
    </div>
  );
};

export default AuthenticationErrorPage;
