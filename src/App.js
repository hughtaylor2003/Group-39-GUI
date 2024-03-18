import React, { useState, useEffect } from 'react';



import './App.css'; // Importing CSS file

import Settings from './components/Settings';
import Search from './components/search/search'; // Adjusted import path
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { OPEN_WEATHER_URL, OPEN_WEATHER_KEY } from "./api";
import DailyBreakDown from './DailyBreakDown';
import Wind from './Wind';
import Sunrise from './Sunrise';

function App() {

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
      };

    const handleSettingsSubmit = (newSettings) => {
        setSettings(newSettings);
        setIsOpen(!isOpen);
      };
    

    const [currentWeather, setCurrentWeather] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({ suntimes: false, winddir: false, uvi: false, Farenhight: false});

    useEffect(() => {
        // Fetch weather data for London when the component mounts
        handleOnSearchChange({ value: "51.5074 -0.1278", label: "London, UK" });
    }, []);


    /* Takes values from the city predicter (latitude and longitude*/ 
    const handleOnSearchChange = (searchData) => {

        const [lat, lon] = searchData.value.split(" ");

        const currentWeatherFetch = fetch(`${OPEN_WEATHER_URL}/onecall?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric`);

        console.log(currentWeather)
        Promise.all([currentWeatherFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                setCurrentWeather({ city: searchData.label, ...weatherResponse });
            })
            .catch((err) => console.log(err));
    };

    return (
<>            <div className='Search-And-Settings'>
                <div className='search'>
            <Search onSearchChange={handleOnSearchChange} />
            </div>
            <img
                alt="icon"
                className="settings" 
                src={process.env.PUBLIC_URL + `/icons/settings.png`}
                onClick={toggleOverlay}>
                </img>
            </div>
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {currentWeather && <Forecast data={currentWeather}/>}
            <div className="mobile-toggle">
            {currentWeather && <DailyBreakDown data={currentWeather}/>}
            <div>
            <h2>Extra Options</h2>
            {settings.winddir&&<Wind data={currentWeather}></Wind>}
            {settings.suntimes&&<Sunrise data={currentWeather}></Sunrise>}
            </div>
            </div>
            <Settings isOpen={isOpen} onSubmit={handleSettingsSubmit}/>
            </>

        );
}

export default App;