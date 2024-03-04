import React, { useEffect, useState } from 'react';
import axios from 'axios';

const strftime= require('strftime')
const Weather = () => {
const [city, setCity] = useState('');
const [weatherData, setWeatherData] = useState(null);

    const fetchData = async () => {
    try {
    const response = await axios.get(
    `https://pro.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=9bcd9188d56277f0f8720256e18549b3`
    );
    setWeatherData(response.data);
    console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
    console.error(error);
}
};
useEffect(() => {fetchData();}, []);

const calcSunTime = (sunTime) => {
    const dateTime= new Date(sunTime*1000)
    const dateTimeFormatted=dateTime.toISOString().replace('T', ' ').substr(10, 6)
    return dateTimeFormatted
}

const handleInputChange = (e) => {
    setCity(e.target.value);
    };
    const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
    };
    // Here, relevant weather data is displayed by using the weather data handed by the api, 
    // sunset/sunrise times utilise calcSunTime function to convert timestamp to HH:MM 
    return (
        <div>
        <form onSubmit={handleSubmit}>
        <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
        </form>
        {weatherData ? (
        <>
        <h2>{weatherData.name}</h2>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Description: {weatherData.weather[0].description}</p>
        <p>Feels like : {weatherData.main.feels_like}°C</p>
        <p>Humidity : {weatherData.main.humidity}%</p>
        <p>Pressure : {weatherData.main.pressure}</p>
        <p>Wind: {weatherData.wind.speed}m/s - {weatherData.wind.deg}</p>
        <p>Sunrise/Sunset : {calcSunTime(weatherData.sys.sunrise)} / {calcSunTime(weatherData.sys.sunset)}</p> 
        </>
        ) : (
        <p>Loading weather data...</p>
        )}
        </div>
    );
};
export default Weather;