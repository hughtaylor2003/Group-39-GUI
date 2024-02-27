import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [currentLocation, setCurrentLocation] = useState('London');
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentLocation) {
      axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${currentLocation}&limit=1&appid=1648041e6f58356be2fc481bbf3e2e93`)
        .then(res => {
          const [place] = res.data;
          if (place) {
            axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${place.lat}&lon=${place.lon}&appid=1648041e6f58356be2fc481bbf3e2e93`)
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
  }, [currentLocation]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setCurrentLocation(locationInput);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleFormSubmit} className='search-header'>
          <input className='search-input'
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            placeholder="Enter location"
          />
          <button type="submit" className='search-button'>Submit</button>
        </form>
        <h2>{currentLocation}</h2>
        {error && <p>{error}</p>}
        <div className="weather-cards">
          {weather.map((item, index) => (
            <div className="weather-card" key={index}>
              <p>Date: {new Date(item.dt * 1000).toLocaleDateString()}</p>
              <p>Temperature: {item.summary}</p>
  
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
