import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hourly from './Hourly';

const Weather = () => {
const [city, setCity] = useState('');
const [hour,setHour] = useState(5);
const [submittedCity,setSubmittedCity]=useState(null);
const [mainMoreInfo,setMainMoreInfo] = useState(false)
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
//useEffect(() => {fetchData();}, []);

    const handleMainMoreInfo = (e) => {
        setMainMoreInfo(!mainMoreInfo);
    }


    const calcSunTime = (sunTime) => {
        const dateTime= new Date(sunTime*1000);
        const dateTimeFormatted=dateTime.toISOString().replace('T', ' ').substr(10, 6);
        return dateTimeFormatted;
    }

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(Math.round(2.34))
        fetchData();
        setSubmittedCity(city);
    };

    const handleNextHours = (e) => {
        setHour(hour+5);
    }

    const handleBackHours = (e) => {
        setHour(hour-5);
    }

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
        <button onClick={handleMainMoreInfo}>
        {mainMoreInfo ? (
            <>
            <div id="mainTemp"> 
                <h3>{weatherData.weather[0].description.toUpperCase()} </h3>
                <p>{Math.round(weatherData.main.temp)}°C </p>
            </div>
            <div id="mainHumidity">
                <h3>Humidity :  </h3>
                <p>{weatherData.main.humidity}%</p>
            </div>
            <div id="mainWind">
                <h3> Wind: </h3> 
                <p> {Math.round(weatherData.wind.speed)}m/s - {weatherData.wind.deg}</p>
            </div>
            <div id="mainPressure">
                <h3>Pressure: </h3>
                <p>{weatherData.main.pressure} hpa</p>
            </div>
            <div id="mainVis"> 
                <h3>Visibility: </h3>
                <p>{weatherData.visibility}</p>
            </div>
            <div id="mainCoverage">
                <h3>Cloud Coverage: </h3>
                <p> {weatherData.clouds.all}%</p>
            </div>
            <div id="mainSun">
                <h3>Sunrise/Sunset: </h3>
                <p> {calcSunTime(weatherData.sys.sunrise)} / {calcSunTime(weatherData.sys.sunset)}</p> 
            </div>
            </>
        ) : (
            <>
            <div id="mainTemp"> 
                <h3>{weatherData.weather[0].description.toUpperCase()} </h3>
                <p>{Math.round(weatherData.main.temp)}°C </p>
            </div>
            <div id="mainWind">
                <h3> Wind: </h3> 
                <p> {Math.round(weatherData.wind.speed)}m/s - {weatherData.wind.deg}</p>
            </div>
            <div id="mainPressure">
                <h3>Pressure: </h3>
                <p>{weatherData.main.pressure}</p>
            </div>
            <div id="mainVis"> 
                <h3>Visibility: </h3>
                <p>{weatherData.visibility}</p>
            </div>
            <div id="mainSun">
                <h3>Sunrise/Sunset: </h3>
                <p> {calcSunTime(weatherData.sys.sunrise)} / {calcSunTime(weatherData.sys.sunset)}</p> 
            </div>
            </> ) 
        }
        </button>
        {hour<25 && !mainMoreInfo ? (<button onClick={handleNextHours}> Next </button>) : (<> </>)}
        {hour>5 && !mainMoreInfo ? (<button onClick={handleBackHours}> Back </button>) : (<> </>)}
        {!mainMoreInfo ? (<Hourly city={submittedCity} hour={hour} key={`${submittedCity}-${hour}`}/>) : (<></>)}
        
        </>
        ) : (
        <p></p>
        )}
        </div>
    );
};
export default Weather;