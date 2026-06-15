const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector("cityInput");
const card = document.querySelector(".card");
const apikey = "a9e23e934b5b0b32ce5c3d5a5cae3708";

weatherForm.addEventListener("submit", async event => {

    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayweatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please Enter the City")
    }

});

async function getWeatherDay(city){
    const apiurl = `https://home.openweathermap.org/api_keys`;
    const response = await fetch(apiurl);
    console.log(response);
}

function displayweatherInfo(data){

}

function getweatherEmoji(weatherId){

}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(errorDisplay)
}