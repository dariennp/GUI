import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Hourly from './Hourly';


    
const Weather = ({mode}) => {
    const [isTurbulence, setIsTurbulence] = useState(false);
    const [poorVisibility,setPoorVisibility] = useState(false);
    const [city, setCity] = useState('');
    const [hour,setHour] = useState(4);
    const [submittedCity,setSubmittedCity]=useState('');
    const [mainMoreInfo,setMainMoreInfo] = useState(false)
    const [weatherData, setWeatherData] = useState(null);


    // Fetch weather data for user's location
    const fetchWeatherData = async () => {
        try {
            // Get user's current position
            navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            // get city from coordinates
            const response = await axios.get(`https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=9bcd9188d56277f0f8720256e18549b3`);
            const city = response.data[0].name;
            setCity(city);
            if (!submittedCity) { //if submittedCity is empty then click the submit button, stops bugs related to hourly box
            document.getElementById("submitButton").click();}
        });
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        fetchWeatherData();
        },[]);  // Empty dependency array to run only once on component mount

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `https://pro.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=9bcd9188d56277f0f8720256e18549b3`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error(error);
        }
    };      

    //Close or open more info for current weather box
    const handleMainMoreInfo = (e) => {
        setMainMoreInfo(!mainMoreInfo);
    }

    //Converts wind degree to Compass directions
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

    //Calculate the local time for a location based on the GMT time and the location's timezone
    const calcTime = (time,timezone) => {
        const accountedTime=(time+timezone)*1000 //gives local time
        const dateTime= new Date(accountedTime);
        const dateTimeFormatted=dateTime.toISOString().replace('T', ' ').substr(10, 6); //Format String to only show HH:MM
        return dateTimeFormatted;
    }

    //set City state to search box
    const handleInputChange = (e) => {
        setCity(e.target.value);
    };

    //set submitted city to city in search box when form is submitted
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchData();
        setSubmittedCity(city);
    };


    //increase the hours shown to the next 4 hours after the current latest hour shown
    const handleNextHours = (e) => {
        setHour(hour+4);
    }

     //decrease the hours shown to the previous 4 hours before the current earliest hour shown
    const handleBackHours = (e) => {
        setHour(hour-4);
    }


    //Both use effect functions set the states for these when the current weather data meets the conditions
    useEffect(() => {
        if (weatherData && weatherData.wind && weatherData.wind.speed > 7) {
            setIsTurbulence(true);
        } else {
            setIsTurbulence(false);
        }
    }, [weatherData]);

    useEffect(() => {
        if (weatherData && weatherData.visibility < 5000) {
            setPoorVisibility(true);
        } else {
            setPoorVisibility(false);
        }
    }, [weatherData]);


    // Here, relevant weather data is displayed by using the weather data handed by the api.
    return (
        <div id="mainBoxWeather">
        <div className="header">
            <form id="weatherForm" onSubmit={handleSubmit}>
            <input className="search_bar"
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            />
            <button className="opposite_buttons" id="submitButton" type="submit">Get Weather</button>
        </form>
        
        </div>
        {weatherData ? (
        <>
        <h2 className="container1">{weatherData.name}</h2>
        {/* Current weather data */}
        <div className="container">
        <button className="main-button" onClick={handleMainMoreInfo}>
            <div id="mainFlex">
            <div id="mainTemp" > 

                <div> 
                  <h3>{weatherData.weather[0].description.toUpperCase()} </h3>
                </div>

                <div>
                  <p class="mainFlexP">{Math.round(weatherData.main.temp)}°C </p>
                </div>

                <div>
                  <img id="weather-icon" src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon"/>
                </div>

              <div id="mainTime" >
              <p class="mainFlexP">{calcTime(weatherData.dt,weatherData.timezone)} </p>
              </div>

            </div>

            <hr id="mainSeperate"></hr>

            <div id="mainOtherContent">

                <div id="mainWind" className='mFlex'>

                    <h3> Wind: </h3> 
                    {/* if wind speed>20m/s provide a turbulence warning in red otherwise dont */}
                    {isTurbulence ? (
                        <>
                        <p class="mainFlexP" style={{ color: 'red' }}>
                            Turbulence Warning:- 
                        </p>
                        <p class="mainFlexP"> {Math.round(weatherData.wind.speed)}m/s - {calcWindDir(weatherData.wind.deg)} </p>
                        </>
                    ) : (
                        <p class="mainFlexP">
                            {Math.round(weatherData.wind.speed)}m/s - {calcWindDir(weatherData.wind.deg)}
                        </p>
                    )}

                </div>
              <div id="mainPressure" className='mFlex'>
                  <h3>Pressure: </h3>
                  <p class="mainFlexP">{weatherData.main.pressure} hpa</p>
              </div>

              <div id="mainVis" className='mFlex'> 
              {/* If visibility is below 5km present the value in red otherwise in regular text */}
                  <h3>Visibility: </h3>
                  {poorVisibility ? ( 
                    <p class="mainFlexP" style={{color: 'red'}}>{(weatherData.visibility)/1000}km</p>
                  ): (
                    <p class="mainFlexP" >{(weatherData.visibility)/1000}km</p>
                  )}
                  
              </div>
                {/* Use calc time to get local time */}
              <div id="mainSun" className='mFlex'>
                  <h3>Sunrise/Sunset: </h3>
                  <p class="mainFlexP"> {calcTime(weatherData.sys.sunrise,weatherData.timezone)} / {calcTime(weatherData.sys.sunset,weatherData.timezone)}</p> 
              </div>
            {/*if current weather has been clicked show more info */}
              {mainMoreInfo ? (
                <>
              <div id="mainCoverage" className='mFlex'>
                  <h3>Cloud Coverage: </h3>
                  <p class="mainFlexP"> {weatherData.clouds.all}%</p>
              </div>

              <div id="mainHumidity" className='mFlex'>
                  <h3>Humidity :  </h3>
                  <p class="mainFlexP">{weatherData.main.humidity}%</p>
              </div>

              </>   ) : (<></>)}
            </div>
            </div>
        </button>
        </div>
        <h2>ⓘ Pay Attention While Piloting</h2>
        {/* Buttons to scroll between hours, if at the earliest 4 hours, back button does not appear, if at latest 4 hours, next button does not appear */}
        <div className="back_next_buttons">
        {hour>4 && !mainMoreInfo ? (<button className="opposite_buttons" onClick={handleBackHours}> Back </button>) : (<p> </p>)}
        {hour<24 && !mainMoreInfo ? (<button className="opposite_buttons" onClick={handleNextHours}> Next </button>) : (<p> </p>)}
        </div>
        {/*Show hourly box info if current weather hasnt been clicked for more info */}
        {!mainMoreInfo ? (<Hourly mode={mode} city={submittedCity} hour={hour} calcWindDir={calcWindDir} calcTime={calcTime} key={`${submittedCity}-${hour}`}/>) : (<></>)}

        </>
        ) : (
        <p>Error</p>
        )}
        </div>

    );
};
export default Weather;