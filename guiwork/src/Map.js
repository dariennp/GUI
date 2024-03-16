import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';


async function getCoordinates(cityName) { // gets coordinates from city name
    const apiKey = '9bcd9188d56277f0f8720256e18549b3'; // dont share this plz ty
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${apiKey}`;

    try {
        const response = await axios.get(url);
        const data = response.data[0]; // Assuming you want the first result
        const latitude = data.lat;
        const longitude = data.lon;
        return [latitude, longitude];
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
}

function generateMapIframe(lat, lon) { // generate the google map
    const apiKey = 'AIzaSyDYUbq89ylC-O_y0IR9sMrqgu3N6I_lv64'; 
    const zoomLevel = 10; // Adjust zoom level
    const iframeWidth = 600;
    const iframeHeight = 450;

    const srcUrl = `https://www.google.com/maps/embed/v1/view?key=${apiKey}&center=${lat},${lon}&zoom=${zoomLevel}&maptype=satellite`;

    const iframe = document.createElement('iframe');
    iframe.src = srcUrl;
    iframe.width = iframeWidth;
    iframe.height = iframeHeight;
    iframe.style.border = '0';
    iframe.allowFullscreen = '';
    iframe.loading = 'lazy';

    // Append the iframe to a container in your HTML, for example, a div with id 'map-container'
    document.getElementById('map-container').innerHTML = '';
    document.getElementById('map-container').appendChild(iframe);
}

async function handleStartingPointClick(destination) { // async function
    try {
        
        const coordinates = await getCoordinates(destination);
        if (coordinates) {
            const [latitude, longitude] = coordinates;
            generateMapIframe(latitude, longitude);
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        } else {
            console.log('Could not get coordinates.');
        }
    } catch (error) {
        console.error('Error getting coordinates:', error);
    }
}

function MyMapComponent() { // handle input change and pass it to the function that outputs the map
    // State to hold the input value
    const [cityName, setCityName] = useState('');
  
    // Function to update the state with the text box's value
    function handleInputChange(event) {
      setCityName(event.target.value);
    }
  
    // Function that gets called when the button is clicked
    function handleButtonClick() {
      handleStartingPointClick(cityName);
    }
  
    return (
      <div>
        <input
          type="text"
          id="cityInput"
          value={cityName}
          onChange={handleInputChange} // Update state when the input changes
        />
        <button id = "viewDestinationButton" onClick={handleButtonClick}>View Destination</button>
      </div>
    );
  }
  


const Map = () => {
    return (
        <div>
            
            <button id="submitButton" type="submit" style={{ display: 'none' }}>Get Weather</button>
            <MyMapComponent ></MyMapComponent>
            <div id = "map-container"></div>
            
        </div>
    );
};

export default Map;