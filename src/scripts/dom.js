import {
    getCurrentDate,
    firstToUpper,
    getTemperature
} from './helpers.js';

import {getWeatherIcon} from './weatherIcons';

import drizzle from '../weather-icons/drizzle.svg';

// Icons made by "https://www.flaticon.com/authors/pixel-perfect"
import sunset from '../images/sunset.png';
import sunrise from '../images/sunrise.png';

const weatherInfoCont = document.querySelector('.weath--cont');
const forecastContainer = document.querySelector('.forecast-cont');

function createCurrentWeatherInfo(obj, temp) {

    let currentDate = getCurrentDate(obj.date);
    let description = firstToUpper(obj);
    let weatherIcon = getWeatherIcon(obj);
    let degreeUnit = getTemperature(obj, temp);

    weatherInfoCont.innerHTML = createCurrentWeatherHtml(obj, currentDate, description, weatherIcon, degreeUnit);
}

function createCurrentWeatherHtml(obj, currentDate, description, weatherIcon, degreeUnit) {
    return `<div class="container weath--cont__date">
                    <p class="subheading weath--cont__date" >${currentDate[0]}${currentDate[1]}</p>
                </div>
                <div class="container weath--cont__container">
                    <div class="weath--cont__info">
                        <div class="weath--cont__location">
                            <button id="change-unit" class="change-temp-degree-btn">${degreeUnit.icon}&#176;</button>
                             <div class="local-time-container">
                                <span class="material-icons local-time">schedule</span>
                                <p class="location__local-time">${obj.localTime}</p>
                             </div>
                            <p class="location__city">${obj.location.city}, ${obj.location.country}</p>
                            <p class="location__temp">${degreeUnit.temperature}<span>&#176;</span></p>
                        </div>
                        <div class="weath--cont__img">
                           ${weatherIcon}
                            <p>${description}</p>
                        </div>
                        <div class="weath--cont__text">
                            <div class="text-cont text-cont__first">
                                <p>Feels like:</p>
                                <span>${obj.feelsLike.cel}&#176;</span>
                            </div>
                            <div class="text-cont">
                                <p>Humidity</p>
                                <span>${obj.humidity}%</span>
                            </div>
                            <div class="text-cont text-cont__last">
                                <p>min/max</p>
                                <span>${degreeUnit.min}&#176; / ${degreeUnit.max}&#176;</span>
                            </div>
                            <div id="sunrise" class="text-cont text-cont__img">
                                <img src="${sunrise}" alt="">
                                <span>${obj.sunrise}</span>
                            </div>
                            <div id="sunset" class="text-cont text-cont__img">
                                <img src="${sunset}" alt="">
                                <span>${obj.sunset}</span>
                            </div>
                        </div>
                    </div>
                </div>`;
}


function createFiveDayForecast(arr, temp) {
    forecastContainer.innerHTML = `<p class="subheading">Forecast for the next five days</p>`;

    let container = document.createElement('div');
    container.classList.add('forecast-cont__container');
    forecastContainer.appendChild(container);

    for (let i = 0; i < arr.length; i++) {
        let weatherIcon = getWeatherIcon(arr[i]);
        let currentDate = getCurrentDate(arr[i].date);
        let degreeUnit = getTemperature(arr[i], temp);

        container.innerHTML += createForecastHtml(i, weatherIcon, currentDate, degreeUnit);
    }
}

function createForecastHtml(i, weatherIcon, currentDate, degreeUnit) {
    return `<div id="box-${i}" class="forecast__box">
                <div class="forecast__date">
                    <p class="forecast__weekday">${currentDate[0]}</p>
                    <p class="forecast__day">${currentDate[1]}</p>
                </div>
                <div class="forecast__img">
                    ${weatherIcon}
                </div>
                <div class="forecast__temp">
                    <p>${degreeUnit.min}&#176; / ${degreeUnit.max}&#176;</p>
                </div>
            </div>`;
}


function createErrorMessage() {
    return `
    <div class="error-cont">
        <div class="error__container">
            <img class="error__img" src="${drizzle}" alt="">
            <p>Something went wrong, please try again...</p>
            <hr class="error__divider">
            <label class="error__label" for="error__search-location">
                <span id="error-icon" class="material-icons error input-icon">search</span>
                <input class="search-input error__input" type="text" name="weather-location"
                       id="error__search-location" placeholder="Search..."
                       title="Type your city (Helsinki) or your city and country separated with comma (Helsinki, Finland)"
                               value="">
            </label>
        </div>
       </div>`
}


export {
    createCurrentWeatherInfo,
    createFiveDayForecast,
    createErrorMessage,
}