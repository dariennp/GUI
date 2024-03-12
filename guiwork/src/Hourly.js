import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Hourly = ({city,hour}) => {

const [weatherData, setWeatherData] = useState(null);
    const fetchData = async () => {
    try {
    const response = await axios.get(
    `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${city}&units=metric&appid=9bcd9188d56277f0f8720256e18549b3`
    );
    setWeatherData(response.data);
    console.log(response.data); //You can see all the weather data in console log
    } catch (error) {
    console.error(error);
    }
    };

    useEffect(() => {
    fetchData();
    }, [city,hour]);

    return (
        <div>
          {weatherData ? (
            (() => {
              const weatherItems = [];
              for (let i = hour-4; i < hour; i++) {
                const item = weatherData.list[i];
                weatherItems.push(
                  <button key={i}>
                    <p>Time: {item.dt_txt}</p>
                    <p>Temperature: {item.main.temp}°C</p>
                    <p>Description: {item.weather[0].description}</p>
                    <p>Pressure : {item.main.pressure}</p>
                    <p>Wind: {item.wind.speed}m/s</p>
                  </button>
                );
              }
              return weatherItems;
            })()
          ) : (<p></p> )}
        </div>
      );
      
};
export default Hourly;