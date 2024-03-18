import React from 'react'
import './DailyBlock.css'


export default function DailyBlock({day,icon, summary, ActiveIndex, index, test}) {
  return (
        <div className='Block' onClick={() => ActiveIndex !== index ? test(index): null}>
          <div className='Inner-Parent'>
          <div>{day}</div>
        <div className='Icon-And-Temp'> 
          <img className='icon'src={process.env.PUBLIC_URL + `/icons/${icon}.png`}
            onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src=process.env.PUBLIC_URL + `/icons/unknown.png`;
          }}
          onerror={process.env.PUBLIC_URL + `/icons/unknown.png`}/>
          <div>{summary}°C</div>
        </div>
        </div>
      </div>
  )
}
