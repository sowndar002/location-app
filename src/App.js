import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Currentweather from './components/current-weather/Currentweather'
import { WEATHER_API_KEY, WEATHER_API_URL } from './api'
import { useEffect } from 'react'
import Forecast from './components/forecast/Forecast'
import useGeoLocation from './Hook/useGeoLocation'

const App = () => {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [foreCast, setForeCast] = useState(null);
  
  

  const location = useGeoLocation();
  console.log(location.coordinates.lat);
  console.log(location.coordinates.lon);
  

  const handleSearchChange = (e) => {
    const [lat, lon] = e.value.split("  ");
    console.log(lat);
    console.log(lon);
  
    const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
    const foreCastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);
  
    Promise.all([currentWeatherFetch, foreCastFetch])
      .then(async (responses) => {
        const [weatherResponse, foreCastResponse] = await Promise.all(responses.map((res) => res.json()));
  
        setCurrentWeather({ city: e.label, ...weatherResponse });
        setForeCast({ city: e.label, ...foreCastResponse });
        
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("Current Weather:", currentWeather);
    console.log("Forecast:", foreCast);
  }, [currentWeather, foreCast]);
  
  


  return (
    <div>
        <Navbar handleSearchChange = {handleSearchChange}/>
        {currentWeather && <Currentweather
           cdata = {currentWeather} 
           fdata={foreCast} 
           location
        />}
    </div>
  )

}

export default App