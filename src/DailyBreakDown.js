import React from 'react'
import HourlyBlock from './components/forecast/HourlyBlock';
import './DailyBreakDown.css'
import dayjs from 'dayjs'

export default function DailyBreakDown({data, hrdata}) {

    // Function to convert Unix timestamp to time in "hh:mm am/pm" format
function unixTimestampToTime(timestamp) {
    // Convert Unix timestamp to milliseconds
    const milliseconds = (data.timezone_offset + timestamp) * 1000;

    // Create a new Date object with the milliseconds
    const date = new Date(milliseconds);

    // Get hours and minutes
    let hours = date.getHours();


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

function getHour(date) {
    return dayjs(date).format("DD MMM HH:mm");
  }

    let arr = []
    for (let i = 0; i < 5; i++) {
        arr.push(
            <HourlyBlock 
            day={unixTimestampToTime(data.hourly[i].dt)}
            icon={data.hourly[i].weather[0].icon} 
            summary={Math.round(data.hourly[i].temp)}
            ></HourlyBlock>
        )
    }
    

    console.log(hrdata)
    console.log('this is', hrdata.hourly.time[0])
    let hrArr = []
    for(let j = 0; j<150; j++) {
        hrArr.push(
            <HourlyBlock 
            day={getHour(hrdata.hourly.time[j])}
            icon={hrdata.hourly.weather_code[j]} 
            summary={hrdata.hourly.temperature_2m[j]}
            ></HourlyBlock>

        )
    }


  return (
    <>

<div style={{ position: 'relative', display: 'inline-block' }}>

    
    <div className='Daily-Parent'>
        {/*arr*/}
        {hrArr}

    </div>
</div>

    </>
  )
}
