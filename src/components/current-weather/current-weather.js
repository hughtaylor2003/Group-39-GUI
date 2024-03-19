import "./current-weather.css"


const CurrentWeather = ({ data, settings }) => {

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov','Dec'];
    const today = new Date();
    const month = today.getMonth();
    const date = today.getDate();


    const currDate = date + ' ' + months[month];
    const currTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    let adviceString = '';
    if (settings.Farenhight === false){
        if (data.current.temp > 24){
            adviceString += 'Bring lots of water to stay hydrated. Have cooling stations along with cold pack and set up water breaks.'
        }

        if (data.current.temp < 13){
            adviceString += 'Layer up and wear warm clothing. Bring heat packs to warm up hands so handling equipment like cameras is not uncomfortable'
        }
    }
    else{
        if (data.current.temp > 75){
            adviceString += 'Bring lots of water to stay hydrated. Have cooling stations along with cold pack and set up areas for shade to avoid direct sunlight '
        }

        if (data.current.temp < 55){
            adviceString += 'Layer up and wear warm clothing. Bring heat packs to warm up hands so handling equipment like cameras is not uncomfortable'
        }
    }


    return (
        <div className="weather">
            <div className="TopHalf">
                <div className ="mainContent"> 
                    <div className="top">
                        <div className="top-left">
                            <p className="city">{data.city}</p>
                            <p className="weather-description">{data.current.weather[0].description}</p>
                        </div>
                        <div className="top-left">
                            <p className="city">{currDate}</p>
                            <p className="weather-description">{currTime}</p>
                        </div>
                        
                    </div>
                    <div className="bottom">
                        <div className="bottom-left">
                            <p className="temperature">{`${Math.round(data.current.temp)}˚`}</p>
                        </div>

                        <div className="bottom-right">
                            <div className="details">
                                <img alt="weather" className="weather=icon" src={process.env.PUBLIC_URL + `/icons/${data.current.weather[0].icon}.png`} />
                                
                            </div>


                        </div>
                    </div>
                </div>
                <div className="NewContent">
                    <div className="FeelSlot">   
                        <img className="small-icon" src={process.env.PUBLIC_URL + '/icons/wi_thermometer.svg'} />
                        <div className="Data">
                            <div>   
                                Feels Like
                            </div>
                            <div>
                                {`${Math.round(data.current.feels_like)}˚C`}
                            </div>
                        </div>
                    </div>

                    <div className="FeelSlot">   
                        <img className="small-icon" src={process.env.PUBLIC_URL + '/icons/wi_wind.svg'} />
                        <div className="Data">
                            <div >   
                                Wind
                            </div>
                            
                            <div>
                                {`${Math.round(data.current.wind_speed)} m/s`}
                            </div>
                        </div>
                    </div>

                    <div className="FeelSlot">   
                        <img className="small-icon" src={process.env.PUBLIC_URL + '/icons/humidity.svg'} />
                        <div className="Data">
                            <div>   
                                Humidity
                            </div>
                            <div>
                                8.2
                            </div>
                        </div>
                    </div>

                    <div className="FeelSlot">   
                        <img className="small-icon" src={process.env.PUBLIC_URL + '/icons/wi_dust-day.svg'} />
                        <div className="Data">
                            <div>   
                                Visibility
                            </div>
                            <div>
                            {`${Math.round(data.current.visibility)/1000} km`}
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
            
            <div>
                Alerts and Advice
            </div>
            <div> 
                {adviceString}
            </div>
        </div>

        

    );
}

export default CurrentWeather;