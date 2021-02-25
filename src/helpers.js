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

export {
    returnCelsius,
    returnFahrenheit,
    getSunsetOrSunrise
}