import { Accordion, AccordionItem, AccordionItemHeading, AccordionItemPanel, AccordionItemButton } from "react-accessible-accordion";
import './forecast.css';



const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const Forecast = ({ data }) => {

    const sunriseTime = ({item}) => {
        const sunrise  = item.sunrise;
        const timezone_offset  = data.timezone_offset;
        const sunriseTimestamp = (sunrise + timezone_offset) * 1000;
        const sunriseDate = new Date(sunriseTimestamp);
        const hours = sunriseDate.getUTCHours().toString().padStart(2, '0');
        const minutes = sunriseDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = sunriseDate.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    
    };

    const sunsetTime = ({item}) => {
        const sunset  = item.sunset;
        const timezone_offset  = data.timezone_offset;
        const sunsetTimestamp = (sunset + timezone_offset) * 1000;
        const sunsetDate = new Date(sunsetTimestamp);
        const hours = sunsetDate.getUTCHours().toString().padStart(2, '0');
        const minutes = sunsetDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = sunsetDate.getUTCSeconds().toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;
    
    };
    const dayInAWeek = new Date().getDay();
    const forecastDay = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

    console.log(forecastDay);

    return (
        <>
            <label className="title">Daily</label>
            <div className="horizontal-accordion">
            <Accordion allowZeroExpanded>
                {data.daily.splice(0, 7).map((item, idx) => (
                    <AccordionItem key={idx} className="horizontal-accordion-item">
                        <AccordionItemHeading className="horizontal-accordion-item-heading">
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img alt="weather" className="small-icon" src={`icons/${item.weather[0].icon}.png`} />
                                    <label className="day">{forecastDay[idx]}</label>
                                    <label className="description">{item.weather[0].description}</label>
                                    <label className="min-max">{Math.round(item.temp.min)}˚C / {Math.round(item.temp.max)}˚C</label>
                                   
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                            <div className="daily-details-grid">
                                <div className="daily-details-grid-item">
                                    <label>Clouds</label>
                                    <label>{item.clouds}</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Sunrise</label>
                                    <label>{sunriseTime({item})}</label>
                                </div>
                                <div className="daily-details-grid-item">
                                    <label>Sunset</label>
                                    <label>{sunsetTime({item})}</label>
                                </div>
                            </div>
                        </AccordionItemPanel>
                    </AccordionItem>
                ))}

            </Accordion>
            </div>
        </>
    );
}

export default Forecast;