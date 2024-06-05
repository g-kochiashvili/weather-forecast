

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { byPrefixAndName } from '@awesome.me/kit-KIT_CODE/icons'
// import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import searchIcon from './assets/search.png'
import windIcon from './assets/wind.png'
import HumidityIcon from './assets/humidity.png'
import celsiusIcon from './assets/celsius.png'
import error from './assets/error.png'
function App() {
  const [count, setCount] = useState(0)
  let [weather, setWether] = useState({}) 
  let [query, setquery] = useState("")
  let [notFound, setNotFound] = useState(false)
  let getWeather = () =>{
    setWether({})
    console.log(query);
    axios.get("https://api.openweathermap.org/data/2.5/weather",
    {
      params:{
        appid: "22c8410370c3a469a63dccdcedc338f3",
        q:query,
        units: "metric",
      }
    })
    .then(({data})=>{      
      if (data.cod===200){
        setWether(data)
        setNotFound(false)
      }
  })
    .catch(({response})=>{
      if(response.data.cod==="404"){ 
        setNotFound(true)
      }})
  }
  return (
    <>
    <div className="body-div">
      <i className="fa-solid fa-magnifying-glass"></i>
      <input className='search' type="text" value={query} onChange={({target})=>setquery(target.value)}/>
      <button className='enter_button' onClick={getWeather}>
        <img src={searchIcon} alt='search'></img> 
      </button>

      {notFound && <div className="not_found">
            <h1 className='error404'>404</h1>
            <div className='error_div'>
              <img className='error' src={error} alt="error" />
              <div className='error_text'>
                <h1>owww... don't cry.</h1>
                <p>It's just error. City not found... but don't worry, try again, but the correct city name!</p>
              </div>
              
            </div>  
        </div>}

      <div className='weather_div'>
        <h1 className='city'>{weather.name}</h1>
        {weather?.weather &&<img className='weather_icon' src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt="" />}
        <h2 className='wether'>{weather?.weather && weather?.weather[0].description}</h2>
        <div className="other-info">
          {weather?.weather && <p className='degree'>{weather.main.temp } <img src={celsiusIcon} alt="celsius" /></p>}
          <div className='wind_humidity'>
            {weather?.weather && <p className='wind'> <img src={windIcon} alt="wind" />{ weather.wind.speed + " km/h"} </p>}
            {weather?.weather && <p className='humidity'> <img src={HumidityIcon} alt="humidity" />{ weather.main.humidity + " %"} </p>}
          </div> 
        </div>
        
      
      </div>
    </div>
      
    </>
  )
}

export default App
