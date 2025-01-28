const apiURL = `https://api.openweathermap.org/data/2.5/weather?units=metric`;
const appKey = `&appid=3192f318494ccbbf60af7e2750ca5738`;

const searchField = document.querySelector(".searchArea input");
const searchBtn = document.querySelector(".searchArea button");
const weatherIcon = document.querySelector(".Weather-Icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiURL + appKey + city);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        setWeatherIcon(data.weather[0].main);
        changeBackgroundImage(data.weather[0].main);
        document.querySelector(".WeatherDisplay").style.display = "block";
    } catch (error) {
        console.log(error);
        alert('Error fetching data, please try again.');
    }
}

function setWeatherIcon(weatherCondition) {
    const iconMapping = {
        "Clouds": "img/clouds.png",
        "Mist": "img/Mist.png",
        "Rain": "img/rain.png",
        "Drizzle": "img/drizzle.png",
        "Clear": "img/clear.png",
        "Snow": "img/snow.png",
        "Haze": "img/haze.png"
    };

    weatherIcon.src = iconMapping[weatherCondition] || "img/default.png";
    weatherIcon.alt = `${weatherCondition} weather`;
}

function changeBackgroundImage(weatherCondition) {
    const backgroundMapping = {
        "Clear": "url('img/sunny.gif')",
        "Clouds": "url('img/cloudy.gif')",
        "Rain": "url('img/rainy.gif')",
        "Drizzle": "url('img/drizzle.gif')",
        "Snow": "url('img/snowy.gif')",
        "Mist": "url('img/misty.gif')",
        "Haze": "url('img/haze.gif')"
    };

    document.body.style.backgroundImage = backgroundMapping[weatherCondition] || "url('img/default.gif')";
}

function fetchWeatherData() {
    const inputName = document.querySelector(".city-input").value;
    const city = `&q=${inputName}`;
    checkWeather(city);
}

searchBtn.addEventListener("click", fetchWeatherData);

window.addEventListener('load', function () {
    const city = `&q=Delhi`;
    checkWeather(city);
});
