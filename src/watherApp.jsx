import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaSnowflake,
  FaBolt,
} from "react-icons/fa";

const WeatherApp = () => {
  const [city, setCity] = useState("Tbilisi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "ceca4e6fb85347b8ad0120837241501"; // Replace this with your actual API key
  const API_URL = "https://api.weatherapi.com/v1/current.json";

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        params: {
          key: API_KEY,
          q: cityName,
        },
      });
      setWeatherData(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(city);
  }, [city]); // Fetch weather data when city changes

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleButtonClick = () => {
    fetchWeatherData(city);
  };

  const WeatherIcon = ({ conditionCode }) => {
    switch (conditionCode) {
      case 1000:
        return <FaSun />;
      case 1100:
        return <FaCloud />;
      case 3000:
      case 3100:
      case 3200:
        return <FaCloudRain />;
      case 6000:
        return <FaSnowflake />;
      case 7000:
        return <FaBolt />;
      default:
        return null;
    }
  };

  return (
    <section>
      <div className="weather-app">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleInputChange}
        />
        <button onClick={handleButtonClick} disabled={loading}>
          Get Weather
        </button>
        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">Error: {error}</p>}
        {weatherData && (
          <div>
            <h2>
              {weatherData.location.name}
              <div className="icons">
                <WeatherIcon
                  conditionCode={weatherData.current.condition.code}
                />
              </div>
            </h2>
            <p>Temperature: {weatherData.current.temp_c}°C</p>
            <p>Condition: {weatherData.current.condition.text}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default WeatherApp;
