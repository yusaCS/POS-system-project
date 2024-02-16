import React, { useState, useEffect, useRef } from 'react';

/**
 * @author Kawan Ardalan 
 * @constructor
 * @returns {JSX.Element} The React component for the weather widget on the home screen.
 */
const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [images, setImages] = useState([]);
  const [forecast, setForecast] = useState('Sunny');
  const [source, setSource] = useState('./assets/sun.png');
  const [city, setCity] = useState('College Station');
  const [state, setState] = useState('TX');
  const [date, setDate] = useState('December 04, 2023');
  const [actualTemp, setActualTemp] = useState('-1 \u00B0F');
  const [feelsLikeTemp, setFeelsLikeTemp] = useState('70.3 \u00B0F');
  const firstUpdate = useRef(true);
  
  // const API_KEY = 'D4PTDWQ2Z6EQ4JVAPYSQ7EWHQ'; // Your API key
  const API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/college%20station/today?unitGroup=us&include=current&key=D4PTDWQ2Z6EQ4JVAPYSQ7EWHQ&contentType=json`;

  /**
   * Fetch function for the weather api.
   * @returns {void}
   */
  const fetchWeather = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      await setWeatherData(data);
      // console.log(weatherData);
      // console.log(weatherData.currentConditions.temp);
      setActualTemp(weatherData.currentConditions.temp);
    } catch (error) {
      // console.error('Error:', error);
    }
  };

  // Used to convert numerical months into their respective names.
  const monthTranslation = {
    '1':  'January',
    '01': 'January',
    '2':  'February',
    '02': 'February',
    '3':  'March',
    '03': 'March',
    '4':  'April',
    '04': 'April',
    '5':  'May',
    '05': 'May',
    '6':  'June',
    '06': 'June',
    '7':  'July',
    '07': 'July',
    '8':  'August',
    '08': 'August',
    '9':  'September',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
  };

  /**
   * Determines the weather conditions from the api based on keywords.
   * @param {string} filter - The weather conditions.
   * @returns {string} The source path of the weather icon image.
   */
  const determineWeatherCondition = (filter) => {
    var imagePath = '';
    if (
      filter.includes('clear') ||
      filter.includes('sky') ||
      filter.includes('sunshine') ||
      filter.includes('norain')
    ) {
      setForecast('Sunny');
      imagePath = images['Sunny'];
    } else if (
      filter.includes('overcast')
    ) {
      setForecast('Cloudy');
      imagePath = images['Cloudy'];
    } else if (
      filter.includes('cloud') ||
      filter.includes('partly') ||
      filter.includes('variable') ||
      filter.includes('conditions')
    ) {
      setForecast('Partly Sunny');
      imagePath = images['Partly Sunny'];
    } else if (
      filter.includes('rain') ||
      filter.includes('precip')
    ) {
      setForecast('Rainy');
      imagePath = images['Rainy'];
    } else if (
      filter.includes('storm')
    ) {
      setForecast('Storming');
      imagePath = images['Storming'];
    } else if (
      filter.includes('gust') ||
      filter.includes('wind') ||
      filter.includes('coolingdown')
    ) {
      setForecast('Windy');
      imagePath = images['Windy'];
    } else if (
      filter.includes('snow')
    ) {
      setForecast('Snowing');
      imagePath = images['Snowing'];
    } else {
      setForecast('Sunny');
      imagePath = images['Sunny'];
    }

    return imagePath;
  };

  /**
   * Fetch function for the image paths (from the public assets folder).
   * @returns {void}
   */
  const fetchImages = async () => {
    setImages(require('./sources.json')); // pull image paths
  };

  /**
   * Parses the fetched api data into unique variables for app usage.
   * @returns {void}
   */
  const cleanData = async () => {
    // console.log(weatherData);
    if (weatherData === null) return;
    
    const conditions = weatherData['days'][0]['conditions'];
    const src = determineWeatherCondition(conditions);
    const address = weatherData['resolvedAddress'];
    const addrParts = address.split(', ');
    const cityLoc = addrParts[0];
    const stateLoc = addrParts[1];
    const datetime = weatherData['days'][0]['datetime'];
    const dates = datetime.split('-');
    const month = monthTranslation[dates[1]];
    const day = dates[2];
    const year = dates[0];
    const todaysDate = `${month} ${day}, ${year}`;
    const actual = weatherData['currentConditions']['temp'];
    const currTemp = `${actual} \u00B0F`;
    const feels = weatherData['currentConditions']['feelslike'];
    const feelsTemp = `${feels} \u00B0F`;

    setSource(src);
    setCity(cityLoc);
    setState(stateLoc);
    setDate(todaysDate);
    setActualTemp(currTemp);
    setFeelsLikeTemp(feelsTemp);
  };
  
  /**
   * React hook that fetches weather and image data when the component mounts.
   * Invokes 'fetchWeather' and 'fetchImages' functions.
   * Runs only once after the component mounts.
   * @returns {void}
   */
  useEffect(() => {
    fetchWeather();
    fetchImages();
  }, []);
  
  /**
   * Fetches, parses, and render the weather api data only once.
   * @returns {void}
   */
  useEffect(() => {
    if (weatherData && weatherData.currentConditions) {
      // console.log(weatherData);
      // console.log(weatherData.currentConditions.temp);
      setActualTemp(weatherData.currentConditions.temp);
      if (firstUpdate.current) {
        cleanData();
        firstUpdate.current = false;
      }
    }
  }, [weatherData]);
  
  // console.log(images);                          // check images

  /**
   * Styles for the screen offset from the navbar.
   * @type {object}
   */
  const topStyle = {
    marginTop: '60px'
  };

  /**
   * Styles for the layout of the weather card.
   * @type {object}
   */
  const cardContainer = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  /**
   * Styles for the layout of the weather icon image.
   * @type {object}
   */
  const imageContainerStyle = {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
    backgroundColor: '#EED484',
    height: '400px',
    borderRadius: '8px',
    marginTop: '20px',
    marginRight: '0px',
    padding: '0px'
  };

  /**
   * Styles for the weather image icon.
   * @type {object}
   */
  const imageStyle = {
    margin: '0px',
    width: 'auto',
    borderRadius: '8px',
    height: '360px',
    marginLeft: '40px',
    width: '86%',
    marginTop: '10px'
  };

  /**
   * Builds the weather card based on the api data.
   * @returns {JSX.Element} The JSX component for the weather card.
   */
  const buildWeatherCard = () => {
    const temperatureContainerStyle = {
      position: 'absolute',  // Position it relative to its parent
      bottom: '20px',       // Distance from the bottom
      right: '20px',        // Distance from the right
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      color: 'white',       // Text color
      padding: '5px 10px',  // Padding around the text
      borderRadius: '5px',  // Rounded corners
      fontWeight: 'bold',   // Bold text
    };

    return (
      <>
        <div style={cardContainer}>
          <div style={{ position: 'relative' }}> {/* Add position relative here */}
            <div style={imageContainerStyle}>
              <img
                style={imageStyle}
                src={source}
                alt='Weather condition'
              />
            </div>
            <div style={temperatureContainerStyle}>
              {actualTemp} {/* Displaying the actual temperature */}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div style={topStyle}>
        {buildWeatherCard()}
      </div>
    </>
  );
};

export default WeatherWidget;