import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

/**
 * Creates an sales report screen that allows the manager to view sales history between two specified dates
 * @author Nicholas Nguyen
 * @constructor
 */
const SalesReport = () => {
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
   * 
   * @param {string} dateString - String that contains a date
   * @returns Returns a new formatted date as MM/DD/YYYY
   */
  const formatDate = (dateString) => {
    const saleDate = new Date(dateString);
    return saleDate.toLocaleDateString();
  };

  /**
   * Grabs sales history data from the database based on the first and second date variables
   * @returns none
   */
  const getSalesReport = async () => {
    if (firstDate === null && secondDate === null) {
      openSnackbar("No dates selected", 'error');
    } else if (firstDate === null) {
      openSnackbar("First date not selected", 'error');
    } else if (secondDate === null) {
      openSnackbar("Second date not selected", 'error');
    } else {
      console.log("First date:", firstDate.format("YYYY-MM-DD"));
      console.log("Second date:", secondDate.format("YYYY-MM-DD"));
      closeModal();
      openSnackbar("Processing Request", 'info');
      try {
        const response = await fetch('https://tiger-sugar-app.onrender.com/salesReport', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({firstDate, secondDate}),
        });
    
        if (response.ok) {
          console.log("Fetch for /salesReport successful")
          const responseData = await response.json();
          setData(responseData);
          if (responseData.length === 0) {
            openSnackbar("No sales information between " + firstDate.format("MM/DD/YYYY") + " - " + secondDate.format("MM/DD/YYYY"), 'warning');
          } else {
            openSnackbar("Showing sales from between " + firstDate.format("MM/DD/YYYY") + " - " + secondDate.format("MM/DD/YYYY"), 'success');
          }
        }
      } catch (error) {
        console.error("Error:", error);
        openSnackbar("Error occured during processing", 'error');
      }
    }
  }

  // ########## Modal Functions ##########
  
  const [modalOpen, setModalOpen] = useState(false);
  const [firstDate, setFirstDate] = useState(null);
  const [secondDate, setSecondDate] = useState(null);
  
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
   * If the enter key was pressed then use the getSalesReport() function
   * @param {Event} e 
   * @returns none
   */
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      getSalesReport();
    }
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
        <h1 style={headerStyle}>Sales Report</h1>
        <Button onClick={() => openModal()} sx={{ backgroundColor: '#2196F3', color: '#FFF' }} variant='outlined'>
          Choose Dates
        </Button>
        <table style={tableStyle}>
          <thead>
              <tr>
                <th style={headerCellStyle}>ID</th>
                <th style={headerCellStyle}>Cashier</th>
                <th style={headerCellStyle}>Sales Date</th>
                <th style={headerCellStyle}>Current Hour </th>
                <th style={headerCellStyle}>Payment Type</th>
                <th style={headerCellStyle}>Cart</th>
                <th style={headerCellStyle}>Order Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((order) => (
                <tr key={order.id}>
                  <td style={cellStyle}>{order.id}</td>
                  <td style={cellStyle}>{order.cashier}</td>
                  <td style={cellStyle}>{formatDate(order.sale_date)}</td>
                  <td style={cellStyle}>{order.current_hour}</td>
                  <td style={cellStyle}>{order.payment}</td>
                  <td style={cellStyle}>{order.cart}</td>
                  <td style={cellStyle}>{order.order_total}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
      <Dialog open={modalOpen} onClose={closeModal} onKeyDown={handleKeyDown}>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            Select time range
            <div style={{ marginTop: '10px' }}>
              <DatePicker sx={{ mr: 2 }} maxDate={secondDate} value={firstDate} onChange={(newValue) => setFirstDate(newValue)} label="First Date"/>
              <DatePicker sx={{ ml: 2 }} minDate={firstDate} value={secondDate} onChange={(newValue) => setSecondDate(newValue)} label="Second Date"/>
            </div>
            <Button type="submit" variant="contained" sx={{ mt: 2 }} onClick={() => getSalesReport()}>
              Enter
            </Button>
            <Button type="reset" variant="contained" sx={{ mt: 2 , ml: 2}} onClick={() => closeModal()}>
              Cancel
            </Button>
          </LocalizationProvider>
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

export default SalesReport;
