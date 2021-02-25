import './style.css';
import regeneratorRuntime from "regenerator-runtime";

let currentWeather;

async function fetchWeatherData() {
    const response = await fetch('http://api.openweathermap.org/data/2.5/weather?q=Helsinki&appid=68f520abb598fb1452dd8381782372e7');
    if (response.status !== 200) {
        throw new Error('cannot fetch the data');
    }
    return await response.json();
}

function processWeatherData() {
    fetchWeatherData()
        .then((response) => {
            getCurrentWeatherObj(response);

        })
        .catch((err) => {
            console.log(err)
        })
}


function getCurrentWeatherObj(weatherData) {
    let mainSection = weatherData.main;
    currentWeather = {
        description: weatherData.weather[0].main,
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
}

function returnCelsius(value) {
    return (value - 273.15).toFixed(1);
}

function returnFahrenheit(value) {
    return (((value - 273.15) * 1.8) + 32).toFixed(1);
}

function getSunsetOrSunrise(time) {
    let sunTime = new Date(time * 1000);
    return sunTime.getHours() + ":" + sunTime.getMinutes()
}

processWeatherData();