import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Hourly = ({ city, hour, calcWindDir, calcTime }) => {
    const [weatherData, setWeatherData] = useState(null);
    const [moreInfo, setMoreInfo] = useState(false);
    const [moreInfoHour, setMoreInfoHour] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&appid=9bcd9188d56277f0f8720256e18549b3`
                );
                setWeatherData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

    }, [city]);

    const handleMoreInfo = (i) => {
        setMoreInfo(!moreInfo);
        setMoreInfoHour(i + (hour - 4));
    };

    return (
        <div className="hourly_container">
            {weatherData && !moreInfo ? (
                <>
                    {weatherData.list.slice(hour - 4, hour).map((item, i) => (
                        <button className={`hourly-button`} onClick={() => handleMoreInfo(i)} key={i}>
                            <p>{calcTime(item.dt, weatherData.city.timezone)}</p>
                            <p>{Math.round(item.main.temp)}°C</p>
                            <img
                                className="hourly_icon"
                                id="weather-icon"
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                alt="weather icon"
                            />
                            <p>{Math.round(item.wind.speed)}m/s</p>
                            <p>{item.visibility / 1000}km</p>
                        </button>
                    ))}
                </>
            ) : (
                <></>
            )}
            {weatherData && moreInfo && (
                <div className="hourlyOtherContent">
                    <button className={`hourly-button expanded`} onClick={() => handleMoreInfo(moreInfoHour)}>
                        <div className="hourly_col">
                            <p>Temperature: {Math.round(weatherData.list[moreInfoHour].main.temp)}°C</p>
                            <p>Visibility: {weatherData.list[moreInfoHour].visibility / 1000} km</p>
                            <p>Wind Speed: {Math.round(weatherData.list[moreInfoHour].wind.speed)} m/s</p>
                        </div>
                        <div className="hourly_col">
                            <p>{calcTime(weatherData.list[moreInfoHour].dt, weatherData.city.timezone)}</p>
                            <img className="hourly_icon1"
                                id="weather-icon"
                                src={`https://openweathermap.org/img/wn/${weatherData.list[moreInfoHour].weather[0].icon}@2x.png`}
                                alt="weather icon"
                            />
                            <p>{weatherData.list[moreInfoHour].weather[0].description.toUpperCase()}</p>
                        </div>
                        <div className="hourly_col">
                            <p>Cloud Coverage: {weatherData.list[moreInfoHour].clouds.all}%</p>
                            <p>Wind Direction: {calcWindDir(weatherData.list[moreInfoHour].wind.deg)}</p>
                            <p>Air Pressure: {weatherData.list[moreInfoHour].main.pressure} hpa</p>
                        </div>
                    </button>
                </div>
                )}
        </div>
    );
};

export default Hourly;
