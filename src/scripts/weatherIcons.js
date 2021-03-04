
// Icons Copyright © 2021 Bas Milius. from https://github.com/basmilius/weather-icons
import clearDay from '../weather-icons/clear-day.svg';
import clearNight from '../weather-icons/clear-night.svg';
import drizzle from '../weather-icons/drizzle.svg';
import rain from '../weather-icons/rain.svg';
import thunderstorm from '../weather-icons/thunderstorms.svg';
import snow from '../weather-icons/snow.svg';
import mist from '../weather-icons/mist.svg';
import wind from '../weather-icons/wind.svg';
import partlyCloudyDay from '../weather-icons/partly-cloudy-day.svg';
import partlyCloudyNight from '../weather-icons/partly-cloudy-night.svg';
import cloudy from '../weather-icons/cloudy.svg';
import overcast from '../weather-icons/overcast.svg';

import { checkIfSunHasRisenLocally } from './helpers'


// check weather description id and choose right icon for that weather.
function getWeatherIcon(obj) {
    let sunHasRisen = checkIfSunHasRisenLocally(obj);
    let icon;

    if ( obj.id === 800 ) {
        if ( sunHasRisen ) {
            icon = clearDay;
        } else {
            icon = clearNight
        }
    } else if ( obj.id === 801 ) {
        if ( sunHasRisen ) {
            icon = partlyCloudyDay;
        } else {
            icon = partlyCloudyNight;
        }
    } else if ( obj.id === 802 ) {
        icon = cloudy;
    } else if ( obj.id === 803 || obj.id === 804 ) {
        icon = overcast;
    } else if ( obj.id === 781 ) {
        icon = wind;
    } else if ( obj.id >= 701 && obj.id <= 771 ) {
        icon = mist;
    } else if ( obj.id >= 600 && obj.id <= 622 ) {
        icon = snow;
    } else if ( obj.id === 500 || obj.id === 501 || obj.id === 502 ) {
        icon = drizzle;
    } else if ( obj.id >= 503 && obj.id <= 531 ) {
        icon = rain;
    } else if ( obj.id >= 200 && obj.id <= 232 ) {
        icon = thunderstorm;
    } else {
        icon = cloudy;
    }
    return `<img src="${icon}" alt="">`
}

export {getWeatherIcon};

