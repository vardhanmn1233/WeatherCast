const apiKey = "6fea6c0c0376408a87f115028250803"; // Your API key

function getWeather() {
    const city = document.getElementById("cityInput").value || "India";
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=1&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById("cityName").innerText = data.location.name;
            document.getElementById("temperature").innerText = `${data.current.temp_c}°C`;
            document.getElementById("condition").innerText = data.current.condition.text;
            document.getElementById("airQuality").innerText = data.current.air_quality.pm2_5.toFixed(2);
            document.getElementById("windSpeed").innerText = `${data.current.wind_kph} km/h`;
            document.getElementById("humidity").innerText = `${data.current.humidity}%`;
            document.getElementById("pressure").innerText = `${data.current.pressure_mb} hPa`;
            document.getElementById("sunrise").innerText = data.forecast.forecastday[0].astro.sunrise;
            document.getElementById("sunset").innerText = data.forecast.forecastday[0].astro.sunset;
            document.getElementById("moonPhase").innerText = data.forecast.forecastday[0].astro.moon_phase;

            const now = new Date();
            const hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;
            document.getElementById("searchTime").innerText = `Searched at: ${formattedTime}`;
            updateChart(data.forecast.forecastday[0].hour);
        })
        .catch(error => console.error("Error fetching weather data:", error));
}

function updateChart(hourlyData) {
    const hours = hourlyData.slice(0, 12).map(h => h.time.split(" ")[1]);
    const temperatures = hourlyData.slice(0, 12).map(h => h.temp_c);

    const ctx = document.getElementById('weatherChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: hours,
            datasets: [{
                label: "Temperature (°C)",
                data: temperatures,
                borderColor: "orange",
                backgroundColor: "rgba(255, 165, 0, 0.2)",
                fill: true,
                pointStyle: 'circle',
                pointRadius: 5,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: { grid: { display: false } },
                y: { grid: { color: "rgba(255,255,255,0.2)" } }
            },
            plugins: {
                legend: { display: false }
            }
        }
    });
}

// Fetch default weather on load
getWeather();
