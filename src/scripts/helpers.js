import spinner from "../images/spinner.svg";
import lookup from "country-code-lookup";

const starSearchContainer = document.querySelector('.search-cont');
const searchInput = document.querySelector('.search-cont__input');

const currentDayWeatherCont = document.querySelector('.weath--cont');
const weatherSearchInput = document.querySelector('.search-loc');
const spinnerCont = document.querySelector('.start__spinner-cont');

// Changes kelvin to celsius
function returnCelsius(value) {
    return (value - 273.15).toFixed(1);
}

// Changes kelvin to Fahrenheit
function returnFahrenheit(value) {
    return (((value - 273.15) * 1.8) + 32).toFixed(1);
}

function getTemperature(obj, temp) {
    let degreeObj = {};

    if ( temp === 'cel' ) {
        degreeObj.temperature = obj.temperature.cel;
        degreeObj.min = obj.tempMin.cel;
        degreeObj.max = obj.tempMax.cel;
        degreeObj.icon = 'C'
    } else {
        degreeObj.temperature = obj.temperature.fah;
        degreeObj.min = obj.tempMin.fah;
        degreeObj.max = obj.tempMax.fah;
        degreeObj. icon = 'F';
    }
    return degreeObj;
}


function getSunsetOrSunrise(time, timezoneOffset) {
    let sunTime = new Date((time + timezoneOffset) * 1000);
    let minutes = sunTime.getUTCMinutes();
    if ( minutes < 10 ) {
        minutes = '0' + minutes;
    }
    return sunTime.getUTCHours() + ":" + minutes;
}

// checks local time and local sunset and sunrise time and compares them.
function checkIfSunHasRisenLocally(obj) {
    let now = (Date.now() / 1000) + obj.timezoneOffset;
    let time = new Date(now * 1000);
    let localTime = time.getUTCHours() + ":" + time.getUTCMinutes()

    if(localTime < obj.sunrise && localTime > obj.sunset) {
        console.log('sunrise is ' + obj.sunrise + ' and localtime is ' + localTime + ' and sunset is ' + obj.sunset);
        return false
    } else {
        return true;
    }
}

// returns current date
function getCurrentDate(time) {
    let date = new Date(time * 1000);
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let weekday = days[date.getUTCDay()];
    let day = date.getUTCDate();
    let month = date.getUTCMonth() + 1;
    let year = date.getUTCFullYear();
    return [weekday, ` ${day}.${month}.${year}`];
}

// returns local time
function getLocalTime(timezoneOffset) {
    let now = (Date.now() / 1000) + timezoneOffset;
    let time = new Date(now * 1000);
    let hours = time.getUTCHours();
    let minutes = time.getUTCMinutes();
    if ( minutes < 10 ) minutes = '0' + minutes;
    return hours + ":" + minutes;
}


function createLoadingSpinner() {
    return `<div class="spinner-container"><img class="spinner" src="${spinner}" alt=""></div> `;
}

// When user enters location in the starting screen, add little animation to different containers so changing displays is smooth
function switchScreenDisplay() {
    starSearchContainer.classList.add('fade-out');
    setTimeout(() => {
        starSearchContainer.style.display = "none";
        currentDayWeatherCont.classList.add('fade-in');
        weatherSearchInput.classList.add('fade-in');
    }, 200);
    setTimeout(() => {
        spinnerCont.style.display = 'block';
        currentDayWeatherCont.style.display = 'block';
        weatherSearchInput.style.display = 'block';
    }, 200);
    // Reset search input value
    searchInput.value = '';
}


function firstToUpper(obj) {
    return obj.description.charAt(0).toUpperCase() + obj.description.slice(1);
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
    checkIfSunHasRisenLocally,
}