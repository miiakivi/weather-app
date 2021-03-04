import './main.css';
import regeneratorRuntime from "regenerator-runtime";

import {
    switchScreenDisplay,
    createLoadingSpinner,
} from './scripts/helpers';

import {
    processWeatherData
} from './scripts/processData'

import spinner from "./images/spinner.svg";

const searchInput = document.querySelector('.search-cont__input');
const locationInputBtn = document.querySelector('.search-cont__btn');

const searchInputFields = document.querySelectorAll('.search-input');
const searchIcon = document.querySelectorAll('.input-icon');

const mainWeatherInfoCont = document.querySelector('.weath--cont');


function processWeatherDataAfterEnter(e, input) {
    if (input.value !== '' && e.key === 'Enter') {
        // If input field is in the start screen, switch screen display and process data
        if (input.id === 'start-input-weather-loc') {
            processWeatherData(input.value);
            switchScreenDisplay();
            // input field in the main weather info page
        } else if (input.id === 'search-location-weather') {
            processWeatherData(input.value);
            mainWeatherInfoCont.innerHTML = createLoadingSpinner();
            input.value = '';
            document.querySelector('.forecast-cont').innerHTML = ' ';
        } else if(input.id === 'error__search-location') {
            console.log('enter detected and now processing data')
            processWeatherData(input.value);
            mainWeatherInfoCont.innerHTML = createLoadingSpinner();
            input.value = '';
        }
    }
}

// When user clicks little icon on the input fields get weather data from input value
function processDataAfterIconClick(e) {
    let targetValue;
    // Start screen input
    if (e.target.id === 'start-icon') {
        targetValue = document.querySelector('#start-input-weather-loc').value;
        if (targetValue !== '') {
            processWeatherData(targetValue);
            switchScreenDisplay();
        }
        // main weather info page input field
    } else if (e.target.id === 'second-icon') {
        targetValue = document.querySelector('#search-location-weather').value;
        if (targetValue !== '') {
            processWeatherData(targetValue);
            mainWeatherInfoCont.innerHTML = createLoadingSpinner();
            document.querySelector('#search-location-weather').value = '';
            document.querySelector('.forecast-cont').innerHTML = ' ';
        }
    }
}

function processDataAfterError(e, input) {
    // When user clicks icon process weather data from input field
    if (e.target.id === 'error-icon') {
        if (input.value !== '') {
            mainWeatherInfoCont.innerHTML = createLoadingSpinner();
            processWeatherData(input.value);
            input.value = '';
        }
    }
    // Listens enter when error input field is clicked
    if (e.target.id === 'error__search-location') {
        input.addEventListener('keydown', (ev) => {
            processWeatherDataAfterEnter(ev, input);
        })
    }
}


function eventListeners() {

    // When user tries search weather after error msg, process that data.
    mainWeatherInfoCont.addEventListener('click', (e) => {
        let targetInput = document.querySelector('.error__input');
        processDataAfterError(e, targetInput);
    })

    searchIcon.forEach((icon) => {
        icon.addEventListener('click', (e) => {
            processDataAfterIconClick(e);
        })
    })

    searchInputFields.forEach((input) => {
        input.addEventListener('keydown', (e) => {
            processWeatherDataAfterEnter(e, input);
        })
    })

    locationInputBtn.addEventListener('click', () => {
        processWeatherData(searchInput.value);
        switchScreenDisplay();
    })
}

eventListeners();


