const apiKey = '49cc8c821cd2aff9af04c9f98c36eb74'; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById('city-input');
const searchButton = document.getElementById('search-button');
const cityElement = document.getElementById('city');
const countryElement = document.getElementById('country');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weather-icon');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind-speed');
const forecastContainer = document.getElementById('forecast-container');

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        cityElement.textContent = data.name;
        countryElement.textContent = data.sys.country;
        temperatureElement.textContent = `${data.main.temp}°C`;
        descriptionElement.textContent = data.weather[0].description;
        weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        humidityElement.textContent = `${data.main.humidity}%`;
        windSpeedElement.textContent = `${data.wind.speed} m/s`;

        // Fetch 5-day forecast data
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
        const forecastResponse = await fetch(forecastUrl);
        const forecastData = await forecastResponse.json();

        // Display 5-day forecast
        forecastContainer.innerHTML = '';
        forecastData.list.forEach((forecast, index) => {
            if (index % 8 === 0) {
                const forecastItem = document.createElement('div');
                forecastItem.classList.add('forecast-item');
                forecastItem.innerHTML = `
                    <p>${new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</p>
                    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="Weather Icon">
                    <p>${forecast.main.temp}°C</p>
                `;
                forecastContainer.appendChild(forecastItem);
            }
        });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Display error message to the user
    }
}

// Initial fetch based on user's location (optional)
// navigator.geolocation.getCurrentPosition(
//     (position) => {
//         const { latitude, longitude } = position.coords;
//         const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
//         // Fetch weather data using the API URL
//     },
//     (error) => {
//         console.error('Error getting location:', error);
//     }
// );

// Event listener for search button
searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    getWeatherData(city);
});