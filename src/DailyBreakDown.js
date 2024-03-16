import React from 'react'
import HourlyBlock from './components/forecast/HourlyBlock';
import './DailyBreakDown.css'

export default function DailyBreakDown({data}) {

    // Function to convert Unix timestamp to time in "hh:mm am/pm" format
function unixTimestampToTime(timestamp) {
    // Convert Unix timestamp to milliseconds
    const milliseconds = timestamp * 1000;

    // Create a new Date object with the milliseconds
    const date = new Date(milliseconds);

    // Get hours and minutes
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Determine if it's AM or PM
    const amOrPm = hours >= 12 ? 'pm' : 'am';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12; // If hours is 0, convert it to 12

    // Get current date and hour
    const currentDateTime = new Date();
    const currentHour = currentDateTime.getHours();

    console.log(data.hourly[1].weather[0].icon)

    // Check if it's the current hour
    if (hours === currentHour) {
        return 'Now';
    }

    // Return the time in "hh:mm am/pm" format
    return `${hours}${amOrPm}`;
}
    let arr = []
    for (let i = 0; i < 5; i++) {
        let datas = data.daily[i].summary
        arr.push(
            <HourlyBlock 
            day={unixTimestampToTime(data.hourly[i].dt)}
            icon={data.hourly[i].weather[0].icon} 
            summary={data.hourly[i].temp}
            ></HourlyBlock>
        )
    }
  return (
    <>

<div style={{ position: 'relative', display: 'inline-block' }}>
    <img src={process.env.PUBLIC_URL + `/icons/opacity-bg.svg`}/>
    <div className='Daily-Parent' style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {arr}
    </div>
</div>

    </>
  )
}
