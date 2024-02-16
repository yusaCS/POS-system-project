import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Inventory from './components/Inventory';
import Login from './components/Login';
import PosSystem from './components/PosSystem';
import OrderHistory from './components/OrderHistory';
import RestockReport from './components/RestockReport';
import ExcessReport from './components/ExcessReport';
import SalesReport from './components/SalesReport';
import AuthenticationError from './components/AuthenticationErrorPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/login" element={<Login />} />
      <Route path="/possystem" element={<PosSystem />} />
      <Route path="/orderhistory" element={<OrderHistory />} />
      <Route path="/restockreport" element={<RestockReport />} />
      <Route path="/excessreport" element={<ExcessReport />} />
      <Route path="/salesreport" element={<SalesReport />} />
      <Route path="/authenticationerror" element={<AuthenticationError />} />
    </Routes>
  );
};

export default App;