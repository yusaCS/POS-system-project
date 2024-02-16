import React from 'react';
import Navbar from './Navbar.js';
import Menuboard from './Menuboard.js';
import WeatherWidget from './WeatherWidget';

const Home = () => {
  return (
    <>
      <Navbar />
      <WeatherWidget />
      <Menuboard />
    </>
  );
};

export default Home;