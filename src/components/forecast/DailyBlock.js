import React from 'react'
import './DailyBlock.css'


export default function DailyBlock({day,icon, summary}) {
  return (
        <div className='Block'>
          <div className='Inner-Parent'>
          <div>{day}</div>
        <div className='Icon-And-Temp'> 
          <img className='icon'src={`/icons/${icon}.png`}
            onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src=`/icons/unknown.png`;
          }}
          onerror={process.env.PUBLIC_URL + `/icons/unknown.png`}/>
          <div>{summary}°C</div>
        </div>
        </div>
      </div>
  )
}
