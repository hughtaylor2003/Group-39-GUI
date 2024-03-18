import React, { useState, useEffect } from 'react';
import axios from 'axios';


import './App.css'; // Importing CSS file

import Settings from './components/Settings';
import Search from './components/search/search'; // Adjusted import path
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import Extras from './components/extras/Extras';
import BookmarkPage from './BookmarkPage';
import { OPEN_WEATHER_URL, OPEN_WEATHER_KEY, OPEN_METEO_URL } from "./api";
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
    
    
    const [ActiveIndex, SetActiveIndex] = useState(0)
    const [currentWeather, setCurrentWeather] = useState(null);
    
    const [HourlyWeather, setHourlyWeather] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({ suntimes: false, winddir: false, uvi: false, Farenhight: false});

    const [bookmarks, setBookmarks] = useState([]);
    const [isBookmarkPageOpen, setIsBookmarkPageOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [refresh] = useState(false);

    useEffect(() => {
        // Fetch weather data for London when the component mounts
        handleOnSearchChange({ value: "51.5074 -0.1278", label: "London, GB" });
    }, []);


    {/* Takes values from the city predicter (latitude and longitude*/ }
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

        const HourlyWeatherFetch = fetch(`https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&hourly=temperature_2m,weather_code`);

        Promise.all([HourlyWeatherFetch])
            .then(async (response) => {
                const weatherHourlyResponse = await response[0].json();
                setHourlyWeather({ city: searchData.label, ...weatherHourlyResponse });
            })
            .catch((err) => console.log(err));
        
    };

    const toggleSettingsOverlay = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const toggleBookmarkPageOverlay = () => {
        setIsBookmarkPageOpen(!isBookmarkPageOpen);
    };


    useEffect(() => {
        if (!isSettingsOpen && !isBookmarkPageOpen) {
            refreshForecast();
        }
    }, [isSettingsOpen, isBookmarkPageOpen]);


    const bookmarkLocation = async () => {
    
        const { city, lat, lon } = currentWeather;
        try {
            const response = await axios.get(`${OPEN_WEATHER_URL}/onecall?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=metric`);
            const temperature = response.data.current.temp;
            const description = response.data.current.weather[0].description;
            // Check if the city is already in the list
            const existingBookmarkIndex = bookmarks.findIndex(bookmark => bookmark.city === city);
            if (existingBookmarkIndex === -1) {
                // City not found in bookmarks, add it
                const updatedBookmarks = [...bookmarks, { city, lat, lon, temperature, description }];
                setBookmarks(updatedBookmarks);
                localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            } else {
                // City found in bookmarks, remove it
                const updatedBookmarks = [...bookmarks];
                updatedBookmarks.splice(existingBookmarkIndex, 1);
                setBookmarks(updatedBookmarks);
                localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            }
        } catch (error) {
            console.error(`Error fetching weather data for ${city}: ${error.message}`);
        }
        refreshForecast();
    };

    
    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        if (storedBookmarks) {
        setBookmarks(storedBookmarks);
        }
    }, []);

    const isBookmarked = currentWeather && bookmarks.some(bookmark => bookmark.city === currentWeather.city);


    const loadBookmark = (bookmark) =>{
        handleOnSearchChange(bookmark);
    }

    

    const refreshForecast = async () => {
        console.log("Button clicked, refreshing...");
       // await fetchData(); // Fetch fresh data
    };

    const fetchData = async () => {
        try {
            const location = currentWeather.city
            const response = await fetch(`${OPEN_WEATHER_URL}/onecall?lat=${currentWeather.lat}&lon=${currentWeather.lon}&appid=${OPEN_WEATHER_KEY}&units=metric`);
            const data = await response.json();
            setCurrentWeather({city: location,...data}); // Update current weather data
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    console.log('hoy',HourlyWeather)

    return (
<>      <div className='Search-And-Settings'>
            <div className='search'>
                <Search onSearchChange={handleOnSearchChange} />
            </div>
            <img onClick={toggleOverlay} className="settings" src={process.env.PUBLIC_URL + `/icons/settings.png`}></img>
            <div>
                {/*
                <button onClick={toggleSettingsOverlay}>Open Settings Page</button>
                <Settings isOpen={isSettingsOpen} isClosed={() => setIsSettingsOpen(false)} onSubmit={handleSettingsSubmit}/>
                */}
                <button type="submit" className='bookmark-button' onClick={bookmarkLocation}>{isBookmarked ? 'Unbookmark' : 'Bookmark'}</button> 
                <button onClick={toggleBookmarkPageOverlay}>Open Bookmarks</button>
                <BookmarkPage isOpen={isBookmarkPageOpen} onClose={() => setIsBookmarkPageOpen(false)} loadBookmark={loadBookmark}  />

            </div>
        </div>

        
            
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {currentWeather && <Forecast data={currentWeather} test ={SetActiveIndex}/>}
            
            <div className="mobile-toggle">
                {currentWeather && <DailyBreakDown data={currentWeather} hrdata ={HourlyWeather}/>}
                
            </div>
            
            {currentWeather && ActiveIndex !== null && <Extras data={currentWeather} index = {ActiveIndex} settingsOptions= {settings}/>}
            <Settings isOpen={isOpen} onSubmit={handleSettingsSubmit}/>
            </>
        
        );
}

export default App;