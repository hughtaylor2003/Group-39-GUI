import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Importing CSS file
import BookmarkPage from './BookmarkPage';
import Settings from './Settings';
import Search from './components/search/search'; // Adjusted import path
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import { OPEN_WEATHER_URL, OPEN_WEATHER_KEY } from "./api";

function App() {


    const [currentWeather, setCurrentWeather] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    const [isBookmarkPageOpen, setIsBookmarkPageOpen] = useState(false);
    const [settings, setSettings] = useState({ suntimes: false, humidity: false, uvi: false, Farenhight: false});
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [refresh] = useState(false);
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

  const handleSettingsSubmit = (newSettings) => {
    setSettings(newSettings);
    setIsSettingsOpen(false);
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
    await fetchData(); // Fetch fresh data
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

    return (
        <div className="container">
             
            <div>
            <Search onSearchChange={handleOnSearchChange} />
            <div className="button-container">
           
                <button onClick={toggleSettingsOverlay}>Open Settings Page</button>
                <Settings isOpen={isSettingsOpen} isClosed={() => setIsSettingsOpen(false)} onSubmit={handleSettingsSubmit}/>
                <button type="submit" className='bookmark-button' onClick={bookmarkLocation}>{isBookmarked ? 'Unbookmark' : 'Bookmark'}</button> 
                <button onClick={toggleBookmarkPageOverlay}>Open Bookmarks</button>
                <BookmarkPage isOpen={isBookmarkPageOpen} onClose={() => setIsBookmarkPageOpen(false)} loadBookmark={loadBookmark}  />
            </div>
            {currentWeather && <CurrentWeather data={currentWeather} />}
            {currentWeather && <Forecast data={currentWeather}/>} 
            </div>

            <div>
              
              {refresh && (
                <div>
                  {currentWeather && <CurrentWeather data={currentWeather} />}
                  {currentWeather && <Forecast data={currentWeather}/>} 
                  
                </div>
              )}
            </div>
           
        </div>
            
        );
}

export default App;