import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "../effects/PosSystemFX.css";
import PaymentStatusModal from "./PaymentStatusModal";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import WarningIcon from "@mui/icons-material/Warning";
import InfoIcon from "@mui/icons-material/Info";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

/**
 * @author Josh Mueck
 * Represents the Point of Sale (POS) system component.
 * Manages menu, inventory, table data, and various states within the system.
 * @author Josh Mueck
 * @constructor
 * @returns {JSX.Element} The POS system component JSX.
 */
const PosSystem = () => {
  const [menuData, setMenuData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedCustomization, setSelectedCustomization] = useState({});
  const [errors, setErrors] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);
  const [showCashPopup, setShowCashPopup] = useState(false);
  const [cashAmount, setCashAmount] = useState(0);
  const [showPaymentStatus, setShowPaymentStatus] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");
  const [showCreditCardPopup, setShowCreditCardPopup] = useState(false);
  const [showConfirmationPopup] = useState(false);
  const [cardDetails, setCardDetails] = useState({
    creditCardCompany: "",
    cardNumber: "",
  });
  // Snackbar library for feedback indicator
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const [images, setImages] = useState([]);

  /**
   * Opens a Snackbar with a specific message and severity.
   * @param {string} message - The message to display in the Snackbar.
   * @param {string} severity - The severity of the Snackbar (e.g., 'error', 'warning', 'info').
   * @returns {void}
   */
  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Debugging function for logging variable instances
  /**
   * Debugging function for logging variable instances.
   * Outputs the current values of 'menuData', 'inventoryData', and 'errors' to the console.
   * @returns {void}
   */
  const debugLogs = () => {
    console.log(`Menu data: ${menuData}`); // check menu data
    console.log(`Inventory data: ${inventoryData}`); // check inventory data
    console.log(`Errors: ${errors}`); // check errors
  };

  /**
   * Fetches menu data from the specified API endpoint.
   * Sets the retrieved data into the 'menuData' state.
   * @returns {void}
   */
  const fetchMenuData = async () => {
    fetch("https://tiger-sugar-app.onrender.com/menu")
      .then((response) => response.json())
      .then((data) => setMenuData(data))
      .catch((error) => setErrors(error));
  };

  /**
   * Fetches inventory data from the specified API endpoint.
   * Sets the retrieved data into the 'inventoryData' state.
   * @returns {void}
   */
  const fetchInventoryData = async () => {
    fetch("https://tiger-sugar-app.onrender.com/inventory")
      .then((response) => response.json())
      .then((inventoryData) => setInventoryData(inventoryData))
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
   * React hook that fetches menu data, inventory data, and images when the component mounts.
   * Invokes 'fetchMenuData', 'fetchInventoryData', and 'fetchImages' functions.
   * Runs only once after the component mounts (equivalent to componentDidMount).
   * @returns {void}
   */
  useEffect(() => {
    fetchMenuData();
    fetchInventoryData();
    fetchImages();
    //setRowHeights();
  }, []);

  // Console debugger
  debugLogs();

  /**
   * Styles for the system container.
   * Includes properties for layout, padding, and background color.
   * @type {object}
   */
  const systemStyle = {
    display: "flex",
    alignItems: "flex-start",
    width: "100%",
    flexDirection: "row",
    marginTop: "60px",
    padding: "10px",
    backgroundColor: "#FFFFB8",
  };

  /**
   * Styles for the grid container.
   * Defines grid layout properties and visual styles for grid items.
   * @type {object}
   */
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gridGap: "7.5px",
    gridAutoRows: "minmax(100px, auto)",
    width: "100%",
    overflowX: "scroll",
    whiteSpace: "nowrap",
    alignItems: "center",
    justifyContent: "left",
    marginLeft: "10px",
    columnGap: "10px",
    paddingTop: "10px",
    height: "90vh",
  };

  /**
   * Styles for buttons within the grid.
   * Defines button appearance, padding, and transition properties.
   * @type {object}
   */
  const gridButtonStyle = {
    padding: "15px", // Adjust padding as needed
    color: "black",
    borderRadius: "10px",
    userSelect: "none",
    cursor: "pointer",
    transition: "background-color 0.25s ease",
    whiteSpace: "normal", // Set whiteSpace to 'normal' or 'break-word' for text wrapping
    height: "90%", // Set a fixed height for the buttons
    width: "200px", // Set a fixed width for the buttons
  };

  /**
   * Styles for sections within the system.
   * Defines layout and appearance properties for sections.
   * @type {object}
   */
  const sectionStyle = {
    display: "flex",
    flexDirection: "column",
    marginLeft: "10px",
    userSelect: "none",
    paddingRight: "20px",
    paddingTop: "15px",
  };

  /**
   * Styles for rounded rectangle elements.
   * Defines appearance properties for rounded rectangles.
   * @type {object}
   */
  const roundedRectStyle = {
    borderRadius: "10px",
    backgroundColor: "#007BFF",
    color: "white",
    padding: "10px",
    textAlign: "center",
    userSelect: "none",
  };

  /**
   * Styles for the container element with maximum height and vertical scrolling.
   * @type {object}
   */
  const containerStyle = {
    maxHeight: "62vh", // Set a maximum height for the container
    overflowY: "auto", // Enable vertical scrolling for the container
  };

  /**
   * Styles for the table used for orders with collapse borders and visual properties.
   * @type {object}
   */
  const orderTableStyle = {
    borderCollapse: "collapse",
    userSelect: "none",
    border: "1px solid #DDD",
    marginTop: "10px",
    backgroundColor: "black",
    height: "100%",
  };

  /**
   * Styles for cells within the order table with specific border, padding, and alignment.
   * @type {object}
   */
  const cellStyle = {
    ...orderTableStyle,
    border: "1px solid #DDD",
    padding: "8px",
    textAlign: "center",
    //width: '90px'
  };

  /**
   * Styles for quantity cells in the order table with specific alignment and border.
   * @type {object}
   */
  const quantityCellStyle = {
    //width: '120px', // Adjust the width as needed to accommodate the buttons
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "8px",
    border: "1px solid #DDD",
  };

  /**
   * Styles for notes cells in the order table with specific maximum width, maximum height,
   * text wrapping, and vertical scrolling.
   * @type {object}
   */
  const notesCellStyle = {
    ...cellStyle,
    maxWidth: "200px", // Set your desired maximum width
    maxHeight: "50px", // Set your desired maximum height
    overflowY: "auto", // Enable vertical scrolling
    wordWrap: "break-word", // Allow text wrapping
  };

  /**
   * Styles for the total row in the order table with a specific top border style.
   * @type {object}
   */
  const totalRowStyle = {
    borderTop: "2px solid white",
    position: "sticky",
  };

  /**
   * Styles for the payment element with specific appearance properties.
   * @type {object}
   */
  const paymentStyle = {
    marginTop: "20px",
    borderRadius: "10px",
    backgroundColor: "#FF0000",
    color: "white",
    padding: "10px",
    textAlign: "center",
    userSelect: "none",
  };

  /**
   * Styles for the payment section with specific appearance properties.
   * @type {object}
   */
  const paymentSection = {
    alignItems: "center",
  };

  /**
   * Styles for the payment rectangle element with specific layout and visual properties.
   * @type {object}
   */
  const paymentRectStyle = {
    display: "flex",
    flexDirection: "row",
    marginTop: "20px",
    alignItems: "center",
  };

  /**
   * Styles for transaction rectangle with specific appearance properties.
   * @type {object}
   */
  const transactionRectStyle = {
    borderRadius: "10px",
    color: "white",
    padding: "10px 20px",
    textAlign: "center",
    marginRight: "10px",
    marginLeft: "10px",
    cursor: "pointer",
    lineHeight: "2",
    userSelect: "none",
    transition: "background-color 0.25s ease",
    alignItems: "center",
  };

  /**
   * Styles for circular buttons with specific appearance and hover properties.
   * @type {object}
   */
  const circleButtonStyle = {
    display: "flex", // Center the content horizontally
    justifyContent: "center", // Center the content vertically
    borderRadius: "50%", // Make buttons circular
    width: "20px", // Set the width of the buttons
    height: "20px", // Set the height of the buttons
    border: "2px solid white", // White outline
    color: "white", // White text color
    backgroundColor: "transparent", // Transparent background
    cursor: "pointer", // Show pointer on hover
    margin: "0 5px", // Add margin for spacing between buttons
  };

  /**
   * Gets the price of an item based on its ID from the menuData array.
   * @param {number} ID - The ID of the item.
   * @returns {string|number} - The price of the item or 'Item Not Found'.
   */
  const getPrice = (ID) => {
    const selectedItem = menuData.find((item) => item.id === ID);
    return selectedItem ? selectedItem.price : "Item Not Found";
  };

  /**
   * Retrieves the name of an item based on its ID from the menu data.
   * @param {number} ID - The ID of the item to retrieve the name for.
   * @returns {string} - The name of the item if found, otherwise returns 'Item Not Found'.
   */
  const getName = (ID) => {
    const selectedItem = menuData.find((item) => item.id === ID);
    return selectedItem ? selectedItem.name : "Item Not Found";
  };

  /**
   * Adds an item to the order list considering its ID, quantity, and price, managing customizations if applicable.
   * Displays a notification based on the success or failure of adding the item.
   * @param {number} id - The ID of the item to be added to the order.
   * @param {number} quantity - The quantity of the item being added.
   * @param {number} price - The price of the item being added.
   */
  const addItemToOrder = (id, quantity, price) => {
    const selectedItem = menuData.find((item) => item.id === id);

    if (!selectedItem) {
      // Display pop up: Item could not be added to order as it does not exist.
      openSnackbar(
        getName(id) + " could not be added to order as it does not exist.",
        "error"
      );
      return;
    }

    const newItem = {
      ID: id,
      Quantity: quantity,
      Price: parseFloat(price),
      Notes: "",
    };

    if (selectedItem.ingredients) {
      const ingredientIDs = selectedItem.ingredients
        .split("\\")
        .map((id) => parseInt(id.trim(), 10));

      const customizationsMap = new Map(); // Store unique customizations and their counts

      ingredientIDs.forEach((ingredientID) => {
        const selectedCustomizationKey = `${id}-${ingredientID}`;
        const selectedItemCustomization =
          selectedCustomization[selectedCustomizationKey] || "Normal";

        const ingredient = inventoryData.find(
          (dataItem) => dataItem.id === ingredientID
        );
        if (ingredient && selectedItemCustomization !== "Normal") {
          const customizationText =
            selectedItemCustomization === "None"
              ? `No ${ingredient.name}`
              : `${selectedItemCustomization} ${ingredient.name}`;

          const existingCustomization = customizationsMap.get(id) || [];
          customizationsMap.set(id, [
            ...existingCustomization,
            customizationText,
          ]);
        } else if (!ingredient) {
          console.error(`Ingredient ID ${ingredientID} not found`);
        }
      });

      if (customizationsMap.size > 0) {
        const customizationsLines = [];

        customizationsMap.forEach((customizations, id) => {
          const customizationsLine = `- ${customizations.join(", ")}`;
          customizationsLines.push(customizationsLine);
        });

        newItem.Notes = customizationsLines.join("\n");

        // Add as a unique customized item
        setTableData([...tableData, newItem]);
        return;
      }
    }

    // Check if there are similar regular items already added to the table
    const existingRegularItemIndex = tableData.findIndex(
      (item) => item.ID === id && item.Notes === ""
    );

    if (existingRegularItemIndex !== -1) {
      const updatedTableData = [...tableData];
      updatedTableData[existingRegularItemIndex].Quantity += quantity;
      updatedTableData[existingRegularItemIndex].Price += parseFloat(price);
      setTableData(updatedTableData);
    } else {
      setTableData([...tableData, newItem]);
    }

    // Display pop up: {Item} has successfully been added to the order!
    openSnackbar(
      getName(id) + " has successfully been added to the order!",
      "success"
    );
  };

  /**
   * Handles the dropdown item click, toggling the expanded row state.
   * @param {number} id - The ID of the clicked dropdown item.
   */
  const handleDropdownItemClick = (id) => {
    if (expandedRow === id) {
      setExpandedRow(null); // Close the dropdown if the same item is clicked again
    } else {
      setExpandedRow(id); // Expand the dropdown for the clicked row
    }
  };

  /**
   * Creates a button with text representing an item and its details for the given ID.
   * @param {number} ID - The ID of the item for which the button is created.
   * @returns {JSX.Element} - Returns the JSX for the created button.
   */
  const makeButton = (ID) => {
    const buttonTextStyle = {
      fontSize: "12px", // Font size for the name
      marginTop: "5px", // Adjust margin as needed
    };

    return (
      <>
        <button
          className="gridButton"
          style={gridButtonStyle}
          onClick={() => handleItemCustomization(ID)} // Handle customization on button click
        >
          <div style={{ fontWeight: "bold", fontSize: "16px" }}>{ID}</div>
          <div style={buttonTextStyle}>{getName(ID)}</div>
        </button>
      </>
    );
  };

  /**
   * Handles item customization logic when an item's button is clicked.
   * @param {number} id - The ID of the item clicked for customization.
   */
  const handleItemCustomization = (id) => {
    setSelectedItemId(id);
    setShowCustomization(true);
  };

  /**
   * Closes the item customization pop-up and performs necessary resets.
   */
  const closeCustomization = () => {
    setShowCustomization(false);
    setSnackbarOpen(false);

    if (selectedItemId) {
      setSelectedItemId(null); // Reset selected item ID after closing the customization
    }

    // Reset all selected customizations to 'Normal' when the popup is closed
    const selectedItem = menuData.find((item) => item.id === selectedItemId);
    if (selectedItem && selectedItem.ingredients) {
      const ingredientIDs = selectedItem.ingredients
        .split("\\")
        .map((id) => parseInt(id.trim(), 10));
      const resetState = {};

      ingredientIDs.forEach((ingredientID) => {
        const selectedCustomizationKey = `${selectedItemId}-${ingredientID}`;
        resetState[selectedCustomizationKey] = "Normal";
      });

      setSelectedCustomization((prevState) => ({
        ...prevState,
        ...resetState,
      }));
    }
  };

  /**
   * Retrieves the image corresponding to the given imageName from the images collection.
   * @param {string} imageName - The name of the image to retrieve.
   * @returns {string} - Returns the image URL if found in the collection.
   */
  const getPicture = (imageName) => {
    const picture = images[imageName];
    return picture ? images[imageName] : images["Logo"];
  };

  /**
   * Retrieves the button style based on the selected item's customization and type.
   * @param {string} selectedItemCustomization - The customization type selected for the item.
   * @param {string} type - The type of customization to compare against.
   * @returns {object} - Returns an object containing button styles based on the customization type.
   */
  const getButtonStyle = (selectedItemCustomization, type) => {
    return {
      padding: "5px 10px",
      margin: "0 2px",
      borderRadius: "5px",
      backgroundColor:
        selectedItemCustomization === type ? "#ADD8E6" : "#00008B",
      color: "white",
      fontWeight: selectedItemCustomization === type ? "bold" : "normal",
      border: "none",
      cursor: "pointer",
    };
  };

  /**
   * Retrieves the ingredients of an item based on the provided itemID.
   * @param {number} itemID - The ID of the item to get ingredients for.
   * @returns {JSX.Element} - Returns a list of ingredients as JSX elements or an empty array.
   */
  const getIngredients = (itemID) => {
    const selectedItem = menuData.find((item) => item.id === itemID);

    if (selectedItem && selectedItem.ingredients) {
      const ingredientIDs = selectedItem.ingredients
        .split("\\")
        .map((id) => parseInt(id.trim(), 10));

      const ingredientList = ingredientIDs.map((ingredientID) => {
        const ingredient = inventoryData.find(
          (dataItem) => dataItem.id === ingredientID
        );
        if (ingredient) {
          const selectedCustomizationKey = `${itemID}-${ingredientID}`;
          // Initialize the default customization level to 'Normal' if not set
          if (!selectedCustomization[selectedCustomizationKey]) {
            setSelectedCustomization({
              ...selectedCustomization,
              [selectedCustomizationKey]: "Normal",
            });
          }

          const selectedItemCustomization =
            selectedCustomization[selectedCustomizationKey];

          const handleCustomizationClick = (customizationType) => {
            setSelectedCustomization({
              ...selectedCustomization,
              [selectedCustomizationKey]: customizationType,
            });
          };

          return (
            <li key={ingredient.id} style={{ marginBottom: "5px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div style={{ marginRight: "10px" }}>{ingredient.name}:</div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      key={`${selectedItem.id}-${ingredient.id}-None`}
                      style={getButtonStyle(selectedItemCustomization, "None")}
                      onClick={() => handleCustomizationClick("None")}
                    >
                      None
                    </button>
                    <button
                      key={`${selectedItem.id}-${ingredient.id}-Light`}
                      style={getButtonStyle(selectedItemCustomization, "Light")}
                      onClick={() => handleCustomizationClick("Light")}
                    >
                      Light
                    </button>
                    <button
                      key={`${selectedItem.id}-${ingredient.id}-Normal`}
                      style={getButtonStyle(
                        selectedItemCustomization,
                        "Normal"
                      )}
                      onClick={() => handleCustomizationClick("Normal")}
                    >
                      Normal
                    </button>
                    <button
                      key={`${selectedItem.id}-${ingredient.id}-Extra`}
                      style={getButtonStyle(selectedItemCustomization, "Extra")}
                      onClick={() => handleCustomizationClick("Extra")}
                    >
                      Extra
                    </button>
                  </div>
                </div>
              </div>
            </li>
          );
        } else {
          return (
            <li key={ingredientID}>Ingredient ID {ingredientID} not found</li>
          );
        }
      });

      return <ul>{ingredientList}</ul>;
    } else {
      //console.log("Item or ingredients not found");
      return [];
    }
  };

  /**
   * Represents a customization popup for a selected item.
   * @type {JSX.Element}
   */
  const customizationPopup = (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999, // Ensure it's on top of other elements
      }}
    >
      <div
        style={{
          backgroundColor: "black",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
          zIndex: 10000, // Adjust the z-index higher than the modal to ensure it's above
          width: "70%", // Adjust the width of the popup
          position: "relative", // Required for absolute positioning of the 'X' button
        }}
      >
        {/* 'X' button positioned in the top left corner */}
        <button
          style={{
            position: "absolute",
            top: "5px",
            left: "5px",
            padding: "5px 10px",
            backgroundColor: "transparent",
            border: "1px solid #999",
            borderRadius: "50%",
            cursor: "pointer",
            color: "white",
          }}
          onClick={closeCustomization}
        >
          X
        </button>

        {/* Table-like structure */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/* Row 1: ID and Name */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <div style={{ flex: "0 0 25%" }}>
              <p>ID: {selectedItemId}</p>
            </div>
            <div
              style={{
                flex: "1 0 50%",
                marginLeft: "20px",
                wordWrap: "break-word",
              }}
            >
              <h2>{getName(selectedItemId)}</h2>
            </div>
          </div>

          {/* Row 2: Picture and Ingredients */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div style={{ flex: "0 0 40%", marginRight: "20px" }}>
              <img
                src={getPicture(getName(selectedItemId))}
                alt="Item"
                style={{ width: "100%", borderRadius: "5px" }}
              />
            </div>
            <div style={{ flex: "1 0 auto" }}>
              <h3>Ingredients:</h3>
              <ul>{getIngredients(selectedItemId)}</ul>
            </div>
          </div>

          {/* Row 3: Price */}
          <div
            style={{
              borderTop: "1px solid #ccc",
              paddingTop: "10px",
              textAlign: "right",
            }}
          >
            <p style={{ margin: "0" }}>Price: ${getPrice(selectedItemId)}</p>
          </div>
        </div>

        {/* Bottom section with Add to Order button */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            borderTop: "1px solid #ccc",
            paddingTop: "20px",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() =>
              addItemToOrder(selectedItemId, 1, getPrice(selectedItemId))
            }
          >
            Add to Order
          </button>
        </div>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          sx={{ maxHeight: "1000px" }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{
              // Custom styles based on severity
              backgroundColor:
                snackbarSeverity === "error"
                  ? "#f44336"
                  : snackbarSeverity === "warning"
                  ? "#ff9800"
                  : snackbarSeverity === "info"
                  ? "#2196f3"
                  : snackbarSeverity === "success"
                  ? "#4caf50"
                  : "#f44336", // Default to red for unknown severity
              color: "#fff", // White text for better contrast
            }}
            iconMapping={{
              error: <ErrorIcon />,
              warning: <WarningIcon />,
              info: <InfoIcon />,
              success: <CheckCircleIcon />,
            }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </div>
  );

  /**
   * Represents button items created from menu data.
   * @type {JSX.Element[]}
   */
  const buttonItems = menuData.map((item) => makeButton(item.id));

  /**
   * Generates a dropdown icon (expand/collapse) based on the expandedRow state.
   *
   * @param {number} id - The identifier for the dropdown icon.
   * @returns {JSX.Element} - Returns a JSX element representing the dropdown icon.
   */
  const dropdownIcon = (id) => {
    return (
      <span
        style={{
          cursor: "pointer",
          marginLeft: "5px",
          userSelect: "none",
        }}
        onClick={() => handleDropdownItemClick(id)} // Toggle expand/collapse on arrow click
      >
        {expandedRow === id ? "▼" : "►"}{" "}
        {/* Use '▼' for expanded and '►' for collapsed */}
      </span>
    );
  };

  /**
   * Closes the payment status display.
   */
  const clearOrder = () => {
    setTableData([]);
  };

  /**
   * Calculates the total quantity of items in the table data.
   * @type {number}
   */
  const totalQuantity = tableData.reduce(
    (total, row) => total + row.Quantity,
    0
  );

  /**
   * Calculates the total price of items in the table data.
   * @type {number}
   */
  const totalPrice = tableData.reduce(
    (total, row) => total + parseFloat(row.Price),
    0
  );

  /**
   * Handles the action when the user chooses to pay with cash.
   * Opens the cash payment popup and resets the cash amount.
   */
  const onClickPayCash = () => {
    //alert(`Order successful! You paid $${totalPrice} with cash.`);
    setShowCashPopup(true);
    setCashAmount(0);
  };

  /**
   * Handles the action when the user chooses to pay with a credit card.
   * Opens the credit card payment popup.
   */
  const onClickPayCard = () => {
    openCreditCardPopup();
  };

  /**
   * Handles the change in cash amount entered by the user.
   * @param {Event} event - The input change event.
   */
  const handleCashAmountChange = (event) => {
    // Update the cash amount state as the user types
    setCashAmount(parseFloat(event.target.value));
  };

  /**
   * Calculates the change to be given back to the customer after a cash payment.
   *
   * @returns {string} - Returns a string representation of the change with two decimal places.
   */
  const calculateChange = () => {
    //const totalPrice = parseFloat(totalPrice).toFixed(2); // Assuming totalPrice is already calculated
    const change = cashAmount - totalPrice;
    return change.toFixed(2);
  };

  /**
   * Process a cash payment by updating the payment status, sending the order to the backend, and clearing the order details.
   */
  const processCashPayment = () => {
    setShowCashPopup(false);
    const change = calculateChange();
    if (change >= 0) {
      setPaymentMessage("Payment Successful! Change: $" + change);
      setShowPaymentStatus(true);
      sendCashOrder();
      clearOrder(); // Call your function to clear the order
    } else {
      setPaymentMessage(
        "Insufficient Cash Amount! Please provide adequate cash."
      );
      setShowPaymentStatus(true);
      // Optionally handle insufficient payment scenario here
    }
  };

  /**
   * Handle quantity changes for items in the table data.
   * @param {string} action - The action to perform ('increment' or 'decrement').
   * @param {string} id - The ID of the item in the table.
   */
  const handleQuantityChange = (action, id) => {
    const updatedTableData = [...tableData];
    const selectedItemIndex = updatedTableData.findIndex(
      (item) => item.ID === id
    );

    if (selectedItemIndex !== -1) {
      if (action === "increment") {
        updatedTableData[selectedItemIndex].Quantity += 1;
      } else if (
        action === "decrement" &&
        updatedTableData[selectedItemIndex].Quantity > 1
      ) {
        updatedTableData[selectedItemIndex].Quantity -= 1;
      }

      // Update the price based on the modified quantity
      updatedTableData[selectedItemIndex].Price =
        getPrice(updatedTableData[selectedItemIndex].ID) *
        updatedTableData[selectedItemIndex].Quantity;

      setTableData(updatedTableData);
    }
  };

  /**
   * Send a cash order to the backend with necessary details.
   */
  const sendCashOrder = async () => {
    const cartCashOrder = tableData.map((row) => row.ID).join("\\");
    // Get the current date
    const currentDate = new Date();

    // Get the current week of the year (as an integer)
    const currentWeek = Math.ceil(
      ((currentDate - new Date(currentDate.getFullYear(), 0, 1)) / 86400000 +
        1) /
        7
    );

    // Get the current date in the format YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split("T")[0];

    // Get the current hour in HH:00 format
    const formattedHour =
      currentDate.toISOString().split("T")[1].split(":")[0] + "00";
    console.log(
      currentWeek,
      formattedDate,
      formattedHour,
      cartCashOrder,
      totalPrice
    );
    try {
      const response = await fetch(
        "https://tiger-sugar-app.onrender.com/submitOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cashier: 1,
            sale_week: currentWeek,
            sale_date: formattedDate,
            current_hour: formattedHour,
            payment: "Cash",
            cart: cartCashOrder,
            order_total: totalPrice,
          }),
        }
      );

      if (response.ok) {
        console.log("Fetch for /submitOrder successful");
        // alert("Order added to database");
      }
    } catch (error) {
      console.error("Error:", error);
      // alert("Complete Failure");
    }
  };

  /**
   * Send a card order to the backend with necessary card and order details.
   */
  const sendCardOrder = async () => {
    const cartCashOrder = tableData.map((row) => row.ID).join("\\");
    // Get the current date
    const currentDate = new Date();

    // Get the current week of the year (as an integer)
    const currentWeek = Math.ceil(
      ((currentDate - new Date(currentDate.getFullYear(), 0, 1)) / 86400000 +
        1) /
        7
    );

    // Get the current date in the format YYYY-MM-DD
    const formattedDate = currentDate.toISOString().split("T")[0];

    // Get the current hour in HH:00 format
    const formattedHour =
      currentDate.toISOString().split("T")[1].split(":")[0] + "00";
    const formattedPayment =
      cardDetails.creditCardCompany + " " + cardDetails.cardNumber.slice(-4);
    console.log(
      currentWeek,
      formattedDate,
      formattedHour,
      cartCashOrder,
      totalPrice
    );
    try {
      const response = await fetch(
        "https://tiger-sugar-app.onrender.com/submitOrder",
        {
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
        }
      );

      if (response.ok) {
        //console.log("Fetch for /submitOrder successful");
        // alert("Order added to database");
      }
    } catch (error) {
      //console.error("Error:", error);
      // alert("Complete Failure");
    }
  };

  /**
   * Close the payment status popup and reset the payment message.
   */
  const closePaymentStatus = () => {
    setShowPaymentStatus(false);
    setPaymentMessage("");
  };

  /**
   * Remove an item from the table data.
   * @param {number} index - The index of the item in the table.
   * @param {string} id - The ID of the item in the table.
   */
  const handleRemoveItem = (index, id) => {
    const updatedTableData = tableData.filter((item, idx) => {
      // Check if the current index matches the provided index and the ID matches
      return idx !== index || item.ID !== id;
    });
    setTableData(updatedTableData);
  };

  /**
   * Open the credit card payment popup.
   */
  const openCreditCardPopup = () => {
    setShowCreditCardPopup(true);
  };

  /**
   * Close the credit card payment popup.
   */
  const closeCreditCardPopup = () => {
    setShowCreditCardPopup(false);
  };

  /**
   * Process a card payment by sending the card order, updating payment status, and clearing the order details.
   */
  const processCardPayment = () => {
    setShowCreditCardPopup(false);
    sendCardOrder();
    setPaymentMessage(
      `Payment of $${parseFloat(totalPrice).toFixed(2)} Successful!`
    );
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
    console.log("Card details:", cardDetails);
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

  return (
    <>
      <Navbar profile={"CASHIER"} />
      <div style={systemStyle}>
        <div style={gridStyle}>{buttonItems}</div>
        <div style={sectionStyle}>
          <div style={roundedRectStyle}>ORDER</div>
          <div style={containerStyle}>
            {showConfirmationPopup}
            <table style={orderTableStyle}>
              <thead>
                <tr>
                  <th style={cellStyle}> ID</th>
                  <th style={cellStyle}>Quantity</th>
                  <th style={cellStyle}>Price </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => [
                  // First row containing the main content
                  <tr key={row.ID}>
                    <td style={cellStyle}>
                      {/* Render the expandable icon */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {dropdownIcon(row.ID)}
                        <div onClick={() => handleDropdownItemClick(row.ID)}>
                          {row.ID}
                        </div>
                      </div>
                    </td>
                    <td style={quantityCellStyle}>
                      {/* Plus and minus buttons for quantity modification */}
                      <button
                        onClick={() =>
                          handleQuantityChange("decrement", row.ID)
                        }
                        style={circleButtonStyle}
                      >
                        -
                      </button>
                      {row.Quantity}
                      <button
                        onClick={() =>
                          handleQuantityChange("increment", row.ID)
                        }
                        style={circleButtonStyle}
                      >
                        +
                      </button>
                    </td>
                    <td style={cellStyle}>
                      {/* Price and 'X' button */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <span>${parseFloat(row.Price).toFixed(2)}</span>
                        <button
                          onClick={() => handleRemoveItem(index, row.ID)}
                          style={{
                            ...circleButtonStyle,
                            fontSize: "12px",
                            marginLeft: "5px",
                          }}
                        >
                          X
                        </button>
                      </div>
                    </td>
                  </tr>,
                  // Second row containing the expanding section
                  expandedRow === row.ID && (
                    <tr key={`notes-${row.ID}`}>
                      <td colSpan="3" style={notesCellStyle}>
                        {/* Customization Notes */}
                        <div style={{ margin: "5px 0" }}>
                          Customization Notes:
                        </div>
                        <div
                          style={{
                            whiteSpace: "pre-line",
                          }}
                        >
                          {row.Notes}
                        </div>
                      </td>
                    </tr>
                  ),
                ])}
                <tr style={totalRowStyle}>
                  <td style={cellStyle}>Total Items:</td>
                  <td style={cellStyle}>{totalQuantity}</td>
                  <td style={cellStyle}>
                    Total: ${parseFloat(totalPrice).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div style={paymentSection}>
            <div style={paymentStyle}>Payment</div>
            <div style={paymentRectStyle}>
              <button
                className="cashButton"
                style={transactionRectStyle}
                onClick={onClickPayCash}
              >
                Cash
              </button>
              <button
                className="cardButton"
                style={transactionRectStyle}
                onClick={onClickPayCard}
              >
                Card
              </button>
            </div>
          </div>
        </div>
        {showCustomization && customizationPopup}
        {showPaymentStatus && (
          <PaymentStatusModal
            message={paymentMessage}
            onClose={closePaymentStatus}
          />
        )}
        {showCashPopup && (
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
            <h2 style={{ margin: "0 0 20px" }}>Cash Payment</h2>
            <p style={{ fontSize: "18px", margin: "0 0 15px" }}>
              Total Price: ${parseFloat(totalPrice).toFixed(2)}
            </p>
            <label
              htmlFor="cashInput"
              style={{ display: "block", marginBottom: "10px" }}
            >
              Enter Cash Amount:
            </label>
            <input
              type="number"
              id="cashInput"
              value={cashAmount}
              onChange={handleCashAmountChange}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
              }}
            >
              <button
                onClick={processCashPayment}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007BFF",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Pay
              </button>
              <button
                onClick={() => setShowCashPopup(false)}
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
              >
                Cancel
              </button>
            </div>
          </div>
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
              <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
                <div style={{ marginBottom: "15px" }}>
                  <label htmlFor="CardCompany">Credit Card Company:</label>
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

export default PosSystem;
