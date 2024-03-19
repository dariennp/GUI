import React, { useState } from "react";
import Weather from './Weather';
import Map from './Map';
import HelpPage from './HelpPage';
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Link } from "react-router-dom";
import './WeatherRouter.css'

const WeatherRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <div>
        <h1>Pilot Weather App</h1>
        <Weather />
        <div className="buttons">
          <div>
            <Link to="Map">Map</Link>
          </div>
          <button onClick={toggleTheme}>Toggle Theme</button>
          <div>
            <Link to="HelpPage">Help</Link>
          </div>
        </div>
        <h2>Pay Attention While Piloting</h2>
        </div>
      </div>
    ),
  },
  {
    path: "Map",
    element: (
      <div style={{ width: '100%' }}>
        
        <Map />
        <Link to="/">Weather</Link>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    ),
  },
  {
    path: "HelpPage",
    element: (
      <div>
        <HelpPage />
        <Link to="/">Weather</Link>
      </div>
    ),
  },
]);

// Function to toggle between light and dark themes
function toggleTheme() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", newTheme);

  // Toggle between light and dark background classes
  const body = document.body;
  body.classList.toggle("light-background", newTheme === "light");
  body.classList.toggle("dark-background", newTheme === "dark");
}


//createRoot(document.getElementById("root")).render(<RouterProvider router={WeatherRouter} />);

export default WeatherRouter;