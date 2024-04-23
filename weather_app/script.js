document.addEventListener('DOMContentLoaded', () => {
    const getWeatherBtn = document.getElementById('getWeatherBtn');
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');
    const forecastInfo = document.getElementById('forecastInfo');

    getWeatherBtn.addEventListener('click', () => {
        const city = cityInput.value;
        if (city) {
            fetchWeather(city);
        } else {
            alert('Please enter a city name');
        }
    });

    function fetchWeather(city) {
        const API_KEY = '7d0814494f1b0ada3dabfe307fcd9e88';
        const currentWeatherURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const forecastURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

        Promise.all([fetch(currentWeatherURL), fetch(forecastURL)])
            .then(([currentRes, forecastRes]) => Promise.all([currentRes.json(), forecastRes.json()]))
            .then(([currentData, forecastData]) => {
                if (currentData.cod === 200 && forecastData.cod === '200') {
                    displayWeather(currentData);
                    displayForecast(forecastData);
                } else {
                    alert('City not found');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('An error occurred while fetching data');
            });
    }

    function displayWeather(data) {       //current day weather
        const city = data.name;
        // const country = data.sys.country;
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        const icon = data.weather[0].icon;

        let tempClass = '';
        if (temp > 25) {
            tempClass = 'temperature-hot';
        } else {
            tempClass = 'temperature-cold';
        }

        const weatherStr = `
            <img src="http://openweathermap.org/img/w/${icon}.png" class="icon">
            <p class="${tempClass}">${temp}°C</p>
            <p>City: ${city}</p>
            <p>${desc}</p>
        `;

        weatherInfo.innerHTML = weatherStr;
    }

    function displayForecast(data) {
        const forecasts = data.list.filter((item, index) => index % 8 === 0); // Get forecast for every 24 hours (8 forecasts per day)

        let forecastStr = '<h2>5-Day Forecast</h2>';
        forecastStr += '<div class="forecast-container">';

        forecasts.forEach(forecast => {
            const date = new Date(forecast.dt * 1000).toLocaleDateString();
            const temp = Math.round(forecast.main.temp);
            const desc = forecast.weather[0].description;
            const icon = forecast.weather[0].icon;

            let tempClass = '';
            if (temp > 25) {
                tempClass = 'temperature-hot';
            } else {
                tempClass = 'temperature-cold';
            }

            forecastStr += `
                <div class="forecast-item">
                    <img src="http://openweathermap.org/img/w/${icon}.png" class="icon">
                    <p class="${tempClass}">${temp}°C</p>
                    <p>Date: ${date}</p>
                    <p>${desc}</p>
                </div>
            `;
        });

        forecastStr += '</div>';
        forecastInfo.innerHTML = forecastStr;
    }
});

