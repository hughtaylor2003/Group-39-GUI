import "./Extras.css"

const Extras = ({data, index, settingsOptions, renderNoSelected}) => {

    const WEEK_DAYS = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayInAWeek = new Date().getDay();
    const forecastDay = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));
    console.log(data.daily[index])
   
    const sunriseTime = ({data, index}) => {
        const sunrise  = data.daily[index].sunrise;
        const timezone_offset  = data.timezone_offset;
        const sunriseTimestamp = (sunrise + timezone_offset) * 1000;
        const sunriseDate = new Date(sunriseTimestamp);
        const hours = sunriseDate.getUTCHours().toString().padStart(2, '0');
        const minutes = sunriseDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = sunriseDate.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    
    };

    const sunsetTime = ({data, index}) => {
        const sunset  = data.daily[index].sunset;
        const timezone_offset  = data.timezone_offset;
        const sunsetTimestamp = (sunset + timezone_offset) * 1000;
        const sunsetDate = new Date(sunsetTimestamp);
        const hours = sunsetDate.getUTCHours().toString().padStart(2, '0');
        const minutes = sunsetDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = sunsetDate.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    
    };

    const UviIcons = ({data}) =>{
        const uvi = Math.round(data.daily[index].uvi)
        console.log('do it' + uvi);
        
        return uvi
    };

    let deg = data.current.wind_deg ? data.current.wind_deg : null
    
    return (
        <div className="Top">
            <div className ='title'>
            Extra Options for {index === 0 ? 'Today' : forecastDay[index]}
            </div>

            {renderNoSelected && <div>
                You have no extra option selected as of now. Options can be added in settings
            </div>}

            <div className="Panel-widgets">
                {settingsOptions.suntimes && <div className='Panel-slot'>
                    <div>Sunrise</div>
                    
                        <div className="Icon-Content">
                            
                            <img alt="weather" className="Sun-Icon" src={process.env.PUBLIC_URL + '/icons/sunrise.svg'}/>
                            
                            <p>{sunriseTime({data, index})}</p>
                            
                        </div>
                    
                </div>}

                {settingsOptions.suntimes && <div className='Panel-slot'>
                    <div>Sunset</div>
                    <div className="Icon-Content">
                        <img alt="weather" className="Sun-Icon" src={process.env.PUBLIC_URL + '/icons/sunset.svg'}/>
                        <p>{sunsetTime({data, index})}</p>
                    </div>
                </div>}

                {settingsOptions.temp && <div className='Panel-slot'>
                    <div>Highest Temp</div>
                    <div className="Icon-Content">
                        <div className="Sun-Icon">
                            <img alt="weather" className="weather=icon" src={process.env.PUBLIC_URL + '/icons/thermometer-warmer.svg'}/>
                        </div>
                        <p>{data.daily[index].temp.max}</p>
                    </div>
                </div>}

                {settingsOptions.temp && <div className='Panel-slot'>
                    <div>Lowest Temp</div>
                    <div className="Icon-Content">
                        <div className="Sun-Icon">
                            <img alt="weather" className="weather=icon" src={process.env.PUBLIC_URL + '/icons/thermometer-colder.svg'}/>
                        </div>
                        <p>{data.daily[index].temp.min}</p>
                    </div>
                </div>}

                {settingsOptions.uvi && <div className='Panel-slot'>
                    <div>UV Index</div>
                    <div className="Icon-Content">
                        <div className="Icon">
                        <img alt="weather" className="weather=icon" src={process.env.PUBLIC_URL + '/icons/uv-index-' + UviIcons({data}) + '.svg'}/>
                        </div>
                    </div>
                </div>}

                {settingsOptions.winddir && <div className='Panel-slot'>
                    <div>Wind Dir</div>
                    <div className="Icon-Content">
                        <div className="Wind-Icon">
                            <img style={{rotate:`${deg}deg`}} className="Arrow" src={process.env.PUBLIC_URL + '/icons/arrow.svg'} alt="Sunrise"></img>
                        </div>
                        <h3>{deg}°</h3>
                    </div>
                </div>}

                {settingsOptions.humidity && <div className='Panel-slot'>
                    <div>Humidity</div>
                    <div className="Icon-Content">
                        <div className="Sun-Icon">
                        <img alt="weather" className="weather=icon" src={process.env.PUBLIC_URL + '/icons/humidity.svg'}/>
                        </div>
                        <p>{data.daily[index].humidity}%</p>
                    </div>
                </div>}

                {settingsOptions.windspeed && <div className='Panel-slot'>
                    <div>Wind Speed</div>
                    <div className="Icon-Content">
                        <div className="Sun-Icon">
                        <img alt="weather" className="weather=icon" src={process.env.PUBLIC_URL + '/icons/wind.svg'}/>
                        </div>
                        <p>{data.daily[index].wind_speed} m/s</p>
                    </div>
                </div>}

                {settingsOptions.pop && <div className='Panel-slot'>
                    <div>Probability Of Precipitation</div>
                    <div className="Icon-Content">
                        <div className="Icon">
                        <img alt="weather" className="weather=icon" src={process.env.PUBLIC_URL + '/icons/raindrop.svg'}/>
                        </div>
                        <p>{data.daily[index].pop}%</p>
                    </div>
                </div>}

                {settingsOptions.rain && <div className='Panel-slot'>
                    <div>Total Precipitation</div>
                    <div className="Icon-Content">
                        <div className="Icon">
                        <img alt="weather" className="weather=icon" src={process.env.PUBLIC_URL + '/icons/raindrops.svg'}/>
                        </div>
                        <p>{data.daily[index].rain ? data.daily[index].rain: '0'}mm</p>
                    </div>
                </div>}

            </div>
        </div>
            
        
    );
}
    
export default Extras;