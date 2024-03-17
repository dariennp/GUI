import './App.css';
import Weather from './Weather'
import Map from './Map';
import WeatherRouter from './WeatherRouter'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <RouterProvider router={WeatherRouter}></RouterProvider>
      </header>
    </div>
  );
}

export default App;

