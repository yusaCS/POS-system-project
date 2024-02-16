import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import { useAuth0 } from "@auth0/auth0-react";



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isHover, setIsHover] = useState(false);
  const navigate = useNavigate();
  const {loginWithRedirect, api} = useAuth0();

  // Mouse handling for onHover functionality
  const onMouseEnterLogin = () => {
    setIsHover(true);
  };

  const onMouseLeaveLogin = () => {
    setIsHover(false);
  };

  // Snackbar library for feedback indicator
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('error');
  
  const openSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  // Function to handle the login (onClick)
  // const onClickLogin = () => {
  //   if (username === 'cashier' && password === 'cashier') {
  //     // alert('Cashier login successful!');
  //     openSnackbar("Cashier login successful", 'success');
  //     navigate('/possystem');
  //   } else if (username === 'manager' && password === 'manager') {
  //     // alert('Manager login successful!');
  //     openSnackbar("Manager login successful", 'success');
  //     navigate('/inventory');
  //   } else {
  //     // alert('Login failed. Please check your credentials.');
  //     openSnackbar("Login failed. Please check your credentials.", 'error');
  //   }
  // };

  const handleOAuthLogin = async () => {
    try {
      const options = {
        redirect_uri: 'http://localhost:3000/possystem',
        //appState: { targetUrl: '/inventory' } // Optional: Additional appState to pass data
      };
      await loginWithRedirect(options);
      // Redirect using api.redirect after successful login
      api.redirect({ url: 'http://localhost:3000/possystem' }); // Ensure this URL matches the configured one in Auth0
    } catch (error) {
      console.error('Error redirecting:', error);
      // Handle error if redirection fails
    }
  };

  // Styles
  const loginScreenStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    margin: '0px',
    width: '100vw',
    flexDirection: 'column',
    padding: '0px',
    backgroundColor: '#EED484'
  };

  const headerStyle = {
    fontSize: '24px',
    marginBottom: '20px',
    color: 'black'
  };

  const screenStyle = {
    backgroundColor: 'black',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    justifyContent: 'center',
    marginBottom: '20px'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: 'bold'
  };

  const entryStyle = {
    padding: '10px',
    marginBottom: '16px',
    border: '1px solid #CCC',
    borderRadius: '4px'
  };

  const loginButtonStyle = {
    backgroundColor: isHover ? '#D4AF37' : 'black',
    color: '#FFF',
    border: 'none',
    borderRadius: '4px',
    padding: '12px 20px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  return (
    <>
      <Navbar />
      <div style={loginScreenStyle}>
        <h1 style={headerStyle}> Login</h1>
        <div style={screenStyle}>
          <label style={labelStyle}> Username:</label>
          <input
            style={entryStyle}
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div style={screenStyle}>
          <label style={labelStyle}> Password:</label>
          <input
            style={entryStyle}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          style={loginButtonStyle}
          onMouseEnter={onMouseEnterLogin}
          onMouseLeave={onMouseLeaveLogin}
          onClick={handleOAuthLogin}
        >
          Login
        </button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
          sx={{ maxHeight: '1000px' }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{
              backgroundColor:
                snackbarSeverity === 'error' ? '#f44336' :
                snackbarSeverity === 'warning' ? '#ff9800' :
                snackbarSeverity === 'info' ? '#2196f3' :
                snackbarSeverity === 'success' ? '#4caf50' : '#f44336',
              color: '#fff',
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
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
      </div>
    </>
  );
};

export default Login;
