import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hourly from './Hourly';



const Weather = () => {
const [city, setCity] = useState('');
const [hour,setHour] = useState(4);
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

    const calcWindDir = (degrees) => {
        if (degrees>340 || degrees<=20 ){return "N"}
        else if  (degrees>20 && degrees <=60 ) {return "NE"}
        else if (degrees>60 && degrees<=120) {return "E"}
        else if  (degrees>120 && degrees <=160 ) {return "SE"}
        else if (degrees>160 && degrees<=200) {return "S"}
        else if  (degrees>200 && degrees <=240 ) {return "SW"}
        else if (degrees>240 && degrees<=300) {return "W"}
        else if  (degrees>300 && degrees <=340 ) {return "NW"}
        else {return "N/A"}

    }


    const calcTime = (time,timezone) => {
        console.log("suntime",time)
        console.log("timezone",timezone)
        const accountedTime=(time+timezone)*1000
        console.log("Time:",time)
        const dateTime= new Date(accountedTime);
        const dateTimeFormatted=dateTime.toISOString().replace('T', ' ').substr(10, 6);
        return dateTimeFormatted;
    }

    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
        setSubmittedCity(city);
    };

    const handleNextHours = (e) => {
        setHour(hour+4);
    }

    const handleBackHours = (e) => {
        setHour(hour-4);
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
                <img id="weather-icon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon"/>
            </div>
            <div id="mainTime">
                <h3>{calcTime(weatherData.dt,weatherData.timezone)} </h3>
            </div>
            <div id="mainHumidity">
                <h3>Humidity :  </h3>
                <p>{weatherData.main.humidity}%</p>
            </div>
            <div id="mainWind">
                <h3> Wind: </h3> 
                <p> {Math.round(weatherData.wind.speed)}m/s - {calcWindDir(weatherData.wind.deg)}</p>
            </div>
            <div id="mainPressure">
                <h3>Pressure: </h3>
                <p>{weatherData.main.pressure} hpa</p>
            </div>
            <div id="mainVis"> 
                <h3>Visibility: </h3>
                <p>{(weatherData.visibility)/1000}km</p>
            </div>
            <div id="mainCoverage">
                <h3>Cloud Coverage: </h3>
                <p> {weatherData.clouds.all}%</p>
            </div>
            <div id="mainSun">
                <h3>Sunrise/Sunset: </h3>
                <p> {calcTime(weatherData.sys.sunrise,weatherData.timezone)} / {calcTime(weatherData.sys.sunset,weatherData.timezone)}</p> 
            </div>
            </>
        ) : (
            <>
            <div id="mainTemp"> 
                <h3>{weatherData.weather[0].description} </h3>
                <p>{Math.round(weatherData.main.temp)}°C </p>
                <img id="weather-icon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon"/>
            </div>
            <div id="mainTime">
                <h3>{calcTime(weatherData.dt,weatherData.timezone)} </h3>
            </div>
            <div id="mainWind">
                <h3> Wind: </h3> 
                <p> {Math.round(weatherData.wind.speed)}m/s - {calcWindDir(weatherData.wind.deg)}</p>
            </div>
            <div id="mainPressure">
                <h3>Pressure: </h3>
                <p>{weatherData.main.pressure}</p>
            </div>
            <div id="mainVis"> 
                <h3>Visibility: </h3>
                <p>{(weatherData.visibility)/1000} km</p>
            </div>
            <div id="mainSun">
                <h3>Sunrise/Sunset: </h3>
                <p> {calcTime(weatherData.sys.sunrise,weatherData.timezone)} / {calcTime(weatherData.sys.sunset,weatherData.timezone)}</p> 
            </div>
            </> ) 
        }
        </button>
        {hour>4 && !mainMoreInfo ? (<button onClick={handleBackHours}> Back </button>) : (<> </>)}
        {hour<24 && !mainMoreInfo ? (<button onClick={handleNextHours}> Next </button>) : (<> </>)}
        {!mainMoreInfo ? (<Hourly city={submittedCity} hour={hour} calcWindDir={calcWindDir} calcTime={calcTime} key={`${submittedCity}-${hour}`}/>) : (<></>)}

        </>
        ) : (
        <p></p>
        )}
        </div>

    );
};
export default Weather;