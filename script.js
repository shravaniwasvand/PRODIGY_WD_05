

const apiKey = "52963b0d59351bef45f31f4ad6ba5c7a"; 

function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
        if (!response.ok) {
            throw new Error("City not found or API issue");
        }
        return response.json();
    })
    .then(data => displayWeather(data))
    .catch(error => {
        alert(error.message);
    });
}

function getLocationWeather() {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeather(data));
    });
}

function displayWeather(data) {

    document.getElementById("temp").innerText =
        Math.round(data.main.temp) + "°";

    document.getElementById("condition").innerText =
        data.weather[0].description;

    document.getElementById("humidity").innerText =
        data.main.humidity + "%";

    document.getElementById("wind").innerText =
        data.wind.speed + " m/s";

    const iconCode = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    document.getElementById("icon").src = iconUrl;
}


