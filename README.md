# Weather App

Using REST API from [open weather map](https://openweathermap.org/) users can search current weather info and 5-day
forecast for a specific location.

Users can search location by typing city name or city and country name in the search bar separated by a comma.
### [LIVE VERSION](https://miianyy.github.io/weather-app/)

## General
The goal of this project was to get more familiar with REST APIs and asynchronous javascript. I used the es6 ```async/await``` and ```fetch()``` method to fetch resources asynchronously across the network and get responses from API.

This was also my first project where I handled JSON data. As the response came back from the API call I took only information from it that I needed and put them in a ```currentWeather``` object. I used this object in dom to show user the current weather. I used similar way of showing the 5-day forecast.

## Webpack config
I used webpack to compile JavaScript modules and to create a minimized and optimized bundle that will load in the browser in production. I created the project using 3 different webpack configuration files. One for development mode, one for production, and one for common usage that both modes use.

## Technologies
- Webpack
- npm
- Javascript
  - import/export
  - async/await
  - fetch()
  - Date()
- CSS
  - variables
  - animations
  - grid

