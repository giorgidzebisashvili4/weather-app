import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles.css";
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaBolt,
} from "react-icons/fa";

const WeatherApp = () => {
  const [city, setCity] = useState("Tbilisi"); // Set "Tbilisi" as the default city
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = "ceca4e6fb85347b8ad0120837241501"; // Replace this with your actual API key
  const CURRENT_WEATHER_API_URL = "https://api.weatherapi.com/v1/current.json";
  const FORECAST_API_URL = "https://api.weatherapi.com/v1/forecast.json";

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        axios.get(CURRENT_WEATHER_API_URL, {
          params: {
            key: API_KEY,
            q: city,
          },
        }),
        axios.get(FORECAST_API_URL, {
          params: {
            key: API_KEY,
            q: city,
            days: 3, // Fetch forecast for 3 days
          },
        }),
      ]);

      setWeatherData(currentResponse.data);
      setForecastData(forecastResponse.data.forecast.forecastday);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(); // Fetch weather data when component mounts
  }, []); // Only fetch once when the component mounts

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

  const renderForecast = () => {
    if (!forecastData.length) {
      return null;
    }

    return forecastData.map((day) => (
      <div key={day.date} className="forecast-item">
        <div className="weekday-date">
          <div className="day">
            {new Date(day.date).toLocaleDateString("en-US", {
              weekday: "long",
            })}
          </div>
          <div className="date">
            {new Date(day.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="weather-icon">
          <WeatherIcon conditionCode={day.day.condition.code} />
        </div>
        <div className="condition">{day.day.condition.text}</div>
        <div className="temperature">
          {day.day.maxtemp_c}°C / {day.day.mintemp_c}°C
        </div>
      </div>
    ));
  };

  return (
    <section>
      <div className="weather-app">
        <div className="header">
          <a href="https://weatherapp-gdz.netlify.app/">
            <h1>Weather App</h1>
          </a>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeatherData} disabled={loading}>
            Get Weather
          </button>
          {loading && <p className="loading">Loading...</p>}
          {error && <p className="error">Error: {error}</p>}
        </div>
        <div className="forecast-info">
          <div className="current-weather">
            {weatherData && (
              <>
                <div className="location">
                  {weatherData.location.name}, {weatherData.location.country}
                </div>
                <div className="today-temp-weather">
                  <div className="temperature">
                    {weatherData.current.temp_c}°C
                  </div>
                  <div className="condition-icon">
                    <div className="condition">
                      {weatherData.current.condition.text}
                    </div>
                    <div className="weather-icon">
                      <WeatherIcon
                        conditionCode={weatherData.current.condition.code}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="3-day-forecast">
            <h2>3-Day Forecast</h2>
            <div className="forecast">{renderForecast()}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeatherApp;
