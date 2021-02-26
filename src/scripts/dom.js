import {getCurrentDate} from './helpers.js';

import sunset from '../images/sunset.png';
import sunrise from '../images/sunrise.png';
import clearSky from '../weather-icons/clear-day.svg';
const weatherInfoCont = document.querySelector('.weath--cont');

function firstToUpper(obj) {
    return obj.description.charAt(0).toUpperCase() + obj.description.slice(1);
}

function createCurrentWeatherInfo(obj) {

    let currentDate = getCurrentDate();
    let description = firstToUpper(obj);

    weatherInfoCont.innerHTML =`<div class="container weath--cont__date">
                    <p class="weath--cont__date" >${currentDate}</p>
                </div>
                <div class="container weath--cont__container">
                    <div class="weath--cont__info">
                        <div class="weath--cont__location">
                            <button class="weath--cont-btn">C&#176;</button>
                            <p class="location__city">${obj.location.city}, ${obj.location.country}</p>
                            <p class="location__temp">${obj.temperature.cel}<span>&#176;</span></p>
                        </div>
                        <div class="weath--cont__img">
                            <img src="${clearSky}" alt="">
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
                                <span>-${obj.tempMin.cel}&#176; / ${obj.tempMax.cel}&#176;</span>
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

export {
    createCurrentWeatherInfo,
}