document.addEventListener("DOMContentLoaded", () => {
  const queryURLs = {
    Mumbai:
      "https://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=e734f02834407c7708ddda37b1d497db",
    Pune: "https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=e734f02834407c7708ddda37b1d497db",
    Indore:
      "https://api.openweathermap.org/data/2.5/weather?q=Indore&appid=e734f02834407c7708ddda37b1d497db",
    Delhi:
      "https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=e734f02834407c7708ddda37b1d497db",
  };

  const weatherContainer = document.querySelector(".weather-data");
  const citySelect = document.querySelector(".city-select");

  citySelect.addEventListener("change", () => {
    const selectedCity = document.querySelector(
      'input[name="city"]:checked'
    ).value;
    fetchWeatherData(queryURLs[selectedCity], selectedCity);
  });

  async function fetchWeatherData(queryURL, cityName) {
    try {
      const response = await fetch(queryURL);
      const data = await response.json();

      const weatherData = {
        city: data.name,
        temperature: (data.main.temp - 273.15).toFixed(2),
        description: data.weather[0].description,
      };

      displayWeatherData(weatherData);
    } catch (error) {
      console.error("Error fetching data:", error);
      displayError(cityName);
    }
  }

  function displayWeatherData(weatherData) {
    const weatherHTML = `
        <h2>${weatherData.city}</h2>
        <p>Temperature: ${weatherData.temperature}°C</p>
        <p>Description: ${weatherData.description}</p>
      `;
    weatherContainer.innerHTML = weatherHTML;
  }

  function displayError(cityName) {
    const errorHTML = `
        <h2>${cityName}</h2>
        <p>Error fetching weather data.</p>
      `;
    weatherContainer.innerHTML = errorHTML;
  }
});
