import {
    createCurrentWeatherInfo,
    createFiveDayForecast,
    createErrorMessage,
} from "./dom";

import {
    getSunsetOrSunrise,
    returnCelsius,
    returnFahrenheit,
    getLocalTime
} from "./helpers";

import {
    fetchCurrentWeatherData,
    fetchForecastWeatherData
} from "./async";

let currentWeather = {};
let forecastData = [];

let temperature = 'cel';


function processWeatherData(location) {

    // Reset variables if user has searched multiple times different locations
    currentWeather = {};
    forecastData = [];

    fetchCurrentWeatherData(location)
        .then((response) => {
            createCurrentWeatherObj(response);
            fetchForecastWeatherData(currentWeather)
                .then((response) => {
                    createWeatherForecastObj(response);
                    createCurrentWeatherInfo(currentWeather, temperature);
                    createFiveDayForecast(forecastData, temperature);
                })
        })
        .catch((err) => {
            document.querySelector('.weath--cont').innerHTML = createErrorMessage();
            console.log(err);
        })
}

function createWeatherForecastObj(data) {
    for (let i = 1; i < 6; i++) {
        let day = data.daily[i];
        let weatherData = {
            id: day.weather[0].id,
            date: day.dt,
            timeZoneOffSet: data.timezone_offset, // Shift in seconds from UTC
            temperature: {
                cel: undefined,
                fah: undefined
            },
            tempMin: {
                cel: returnCelsius(day.temp.min),
                fah: returnFahrenheit(day.temp.min),
            },
            tempMax: {
                cel: returnCelsius(day.temp.max),
                fah: returnFahrenheit(day.temp.max),
            }
        }
        forecastData.push(weatherData);
    }
}

function createCurrentWeatherObj(weatherData) {
    let mainSection = weatherData.main;

    currentWeather = {
        description: weatherData.weather[0].description,
        id: weatherData.weather[0].id,
        date: weatherData.dt,
        localTime: getLocalTime(weatherData.timezone),
        timezoneOffset: weatherData.timezone,
        coord: {
            long: weatherData.coord.lon,
            lat: weatherData.coord.lat
        },
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
        sunrise: getSunsetOrSunrise(weatherData.sys.sunrise, weatherData.timezone), // Shift in seconds from UTC
        sunset: getSunsetOrSunrise(weatherData.sys.sunset, weatherData.timezone), // Shift in seconds from UTC
        location: {
            country: weatherData.sys.country,
            city: weatherData.name
        }
    };
}

// USer can change temperature degree unit by clicking it
document.querySelector('.weath--cont').addEventListener('click', (e) => {
    if (e.target.id === 'change-unit') {
        if (temperature === 'cel') {
            temperature = 'fah';
        } else {
            temperature = 'cel'
        }
        createCurrentWeatherInfo(currentWeather, temperature);
        createFiveDayForecast(forecastData, temperature);
    }
})


export {processWeatherData}