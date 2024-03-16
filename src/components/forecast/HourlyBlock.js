import React from 'react'
import './HourlyBlock.css'
import com from '../../com'

export default function HourlyBlock({day,icon, summary}) {
  return (
        <div className='Hourly-Block'>
          <div className='Inner-Parent'>
          <div>{day}</div>
          <img className='hourly-icon'src={process.env.PUBLIC_URL + `/icons/${icon}.png`
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
