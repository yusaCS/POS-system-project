import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../effects/NavbarFX.css';
import { useAuth0 } from "@auth0/auth0-react";
import GoogleTranslate from './GoogleTranslate'; // Import the Translate component


const Navbar = ({ profile }) => {
  const [user, setUser] = useState(profile);
  const [images, setImages] = useState([]);
  const navigate = useNavigate();
  const {loginWithRedirect, api} = useAuth0();
 
  const fetchImages = async () => {
    setImages(require('./sources.json')); // pull image paths
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // console.log(images); // check images

  // Click handlers (onClick)
  const onClickHome = () => {
    navigate('/');
  };

  const onClickOrder = () => {
    navigate('/order');
  };

  // const onClickCart = () => {
  //   navigate('/cart');
  // };

  const onClickPos = () => {
    navigate('/possystem');
  };

  const onClickOrderHistory = () => {
    navigate('/orderhistory');
  };
  
  const onClickInventory = () => {
    navigate('/inventory');
  };

  const onClickMenu = () => {
    navigate('/menu');
  };

  // Sprint 3 onClick navigation handlers

  const onClickRestockReport = () => {
    navigate('/restockreport');
  };

  const onClickExcessReport = () => {
    navigate('/excessreport');
  };

  const onClickSalesReport = () => {
    navigate('/salesreport');
  };

  const onClickLogin = async () => {
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

  const onClickLogout = () => {
    setUser('');
    navigate('/');
  };

  const navStyle = {
    backgroundColor: 'black',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    padding: '10px 0 0 0',
    zIndex: 1000
  };

  const listStyle = {
    listStyleType: 'none',
    margin: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '60px'
  };

  const linkStyle = {
    textDecoration: 'none',
    height: '1em',
    lineHeight: '1em',
    padding: '10px',
    verticalAlign: 'middle',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
    paddingLeft: 'calc(0.125em + 0.875em)',
    fontSize: '0.75em',
    fontWeight: '400',
    borderRadius: '15px',
    cursor: 'pointer',
    backgroundColor: 'black',
    transition: 'color 0.25s ease, background-color 0.25s ease, border-color 0.25s ease'
  };

  const imageStyle = {
    height: '60px'
  };

  return (
    <>
      <nav style={navStyle}>
        <ul style={listStyle}>
        <GoogleTranslate />
          <img
            style={imageStyle}
            src={images["Logo"]}
            alt='Tiger Sugar logo.'
          />
          {
            (user === 'CASHIER' || user === 'MANAGER') ? (
              <>
                {
                  user === 'CASHIER' ? (
                    <>
                      <li className='linkButton' style={linkStyle}>
                        <a onClick={onClickPos}>
                          Point of Sales
                        </a>
                      </li>
                      <li className='linkButton' style={linkStyle}>
                        <a onClick={onClickOrderHistory}>
                          Order History
                        </a>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className='linkButton' style={linkStyle}>
                        <a onClick={onClickInventory}>
                          Inventory
                        </a>
                      </li>
                      <li className='linkButton' style={linkStyle}>
                        <a onClick={onClickMenu}>
                          Menu
                        </a>
                      </li>
                      <li className='linkButton' style={linkStyle}>
                        <a onClick={onClickRestockReport}>
                          Restock Report
                        </a>
                      </li>
                      <li className='linkButton' style={linkStyle}>
                        <a onClick={onClickExcessReport}>
                          Excess Report
                        </a>
                      </li>
                      <li className='linkButton' style={linkStyle}>
                        <a onClick={onClickSalesReport}>
                          Sales Report
                        </a>
                      </li>
                    </>
                  )
                }
                <li className='linkButton' style={linkStyle}>
                  <a onClick={onClickLogout}>
                    Sign Out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className='linkButton' style={linkStyle}>
                  <a onClick={onClickHome}>
                    Home
                  </a>
                </li>
                <li className='linkButton' style={linkStyle}>
                  <a onClick={onClickOrder}>
                    Order
                  </a>
                </li>
                {/* <li className='linkButton' style={linkStyle}>
                  <a onClick={onClickCart}>
                    Cart
                  </a>
                </li> */}
                <li className='linkButton' style={linkStyle}>
                  <a onClick={onClickLogin}>
                    Staff Login
                  </a>
                </li>
              </>
            )
          }
          <GoogleTranslate />
        </ul>
      </nav>
    </>
  );
};

export default Navbar;



              // /*between these 2 lines supposed to add translation button to navbar, at the most right or anywhere available place */
              // {/* Place the Translate component at rge end */}
              // <li> for this line or <li className='linkButton' style={linkStyle}  or just ???
              //   <GoogleTranslate />
              // </li>
              // /*between these 2 lines supposed to add translation button to navbar, at the most right or anywhere available place */