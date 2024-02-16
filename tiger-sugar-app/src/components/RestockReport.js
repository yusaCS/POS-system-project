import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

/**
 * Creates an restock report screen that allows the manager to view inventory items under a specified amount
 * @author Nicholas Nguyen
 * @constructor
 */
const RestockReport = () => {
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

  // ########## Database Functions ##########

  const [data, setData] = useState([]);

  /**
   * Grabs inventory data from the database based on the amount given
   * @returns none
   */
  const getRestockReport = async () => {
    console.log("Amount:", amount);
    if (isPositiveInteger(amount)) {
      closeModal();
      openSnackbar("Processing Request", 'info');
      try {
        const response = await fetch('https://tiger-sugar-app.onrender.com/restockReport', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({amount}),
        });
    
        if (response.ok) {
          console.log("Fetch for /restockReport successful")
          const responseData = await response.json();
          setData(responseData);
          openSnackbar("Showing items with quantity less than or equal to " + amount, 'success');
        }
      } catch (error) {
        console.error("Error:", error);
        openSnackbar("Error occured during processing", 'error');
      }
    } else if (amount === "") {
      openSnackbar("No input was given", 'error');
    } else {
      openSnackbar("Invalid input", 'error')
    }
  };

  // ########## Modal Functions ##########

  const [modalOpen, setModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  
  /**
   * Opens the modal
   * @returns none
   */
  const openModal = () => {
    setModalOpen(true);
  };

  /**
   * Closes the modal
   * @returns none
   */
  const closeModal = () => {
    if (modalOpen) {
      setModalOpen(false);
    }
  };

  /**
   * If the enter key was pressed then use the getRestockReport() function
   * @param {Event} e 
   * @returns none
   */
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      getRestockReport();
    }
  };

// ########## Validation Functions ##########


  /**
   * Checking if the given value is positive and a number
   * @param {object} value - value to test
   * @returns If the value is a number and positive
   */
  const isPositiveInteger = (value) => {
    const number = parseFloat(value);
    return !isNaN(number) && number >= 0 && Number.isInteger(Number(amount));
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
        <h1 style={headerStyle}>Restock Report</h1>
        <Button onClick={() => openModal()} sx={{ backgroundColor: '#2196F3', color: '#FFF' }} variant='outlined'>
          Enter Amount
        </Button>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={headerCellStyle}>ID</th>
              <th style={headerCellStyle}>Name</th>
              <th style={headerCellStyle}>Quantity</th>
              <th style={headerCellStyle}>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={cellStyle}> {item.id}</td>
                <td style={cellStyle}> {item.name}</td>
                <td style={cellStyle}> {item.quantity}</td>
                <td style={cellStyle}> ${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={modalOpen} onClose={closeModal}>
        <DialogContent>
          Enter the minimum amount
          <TextField
            error={!isPositiveInteger(amount) && amount !== ""}
            helperText={!isPositiveInteger(amount) && amount !== "" ? 'Must be a positive whole number' : ''}
            label="Amount"
            placeholder="Enter amount"
            variant="outlined"
            fullWidth
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mt: 2 }}
            onKeyDown={handleKeyDown}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2 }} onClick={() => getRestockReport()}>
            Enter
          </Button>
          <Button type="reset" variant="contained" sx={{ mt: 2 , ml: 2}} onClick={() => closeModal()}>
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
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

export default RestockReport;
