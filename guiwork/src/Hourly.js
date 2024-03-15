import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hourly = ({city,hour,calcWindDir,calcTime}) => {

    const [weatherData, setWeatherData] = useState(null);
    const [moreInfo,setMoreInfo] = useState(false);
    const [moreInfoHour,setMoreInfoHour] = useState(null);

    const fetchData = async () => {
    try {
        const response = await axios.get(
        `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&appid=9bcd9188d56277f0f8720256e18549b3`
        );
        setWeatherData(response.data);
    //console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
        console.error(error);
    }
    };


    const handleMoreInfo = (i) => {
        setMoreInfo(!moreInfo);
        setMoreInfoHour(i+ (hour-4));
    }

    useEffect(() => {
    fetchData();
    }, [city,hour]);

    return (
        <div>
          {weatherData && !moreInfo ? (
                <>
                    {weatherData.list.slice(hour - 4, hour).map((item, i) => (
                        <button onClick={() => handleMoreInfo(i)} key={i}>
                            <p>{calcTime(item.dt,weatherData.city.timezone)}</p>
                            <p>{Math.round(item.main.temp)}°C</p>
                            <img id="weather-icon" src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="weather icon"/>
                            <p>{Math.round(item.wind.speed)}m/s </p>
                            <p>Visibility: {(item.visibility)/1000}km </p>
                        </button>
                    ))}
                </>
            ) : (<></>)}
            { weatherData && moreInfo && (
                <button onClick={() => handleMoreInfo(moreInfoHour)}>
                            <p>{calcTime(weatherData.list[moreInfoHour].dt, weatherData.city.timezone)}</p>
                            <p>{Math.round(weatherData.list[moreInfoHour].main.temp)}°C</p>
                            <img id="weather-icon" src={`https://openweathermap.org/img/wn/${weatherData.list[moreInfoHour].weather[0].icon}@2x.png`} alt="weather icon"/>
                            <p>{weatherData.list[moreInfoHour].weather[0].description.toUpperCase()}</p>
                            <p>{Math.round(weatherData.list[moreInfoHour].wind.speed)} m/s - {calcWindDir(weatherData.list[moreInfoHour].wind.deg)} </p>
                            <p>Visibility: {(weatherData.list[moreInfoHour].visibility)/1000} km</p>
                            <p>Cloud Coverage: {weatherData.list[moreInfoHour].clouds.all}%</p>
                            <p>Air Pressure: {weatherData.list[moreInfoHour].main.pressure} hpa</p>
                        </button>
            )}

            
        </div>
      );
      
};
export default Hourly;