import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

export default function WeatherApp() {
  let [city, setCity] = useState("");
  let [weatherData, setWeatherData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  let [error, setError] = useState(null);
  let API_KEY = "2t140860597f63afo033b6cda0bf4143";
  let API_URL = `https://api.shecodes.io/weather/v1/current`;
  const handleSearch = async (e) => {
    e.preventDefault();

    const response = await axios.get(API_URL, {
      params: {
        query: city,
        key: API_KEY,
      },
    });

    setWeatherData(response.data);
  };
  return (
    <div className="weather-app">
      <h1>Weather App</h1>

      <form className="weather-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city..."
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-data">
          <h2>{weatherData.city}</h2>
          <p>🌡️ Temperature: {Math.round(weatherData.temperature.current)}°C</p>
          <p>🌤️ Description: {weatherData.condition.description}</p>
          <p>💧 Humidity: {weatherData.temperature.humidity}%</p>
          <p>🌬️ Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
