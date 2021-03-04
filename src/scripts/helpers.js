import spinner from "../images/spinner.svg";
import lookup from "country-code-lookup";

const starSearchContainer = document.querySelector('.search-cont');
const searchInput = document.querySelector('.search-cont__input');

function returnCelsius(value) {
    return (value - 273.15).toFixed(1);
}

function returnFahrenheit(value) {
    return (((value - 273.15) * 1.8) + 32).toFixed(1);
}

function getSunsetOrSunrise(time, timezoneOffset) {
    let sunTime = new Date((time + timezoneOffset) * 1000);
    let minutes = sunTime.getUTCMinutes();
    if ( minutes < 10 ) {
        minutes = '0' + minutes;
    }
    return sunTime.getUTCHours() + ":" + minutes;
}

function createLoadingSpinner() {
    return `<div class="spinner-container"><img class="spinner" src="${spinner}" alt=""></div> `;
}

function switchScreenDisplay() {
    let currentDayWeatherCont = document.querySelector('.weath--cont');
    let weatherSearchInput = document.querySelector('.search-loc');
    starSearchContainer.classList.add('fade-out');
    setTimeout(() => {
        starSearchContainer.style.display = "none";
        currentDayWeatherCont.classList.add('fade-in');
        weatherSearchInput.classList.add('fade-in');
    }, 200);
    setTimeout(() => {

        // currentDayWeatherCont.innerHTML = `<div class="spinner-cont"><img class="spinner" src="${spinner}" alt=""></div> `
        document.querySelector('.start__spinner-cont').style.display = 'block';
        currentDayWeatherCont.style.display = 'block';
        weatherSearchInput.style.display = 'block';
    }, 200);
    // Reset search input value
    searchInput.value = '';
}


function getCurrentDate(time) {
    let date = new Date(time * 1000);
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let weekday = days[date.getUTCDay()];
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();
    return [weekday, ` ${day}.${month}.${year}`];
}

function getLocalTime(timezoneOffset) {
    let now = (Date.now() / 1000) + timezoneOffset;
    let time = new Date(now * 1000);
    let hours = time.getUTCHours();
    let minutes = time.getUTCMinutes();
    if ( minutes < 10 ) minutes = '0' + minutes;
    return hours + ":" + minutes;
}


function firstToUpper(obj) {
    return obj.description.charAt(0).toUpperCase() + obj.description.slice(1);
}

function getTemperature(obj, temp) {
    let temperature;
    let min;
    let max;
    let icon;

    if ( temp === 'cel' ) {
        temperature = obj.temperature.cel;
        min = obj.tempMin.cel;
        max = obj.tempMax.cel;
        icon = 'C'
    } else {
        temperature = obj.temperature.fah;
        min = obj.tempMin.fah;
        max = obj.tempMax.fah;
        icon = 'F';
    }
    return {temperature, min, max, icon}
}

// return country code that can be used in api, if user wants to search location using city's name and country's name
function getCountryCode(location) {
    let country = '';
    let countryName = location.split(' ');
    // checks if country name has two parts
    if ( countryName.length > 1 ) {
        for (let i = 0; i < countryName.length; i++) {
            // Change each word to start with uppercase
            countryName[i] = countryName[i][0].toUpperCase() + countryName[i].substr(1);
        }
        country = countryName.join(' ');
    } else {
        country = location.charAt(0).toUpperCase() + location.slice(1);
    }
    return lookup.byCountry(country).internet;
}

export {
    returnCelsius,
    returnFahrenheit,
    getSunsetOrSunrise,
    switchScreenDisplay,
    getCurrentDate,
    getLocalTime,
    firstToUpper,
    getTemperature,
    createLoadingSpinner,
    getCountryCode,
}