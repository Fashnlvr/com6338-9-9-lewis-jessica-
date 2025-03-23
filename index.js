document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#weather-app form");
    const input = document.querySelector("#weather-search");
    const weatherSection = document.querySelector("#weather");
    const API_KEY = "719259f4823a776e0ca2e359ef05503d";
  
    const fetchWeather = async (query) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${API_KEY}`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        return response.status === 200 ? data : null;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
      }
    };
  
    const displayWeather = ({ name, sys, weather, main, coord, dt }) => {
      const timeString = new Date(dt * 1000).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });
      
      weatherSection.innerHTML = `
        <h2>${name}, ${sys.country}</h2>
        <a href="https://www.google.com/maps/search/?api=1&query=${coord.lat},${coord.lon}" target="_blank">Click to view map</a>
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
        <p style="text-transform: capitalize;">${weather[0].description}</p>
        <p>Current: ${main.temp}° F</p>
        <p>Feels like: ${main.feels_like}° F</p>
        <p>Last updated: ${timeString}</p>
      `;
    };
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const query = input.value.trim();
      if (!query) return;
  
      weatherSection.innerHTML = "";
      input.value = "";
      
      const weatherData = await fetchWeather(query);
      if (weatherData) {
        displayWeather(weatherData);
      } else {
        weatherSection.innerHTML = "<h2>Location not found</h2>";
      }
    });
  });
  