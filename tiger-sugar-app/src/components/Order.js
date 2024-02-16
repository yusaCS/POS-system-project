import React, { useState, useEffect } from 'react';
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PaymentStatusModal from "./PaymentStatusModal";
import ErrorIcon from "@mui/icons-material/Error";
import Navbar from './Navbar.js';
import '../effects/OrderFX.css';

/**
 * @author Kawan Ardalan
 * @constructor
 * @returns {JSX.Element} The React component for the customer order screen.
 */
const Order = () => {
  const [menuData, setMenuData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [images, setImages] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedCustomization, setSelectedCustomization] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  const [showCart, setShowCart] = useState(false);
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState('');
  const [showCreditCardPopup, setShowCreditCardPopup] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    creditCardCompany: '',
    cardNumber: ''
  });

  /**
   * Fetch function for the menu database.
   * @returns {void}
   */
  const fetchMenuData = async () => {
    fetch('https://tiger-sugar-app.onrender.com/menu')
      .then((response) => response.json())
      .then((data) => setMenuData(data))
      .catch((error) => console.error(error));
  };

  /**
   * Fetch function for the inventory database.
   * @return {void}
   */
  const fetchInventoryData = async () => {
    fetch('https://tiger-sugar-app.onrender.com/inventory')
      .then((response) => response.json())
      .then((data) => setInventoryData(data))
      .catch((error) => console.error(error))
  };

  /**
   * Fetch function for the image paths (from the public assets folder).
   * @returns {void}
   */
  const fetchImages = async () => {
    setImages(require('./sources.json')); // pull image paths
  };

  /**
   * React hook that fetches menu, inventory, and image data when the component mounts.
   * Invokes 'fetchMenuData', 'fetchInventoryData', and 'fetchImages' functions.
   * Runs only once after the component mounts.
   * @returns {void}
   */
  useEffect(() => {
    fetchMenuData();
    fetchInventoryData();
    fetchImages();
  }, []);

  /**
   * Styles for the screen.
   * @type {object}
   */
  const screenStyle = {
    backgroundColor: '#FFFFFF',
    marginTop: '60px',
    marginBottom: '0px',
    height: 'auto'
  };

  /**
   * Styles for the image container.
   * @type {object}
   */
  const imageContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  /**
   * Styles for the header image.
   * @type {object}
   */
  const imageStyle = {
    marginTop: '20px',
    width: '86%',
    borderRadius: '8px',
    height: '360px',
  };

  /**
   * Styles for the header title.
   * @type {object}
   */
  const titleStyle = {
    display: 'flex',
    marginLeft: '102.5px',
    justifyContent: 'left',
    color: '#000000'
  };

  /**
   * Styles for the placement of the menu cards.
   * @type {object}
   */
  const cardPlacement = {
    display: 'flex',
    marginLeft: '102.5',
    justifyContent: 'center',
    color: '#000000'
  };

  /**
   * Styles for the menu title header.
   * @type {object}
   */
  const header1Style = {
    fontSize: '32px',
    lineHeight: '40px',
    fontWeight: '700',
    letterSpacing: '-0.04ch',
    padding: '16px',
    paddingLeft: '0px',
    margin: '0px'
  };

  /**
   * Styles for the horizontal line page break.
   * @type {object}
   */
  const lineStyle = {
    color: '#E7E7E7',
    width: '86%'
  };

  /**
   * Styles for the layout of the menu cards.
   * @type {object}
   */
  const cardLayoutStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
  };

  /**
   * Styles for the add button that goes on the menu cards.
   * @type {object}
   */
  const addButtonStyle = {
    backgroundColor: '#F7F7F7',
    boxShadow: 'transparent 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.2) 0px 2px 8px',
    color: '#191919',
    position: 'relative',
    margin: '0px',
    alignItems: 'center',
    borderRadius: '24px',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    transition: 'background-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s',
    fontSize: '14px',
    fontWeight: '700',
    lineHeight: '16px',
    letterSpacing: '0ch',
    top: '-45px',
    height: '32px',
    width: '51.5px',
    zIndex: '98'
  };

  /**
   * Styles for the menu card.
   * @type {object}
   */
  const cardStyle = {
    height: '140px',
    width: '652px',
    borderRadius: '4px',
    transition: 'border-color 0.25s ease 0s',
    cursor: 'pointer',
    margin: '10px',
    padding: '0px'
  };

  /**
   * Styles for the layout of the text in the menu card.
   * @type {object}
   */
  const cardTextContainerStyle = {
    maxWidth: '510px',
    position: 'relative'
  };

  /**
   * Styles for the header in the menu card.
   * @type {object}
   */
  const cardHeaderStyle = {
    fontSize: '16px',
    fontWeight: '700',
    lineHeight: '22px',
    letterSpacing: '-0.04ch',
    color: '#191919',
    textAlign: 'left',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '16px',
    marginTop: '20px'
  };

  /**
   * Styles for the price in the menu card.
   * @type {object}
   */
  const cardPriceStyle = {
    fontSize: '14px',
    fontWeight: '500',
    lineHeight: '20px',
    color: '#494949',
    textAlign: 'left',
    letterSpacing: '0ch',
    padding: '16px',
    marginTop: '-7.5px'
  };

  /**
   * Styles for the layout of the image in the menu card.
   * @type {object}
   */
  const cardImageContainerStyle = {
    position: 'relative',
    width: '142px',
    left: '510px',
    top: '-118px'
  };

  /**
   * Styles for the image in the menu card.
   * @type {object}
   */
  const cardImageStyle = {
    height: '140px',
    width: '142px',
    zIndex: '-1'
  };

  /**
   * Overlying styles for the customization popup card.
   * @type {object}
   */
  const customizationStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '9999'
  };

  /**
   * Styles for the layout of the customization popup components.
   * @type {object}
   */
  const customLayoutStyle = {
    backgroundColor: '#EED484',
    color: 'black',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    zIndex: '10000',
    width: '70%',
    position: 'relative'
  };

  /**
   * Styles for the exit button in the customization popup.
   * @type {object}
   */
  const customButtonStyle = {
    position: 'absolute',
    top: '5px',
    left: '5px',
    padding: '5px 10px',
    backgroundColor: 'transparent',
    border: '3px solid darkred',
    borderRadius: '50%',
    cursor: 'pointer',
    color: 'darkred',
    fontWeight: 'bold'
  };

  /**
   * Styles for the customization popup header.
   * @type {object}
   */
  const customHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px'
  };

  /**
   * Styles for the drink name in the customization popup.
   * @type {object}
   */
  const customNameStyle = {
    flex: '1 0 50%',
    marginLeft: '20px',
    wordWrap: 'break-word'
  };

  /**
   * Styles for the image in the customization popup.
   * @type {object}
   */
  const customPictureStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px'
  };

  /**
   * Styles for the price in the customization popup.
   * @type {object}
   */
  const customPriceStyle = {
    borderTop: '2px solid black',
    paddingTop: '10px',
    textAlign: 'right',
    fontWeight: 'bold'
  };

  /**
   * Styles for the layout of the Add to Cart button of the customization popup.
   * @type {object}
   */
  const customAddToOrderStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderTop: '2px solid black',
    paddingTop: '20px',
    marginTop: '20px'
  };

  /**
   * Styles for the Add to Cart button of the customization popup.
   * @type {object}
   */
  const customAddButtonStyle = {
    padding: '10px 20px',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.25s ease'
  };

  /**
   * Styles for layout and design of the cart.
   * @type {object}
   */
  const cartContainer = {
    position: 'reflect',
    textDecoration: 'none',
    border: 'none',
    padding: '5px',
    margin: '10px',
    display: 'block',
    width: '675px',
    background: 'black',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '5px'
  };

  /**
   * Styles for the text in the cart.
   * @type {object}
   */
  const cartTextContainerStyle = {
    margin: '0px',
    marginTop: '2px'
  };

  /**
   * Styles for the cart button.
   * @type {object}
   */
  const cartButtonStyle = {
    position: 'fixed',
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    zIndex: '9999',
    border: 'none',
    right: '1.3%',
    top: '12%',
    transition: 'background-color 0.25s ease'
  };

  /**
   * Styles for the cart icon image.
   * @type {object}
   */
  const cartImageStyle = {
    height: '35px',
    width: '35px',
    margin: '0',
    padding: '0'
  };

  /**
   * Opens a Snackbar with a specific message and severity.
   * @param {string} message  - The message to display in the Snackbar.
   * @param {string} severity - The severity of the Snackbar (e.g., 'error', 'warning', 'info').
   * @returns {void}
   */
  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  /**
   * Determines the name of the drink.
   * @param {int} id - The identification of the menu item in the database.
   * @returns {string} The name of the drink or 'Item Not Found'.
   */
  const getName = (id) => {
    const selectedItem = menuData.find(item => item.id === id);
    return selectedItem ? selectedItem.name : 'Item Not Found';
  };

  /**
   * Determines the price of the drink.
   * @param {int} id - The identification of the menu item in the database.
   * @returns {number | string} The price of the drink or 'Item Not Found'.
   */
  const getPrice = (id) => {
    const selectedItem = menuData.find(item => item.id === id);
    return selectedItem ? selectedItem.price : 'Item Not Found';
  };

  /**
   * Determines the correct picture to display.
   * @param {string} imageName - The name of the image.
   * @returns {string} The source path of the image or the Logo, if not found.
   */
  const getPicture = (imageName) => {
    const picture = images[imageName];
    return picture ? images[imageName] : images['Logo'];
  };

  /**
   * onClick handler for add buttons on the menu cards.
   * Displays the customization popup screen.
   * @param {int} id - The identification of the menu item in the database.
   * @returns {void}
   */
  const onClickAddButton = (id) => {
    setSelectedItemId(id);
    setShowCustomization(true);
  };

  /**
   * onClick handler for adding menu item to cart from the customization popup screen.
   * @param {int} id - The identification of the menu item in the database.
   * @param {int} quantity - The count number of the particular menu item.
   * @param {number} price - The price of the menu item.
   * @returns {void}
   */
  const onClickAddItemToCart = (id, quantity, price) => {
    const selectedItem = menuData.find((item) => item.id === id);
  
    if (!selectedItem) {
      openSnackbar(
        `${getName(id)} could not be added to cart as it does not exist.`,
        'error'
      );
      return;
    }
  
    const newItem = {
      ID: id,
      Quantity: quantity,
      Price: parseFloat(price),
      Notes: ''
    };
  
    if (selectedItem.ingredients) {
      const ingredientIDs = selectedItem.ingredients.split('\\').map((id) => parseInt(id.trim(), 10));
      const customizations = [];
  
      ingredientIDs.forEach((ingredientID) => {
        const selectedCustomizationKey = `${id}-${ingredientID}`;
        const selectedItemCustomization = selectedCustomization[selectedCustomizationKey] || 'Normal';
  
        const ingredient = inventoryData.find((dataItem) => dataItem.id === ingredientID);
        if (ingredient && selectedItemCustomization !== 'Normal') {
          const customizationText = selectedItemCustomization === 'None' ? `No ${ingredient.name}` : `${selectedItemCustomization} ${ingredient.name}`;
          customizations.push(customizationText);
        } else if (!ingredient) {
          console.error(`Ingredient ID ${ingredientID} not found.`);
        }
      });
  
      // Constructing notes based on customizations
      if (customizations.length > 0) {
        newItem.Notes = customizations.join('\n');
      }
    }
  
    const existingItemIndex = cartData.findIndex((item) => item.ID === id && item.Notes === newItem.Notes);
  
    if (existingItemIndex !== -1) {
      // If the same item (with the same customizations) exists in the cart, update its quantity and price
      const updatedCartData = [...cartData];
      updatedCartData[existingItemIndex].Quantity += quantity;
      updatedCartData[existingItemIndex].Price += parseFloat(price);
      setCartData(updatedCartData);
  
      openSnackbar(
        `${getName(id)} quantity has been updated in the cart!`,
        'success'
      );
      return;
    }
  
    // Adding the item to the cart (cartData) as a new entry
    setCartData([...cartData, newItem]);
  
    openSnackbar(
      `${getName(id)} has successfully been added to the cart!`,
      'success'
    );
  };

  /**
   * onClick handler for closing the customization popup screen.
   * @returns {void}
   */
  const onClickCloseCustomization = () => {
    setShowCustomization(false);
    setSnackbarOpen(false);

    if (selectedItemId) {
      setSelectedItemId(null);
    }

    const selectedItem = menuData.find((item) => item.id === selectedItemId);
    if (selectedItem && selectedItem.ingredients) {
      const ingredientIDs = selectedItem.ingredients
        .split('\\')
        .map((id) => parseInt(id.trim(), 10));
      const resetState = {};

      ingredientIDs.forEach((ingredientID) => {
        const selectedCustomizationKey = `${selectedItemId}-${ingredientID}`;
        resetState[selectedCustomizationKey] = 'Normal';
      });

      setSelectedCustomization((prevState) => ({
        ...prevState,
        ...resetState
      }));
    }
  };

  /**
   * Retrieves the button style based on the selected item's customization and type.
   * @param {string} selectedItemCustomization - The customization type selected for the item.
   * @param {string} type - The type of customization to compare against.
   * @returns {object} - Returns an object containing button styles based on the customization type.
   */
  const getButtonStyle = (selectedItemCustomization, type) => {
    return {
      padding: '5px 10px',
      margin: '0 2px',
      borderRadius: '5px',
      backgroundColor: selectedItemCustomization === type ? '#ADD8E6' : '#00008B',
      color: 'white',
      fontWeight: selectedItemCustomization === type ? 'bold' : 'normal',
      border: 'none',
      cursor: 'pointer'
    };
  };

  /**
   * Retrieves the ingredients of an item based on the provided itemID.
   * @param {int} itemID - The ID of the item to get ingredients for.
   * @returns {JSX.Element} - Returns a list of ingredients as JSX elements or an empty array.
   */
  const getIngredients = (itemID) => {
    const selectedItem = menuData.find((item) => item.id === itemID);

    if (selectedItem && selectedItem.ingredients) {
      const ingredientIDs = selectedItem.ingredients
        .split('\\')
        .map((id) => parseInt(id.trim(), 10));
      const ingredientList = ingredientIDs.map((ingredientID) => {
        const ingredient = inventoryData.find((dataItem) => dataItem.id === ingredientID);

        if (ingredient) {
          const selectedCustomizationKey = `${itemID}-${ingredientID}`;
          if (!selectedCustomization[selectedCustomizationKey]) {
            setSelectedCustomization({
              ...selectedCustomization,
              [selectedCustomizationKey]: 'Normal'
            });
          }

          const selectedItemCustomization = selectedCustomization[selectedCustomizationKey];
          
          const handleCustomizationClick = (customizationType) => {
            setSelectedCustomization({
              ...selectedCustomization,
              [selectedCustomizationKey]: customizationType
            });
          };

          return (
            <li key={ingredient.id} style={{ marginBottom: '5px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ marginRight: '10px', fontWeight: 'bold' }}>
                  {`${ingredient.name}:`}
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <button
                      key={`${selectedItem.id}-${ingredient.id}-None`}
                      style={getButtonStyle(selectedItemCustomization, 'None')}
                      onClick={() => handleCustomizationClick('None')}
                    >
                      {`None`}
                    </button>
                    <button
                      key={`${selectedItem.id}-${ingredient.id}-Light`}
                      style={getButtonStyle(selectedItemCustomization, 'Light')}
                      onClick={() => handleCustomizationClick('Light')}
                    >
                      {`Light`}
                    </button>
                    <button
                      key={`${selectedItem.id}-${ingredient.id}-Normal`}
                      style={getButtonStyle(selectedItemCustomization, 'Normal')}
                      onClick={() => handleCustomizationClick('Normal')}
                    >
                      {`Normal`}
                    </button>
                    <button
                      key={`${selectedItem.id}-${ingredient.id}-Extra`}
                      style={getButtonStyle(selectedItemCustomization, 'Extra')}
                      onClick={() => handleCustomizationClick('Extra')}
                    >
                      {`Extra`}
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        } else {
          return (
            <li key={ingredientID}>
              {`Ingredient ID ${ingredientID} not found.`}
            </li>
          );
        }
      });

      return <ul>{ingredientList}</ul>
    } else {
      console.log(`Item or ingredients not found.`);
      return [];
    }
  };

  /**
   * onClick handler function for opening the cart.
   * @returns {void}
   */
  const onClickCart = () => {
    setShowCart(true);
  };

  /**
   * onClick handler function for closing the cart.
   * @returns {void}
   */
  const onCloseCart = () => {
    setShowCart(false);
  };

  /**
   * Represents a customization popup for a selected item.
   * @type {JSX.Element}
   */
  const customizationPopup = (
    <div style={customizationStyle}>
      <div style={customLayoutStyle}>
        <button style={customButtonStyle} onClick={onClickCloseCustomization}>
          X
        </button>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={customHeaderStyle}>
            <div style={{ flex: '0 0 25%', fontWeight: 'bold' }}>
              <p>{`ID: ${selectedItemId}`}</p>
            </div>
            <div style={customNameStyle}>
              <h2>{`${getName(selectedItemId)}`}</h2>
            </div>
          </div>

          <div style={customPictureStyle}>
            <div style={{ flex: '0 0 40%', marginRight: '20px' }}>
              <img
                style={{ width: '100%', borderRadius: '5px' }}
                src={getPicture(getName(selectedItemId))}
                alt='Menu item'
              />
            </div>
            <div style={{ flex: '1 0 auto' }}>
              <h3>{`Ingredients:`}</h3>
              <ul>{getIngredients(selectedItemId)}</ul>
            </div>
          </div>

          <div style={customPriceStyle}>
            <p style={{ margin: '0' }}>
              {`Price: $${getPrice(selectedItemId)}`}
            </p>
          </div>
        </div>

        <div style={customAddToOrderStyle}>
          <button
            class='add-to-cart-button'
            style={customAddButtonStyle}
            onClick={() => onClickAddItemToCart(
              selectedItemId, 1, getPrice(selectedItemId)
            )}
          >
            {`Add to Cart`}
          </button>
        </div>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => {
            setSnackbarOpen(false);
            setShowCustomization(false);
          }}
          sx={{ maxHeight: '1000px' }}
        >
          <MuiAlert
            elevation={6}
            variant='filled'
            onClose={() => {
              setSnackbarOpen(false);
              setShowCustomization(false);
            }}
            severity={snackbarSeverity}
            sx={{
              backgroundColor:
                snackbarSeverity === 'error'
                  ? '#F44336'
                  : snackbarSeverity === 'warning'
                  ? '#FF9800'
                  : snackbarSeverity === 'info'
                  ? '#2196F3'
                  : snackbarSeverity === 'success'
                  ? '#4CAF50'
                  : '#F44336',
              color: '#FFF'
            }}
            iconMapping={{
              error: <ErrorIcon />,
              warning: <WarningIcon />,
              info: <InfoIcon />,
              success: <CheckCircleIcon />
            }}
          >
            {`${snackbarMessage}`}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );
  
  /**
   * onClick handler function for showing the customer purchase screen.
   * @returns {void}
   */
  const onClickOrderCart = () => {
    openCreditCardPopup();
    setShowCart(false);
  };

  /**
   * Calculates the total price of items in the table data.
   * @type {number}
   */
  const totalPrice = cartData.reduce((total, row) => total + parseFloat(row.Price), 0);

  /**
   * Template component function for cart cards.
   * @param {object} item - The menu item to format.
   * @returns {JSX.Element} A JSX component of a formatted cart card.
   */
  const buildCartCard = (item) => {
    const id = item.ID;
    const name = getName(id);
    const price = getPrice(id);
    const source = getPicture(name);
    const count = item.Quantity;

    return (
      <>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={cartContainer}>
            <div>
              <img
                style={{ width: '100px', height: '100px' }}
                src={source}
                alt='Drink in cart'
              />
            </div>
            <div style={cartTextContainerStyle}>
              <div>
                {name}
              </div>
              <div>
                {`$${parseFloat(price).toFixed(2)}`}
              </div>
              <div>
                {`Quantity: ${count}`}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  /**
   * Clears the cart.
   * @returns {void}
   */
  const clearOrder = () => {
    setCartData([]);
  };

  /**
   * Close the payment status popup and reset the payment message.
   * @returns {void}
   */
  const closePaymentStatus = () => {
    setShowPaymentStatus(false);
    setPaymentMessage("");
  };

  /**
   * Send a card order to the backend with necessary card and order details.
   * @returns {void}
   */
  const sendCardOrder = async () => {
    const cartCashOrder = cartData.map((row) => row.ID).join("\\");

    // Get the current date
    const currentDate = new Date();

    // Get the current week of the year (as an integer)
    const currentWeek = Math.ceil(
      ((currentDate - new Date(currentDate.getFullYear(), 0, 1)) / 86400000 + 1) / 7
    );

    // Get the current date in the format YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split("T")[0];

    // Get the current hour in HH:00 format
    const formattedHour = currentDate.toISOString().split("T")[1].split(":")[0] + "00";
    const formattedPayment = cardDetails.creditCardCompany + " " + cardDetails.cardNumber.slice(-4);

    try {
      const response = await fetch("https://tiger-sugar-app.onrender.com/submitOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cashier: 1,
          sale_week: currentWeek,
          sale_date: formattedDate,
          current_hour: formattedHour,
          payment: formattedPayment,
          cart: cartCashOrder,
          order_total: totalPrice,
        }),
      });

      if (response.ok) {
          // console.log("Fetch for /submitOrder successful");
          // alert("Order added to database");
      }
    } catch (error) {
        // console.error("Error:", error);
        // alert("Complete Failure");
    }
  };

  /**
   * Open the credit card payment popup.
   * @returns {void}
   */
  const openCreditCardPopup = () => {
    setShowCreditCardPopup(true);
  };

  /**
   * Close the credit card payment popup.
   * @returns {void}
   */
  const closeCreditCardPopup = () => {
      setShowCreditCardPopup(false);
  };

  /**
   * Process a card payment by sending the card order, updating payment status, and clearing the order details.
   * @returns {void}
   */
  const processCardPayment = () => {
    setShowCreditCardPopup(false);
    sendCardOrder();
    setPaymentMessage(`Payment of $${parseFloat(totalPrice).toFixed(2)} Successful!`);
    clearOrder();
    setShowPaymentStatus(true);
  };

  /**
   * Handle input changes for credit card details.
   * @param {Event} e - The input change event.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  /**
   * Handle form submission for credit card details.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform actions with card details, e.g., send to backend
    // console.log("Card details:", cardDetails);
    // Reset card details after submission
    setCardDetails({
      name: "",
      creditCardCompany: "",
      cardNumber: "",
      cvv: "",
      expirationDate: "",
      zipCode: "",
    });
    processCardPayment();
  };

  /**
   * Builds the cart screen with the contents (orders) in the cart.
   * @returns {JSX.Element} The cart component.
   */
  const getCart = cartData.map((item) => (
    <>{buildCartCard(item)}</>
  ));
  
  /**
   * @returns {JSX.Element} The JSX component for the cart popup.
   */
  const cartPopup = (
    <div style={{...customizationStyle, overflowY: 'scroll', zIndex: '9999' }}>
      <div style={{...customLayoutStyle, width: '650px', marginTop: '300px' }}>
        <button style={customButtonStyle} onClick={onCloseCart}>
          X
        </button>
        {
          cartData.length === 0 ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  style={{ width: 'auto', height: 'auto' }}
                  src={images['Empty Cart']}
                  alt='Cart is empty'
                />
              </div>
            </>
          ) : (
            <>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={customHeaderStyle}>
                  <div style={customNameStyle}>
                    <h2>Cart</h2>
                  </div>
                </div>

                <div style={{ flex: '1 0 auto' }}>
                  {getCart}
                </div>
              </div>

              <div style={customAddToOrderStyle}>
                <button
                  class='add-to-cart-button'
                  style={customAddButtonStyle}
                  onClick={onClickOrderCart}
                >
                  {`Checkout $${parseFloat(totalPrice).toFixed(2)}`}
                </button>
              </div>
            </>
          )
        }
      </div>
    </div>
  );

  /**
   * Builds a functional add button to add menu items to the cart.
   * @param {int} ID - The identification of the menu item in the database.
   * @returns {JSX.Element} An add button for the menu cards.
   */
  const buildAddButton = (ID) => {
    return (
      <>
        <button
          style={{ ...addButtonStyle, left: '82px' }}
          onClick={() => onClickAddButton(ID)}
        >
          Add
        </button>
      </>
    );
  };

  /**
   * Formats drink names, prices, and images into cards and displays them on the ordering screen.
   * @param {int} ID - The identification of the menu item in the database.
   * @returns The menu that appears on the ordering screen as cards.
   */
  const buildMenuCards = (ID) => {
    const name = getName(ID);
    const price = getPrice(ID);
    const source = getPicture(name);

    return (
      <>
        <div className='menu-card' style={cardStyle} onClick={() => onClickAddButton(ID)}>
          <div style={cardTextContainerStyle}>
            <div style={cardHeaderStyle}>
              {name}
            </div>
            <div style={cardPriceStyle}>
              {`$${parseFloat(price).toFixed(2)}`}
            </div>
          </div>
          <div style={cardImageContainerStyle}>
            <img
              style={cardImageStyle}
              src={source}
              alt='Boba drink.'
            />
            {buildAddButton(ID)}
          </div>
        </div>
      </>
    );
  };

  /**
   * Builds the menu (ordering) screen from the menu database.
   * @returns {JSX.Element} The JSX component for the menu cards.
   */
  const cardItems = menuData.map((item) => (
    <>{buildMenuCards(item.id)}</>
  ));

  return (
    <>
      <Navbar />
      <div style={screenStyle}>
        <div>
          <button
            class='cart-button'
            style={cartButtonStyle}
            onClick={onClickCart}
          >
            <img
              style={cartImageStyle}
              src={images["Cart Icon"]}
              alt='Cart icon'
            />
          </button>
        </div>
        <div style={imageContainer}>
          <img
            style={imageStyle}
            src={images["Menu Headline"]}
            alt='Headline for the menu, depicting three example drinks.'
          />
        </div>
        <div style={titleStyle}>
          <h1 style={header1Style}>Menu</h1>
        </div>
        <div>
          <hr style={lineStyle}></hr>
        </div>
        <div style={titleStyle}></div>
        <div style={cardPlacement}>
          <div style={cardLayoutStyle}>
            {cardItems}
          </div>
        </div>
        {showCustomization && customizationPopup}
        {showCart && cartPopup}
        {showPaymentStatus && (
                    <PaymentStatusModal
                        message={paymentMessage}
                        onClose={closePaymentStatus}
                    />
        )}
        {/* Credit Card Payment Popup */}
        {showCreditCardPopup && (
                    <div
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#ffffff",
                            padding: "30px",
                            borderRadius: "8px",
                            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                            zIndex: 9999,
                            width: "300px",
                            textAlign: "center",
                            fontFamily: "Arial, sans-serif",
                            color: "black",
                        }}
                    >
                        <div className="credit-card-popup">
                            {/* Credit Card Payment Form */}
                            <h2>Credit Card Payment</h2>
                            <form
                                onSubmit={handleSubmit}
                                style={{ marginTop: "20px" }}
                            >
                                <div style={{ marginBottom: "15px" }}>
                                    <label htmlFor="CardCompany">
                                        Credit Card Company:
                                    </label>
                                    <input
                                        type="text"
                                        id="creditCardCompany"
                                        name="creditCardCompany"
                                        value={cardDetails.creditCardCompany}
                                        onChange={handleInputChange}
                                        required
                                        style={{ marginLeft: "5px" }}
                                    />
                                </div>
                                <div style={{ marginBottom: "15px" }}>
                                    <label htmlFor="cardNumber">
                                        Last Four Digits of Card Number:
                                    </label>
                                    <input
                                        type="text"
                                        id="cardNumber"
                                        name="cardNumber"
                                        value={cardDetails.cardNumber}
                                        onChange={handleInputChange}
                                        required
                                        style={{ marginLeft: "5px" }}
                                    />
                                </div>
                                <button
                                    style={{
                                        padding: "10px 20px",
                                        backgroundColor: "#007BFF",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                        marginRight: "10px", // Added spacing between buttons
                                    }}
                                    type="submit"
                                >
                                    Pay
                                </button>
                                <button
                                    style={{
                                        padding: "10px 20px",
                                        backgroundColor: "#dc3545",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        cursor: "pointer",
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                    }}
                                    onClick={closeCreditCardPopup}
                                >
                                    Cancel
                                </button>
                            </form>
                        </div>
                    </div>
                )}
      </div>
    </>
  );
};

export default Order;