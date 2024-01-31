import "./style.css";
// import Icon from './icon.png';

const containerSelect = document.querySelector(".container");

const input = document.createElement("input");
const label = document.createElement("label");
label.textContent = "search location: ";
const inputBtn = document.createElement("button");
inputBtn.textContent = "show";

const locationDisplay = document.createElement("h1");
const weatherDisplay = document.createElement("h2");
const temperatureDisplay = document.createElement("h2");

async function weatherLocation(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=ceca4e6fb85347b8ad0120837241501&q=${location}`,
      { mode: "cors" },
    );
    const weatherData = await response.json();
    locationDisplay.textContent = `location: ${location}`;
    weatherDisplay.textContent = `weather: ${weatherData.current.condition.text}`;
    temperatureDisplay.textContent = `temperature: ${weatherData.current.temp_c}c`;
  } catch (error) {
    console.log(error);
  }
}
inputBtn.addEventListener("click", () => {
  weatherLocation(input.value);
});

weatherLocation("tbilisi");

containerSelect.appendChild(label);
containerSelect.appendChild(input);
containerSelect.appendChild(inputBtn);

containerSelect.appendChild(locationDisplay);
containerSelect.appendChild(weatherDisplay);
containerSelect.appendChild(temperatureDisplay);
