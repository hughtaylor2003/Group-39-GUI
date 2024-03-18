import "./current-weather.css"
const CurrentWeather = ({ data }) => {
    console.log(data.current.weather[0].icon)

    const sunriseTime = ({data}) => {
        const sunrise  = data.current.sunrise;
        const timezone_offset  = data.timezone_offset;
        const sunriseTimestamp = (sunrise + timezone_offset) * 1000;
        const sunriseDate = new Date(sunriseTimestamp);
        const hours = sunriseDate.getUTCHours().toString().padStart(2, '0');
        const minutes = sunriseDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = sunriseDate.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    
    };

    const sunsetTime = ({data}) => {
        const sunset  = data.current.sunset;
        const timezone_offset  = data.timezone_offset;
        const sunsetTimestamp = (sunset + timezone_offset) * 1000;
        const sunsetDate = new Date(sunsetTimestamp);
        const hours = sunsetDate.getUTCHours().toString().padStart(2, '0');
        const minutes = sunsetDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = sunsetDate.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    
    };



    return (
        <div className="weather">
            <div className="top">
                <div className="top-left">
                    <p className="city">{data.city}</p>
                    <p className="weather-description">{data.current.weather[0].description}</p>
                </div>
                <img alt="weather" className="weather=icon" src={process.env.PUBLIC_URL + `/icons/${data.current.weather[0].icon}.png`} />
            </div>
            <div className="bottom">
                <div className="bottom-left">
                    <p className="temperature">{`${Math.round(data.current.temp)}˚`}</p>
                </div>

                <div className="bottom-right">
                    <div className="details">
                        <div className="parameter-row">
                            <span className="parameter-label top">Details</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Feels like</span>
                            <span className="parameter-value">{`${Math.round(data.current.feels_like)}˚`}</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Wind</span>
                            <span className="parameter-value">{`${Math.round(data.current.wind_speed)} m/s`}</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Humidity</span>
                            <span className="parameter-value">{`${Math.round(data.current.humidity)}%`}</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Sunrise</span>
                            <span className="parameter-value">{sunriseTime({data})}</span>
                        </div>
                        <div className="parameter-row">
                            <span className="parameter-label">Sunset</span>
                            <span className="parameter-value">{sunsetTime({data})}</span>
                        </div>
                    </div>


                </div>
            </div>

        </div>

    );
}

export default CurrentWeather;