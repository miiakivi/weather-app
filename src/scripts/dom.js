import {
    getCurrentDate,
    getDateForForecast
    } from './helpers.js';
import {getWeatherIcon} from './weather-icons';

import sunset from '../images/sunset.png';
import sunrise from '../images/sunrise.png';

const weatherInfoCont = document.querySelector('.weath--cont');
const forecastContainer = document.querySelector('.forecast-cont');

function firstToUpper(obj) {
    return obj.description.charAt(0).toUpperCase() + obj.description.slice(1);
}

function getTemperature(obj, temp) {
    let temperature;
    let min;
    let max;
    let icon;

    if(temp === 'cel') {
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

function createCurrentWeatherInfo(obj, temp) {

    let currentDate = getCurrentDate(obj.date);
    let description = firstToUpper(obj);
    let weatherIcon = getWeatherIcon(obj);
    let degreeUnit = getTemperature(obj, temp);


    weatherInfoCont.innerHTML = `<div class="container weath--cont__date">
                    <p class="weath--cont__date" >${currentDate[0]}${currentDate[1]}</p>
                </div>
                <div class="container weath--cont__container">
                    <div class="weath--cont__info">
                        <div class="weath--cont__location">
                            <button id="change-unit" class="change-temp-degree-btn">${degreeUnit.icon}&#176;</button>
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
                            <div class="text-cont text-cont__img">
                                <img src="${sunrise}" alt="">
                                <span>${obj.sunrise}</span>
                            </div>
                            <div class="text-cont text-cont__img">
                                <img src="${sunset}" alt="">
                                <span>${obj.sunset}</span>
                            </div>
                        </div>
                    </div>
                </div>`;
}


function createFiveDayForecast(arr, temp) {
    forecastContainer.innerHTML = `<p>Forecast for the next five days</p>`;
    let container = document.createElement('div');
    container.classList.add('forecast-cont__container');
    forecastContainer.appendChild(container);



    for (let i = 0; i < arr.length; i++) {
        let weatherIcon = getWeatherIcon(arr[i]);
        let currentDate = getCurrentDate(arr[i].date);
        let degreeUnit = getTemperature(arr[i], temp);

        container.innerHTML +=
            `<div class="forecast__box">
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

}

export {
    createCurrentWeatherInfo,
    createFiveDayForecast
}