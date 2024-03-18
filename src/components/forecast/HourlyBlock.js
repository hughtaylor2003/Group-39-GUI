import React from 'react'
import './HourlyBlock.css'


export default function HourlyBlock({day, icon, summary}) {
  return (
        <div className='Hourly-Block'>
          <div className='Inner-Parent'>
          <div>{day}</div>
          <img 
            alt = "icon"
            className='hourly-icon'
            src={process.env.PUBLIC_URL + `/icons/${icon}.png`
          }
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src=process.env.PUBLIC_URL + `/icons/unknown.png`;}}
          />
          <div>{summary}°</div>
        </div>
      </div>
  )
}
