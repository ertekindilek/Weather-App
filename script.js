"use strict";

const apiKey = "Your-api-key-here";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const displayWeather = document.querySelector(".weather");
const errorMessage = document.querySelector(".error");

async function checkWeather(city) {
  const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
  if (response.status === 404) {
    errorMessage.style.display = "block";
    displayWeather.style.display = "none";
  } else {
    var data = await response.json();

    const { temp, humidity } = data.main;
    const { speed: windSpeed } = data.wind;
    const { main: weatherCondition } = data.weather[0];
    const loweredCondition =
      weatherCondition.charAt(0).toLowerCase() + weatherCondition.slice(1);

    const weather = () => {
      if (loweredCondition !== "haze") {
        weatherIcon.src = `images/${loweredCondition}.png`;
      } else {
        weatherIcon.src = "images/mist.png";
      }
    };
    document.querySelector(".city").innerHTML = data.name.includes("Province")
      ? data.name.split(" ")[0]
      : data.name;
    document.querySelector(".temp").innerHTML = `${Math.round(temp)}°C`;
    document.querySelector(".humidity").innerHTML = `${humidity}%`;
    document.querySelector(".wind").innerHTML = `${windSpeed} km/h`;
    switch (weatherCondition) {
      case "Clouds":
        weather();
        break;
      case "Clear":
        weather();
        break;
      case "Drizzle":
        weather();
        break;
      case "Haze":
      case "Mist":
        weather();
        break;
      case "Rain":
        weather();
        break;
      case "Snow":
        weather();
        break;
    }
  }
}
searchBtn.addEventListener("click", () => {
  checkWeather(searchInput.value);
  displayWeather.style.display = "block";
  errorMessage.style.display = "none";
});
