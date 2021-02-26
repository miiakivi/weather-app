const starSearchContainer = document.querySelector('.search-cont');
const searchInput = document.querySelector('.search-cont__input');

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

function switchScreenDisplay() {
    let currentDayWeatherCont = document.querySelector('.weath--cont');
    let weatherSearchInput = document.querySelector('.search-loc');
    starSearchContainer.classList.add('fade-out');
    setTimeout(() => {
        starSearchContainer.style.display= "none";
        currentDayWeatherCont.classList.add('fade-in');
        weatherSearchInput.classList.add('fade-in');
    }, 200);
    setTimeout(() => {
        currentDayWeatherCont.style.display = 'block';
        weatherSearchInput.style.display = 'block';
    }, 200);
    // Reset search input value
    searchInput.value = '';
}

export {
    returnCelsius,
    returnFahrenheit,
    getSunsetOrSunrise,
    switchScreenDisplay,
}