import * as React from "react";
import Weather from './Weather';
import Map from './Map';

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";


const WeatherRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Pilot Weather App</h1>
        <Weather/>
        <Link to="Map">Map</Link>
      </div>
    ),
  },
  {
    path: "Map",
    element: <div>
      <h1> Map</h1>
      <Map/>
      <Link to="/">Weather</Link>
    </div>,
  },
]);
// createRoot(document.getElementById("root")).render(<RouterProvider router={WeatherRouter} />);

export default WeatherRouter;