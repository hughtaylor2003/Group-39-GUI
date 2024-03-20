import React from 'react'
import './DailyBlock.css'

const handleImageError = (event) => {
    event.target.src = `/icons/unknown.png`;
};


export default function DailyBlock({day,icon, summary, ActiveIndex, index, test}) {
  return (
        <div className={ActiveIndex === index ? 'Block-Active' : 'Block' } onClick={() => ActiveIndex !== index ? test(index): null}>
          <div className='Inner-Parent'>
          <div>{index === 0 ? 'Today':day }</div>
        <div className='Icon-And-Temp'> 
          <img alt="icon" className='icon'src={process.env.PUBLIC_URL + `/icons/${icon}.png`}
            onError = {handleImageError}
          />
          <div>{summary}°</div>
        </div>
        </div>
      </div>
  )
}
