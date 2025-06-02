async function getWeatherForecast() {
    const today = new Date().toISOString().split('T')[0];
    try {
        const response = await fetch(`https://api.data.gov.sg/v1/environment/4-day-weather-forecast?date=${today}`);
        const data = await response.json();
        return data.items[0].forecasts;
    } catch (error) {
        console.error('Error fetching weather:', error);
        return null;
    }
}

function displayWeather(forecasts) {
    const weatherContainer = document.getElementById('weather-forecast');
    weatherContainer.innerHTML = forecasts.map(day => `
        <div class="weather-card">
            <h3>${new Date(day.date).toLocaleDateString('en-SG', { weekday: 'short', month: 'short', day: 'numeric' })}</h3>
            <div class="weather-icon ${getWeatherIcon(day.forecast)}"></div>
            <p>${day.forecast}</p>
            <p>${day.temperature.low}°C - ${day.temperature.high}°C</p>
        </div>
    `).join('');
}

function getWeatherIcon(forecast) {
    // Map forecast descriptions to CSS classes
    const iconMap = {
        'Partly Cloudy': 'partly-cloudy',
        'Thundery Showers': 'thunderstorm',
        'Light Rain': 'light-rain',
        'Moderate Rain': 'moderate-rain',
        'Cloudy': 'cloudy',
        'Fair': 'fair'
    };
    return iconMap[forecast] || 'default-weather';
}

// Initialize weather forecast
document.addEventListener('DOMContentLoaded', async () => {
    const forecasts = await getWeatherForecast();
    if (forecasts) {
        displayWeather(forecasts);
    }
});