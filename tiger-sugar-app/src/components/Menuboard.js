import React, { useState, useEffect } from 'react';

/**
 * @author Nicholas Nguyen, Josh Mueck
 * Functional component to display a menu board with images and text information.
 * @constructor
 * @returns {JSX.Element} - Returns the JSX to render the menu board.
 */
const Menuboard = () => {
  const [data, setData] = useState([]);
  const [setErrors] = useState([]);
  const [images, setImages] = useState([]);

  // // Debugging function for logging variable instances
  // const debugLogs = () => {
  //   console.log(`Menu data: ${data}`);    // check menu data
  //   console.log(`Errors: ${errors}`);     // check errors
  // };

  /**
   * Fetches the menu data from the specified endpoint and sets it into the component state.
   * @returns {void}
   */
  const fetchMenuData = async () => {
    fetch('https://tiger-sugar-app.onrender.com/menu')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => setErrors(error));
  };

  /**
     * Fetches images for the system from a JSON file.
     * Sets the retrieved image paths into the 'images' state.
     * @returns {void}
     */
  const fetchImages = async () => {
    setImages(require("./sources.json")); // pull image paths
    // console.log(images);
};
  
/**
 * Fetches menu data and images when the component mounts.
 * @returns {void}
 */
  useEffect(() => {
    fetchMenuData();
    fetchImages();
  }, []);
  
  // Console debugger
  //debugLogs();

  // Styles
  const topStyle = {
    marginTop: '30px'
  };

  const headerStyle = {
    textAlign: 'center'
  };

  const menuListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    listStyle: 'none',
    padding: '0'
  };

  const menuItemStyle = {
    border: '1px solid #CCC',
    padding: '16px',
    display: 'flex', // Use flexbox for layout
    alignItems: 'center', // Align items vertically
    textAlign: 'left' // Align text to the left
  };

  const textInfoStyle = {
    flex: '1', // Take remaining space in the box
    marginRight: '12px' // Add some space between text and image
  };

  const imageStyle = {
    width: '100px', // Adjust the width of the image as needed
    height: '100px', // Adjust the height of the image as needed
    //objectFit: 'cover', // Preserve aspect ratio while filling the space
    flexShrink: '0' // Prevent image from shrinking
  };


  /**
     * Retrieves the image corresponding to the given imageName from the images collection.
     * @param {string} imageName - The name of the image to retrieve.
     * @returns {string} - Returns the image URL if found in the collection.
     */
  const getPicture = (imageName) => {
    const picture = images[imageName];
    return picture ? images[imageName] : images['Logo'];
  };


  return (
    <div style={topStyle}>
      <h1 style={headerStyle}>Menu Board</h1>
      <ul style={menuListStyle}>
        {data.map((menuItem) => (
          <li style={menuItemStyle} key={menuItem.id}>
          <div style={textInfoStyle}>
            <div>{menuItem.name}</div>
            <div>${menuItem.price}</div>
          </div>
          <img
            src={getPicture(menuItem.name)}
            alt={menuItem.name}
            style={imageStyle}
          />
        </li>
        ))}
      </ul>
    </div>
  );
};

export default Menuboard;
