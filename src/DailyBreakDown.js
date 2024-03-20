import React from 'react'
import HourlyBlock from './components/forecast/HourlyBlock';
import './DailyBreakDown.css'
import dayjs from 'dayjs'
import * as isBetween from 'dayjs/plugin/isBetween';
import * as customParseFormat  from 'dayjs/plugin/customParseFormat';
dayjs.extend(isBetween);
dayjs.extend(customParseFormat)

export default function DailyBreakDown({data, hrdata, ActiveIndex, getWeatherIcon}) {

    function getHour(date) {
        return dayjs(date).format("h A");
    }

 
    let start = ActiveIndex * 24
    let end = start + 24
    let hrArr = []
    let iconTime = 'd'
    let dayTime = dayjs('6:00', 'h A');
    let nightTime = dayjs('17:00', 'h A');

    for(let j = start; j<end; j++) {
        // Check if the hour is between 6:00 and 18:00
        if (dayjs(getHour(hrdata.hourly.time[j]), 'h A').isBetween(dayTime, nightTime, null, '[]')) {
            iconTime = 'd'; // Set to daytime if between 6:00 and 18:00
        } else {
            iconTime = 'n'; // Otherwise, it's nighttime
        }
        hrArr.push(
            <HourlyBlock 
            day={getHour(hrdata.hourly.time[j])}
            icon={getWeatherIcon(hrdata.hourly.weather_code[j]) + iconTime} 
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
