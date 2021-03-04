import lookup from "country-code-lookup";

let apiKey = '68f520abb598fb1452dd8381782372e7';

function getCountryCode(location) {
    let country = '';    
    let countryName = location.split(' ');
    
    // checks if country name has two parts
    if(countryName.length > 1) {
        for (let i = 0; i < countryName.length; i++) {
            // Change each word to start with uppercase
            countryName[i] = countryName[i][0].toUpperCase() + countryName[i].substr(1);
        }
        country = countryName.join(' ');
    } else {
        country = location.charAt(0).toUpperCase() + location.slice(1);
    }

    let countryCode = lookup.byCountry(country).internet;
    console.log('country is ' + location + ' and countryCode is ' + countryCode)
    return countryCode;
}

// Fetches current weather from a location
async function fetchCurrentWeatherData(location) {
    let locationArr = location.split(', ');
    let url = '';

    if ( locationArr.length === 2 ) {
        let countryCode = getCountryCode(locationArr[1])
        url = `http://api.openweathermap.org/data/2.5/weather?q=${locationArr[0]},${countryCode}&appid=${apiKey}`;
    }
    if ( locationArr.length === 1 ) {
        url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    }

    const response = await fetch(url);

    if ( response.status !== 200 ) {
        console.log('country is ' + locationArr[1]);
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