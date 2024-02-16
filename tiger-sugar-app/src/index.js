import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './components/Home';
import { Auth0Provider } from '@auth0/auth0-react';
import Order from './components/Order';
import Login from './components/Login';
import PosSystem from './components/PosSystem';
import OrderHistory from './components/OrderHistory';
import Inventory from './components/Inventory';
import Menu from './components/Menu'
import RestockReport from './components/RestockReport';
import ExcessReport from './components/ExcessReport';
import SalesReport from './components/SalesReport';
import AuthenticationError from './components/AuthenticationErrorPage';
import UserWay from './components/UserWay';
import GoogleTranslate from './components/GoogleTranslate';

const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  (window.scrollY > 0) ? backToTopButton.style.display = 'flex' : backToTopButton.style.display = 'none';
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "home",
    element: <Home />
  },
  {
    path: "order",
    element: <Order />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path: "possystem",
    element: <PosSystem />
  },
  {
    path: "orderhistory",
    element: <OrderHistory />
  },
  {
    path: "inventory",
    element: <Inventory />
  },
  {
    path: "menu",
    element: <Menu />
  },
  {
    path: "restockreport",
    element: <RestockReport />
  },
  {
    path: "excessreport",
    element: <ExcessReport />
  },
  {
    path: "salesreport",
    element: <SalesReport />
  },
  {
    path: "googletranslate",
    element: <GoogleTranslate />
  },
  {
    path: "userway",
    element: <UserWay />
  },
  {
    path: "authenticationerror",
    element: <AuthenticationError />
  },
]);

const auth0Config = {
  domain: 'dev-ay1ogdtn8h20os0r.us.auth0.com',
  clientId: 'bor02wETZyC5hTPf0XASm8qjkDnhYl3e',
  authorizationParams: {
    redirect_uri: window.location.origin
  }
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider {...auth0Config}>
      <RouterProvider router={router}>
        <App />
        {/* Add other components if needed */}
      </RouterProvider>
    </Auth0Provider>
  </React.StrictMode>
);