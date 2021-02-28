import spinner from "../images/spinner.svg";
import {
    createCurrentWeatherInfo,
    createFiveDayForecast
} from "./dom";
import {getSunsetOrSunrise, returnCelsius, returnFahrenheit} from "./helpers";



let currentWeather = {};
let forecastData = [];

let temperature = 'cel';
let apiId = '68f520abb598fb1452dd8381782372e7';

async function fetchCurrentWeatherData(location) {

    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiId}`);
    if (response.status !== 200) {
        throw new Error('cannot fetch the data');
    }
    return await response.json();
}

async function fetchForecastWeatherData(obj) {
    console.log('latitude is ' + obj.coord.lat + ' longitude is ' + obj.coord.long)
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${obj.coord.lat}&lon=${obj.coord.long}&exclude=alerts,minutely,hourly&appid=${apiId}`);
    if (response.status !== 200) {
        throw new Error('cannot fetch the data');
    }
    return await response.json();
}


function processWeatherData(location) {
    document.querySelector('.weath--cont').innerHTML = `<div class="spinner-cont"><img class="spinner" src="${spinner}" alt=""></div> `
    // Reset variables if user has searched multiple times different locations
    currentWeather = {};
    forecastData = [];
    fetchCurrentWeatherData(location)
        .then((response) => {
            createCurrentWeatherObj(response);
            createCurrentWeatherInfo(currentWeather, temperature);
            fetchForecastWeatherData(currentWeather)
                .then((response) => {
                    createWeatherForecastObj(response);
                    createFiveDayForecast(forecastData, temperature);
                })

        })
        .catch((err) => {
            console.log(err)
        })
}

document.querySelector('.weath--cont').addEventListener('click', (e) => {
    console.log(e.target)
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

function createWeatherForecastObj(data) {
    for (let i = 0; i < 5; i++) {
        let day = data.daily[i];
        let weatherData = {
            id: day.weather[0].id,
            date: day.dt,
            timeZoneOffSet: data.timezone_offset, // Shift in seconds from UTC
            temperature:  {
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
    console.log('timezone is ' + (currentWeather.timezone / 60) / 60);
    console.log('location is ' + currentWeather.location.city + ' ' + currentWeather.location.country + '. Weather there is ' + currentWeather.description + ' ' + currentWeather.temperature.cel + ' cel.');

}

export {processWeatherData}