import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

  
function LeafletMap() {
    const apiKey = "9bcd9188d56277f0f8720256e18549b3";
    // Initialize mode with one of the modes, for example, "temp_new"
    const [mode, setMode] = useState("temp_new"); 

    return (
        <>
            <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: "80vh", width: "100%" }}>
                {/* Base Tile Layer */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {/* Dynamic OpenWeatherMap Layer Based on Mode */}
                <TileLayer
                        url={`https://tile.openweathermap.org/map/${mode}/{z}/{x}/{y}.png?appid=${apiKey}`}
                        attribution='&copy; <a href="https://www.openweathermap.org/">OpenWeatherMap</a>'
                />
            </MapContainer>
            <div>
                <button className="opposite_buttons" onClick={() => setMode("temp_new")} >
                    Temperature
                </button>
                <button className="opposite_buttons" onClick={() => setMode("clouds_new")} >
                    Clouds
                </button>
                <button className="opposite_buttons" onClick={() => setMode("precipitation_new")} >
                    Precipitation
                </button>
                <button className="opposite_buttons" onClick={() => setMode("wind_new")}>
                    Wind Speed
                </button>
            </div>
        </>
    );
}
  
const Map = () => {
    return (
        <div>
            
            <button id="submitButton" type="submit" style={{ display: 'none' }}>Get Weather</button>
            
            <div id = "map-container"><LeafletMap></LeafletMap></div>
            
        </div>
    );
};

export default Map;