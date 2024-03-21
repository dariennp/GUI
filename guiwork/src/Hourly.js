import React, { useEffect, useState } from 'react';
import axios from 'axios';
import windLight from "./wind.png";
import windDark from "./windDark.png";
import visibilityLight from "./visibility.png";
import visibilityDark from "./visibilityDark.png";



const Hourly = ({ mode,city, hour, calcWindDir, calcTime}) => {
    const [weatherData, setWeatherData] = useState(null);
    const [moreInfo, setMoreInfo] = useState(false);
    const [moreInfoHour, setMoreInfoHour] = useState(null);


    //access api data for hourly weather
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


    //Open or close more info for specified hour.
    const handleMoreInfo = (i) => {
        setMoreInfo(!moreInfo);
        setMoreInfoHour(i + (hour - 4)); // i is value representing each hour box, first box is 1 etc
                                        // however its based on the 4 hours shown on screen so 10 hours ahead will be i=2
    };                                  // this formula alllows for more info to be shown about the correct hour as it takes the latest hour shown, 
                                        ///sets it to the earliest hour shown and then adds i to get the correct hour.



    return (
        <div className="hourly_container">
            {/* If weatherdata is not empty and moreinfo has not been selected for an hour render the next 4 hours  */}  
            {weatherData && !moreInfo ? (
                <>
                    {weatherData.list.slice(hour - 4, hour).map((item, i) => (
                        <button className={`hourly-button`} onClick={() => handleMoreInfo(i)} key={i}>
                            <p className="hourly-time">{calcTime(item.dt, weatherData.city.timezone)}</p>

                            <div className="flex-item1">
                                <img
                                    className="hourly_icon"
                                    id="weather-icon"
                                    src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                    alt="weather icon"
                                />
                                <p>{Math.round(item.main.temp)}°C</p>
                            </div>

                            <div className="flex-item">
                                <img className="wind_icon" alt="wind" src={windLight}/>
                                {/* Give wind speed red colour if above 20m/s */}
                                {item.wind.speed>6.5 ? (<p style={{color: 'red'}}>{Math.round(item.wind.speed)}m/s</p>) : (<p>{Math.round(item.wind.speed)}m/s</p>)}
                            </div>

                            <div className="flex-item">
                                <img className="visibility_icon" alt="visibility" src={visibilityLight}/>
                                {/* Give visibillity red colour if below 5km */}
                                {item.visibility <5000 ? (<p style={{color:'red'}}>{Math.round(item.visibility / 1000)}km</p>) : (<p>{Math.round(item.visibility / 1000)}km</p>)}
                            </div> 

                        </button>
                    ))}
                </>
            ) : (
                <></>
            )}
            {/* If an hour has been selected to show more info */}
            {weatherData && moreInfo && (
                <div className="hourlyOtherContent">
                    {/* Same info as above just formatted differently */}
                    <button className={`hourly-button expanded`} onClick={() => handleMoreInfo(moreInfoHour)}>
                        <div className="hourly_col">
                            <p>Temperature: {Math.round(weatherData.list[moreInfoHour].main.temp)}°C</p>
                            {weatherData.list[moreInfoHour].visibility < 5000 ? (
                            <p style={{color:'red'}}>Visibility: {weatherData.list[moreInfoHour].visibility / 1000} km</p>) 
                            : (<p>Visibility: {weatherData.list[moreInfoHour].visibility / 1000} km</p>)}

                            {weatherData.list[moreInfoHour].wind.speed>7 ? (<p style={{color:'red'}}>Wind Speed: {Math.round(weatherData.list[moreInfoHour].wind.speed)} m/s</p>) 
                             :(<p>Wind Speed: {Math.round(weatherData.list[moreInfoHour].wind.speed)} m/s</p>)}

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
                        {/*extra info */}
                        <div className="hourly_col">
                            <p>Cloud Coverage: {weatherData.list[moreInfoHour].clouds.all}%</p>
                            <p>Air Pressure: {weatherData.list[moreInfoHour].main.pressure} hpa</p>
                            <p>Wind Direction: {calcWindDir(weatherData.list[moreInfoHour].wind.deg)}</p>
                        </div>

                    </button>
                </div>
                )}
        </div>
    );
};

export default Hourly;
