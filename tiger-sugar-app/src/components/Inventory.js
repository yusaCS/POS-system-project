import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

/**
 * Creates an inventory screen that allows the manager to modify the database
 * @author Nicholas Nguyen
 * @constructor
 */
const Inventory = () => {
  // ########## Database Functions ##########
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);

  /**
   * Fetches inventory data
   * @returns none
   */
  const fetchInventoryData = async () => {
    await fetch('https://tiger-sugar-app.onrender.com/inventory')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  };
  
  /**
   * Fetches menu data
   * @returns none
   */
  const fetchMenuData = async () => {
    await fetch('https://tiger-sugar-app.onrender.com/menu')
      .then((response) => response.json())
      .then((menu) => setMenu(menu))
      .catch((error) => console.error('Error:', error));
  };
  
  useEffect(() => {
    fetchInventoryData();
    fetchMenuData();
  }, []);

  /**
   * Sends information to the server to modify the database
   * @param {string} fetchmsg - The server request
   * @param {object} item - An array of objects that will be extracted
   * @returns If fetch was successful
   */
  const sendServerReq = async (fetchmsg, item) => {
    try {
      const response = await fetch(fetchmsg, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
  
      if (response.ok) {
        console.log("Fetch for \"" + fetchmsg + "\" successful")
        await fetchInventoryData();
        return true;
      }

      return false;
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  };

  // ########## Feedback Indication Popup ##########

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  
  /**
   * Display a notification and its serverity
   * @param {string} message - What message to be displayed on the notification
   * @param {string} severity - What type of message is it (error, success, warning, info)
   * @returns none
   */
  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };
 
  // ########## Add Menu Dialog ##########

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    name: '',
    quantity: '',
    price: ''
  });
  
  /**
   * Opens the add modal which holds information for later usage
   * @returns none
   */
  const openAddModal = () => {
    setAddFormData({
      name: '',
      quantity: '',
      price: ''
    });
    setAddModalOpen(true);
  };

  /**
   * Closes the add modal
   * @returns none
   */
  const closeAddModal = () => {
    if (addModalOpen) {
      setAddModalOpen(false);
    }
  };

  /**
   * If the enter key was pressed then use the handleAdd() function
   * @param {Event} e - The key that was pressed down\
   * @returns none
   */
  const handleKeyDownAdd = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleAdd();
    }
  };

  // ########## Edit Menu Dialog ##########

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    quantity: '',
    price: ''
  });
  
  /**
   * Opens the edit modal which holds information for later usage
   * @param {object} item - The currently selected inventory item
   * @returns none
   */
  const openEditModal = (item) => {
    setSelectedItem(item);
    setEditFormData({
      name: '',
      quantity: '',
      price: ''
    });
    setEditModalOpen(true);
  };

  /**
   * Closes the edit modal
   * @returns none
   */
  const closeEditModal = () => {
    if (editModalOpen) {
      setEditModalOpen(false);
      setSelectedItem(null);
    }
  };

  /**
   * If the delete key was pressed then use the openConfirmation() function
   * @param {Event} e - The key that was pressed down
   * @returns none
   */
  const handleKeyDownEditDialog = (e) => {
    if (e.target.tagName.toLowerCase() !== 'input') {
      if (e.keyCode === 46) {
        e.preventDefault();
        openConfirmation();
      }
    }
  };

  /**
   * If the enter key was pressed then use the handleEdit() function, else if the delete was pressed then use the openConfirmation() function
   * @param {Event} e - The key that was pressed down
   * @returns none
   */
  const handleKeyDownEdit = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleEdit();
    } else if (e.keyCode === 46) {
      e.preventDefault();
      openConfirmation();
    }
  };

  // ########## Validation Functions ##########
  
  /**
   * Checking if the given value is positive and a number
   * @param {object} value - value to test
   * @returns If the value is a number and positive
   */
  const isPositiveNumber = (value) => {
    const number = parseFloat(value);
    return !isNaN(number) && number >= 0;
  };
  
  /**
   * Checks if the given value is not an empty string
   * @param {object} value 
   * @returns Return whether the value is a non empty string
   */
  const isNonEmptyString = (value) => {
    return value.trim() !== '';
  };

  // ########## Edit Inventory Functions ##########

  /**
   * Handles adding an item to the database by making sure that user input is valid
   * @returns none
   */
  const handleAdd = async () => {
    const name = addFormData.name;
    const quantity = addFormData.quantity;
    var price = addFormData.price;
    const newName = isNonEmptyString(name);
    const newQuantity = isNonEmptyString(quantity);
    const newPrice = isNonEmptyString(price);
    var valid = true;
    var msg = "";

    if (newName && newQuantity && newPrice) { // Making sure there is an input for everything
      if (data.some(item => item.name.toLowerCase() === name.toLowerCase())) {
        msg += "Name already exists\n";
        valid = false;
      }

      if (!Number.isInteger(Number(quantity))) { 
        msg += "Quantity must be a whole number\n";
        valid = false;
      } else if (!isPositiveNumber(quantity)) {
        msg += "Quantity must be positive\n"; 
        valid = false;
      }

      if (!isNaN(Number(price))) {
        if (isPositiveNumber(Number(price))) {
          price = Number(price).toFixed(2);
        } else {
          msg += "Price must be positive\n";
          valid = false;
        }
      } else {
        msg += "Price must be numerical\n";
        valid = false;
      }

      if (!valid) {
        openSnackbar(msg, 'error');
      } else {
        closeAddModal();
        openSnackbar("Processing Request", 'info');
        if (await sendServerReq('https://tiger-sugar-app.onrender.com/addInventoryItem', addFormData)) {
          openSnackbar("New item successfully added", 'success');
        } else {
          openSnackbar("Error occured during processing for adding item", 'error');
        }
      }
    } else {
      openSnackbar("Fields are left empty.", 'error');
    }
  };

  /**
   * Handles editing an item from the database by making sure that user input is valid
   * @returns none
   */
  const handleEdit = async () => {
    const name = editFormData.name;
    const quantity = editFormData.quantity;
    var price = editFormData.price;
    const newName = isNonEmptyString(name);
    const newQuantity = isNonEmptyString(quantity);
    const newPrice = isNonEmptyString(price);
    var valid = true;
    var msg = "";

    if (newName || newQuantity || newPrice) { // Making sure there is at least one input
      if (newName){
        if (data.some(item => item.name.toLowerCase() === name.toLowerCase())) {
          msg += "Name already exists\n";
          valid = false;
        }
      }

      if (newQuantity) { // Quantity validation
        if (!Number.isInteger(Number(quantity))) { 
          msg += "Quantity must be a whole number\n";
          valid = false;
        } else if (!isPositiveNumber(quantity)) {
          msg += "Quantity must be positive\n"; 
            valid = false;
        }
      }

      if (newPrice) { // Price validation
        if (!isNaN(Number(price))) {
          if (isPositiveNumber(Number(price))) {
            price = Number(price).toFixed(2);
            // alert(price)
          } else {
            msg += "Price must be positive\n";
            valid = false;
          }
        } else {
          msg += "Price must be numerical\n";
          valid = false;
        }
      }

      if (!valid) {
        openSnackbar(msg, 'error');
      } else {
        closeEditModal();
        openSnackbar("Processing Request", 'info');

        var errmsg = "";
        if (newName) {
          if (await sendServerReq('https://tiger-sugar-app.onrender.com/updateInventoryItemName', {id: selectedItem.id, name})) {
            msg += "Updated Name for Item ID:" + selectedItem.id + "\n";
          } else {
            valid = false;
            errmsg += "Error occured during processing for updating name\n";
          }
        }
        
        if (newQuantity) {
          if (await sendServerReq('https://tiger-sugar-app.onrender.com/updateInventoryItemQuantity', {id: selectedItem.id, quantity})) {
            msg += "Updated Quantity for Item ID:" + selectedItem.id + "\n";
          } else {
            valid = false;
            errmsg += "Error occured during processing for updating quantity\n";
          }
        }

        if (newPrice) {
          if (await sendServerReq('https://tiger-sugar-app.onrender.com/updateInventoryItemPrice', {id: selectedItem.id, price})) {
            msg += "Updated Price for Item ID:" + selectedItem.id + "\n";
          } else {
            valid = false;
            errmsg += "Error occured during processing for updating price\n";
          }
        }

        if (valid) {
          openSnackbar(msg, 'success');
        } else {
          openSnackbar(errmsg, 'error');
        }
      }
    } else {
      openSnackbar("Fields are left empty.", 'error');
    }
  };

  /**
   * Handles deleting an item from the database
   * @returns none
   */
  const handleDelete = async () => {
    setConfirmationOpen(false);
    openSnackbar("Processing Request", 'info');
    if (await sendServerReq('https://tiger-sugar-app.onrender.com/deleteInventoryItem', selectedItem)) {
      openSnackbar("Item ID:" + selectedItem.id + " successfully deleted", 'success');
      closeEditModal();
    } else {
      openSnackbar("Error occured during processing for deleting item", 'error');
    }
  }

  // ########## Confirmation Box ##########

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  
  /**
   * Opens confirmation modal for deleting an item
   * @returns none
   */
  const openConfirmation = () => {
    setEditModalOpen(false);
    setConfirmationOpen(true);
  };

  /**
   * Closes confirmation modal for deleting an item
   * @returns none
   */
  const closeConfirmation = () => {
    setConfirmationOpen(false);
    setEditModalOpen(true);
  };

  // ########## Styling ##########
  
  const screenStyle = {
    display: 'flex',
    alignItems: 'center', 
    width: '100%',
    flexDirection: 'column',
    marginTop: '60px'
  };

  const headerStyle = {
    align: 'center'
  };

  const tableStyle = {
    marginTop: '20px',
    borderCollapse: 'collapse',
    width: '90%',
    userSelect: 'none',
    // border: '1px solid #DDD'
  };

  const headerCellStyle = {
    // border: '1px solid #DDD',  
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#000',
    color: '#FFF',
  };
  const cellStyle = {
    // border: '1px solid #DDD',
    padding: '8px',
    textAlign: 'left',
    backgroundColor: '#333232', 
  };

  // ########## Screen Output ##########
  
  return (
    <>
      <Navbar profile={'MANAGER'} />
      <div style={screenStyle}>
        <h1 style={headerStyle}> Inventory View</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerCellStyle}>ID</th>
              <th style={headerCellStyle}>Name</th>
              <th style={headerCellStyle}>Quantity</th>
              <th style={headerCellStyle}>Price </th>
              <th style={headerCellStyle}>
                <Button onClick={() => openAddModal()} sx={{ backgroundColor: '#2196F3', color: '#FFF' }} variant="outlined">
                  Add
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={cellStyle}> {item.id}</td>
                <td style={cellStyle}> {item.name}</td>
                <td style={cellStyle}> {item.quantity}</td>
                <td style={cellStyle}> ${parseFloat(item.price).toFixed(2)}</td>
                <td style={cellStyle}>
                  <Button onClick={() => openEditModal(item)} sx={{ backgroundColor: '#2196F3', color: '#FFF' }} variant="outlined">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add new item dialog */}
      <Dialog open={addModalOpen} onClose={closeAddModal}>
        <DialogContent>
          Adding a new item to the inventory
          <TextField
            label="Name"
            placeholder="New Item Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
            onKeyDown={handleKeyDownAdd}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Quantity"
            placeholder="New Item Quantity"
            variant="outlined"
            fullWidth
            onChange={(e) => setAddFormData({ ...addFormData, quantity: e.target.value })}
            onKeyDown={handleKeyDownAdd}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Price"
            placeholder="New Item Price"
            variant="outlined"
            fullWidth
            onChange={(e) => setAddFormData({ ...addFormData, price: e.target.value })}
            onKeyDown={handleKeyDownAdd}
            sx={{ mt: 2 }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }} onClick={() => handleAdd()}>
            Add Item
          </Button>
          <Button type="reset" variant="contained" sx={{ mt: 2 , ml: 2}} onClick={() => closeAddModal()}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
      {/* Edit / Delete item dialog */}
      <Dialog open={editModalOpen} onClose={closeEditModal} onKeyDown={handleKeyDownEditDialog}>
        <DialogContent>
          Currently Selected Item ID: {selectedItem ? selectedItem.id: ''}
          <TextField
            label="Name"
            placeholder="Updated Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
            onKeyDown={handleKeyDownEdit}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Quantity"
            placeholder="Updated Quantity"
            variant="outlined"
            fullWidth
            onChange={(e) => setEditFormData({ ...editFormData, quantity: e.target.value })}
            onKeyDown={handleKeyDownEdit}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Price"
            placeholder="Updated Price"
            variant="outlined"
            fullWidth
            onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
            onKeyDown={handleKeyDownEdit}
            sx={{ mt: 2 }}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }} onClick={() => handleEdit()}>
            Save Changes
          </Button>
          <Button type="button" variant="contained" sx={{ mt: 2 , ml : 2}} onClick={() => {openConfirmation()}}>
            Delete
          </Button>
          <Button type="reset" variant="contained" sx={{ mt: 2 , ml : 2}} onClick={() => closeEditModal()}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
      {/* Confirmation Dialog*/}
      <Dialog open={confirmationOpen} onClose={closeConfirmation}>
        <DialogContent>
          <Typography>Are you sure you want to delete this item?</Typography>
          <Button onClick={() => handleDelete()} variant="contained" sx={{ mt: 2 }}>
            Yes
          </Button>
          <Button onClick={() => {closeConfirmation()}} variant="contained" sx={{ mt: 2, ml: 2 }}>
            No
          </Button>
        </DialogContent>
      </Dialog>
      {/* Feedback Indicator Popup */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        sx={{ maxHeight: '1000px'}}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ // Custom styles based on severity
            backgroundColor: snackbarSeverity === 'error' ? '#F44336' :
                             snackbarSeverity === 'warning' ? '#FF9800' :
                             snackbarSeverity === 'info' ? '#2196F3' :
                             snackbarSeverity === 'success' ? '#4CAF50' : '#F44336', // Default to red for unknown severity
            color: '#FFF', // White text for better contrast
          }}
          iconMapping={{
            error: <ErrorIcon />,
            warning: <WarningIcon />,
            info: <InfoIcon />,
            success: <CheckCircleIcon />,
          }}
        >
          {snackbarMessage.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default Inventory;
