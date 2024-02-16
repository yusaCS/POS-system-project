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
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';

/**
 * Creates an menu screen that allows the manager to modify the database
 * @author Nicholas Nguyen
 * @constructor
 */
const Menu = () => {
  // ########## Database Functions ##########
  const [data, setData] = useState([]);
  const [inventory, setInventory] = useState([]);

  /**
   * Fetches menu data
   * @returns none
   */
  const fetchMenuData = async () => {
    fetch('https://tiger-sugar-app.onrender.com/menu')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  };
  
  /**
   * Fetches inventory data
   * @returns none
   */
  const fetchInventoryData = async () => {
    fetch('https://tiger-sugar-app.onrender.com/inventory')
      .then((response) => response.json())
      .then((inventory) => setInventory(inventory))
      .catch((error) => console.error('Error:', error));
  };
  
  useEffect(() => {
    fetchMenuData();
    fetchInventoryData();
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
        await fetchMenuData();
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

  // ########## Get Ingredients Function ##########

  /**
   * Gets the name of the ingredients based on their IDs
   * @param {string} ids - A string of IDs
   * @returns A list of names from the IDs
   */
  const getIngredients = (ids) => {
    const ingredients = ids.split('\\');
    console.log("Ingredients: ", ingredients);
  
    const matchingIngredients = inventory.filter((item) =>
      ingredients.includes(item.id.toString())
    );
  
    // Use join to concatenate names with a separator
    const ingredientNames = matchingIngredients.map((item) => item.name);
    const list = ingredientNames.join(', ');
  
    return list;
  };
  

  // ########## Ingredient Selection ##########

  const [ingredientSelectionOpen, setIngredientSelectionOpen] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [prevSelectedIngredients, setPrevSelectedIngredients] = useState([]);

  /**
   * Opens the ingredient selection modal
   */
  const openIngredientSelection = () => {
    setSelectedIngredients(prevSelectedIngredients);
    setIngredientSelectionOpen(true);
  };

  /**
   * Closes the ingredient selection modal
   */
  const closeIngredientSelection = () => {
    setIngredientSelectionOpen(false);
  };

  /**
   * Changes variables if new or different ingredients were chosen 
   */
  const handleIngredientSelection = () => {
    // Handle the selected ingredients as needed
    setPrevSelectedIngredients(selectedIngredients.sort((a, b) => a - b));
    console.log('Selected Ingredients:', selectedIngredients);

    // Close the ingredient selection 
    closeIngredientSelection();
  };

  /**
   * If the enter key was pressed then use the handleIngredientSelection() function
   * @param {Event} e - The key that was pressed down
   * @returns none
   */
  const handleKeyDownIngredient = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      handleIngredientSelection();
    }
  };
 
  // ########## Add Menu Dialog ##########

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [addFormData, setAddFormData] = useState({
    id: '',
    name: '',
    price: '',
    ingredients: ''
  });
  
  /**
   * Opens the add modal which holds information for later usage
   * @returns none
   */
  const openAddModal = () => {
    setAddFormData({
      id: '',
      name: '',
      price: '',
      ingredients: ''
    });
    setPrevSelectedIngredients([]);
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
   * If the enter key was pressed than use the handleAdd() function
   * @param {Event} e - The key that was pressed down
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
    id: '',
    name: '',
    price: '',
    ingredients: ''
  });
  
  /**
   * Opens the edit modal which holds information for later usage
   * @param {object} drink - The currently selected drink
   * @returns none
   */
  const openEditModal = (drink) => {
    setSelectedItem(drink);
    setEditFormData({
      id: '',
      name: '',
      price: '',
      ingredients: drink.ingredients
    });
    setPrevSelectedIngredients(drink.ingredients.split('\\').map(value => parseInt(value)));
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

  /**
   * Checks if the string contains any special characters
   * @param {string} str - String that is to be checked 
   * @returns If the string doesn't contain any special characters
   */
  const isAlphaNumeric = (str) => {
    // Regular expression for only letters and numbers
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(str);
  };

  // ########## Edit Menu Functions ##########

  /**
   * Handles adding an item to the database by making sure that user input is valid
   * @returns none
   */
  const handleAdd = async () => {
    const id = addFormData.id;
    const name = addFormData.name;
    var price = addFormData.price;
    const newID = isNonEmptyString(id);
    const newName = isNonEmptyString(name);
    const newPrice = isNonEmptyString(price);
    var valid = true;
    var msg = "";

    if (newID && newName && newPrice) {
      if (prevSelectedIngredients.length !== 0) {
        if (!isAlphaNumeric(id)) {
          msg += "ID can only contain letters and numbers\n";
          valid = false;
        } else if (data.some(item => item.id.toLowerCase() === id.toLowerCase())) {
          msg += "ID already exists\n";
          valid = false;
        }

        if (data.some(item => item.name.toLowerCase() === name.toLowerCase())) {
          msg += "Name already exists\n";
          valid = false;
        }
  
        if (!isNaN(Number(price))) {
          if (isPositiveNumber(Number(price))) {
            price = Number(price).toFixed(2);
          } else {
            msg += "Price must be positive\n";
            valid = false;
          }
        }

        if (!valid) {
          openSnackbar(msg, 'error');
        } else {
          addFormData.ingredients = prevSelectedIngredients.join('\\');
          closeAddModal();
          openSnackbar("Processing Request", 'info');
          if (await sendServerReq('https://tiger-sugar-app.onrender.com/addMenuDrink', addFormData)) {
            openSnackbar("New drink successfully added", 'success');
          } else {
            openSnackbar("Error occured during processing while adding drink", 'error');
          }
        }
      } else {
        openSnackbar("No ingredients are selected.", 'error');
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
    const id = editFormData.id;
    const name = editFormData.name;
    var price = editFormData.price;
    const ingredients = prevSelectedIngredients.join('\\');
    const newID = isNonEmptyString(id);
    const newName = isNonEmptyString(name);
    const newPrice = isNonEmptyString(price);
    const newIngredients = ingredients !== editFormData.ingredients;
    var valid = true;
    var msg = "";

    if (newID || newName || newPrice || newIngredients) {
      if (prevSelectedIngredients.length !== 0) {
        if (newID){
          if (!isAlphaNumeric(id)) {
            msg += "ID can only contain letters and numbers\n";
            valid = false;
          } else if (data.some(item => item.id.toLowerCase() === id.toLowerCase())) {
            msg += "ID already exists\n";
            valid = false;
          }
        }

        if (newName) {
          if (data.some(item => item.name.toLowerCase() === name.toLowerCase())) {
            msg += "Name already exists\n";
            valid = false;
          }
        }
        
        if (newPrice){
          if (!isNaN(Number(price))) {
            if (isPositiveNumber(Number(price))) {
              price = Number(price).toFixed(2);
            } else {
              msg += "Price must be positive\n";
              valid = false;
            }
          }
        }

        if (!valid) {
          openSnackbar(msg, 'error');
        } else {
          closeEditModal();
          openSnackbar("Processing Request", 'info');

          var errmsg = "";
          if (newID) {
            if (await sendServerReq('https://tiger-sugar-app.onrender.com/updateMenuDrinkID', {id: selectedItem.id, newID: id})) {
              msg += "Changed Drink ID from " + selectedItem.id + " -> " + id + "\n";
              selectedItem.id = id;
            } else {
              valid = false;
              errmsg += "Error occured during processing while updating ID\n";
            }
          }

          if (newName) {
            if (await sendServerReq('https://tiger-sugar-app.onrender.com/updateMenuDrinkName', {id: selectedItem.id, name})) {
              msg += "Updated Name for Drink ID:" + selectedItem.id + "\n";
            } else {
              valid = false;
              errmsg += "Error occured during processing while updating name\n";
            }
          }
          
          if (newPrice) {
            if (await sendServerReq('https://tiger-sugar-app.onrender.com/updateMenuDrinkPrice', {id: selectedItem.id, price})) {
              msg += "Updated Price for Drink ID:" + selectedItem.id + "\n";
            } else {
              valid = false;
              errmsg += "Error occured during processing while updating price\n";
            }
          }

          if (newIngredients) {
            if (await sendServerReq('https://tiger-sugar-app.onrender.com/updateMenuDrinkIngredients', {id: selectedItem.id, ingredients})) {
              msg += "Updated Ingredients for Item ID:" + selectedItem.id + "\n";
            } else {
              valid = false;
              errmsg += "Error occured during processing while updating price\n";
            }
          }

          if (valid) {
            openSnackbar(msg, 'success');
          } else {
            openSnackbar(errmsg, 'error');
          }
        }
      } else {
        openSnackbar("No ingredients are selected.", 'error');
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
    if (await sendServerReq('https://tiger-sugar-app.onrender.com/deleteMenuDrink', selectedItem)) {
      openSnackbar("Drink ID:" + selectedItem.id + " successfully deleted", 'success');
      closeEditModal();
    } else {
      openSnackbar("Error occured during processing while deleting drink", 'error');
    }
  };

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

  return (
    <>
      <Navbar profile={'MANAGER'} />
      <div style={screenStyle}>
        <h1 style={headerStyle}>Menu View</h1>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerCellStyle}>ID</th>
              <th style={headerCellStyle}>Name</th>
              <th style={headerCellStyle}>Price</th>
              <th style={headerCellStyle}>Ingredients</th>
              <th style={headerCellStyle}>
                <Button onClick={() => openAddModal()} sx={{ backgroundColor: '#2196F3', color: '#FFF' }} variant="outlined">
                  Add
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((drink) => (
              <tr key={drink.drink_order}>
                <td style={cellStyle}> {drink.id}</td>
                <td style={cellStyle}> {drink.name}</td>
                <td style={cellStyle}> ${drink.price}</td>
                <td style={cellStyle}> {getIngredients(drink.ingredients)}</td>
                <td style={cellStyle}>
                  <Button onClick={() => openEditModal(drink)} sx={{ backgroundColor: '#2196F3', color: '#FFF' }} variant="outlined">
                    Edit
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Add new drink dialog */}
      <Dialog open={addModalOpen} onClose={closeAddModal}>
        <DialogContent>
          Adding a new drink to the menu
          <TextField
            label="ID"
            placeholder="Updated ID"
            variant="outlined"
            fullWidth
            onChange={(e) => setAddFormData({ ...addFormData, id: e.target.value })}
            onKeyDown={handleKeyDownAdd}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Name"
            placeholder="Updated Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setAddFormData({ ...addFormData, name: e.target.value })}
            onKeyDown={handleKeyDownAdd}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Price"
            placeholder="Updated Price"
            variant="outlined"
            fullWidth
            onChange={(e) => setAddFormData({ ...addFormData, price: e.target.value })}
            onKeyDown={handleKeyDownAdd}
            sx={{ mt: 2 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
            <Button
              type="button"
              variant="contained"
              onClick={() => openIngredientSelection()}
            >
              Select Ingredients
            </Button>
          </div>
          <Button type="submit" variant="contained" sx={{ mt: 2 }} onClick={() => handleAdd()}>
            Add Item
          </Button>
          <Button type="reset" variant="contained" sx={{ mt: 2 , ml : 2}} onClick={() => closeAddModal()}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
      {/* Edit / Delete item dialog */}
      <Dialog open={editModalOpen} onClose={closeEditModal} onKeyDown={handleKeyDownEditDialog}>
        <DialogContent>
          Currently Selected Item ID: {selectedItem ? selectedItem.id: ''}
          <TextField
            label="ID"
            placeholder="New Item ID"
            variant="outlined"
            fullWidth
            onChange={(e) => setEditFormData({ ...editFormData, id: e.target.value })}
            onKeyDown={handleKeyDownEdit}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Name"
            placeholder="New Item Name"
            variant="outlined"
            fullWidth
            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
            onKeyDown={handleKeyDownEdit}
            sx={{ mt: 2 }}
          />
          <TextField
            label="Price"
            placeholder="New Item Price"
            variant="outlined"
            fullWidth
            onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
            onKeyDown={handleKeyDownEdit}
            sx={{ mt: 2 }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
            <Button
              type="button"
              variant="contained"
              onClick={() => openIngredientSelection(selectedItem)}
            >
              Select Ingredients
            </Button>
          </div>
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
      {/* Ingredients Selection */}
      <Dialog open={ingredientSelectionOpen} onClose={closeIngredientSelection} onKeyDown={handleKeyDownIngredient}>
      <DialogContent>
        <Typography variant="h6" sx={{ mb: 2 }}>Select Ingredients</Typography>
        {inventory.map((ingredient) => (
          <div>
            <FormControlLabel
              key={ingredient.id}
              control={
                <Checkbox
                  checked={selectedIngredients.includes(ingredient.id)}
                  onChange={() => {
                    const updatedIngredients = selectedIngredients.includes(ingredient.id)
                      ? selectedIngredients.filter((id) => id !== ingredient.id)
                      : [...selectedIngredients, ingredient.id];
                    setSelectedIngredients(updatedIngredients);
                  }}
                />
              }
              label={ingredient.name}
            />
          </div>
        ))}
        {/* Button to confirm ingredient selection */}
        <div>
          <Button variant="contained" onClick={() => handleIngredientSelection()} sx={{ mt: 2 }}>
            Confirm Selection
          </Button>
          <Button variant="contained" onClick={() => closeIngredientSelection()} sx={{ mt: 2, ml: 2 }}>
            Cancel
          </Button>
        </div>
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
  )
};

export default Menu;
