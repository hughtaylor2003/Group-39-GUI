import React, { useState, useEffect } from 'react'; // import react
import axios from 'axios'; // import module
import './App.css'; // Importing CSS file

//importing components from other js files
import Settings from './components/Settings';
import Search from './components/search/search'; // Adjusted import path
import CurrentWeather from './components/current-weather/current-weather';
import Forecast from './components/forecast/forecast';
import Extras from './components/extras/Extras';
import BookmarkPage from './BookmarkPage';
import DailyBreakDown from './DailyBreakDown';
import { OPEN_WEATHER_URL, OPEN_WEATHER_KEY, OPEN_METEO_URL } from "./api"; // import stuff for api calls
import PDFForecast from './components/PDFForecast';
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';

function App() {

    const toggleOverlay = () => {
        setIsOpen(!isOpen);
    };

    //Section for useStates
    const [ActiveIndex, SetActiveIndex] = useState(0)
    const [currentWeather, setCurrentWeather] = useState(null);
    const [HourlyWeather, setHourlyWeather] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState({suntimes: false, winddir: false, uvi: false, Farenhight: false, humidity: false, windspeed: false, pop: false, rain:false, temp:false });
    const [bookmarks, setBookmarks] = useState([]);
    const [isBookmarkPageOpen, setIsBookmarkPageOpen] = useState(false);
    const [currentSearch, setCurrentSearch] = useState({ value: "51.5074 -0.1278", label: "London, GB" });

    //Unit that are used to determine which unit of temp the apis use for the data that is given back
    const [tempUnit, settempUnit] = useState({map: 'metric',meteo: ''})

    //Section of code for what happens after user saves their settings
    const handleSettingsSubmit = (newSettings) => {
        //Checks if the user has switched temp unit and if so: sets the two tempUnit api variables accordingly
        if(newSettings.Farenhight !== settings.Farenhight){
            if (newSettings.Farenhight === true){
                settempUnit({...tempUnit, map:'imperial', meteo:'&temperature_unit=fahrenheit'})
            }
            else{
                settempUnit({...tempUnit, map:'metric', meteo:''})
            }
        }
        setSettings(newSettings);// Update settings useState
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        // Fetch weather data for London when the component mounts
        handleOnSearchChange({ value: "51.5074 -0.1278", label: "London, GB" });
    }, []);

    useEffect(() => {
        handleOnSearchChange(currentSearch);//Recalls the api but for the appropriate temp unit
    },[tempUnit.map, tempUnit.meteo]);

    //save pdf locally to be able to download it from button
    const downloadPDF = async() => {
        const blob = await pdf((
            <PDFForecast 
             title='Forecast'
             WeatherData={currentWeather}
             HourWeatherData={HourlyWeather}
             getWeatherIcon={getWeatherIcon}
             Settings={settings}/>
        )).toBlob();
        saveAs(blob,'forecast');
    };

    /* Takes values from the city predicter (latitude and longitude*/ 
    const handleOnSearchChange = (searchData) => {
        const [lat, lon] = searchData.value.split(" ");
        //Open-Weather-Map API call: Data used for most components
        const currentWeatherFetch = fetch(`${OPEN_WEATHER_URL}/onecall?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=${tempUnit.map}`);
        Promise.all([currentWeatherFetch])
            .then(async (response) => {
                const weatherResponse = await response[0].json();
                setCurrentWeather({ city: searchData.label, ...weatherResponse });
                setCurrentSearch(searchData);
            })
            .catch((err) => console.log(err));
        
            
        
        //Open-Meteo API call: Data used for hourly forecast
        const HourlyWeatherFetch = fetch(`${OPEN_METEO_URL}latitude=${lat}&longitude=${lon}&hourly=temperature_2m,weather_code${tempUnit.meteo}`);

        Promise.all([HourlyWeatherFetch])
            .then(async (response) => {
                const weatherHourlyResponse = await response[0].json();
                setHourlyWeather({ city: searchData.label, ...weatherHourlyResponse });
            })
            .catch((err) => console.log(err));
        
    };

    const toggleBookmarkPageOverlay = () => {
        setIsBookmarkPageOpen(!isBookmarkPageOpen);
    };

    const bookmarkLocation = async () => {
        const { city, lat, lon } = currentWeather;
        try {
            const response = await axios.get(`${OPEN_WEATHER_URL}/onecall?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_KEY}&units=${tempUnit.map}`);
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

    //Used to clear the bookmarks and reset bookmarks
    const clearStorage = ()=>{
        localStorage.clear();
        setBookmarks([])
    }

    //Used to convert weather code given by Open-Meteo API for each hourly date so the appropriate weather is returned
    //For example 0 is returned for 1PM so convert to 01 which is the file name for the icon(01.d.png/0.1n.png) found in public/icons folder
    const getWeatherIcon = (code) => {
        const weatherCodes = {
            /*Clouds*/
            0: "01",
            1: "02",
            2:'03',
            3:'04',
            /*Fog*/
            45:'50',
            48:'50',
            /*Drizzle*/
            51:'09',
            53:'09',
            55:'09',
            56:'09',
            57:'09',
            /*Rain*/
            61:'10',
            63:'10',
            65:'10',
            66:'10',
            67:'10',
            /*Snow*/
            71:'13',
            73:'13',
            75:'13',
            77:'13',
            /*Rain*/
            80:'10',
            81:'10',
            82:'10',
            /*Snow*/
            85:'13',
            86:'13',
            /*Thunder*/
            95:'11',
            96:'11',
            99:'11',
        };
        return weatherCodes[code] || "unknown"; // Default to "unknown" if code not found
    };
      
    //For the Extra Options section: Check if website renders 'no extra options selected' or renders the extra options panels
    let renderNoSelected = true; 
    let count = Object.values(settings).reduce((a, settings) => a + settings, 0)
    //Check if only fahrenheit is selected: if so count is 0 so 'no extra options selected' is rendered
    if (count === 1 && settings.Farenhight === true){
        count = 0
    }
    if(count > 0){
        renderNoSelected = false;
    }
    else{
        renderNoSelected = true;
    }
      

    return (
<>      <div className='Search-And-Settings'>
            <div className='search'>
                <Search onSearchChange={handleOnSearchChange} />
            </div>
            <img alt ="icon" onClick={toggleOverlay} className="settings" src={process.env.PUBLIC_URL + `/icons/settings.png`}></img>
        </div>
        <div className ='Bookmark-Section'>
                <button type="submit" className='bookmark-button' onClick={bookmarkLocation}>{isBookmarked ? 'Unbookmark' : 'Bookmark'}</button> 
                <button onClick={toggleBookmarkPageOverlay}>Open Bookmarks</button>
                <BookmarkPage isOpen={isBookmarkPageOpen} onClose={() => setIsBookmarkPageOpen(false)} loadBookmark={loadBookmark}  />
                <button onClick={clearStorage}>Clear bookmarks</button>
                {currentWeather && HourlyWeather !== null && <button onClick={() => downloadPDF()}> Download</button>}
        </div>
            {currentWeather && <CurrentWeather data={currentWeather} settings={settings} />}
            <div className="mobile-toggle">
                {currentWeather && HourlyWeather !== null && <DailyBreakDown hrdata ={HourlyWeather} ActiveIndex={ActiveIndex} getWeatherIcon ={getWeatherIcon}/>}
            </div>
            {currentWeather && <Forecast data={currentWeather} ActiveIndex = {ActiveIndex} test ={SetActiveIndex}/>}
            {currentWeather && ActiveIndex !== null && <Extras data={currentWeather} index = {ActiveIndex} settingsOptions= {settings} renderNoSelected = {renderNoSelected}/>}
            <Settings isOpen={isOpen} onSubmit={handleSettingsSubmit}/>
            </>
        );
}

export default App;
