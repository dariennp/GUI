import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css";

const Weather = () => {
const [city, setCity] = useState('');
const [hour,setHour] = useState(4);
const [submittedCity,setSubmittedCity]=useState(null);
const [mainMoreInfo,setMainMoreInfo] = useState(false)
const [weatherData, setWeatherData] = useState({});

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

  const handleSubmit = (event) => {
    if(event.key === 'Enter'){
      event.preventDefault();
      fetchData();
      setSubmittedCity(city);

    }
      
  };

  const handleNextHours = (e) => {
      setHour(hour+4);
  }

  const handleBackHours = (e) => {
      setHour(hour-4);
  }

  return (
    <div className="weatherApp">

          <div className="desktop">

            <div className="overlap-group-wrapper">

              <div className="searchBox">
                   
                      <input
                      value={city}
                      onChange={handleInputChange}
                      onKeyPress={handleSubmit}
                      placeholder='Enter Location'
                      type="text"/>
              
                </div>
              <div className="overlap-group">

          
                <div className="frame" />
                <img
                  className="blue-sky-with-cloud"
                  alt="Blue sky with cloud"
                  src="https://c.animaapp.com/DV5Y4p2i/img/blue-sky-with-cloud-closeup.png" />
                <div className="rectangle" />
                <img className="img" alt="Rectangle" src="https://c.animaapp.com/DV5Y4p2i/img/rectangle-5.svg" />
                <div className="div" />
                <div className="wind_speed_units">km/h</div>
                <div className="vis_units">km</div>
                <div className="cc_units">%</div>
                <div className="humidity_units">%</div>
                <div className="wind_speed_data">{weatherData.wind ? <p>{Math.round(weatherData.wind.speed)}</p> : null}</div>
                <div className="visibility_data">{(weatherData.visibility/1000)}</div>
                <div className="cloud_coverage_data">{weatherData.clouds ? <p>{weatherData.clouds.all}</p> : null}</div>
                <div className="weather_desc">{weatherData.weather ? <p>{weatherData.weather[0].description}</p> : null}</div>
                <div className="wind_speed">Wind Speed</div>

                <div className="visibility">Visibility</div>
                <div className="cloud_coverage">Cloud Coverage</div>
                <div className="weather_temp">{weatherData.main ? <p>{Math.round(weatherData.main.temp)}°C</p> : null}</div>
                <div className="city_name">{weatherData.name}</div>
                <img className="near_me" alt="Near me" src="https://c.animaapp.com/DV5Y4p2i/img/near-me@2x.png" />
                <img className="visibility_icon" alt="Visibility" src="https://c.animaapp.com/DV5Y4p2i/img/visibility-1.svg" />
                <div className="sunrise_sunset">Sunrise / Sunset</div>
                <div className="humidity">Humidity</div>
                <img className="air_icon" alt="Air" src="https://c.animaapp.com/DV5Y4p2i/img/air@2x.png" />
                <div className="hpa">&nbsp;&nbsp;&nbsp;&nbsp;hPa</div>
                <div className="air_pressure_data">{weatherData.main ? <p>{weatherData.main.pressure}</p> : null}</div>
                <div className="air_pressure">Air Pressure</div>
                <div className="sunrise_sunset_data">07:00&nbsp;&nbsp;/&nbsp;&nbsp;17:30</div>
                <div className="humidity_data">{weatherData.main ? <p>{weatherData.main.humidity}</p> : null}</div>
                <div className="rectangle-2" />
                <div className="rectangle-4" />
                <div className="rectangle-5" />
                <div className="help">Help</div>
                <div className="map">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Map</div>
                <img className="line" alt="Line" src="https://c.animaapp.com/DV5Y4p2i/img/line-1.svg" />
                <img className="line-2" alt="Line" src="https://c.animaapp.com/DV5Y4p2i/img/line-1.svg" />
                <img className="line-3" alt="Line" src="https://c.animaapp.com/DV5Y4p2i/img/line-2.svg" />
                <img className="line-4" alt="Line" src="https://c.animaapp.com/DV5Y4p2i/img/line-2.svg" />
                <div className="warning">Pay Attention While Piloting</div>
                <div className="wind_dir">{weatherData.wind ? <p>{calcWindDir(weatherData.wind.deg)}</p> : null}</div>
                <div className="time">{weatherData.dt ? <p>{calcTime(weatherData.dt,weatherData.timezone)}</p> : null}</div>
              </div>
            </div>
          </div>
    </div>
  );
};

export default Weather;