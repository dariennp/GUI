import React from 'react';
import './WeatherRouter.css';

function HelpPage({ theme, toggleTheme }) {
  return (
    <div className="help-page">
      <div className="content">
        <h2>Pilot Weather App Help Page</h2>
        <h3>Hello and welcome to our new Pilot Weather App that allows pilots to view weather information and view a map</h3>
        <p>This site is designed for pilots to allow them to know what the weather will be like in specific parts of the world. Moreover, this app is simple enough to allow pilots 
          to view their information without it being a major distraction to their flight.
        </p>
      </div>
      <ul id="helpList">
        <li> Use the search bar on the main weather screen to type the location you want information about</li>
        <li> Toggle theme button will alter color scheme of page between light and dark.</li>
        <li> When Wind speed is above 20m/s a warning will appear, in the hourly boxes it will appear red.</li>
        <li> When Visibility is below 5km it will appear red.</li>
        <li> Press on the current weather or hourly weather to get more info.</li>
        <li> Press the map button on the main page to take you to the map with options for conditions displayed.</li>
        <li> Enabling location services will automatically display weather at current location.</li>
      </ul>
    </div>
  );
}

export default HelpPage;