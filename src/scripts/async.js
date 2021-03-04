import {getCountryCode} from './helpers';

let apiKey = '68f520abb598fb1452dd8381782372e7';

// Returns right url for api, depending if user has searched only with city's name or city's and country's name
function getLocationURL(location) {
    let locationArr = location.split(', ');
    let url = '';

    if ( locationArr.length === 2 ) {
        // Return right country
        let countryCode = getCountryCode(locationArr[1])
        url = `https://api.openweathermap.org/data/2.5/weather?q=${locationArr[0]},${countryCode}&appid=${apiKey}`;
    }
    if ( locationArr.length === 1 ) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    }
    return url
}

// Fetches current weather from a location
async function fetchCurrentWeatherData(location) {
    let url = getLocationURL(location);
    const response = await fetch(url);

    if ( response.status !== 200 ) {
        throw new Error('cannot fetch the data');
    }
    return await response.json();
}

// Fetches weather forecast for current location
async function fetchForecastWeatherData(obj) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${obj.coord.lat}&lon=${obj.coord.long}&exclude=alerts,minutely,hourly&appid=${apiKey}`);
    if ( response.status !== 200 ) {
        throw new Error('cannot fetch the data');
    }
    return await response.json();
}

export {
    fetchForecastWeatherData,
    fetchCurrentWeatherData
}