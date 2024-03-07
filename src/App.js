import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css'; // Importing CSS file

import Settings from './Settings';
import Search from './components/search/search'; // Adjusted import path
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { OPEN_WEATHER_URL, OPEN_WEATHER_KEY } from "./api";

function App() {




    const [currentWeather, setCurrentWeather] = useState(null);

    useEffect(() => {
        // Fetch weather data for London when the component mounts
        handleOnSearchChange({ value: "51.5074 -0.1278", label: "London, UK" });
    }, []);


    {/* Takes values from the city predicter (latitude and longitude*/ }
    const handleOnSearchChange = (searchData) => {

        const [lat, lon] = searchData.value.split(" ");

        const currentWeatherFetch = fetch(`${OPEN_WEATHER_URL}/onecall?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric`);


        Promise.all([currentWeatherFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();


                setCurrentWeather({ city: searchData.label, ...weatherResponse });


            })
            .catch((err) => console.log(err));

    };

console.log(currentWeather);



    return (
        <div className="container">
            <Search onSearchChange={handleOnSearchChange} />
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {currentWeather && <Forecast data={currentWeather}/>}
        </div>);
}

export default App;