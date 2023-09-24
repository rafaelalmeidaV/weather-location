import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  let getWeather = async (latitude, longitude) => {
    try {
      let res = await axios.get('http://api.weatherapi.com/v1/current.json', {
        params: {
          key: apiKey,
          q: `${latitude},${longitude}`,
          lang: 'pt',
          units: 'metric'
        }
      });
      console.log(res);
      setWeather(res.data);
    } catch (error) {
      console.error('Erro ao buscar dados meteorológicos:', error);
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      getWeather(latitude, longitude);
      setLocation(true);
    })
  }, []);

  if (!location) {
    return (
      <>
        Você precisa habilitar a localização no navegador.
      </>
    );
  } else if (!weather) {
    return (
      <>
        Carregando dados meteorológicos...
      </>
    );
  } else {
    return (
      <>
        <body>
          <div className="container">

            <div className="hContainer">
              <p className="h1Text">{weather.location.name}</p>
              <p className="h3Text"> {weather.location.region}, {weather.location.country} </p>
              <div className="containerIcon">
                <figure>
                  <img src={weather.current.condition.icon} alt={weather.current.condition.text} style={{ width: '90px' }} />
                  <figcaption className="h3Text">{weather.current.condition.text}</figcaption>
                </figure>
                
              </div>
            </div>
            <div>
              <p className="temp_c">{weather.current.temp_c}° </p>
              <p>
                {new Date(weather.location.localtime).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
              {/* <li>Pressão: {weather.current.pressure_mb} hPa</li> */}
              {/* <li>Umidade: {weather.current.humidity}%</li>
                <li>Cloud: {weather.current.cloud}%</li>
                <li>Chance de Chover: {weather.current.precip_mm}%</li> */}

            </div>

          </div>
        </body>
      </>

    );
  }
}

export default App;
