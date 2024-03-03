// App.js
import React, { useState, useEffect } from 'react';
import Settings from './Settings';
import axios from 'axios';
import './App.css'; // Importing CSS file

function App() {
  const [weather, setWeather] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [currentLocation, setCurrentLocation] = useState('London');
  const [error, setError] = useState('');
  const [settings, setSettings] = useState({ suntimes: false, humidity: false, uvi: false, Farenhight: false});
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarks, setBookmarks]= useState([])
  
  
  useEffect(() => {
    if (currentLocation) {
      axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${currentLocation}&limit=1&appid=1648041e6f58356be2fc481bbf3e2e93`)
        .then(res => {
          const [place] = res.data;
          if (place) {
            let metric = settings.Farenhight ? "imperial" : "metric"
            console.log(metric)
            axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${place.lat}&lon=${place.lon}&units=${metric}&appid=1648041e6f58356be2fc481bbf3e2e93`)
              .then(res => {
                console.log(res.data.daily);
                setWeather(res.data.daily);
                setError('');
              });
          } else {
            setWeather([]);
            setError('This location is not valid!! Please type in a place that exists');
          }
        })
        .catch(error => {
          setWeather([]);
          setError('Error fetching weather data. Please try again later.');
        });
    }
  }, [currentLocation, settings]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCurrentLocation(locationInput);
  };

  const handleSettingsSubmit = (newSettings) => {
    setSettings(newSettings);
    setIsOpen(!isOpen);
  };

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  const bookmarkLocation = () => {
    if (!bookmarks.includes(currentLocation)) {
      setBookmarks([...bookmarks, currentLocation]);
    }
  };

  return (
    <>
    
    <div className='Absolute-Parent'>
      <div className="App">
        <header className="App-header">

          {/*Code for settings button */}
          <button onClick={toggleOverlay}>Open Settings Page</button>
          <Settings isOpen={isOpen} onSubmit={handleSettingsSubmit}/>

          {/*Code for location search bar */}
          <form onSubmit={handleFormSubmit} className='search-container'> {/* changed class name */}
            <input list ='bookmarkList' className='search-input'
              type="text"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              onFocus={(e) => e.target.value = ''}
              placeholder="Enter location"
            />
            <datalist id="bookmarkList">
              {bookmarks.map((bookmark, index) => (
                <option key={index} value={bookmark} />
              ))}
            </datalist>
            <button type="submit" className='search-button'>Submit</button>
          </form>
          <h2>
            {currentLocation}  
            <button type="submit" className='bookmark-button' onClick={bookmarkLocation}>Bookmark</button> 
          </h2>
          {error && <p>{error}</p>}

          {/*Code for weather card */}
          <div className="weather-cards">
            {weather.map((item, index) => (
              <div className="weather-card" key={index}>
                <p>Date: {new Date(item.dt * 1000).toLocaleDateString()}</p>
                {settings.Farenhight ? <p>Temperature: {item.temp['day']}°F</p> : <p>Temperature: {item.temp['day']}°C</p>}
                {settings.suntimes && <p>Sunrise: {unixTimestampTo12Hour(item.sunrise)}</p>}
                {settings.suntimes && <p>Sunset: {unixTimestampTo12Hour(item.sunset)}</p>}
                {settings.humidity && <p>Humidity: {item.humidity}</p>}
                {settings.uvi && <p>UVI: {item.uvi}</p>}
              </div>
            ))}
          </div>
        </header>
      </div>
    </div>
      
  
    
    </>
  );
}

function unixTimestampTo12Hour(unixTimestamp) {
  let date = new Date(unixTimestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let timeOfDay = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2) + ' ' + timeOfDay;
  return formattedTime;
}


export default App;
