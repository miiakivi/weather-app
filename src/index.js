import './main.css';
import regeneratorRuntime from "regenerator-runtime";

import {
    returnCelsius,
    returnFahrenheit,
    getSunsetOrSunrise,
    switchScreenDisplay,
} from './scripts/helpers';

import {
    createCurrentWeatherInfo,
} from './scripts/dom';

const starSearchContainer = document.querySelector('.search-cont');
const searchInput = document.querySelector('.search-cont__input');
const searchBtn = document.querySelector('.search-cont__btn');

let currentLocation = '';
let currentWeather = {};

async function fetchWeatherData(location) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=68f520abb598fb1452dd8381782372e7`);
    if (response.status !== 200) {
        throw new Error('cannot fetch the data');
    }
    return await response.json();
}

function processWeatherData(location) {
    fetchWeatherData(location)
        .then((response) => {
            getCurrentWeatherObj(response);
            createCurrentWeatherInfo(currentWeather);
        })
        .catch((err) => {
            console.log(err)
        })
}


function getCurrentWeatherObj(weatherData) {
    let mainSection = weatherData.main;
    currentWeather = {
        description: weatherData.weather[0].description,
        descriptionId: weatherData.weather[0].id,
        humidity: mainSection.humidity,
        temperature: {
            cel: returnCelsius(mainSection.temp),
            fah: returnFahrenheit(mainSection.temp),
        },
        feelsLike: {
            cel: returnCelsius(mainSection.feels_like),
            fah: returnFahrenheit(mainSection.feels_like),
        },
        tempMin: {
            cel: returnCelsius(mainSection.temp_min),
            fah: returnFahrenheit(mainSection.temp_min),
        },
        tempMax: {
            cel: returnCelsius(mainSection.temp_max),
            fah: returnFahrenheit(mainSection.temp_max),
        },
        sunrise: getSunsetOrSunrise(weatherData.sys.sunrise),
        sunset: getSunsetOrSunrise(weatherData.sys.sunset),
        location: {
            country: weatherData.sys.country,
            city: weatherData.name
        }
    };
    console.log('location is ' +  currentWeather.location.city + ' ' + currentWeather.location.country + '. Weather there is ' + currentWeather.description + ' ' + currentWeather.temperature.cel + ' cel.');
}



searchBtn.addEventListener('click', () => {
    processWeatherData(searchInput.value);

    switchScreenDisplay();
})

