import React from 'react';
import './HelpPage.css';

function HelpPage({ theme, toggleTheme }) {
  return (
    <div className={`help-page ${theme === 'dark' ? 'dark-mode' : ''}`}>
      <div className="content">
        <h2>Pilot Weather App Help Page</h2>
        <h3>Hello and welcome to our new Pilot Weather App that allows pilots to view weather information and view a map</h3>
        <p>This site is designed for pilots to allow them to know what the weather will be like in specific parts of the world. Moreover, this app is simple enough to allow pilots 
          to view their information without it being a major distraction to their flight.
        </p>
      </div>
      
    </div>
  );
}

export default HelpPage;
