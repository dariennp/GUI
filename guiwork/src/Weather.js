import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./style.css";
import box_1 from "./image3.png";



const Desktop = () => {
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




              
                <div className="container1">

                  <div className="city_name">{weatherData.name}</div>
                  <div className="wind_speed">Wind Speed</div>
                  <div className="air_pressure">Air Pressure</div>
                  <div className="weather_desc">{weatherData.weather ?<div className="data_text">{weatherData.weather[0].description}</div> : null}</div>

                  <div className="container1_grid1">
                    <div className="wind_speed_data">{weatherData.wind ? <div className="data_text2">{Math.round(weatherData.wind.speed)} kmh</div> : null} </div>
                    <div className="wind_dir">{weatherData.wind ? <div className="data_text2">{calcWindDir(weatherData.wind.deg)}</div> : null}</div>
                  </div>
                  <div className="air_pressure_data">{weatherData.main ? <div className="data_text">{weatherData.main.pressure} hPa</div> : null}</div>
                  <div className="weather_temp">{weatherData.main ? <div className="data_text">{Math.round(weatherData.main.temp)} °C</div> : null}</div>
                  <div className="visibility">Visibility</div>
                  <div className="sunrise_sunset">Sunrise / Sunset</div>
                  <div className="visibility_data">{(weatherData.visibility/1000)}km</div>
                  <div className="sunrise_sunset_data">07:00&nbsp;&nbsp;/&nbsp;&nbsp;17:30</div>
                  <div className="time">{weatherData.dt ? <div className="data_text">{calcTime(weatherData.dt,weatherData.timezone)}</div> : null}</div>
                  <img className="line_1" alt="Line" src="https://c.animaapp.com/DV5Y4p2i/img/line-1.svg" />
                  <img className="line_2" alt="Line" src="https://c.animaapp.com/DV5Y4p2i/img/line-1.svg" />
                </div>
                
                <div className="container2">
                  <div className="container2_grid1">
                    <div className="grid1_icon1">icon</div>
                    <div className="grid1_icon2">icon</div>
                    <div className="grid1_icon3">icon</div>
                    <div className="grid1_data1">11:00</div>
                    <div className="grid1_data2">30 km/h</div>
                    <div className="grid1_data3">9.0 kmh</div>
                  </div>
                  <div className="container2_grid2">
                    <div className="grid2_icon1">icon</div>
                    <div className="grid2_icon2">icon</div>
                    <div className="grid2_icon3">icon</div>
                    <div className="grid2_data1">12:00</div>
                    <div className="grid2_data2">30 km/h</div>
                    <div className="grid2_data3">9.0 kmh</div>
                  </div>
                  <div className="container2_grid3">
                    <div className="grid3_icon1">icon</div>
                    <div className="grid3_icon2">icon</div>
                    <div className="grid3_icon3">icon</div>
                    <div className="grid3_data1">13:00</div>
                    <div className="grid3_data2">30 km/h</div>
                    <div className="grid3_data3">9.0 kmh</div>
                  </div>
                  <div className="container2_grid4">
                    <div className="grid4_icon1">icon</div>
                    <div className="grid4_icon2">icon</div>
                    <div className="grid4_icon3">icon</div>
                    <div className="grid4_data1">14:00</div>
                    <div className="grid4_data2">30 km/h</div>
                    <div className="grid4_data3">9.0 kmh</div>
                  </div>
                  <div className="container2_grid5">
                    <div className="grid5_icon1">icon</div>
                    <div className="grid5_icon2">icon</div>
                    <div className="grid5_icon3">icon</div>
                    <div className="grid5_data1">15:00</div>
                    <div className="grid5_data2">30 km/h</div>
                    <div className="grid5_data3">9.0 kmh</div>
                  </div>
                    
                </div> 
                    
          
       
                  


                  


         

                <div className="container3">
                  <div className="searchBox">
                    
                    <input
                    value={city}
                    onChange={handleInputChange}
                    onKeyPress={handleSubmit}
                    placeholder='Enter Location'
                    type="text"/>
            
                  </div>
                  <button className="help">Help</button>
                  <button className="map">Map</button>




        
                </div>

      

          
      

            
              </div>
    </div>
  );
};

export default Desktop;