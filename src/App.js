import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    })
  }, []);

  const apiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  let getWeather = async (lat, long) => {
    try {
      let res = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: lat,
          lon: long,
          appid: apiKey,
          lang: 'pt',
          units: 'metric'
        }
      });
      setWeather(res.data);
      console.log(res.data);
    } catch (error) {
      console.error('Erro ao buscar dados meteorológicos:', error);
    }
  }

  if (!location) {
    return (
      <Fragment>
        Você precisa habilitar a localização no navegador.
      </Fragment>
    );
  } else if (!weather) {
    return (
      <Fragment>
        Carregando dados meteorológicos...
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <h3>Clima nas suas Coordenadas ({weather.weather[0].description})</h3>
        <hr />
        <ul>
          <li>Temperatura atual: {weather.main.temp}°</li>
          <li>Temperatura máxima: {weather.main.temp_max}°</li>
          <li>Temperatura mínima: {weather.main.temp_min}°</li>
          <li>Pressão: {weather.main.pressure} hpa</li>
          <li>Umidade: {weather.main.humidity}%</li>
        </ul>
      </Fragment>
    );
  }
}

export default App;
