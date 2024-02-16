import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

// TODO:
// Make the style look better
// Have it so that you can choose the amount of days you want to look at (should be 0 and above)

const OrderHistory = () => {
  // ########## Database ##########
  const [data, setData] = useState([]);

  // Fetch inventory database
  const fetchSalesHistoryData = async () => {
    fetch('https://tiger-sugar-app.onrender.com/orderhistory')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error:', error));
  };
  
  useEffect(() => {
    fetchSalesHistoryData();
  }, []);

  const formatDate = (dateString) => {
    const saleDate = new Date(dateString);
    return saleDate.toLocaleDateString();
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
    width: '100%',
    userSelect: 'none',
    border: '1px solid #DDD'
  };

  const cellStyle = {
    border: '1px solid #DDD',
    padding: '8px',
    textAlign: 'left'
  };

  return (
    <>
      <Navbar profile={'CASHIER'} />
      <div style={screenStyle}>
        <h1 style={headerStyle}>Order History</h1>
        <table style={tableStyle}>
          <thead>
              <tr>
                <th style={cellStyle}>ID</th>
                <th style={cellStyle}>Cashier</th>
                <th style={cellStyle}>Sales Date</th>
                <th style={cellStyle}>Current Hour </th>
                <th style={cellStyle}>Payment Type</th>
                <th style={cellStyle}>Cart</th>
                <th style={cellStyle}>Order Total</th>
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
    </>
  );
};

export default OrderHistory;
