

const starSearchContainer = document.querySelector('.search-cont');
const searchInput = document.querySelector('.search-cont__input');


function returnCelsius(value) {
    return (value - 273.15).toFixed(1);
}

function returnFahrenheit(value) {
    return (((value - 273.15) * 1.8) + 32).toFixed(1);
}

function getSunsetOrSunrise(time, timezoneOffset) {
    let sunTime = new Date((time + timezoneOffset) * 1000);
    console.log('sun action before formating ' + sunTime);
    return sunTime.getUTCHours() + ":" + sunTime.getUTCMinutes();
}


function switchScreenDisplay() {
    let currentDayWeatherCont = document.querySelector('.weath--cont');
    let weatherSearchInput = document.querySelector('.search-loc');
    starSearchContainer.classList.add('fade-out');
    setTimeout(() => {
        starSearchContainer.style.display = "none";
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

function getCurrentDate(time) {
    let date = new Date(time * 1000);
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let weekday = days[date.getDay()];
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return [weekday, ` ${day}.${month}.${year}`];
}


export {
    returnCelsius,
    returnFahrenheit,
    getSunsetOrSunrise,
    switchScreenDisplay,
    getCurrentDate,
}