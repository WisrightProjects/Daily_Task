const weatherForm = document.querySelector(".weatherform");
const cityInput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const forecastContainer = document.querySelector(".forecast-container");
const locationBtn = document.getElementById("locationBtn");
const themeToggle = document.getElementById("themeToggle");

const apiKey = "a9e23e934b5b0b32ce5c3d5a5cae3708";

weatherForm.addEventListener("submit", async e => {

    e.preventDefault();

    const city = cityInput.value.trim();

    if(city){
        loadWeather(city);
    }
});

locationBtn.addEventListener("click", () => {

    navigator.geolocation.getCurrentPosition(
        async position => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            loadWeatherByCoords(lat, lon);

        },
        () => {
            displayError("Location permission denied");
        }
    );
});

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeToggle.textContent = "☀️ Light Mode";
    }
    else{
        themeToggle.textContent = "🌙 Dark Mode";
    }
});

async function loadWeather(city){

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        if(data.cod !== 200){
            throw new Error(data.message);
        }

        displayWeather(data);

        loadForecast(city);

    }
    catch(error){
        displayError(error.message);
    }
}

async function loadWeatherByCoords(lat, lon){

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        displayWeather(data);

        loadForecast(data.name);

    }
    catch(error){
        displayError(error.message);
    }
}

function displayWeather(data){

    card.style.display = "flex";

    card.innerHTML = `
        <h2 class="cityDisplay">${data.name}</h2>
        <p class="tempDisplay">${Math.round(data.main.temp)}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind: ${data.wind.speed} m/s</p>
        <p>${data.weather[0].description}</p>
        <p class="weatherEmoj">${getEmoji(data.weather[0].id)}</p>
    `;
}

async function loadForecast(city){

    forecastContainer.innerHTML = "";

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    const daily = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    daily.slice(0,5).forEach(day => {

        const date = new Date(day.dt_txt);

        const card = document.createElement("div");

        card.classList.add("forecast-card");

        card.innerHTML = `
            <h3>${date.toLocaleDateString()}</h3>
            <p>${Math.round(day.main.temp)}°C</p>
            <p>${getEmoji(day.weather[0].id)}</p>
        `;

        forecastContainer.appendChild(card);
    });
}

function getEmoji(id){

    if(id >= 200 && id < 300) return "⛈️";
    if(id >= 300 && id < 500) return "🌦️";
    if(id >= 500 && id < 600) return "🌧️";
    if(id >= 600 && id < 700) return "❄️";
    if(id >= 700 && id < 800) return "🌫️";
    if(id === 800) return "☀️";
    return "☁️";
}

function displayError(message){

    card.style.display = "flex";

    card.innerHTML = `
        <p class="errorDisplay">
            ${message}
        </p>
    `;
}
