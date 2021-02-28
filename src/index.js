import './main.css';
import regeneratorRuntime from "regenerator-runtime";

import {
    switchScreenDisplay,
} from './scripts/helpers';

import {
    processWeatherData
} from './scripts/api'



const searchInput = document.querySelector('.search-cont__input');
const locationInputBtn = document.querySelector('.search-cont__btn');

const searchInputFields =  document.querySelectorAll('.search-input');



function processWeatherDataAfterEnter(e, input) {
    if(input.value !== '' && e.key === 'Enter') {
        // If input field is in the start screen, switch screen display and process data
        if(input.id === 'start-input-weather-loc') {
            processWeatherData(input.value);
            switchScreenDisplay();
        } else {
            processWeatherData(input.value);
            input.value = '';
            document.querySelector('.forecast-cont').innerHTML = ' ';
        }
    }
}



searchInputFields.forEach((input) => {
    input.addEventListener('keydown', (e) => {
        processWeatherDataAfterEnter(e, input);
    })
})


locationInputBtn.addEventListener('click', () => {
    processWeatherData(searchInput.value);
    switchScreenDisplay();
})
