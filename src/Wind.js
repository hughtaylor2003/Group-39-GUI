import React from 'react';
import './Extras.css';

export default function Sunrise({data}) {
  let deg = data.current.wind_deg ? data.current.wind_deg : null
  console.log(deg)
  return (

    <div className="OverlayContainer">
      <img className="OverlayImage" src={process.env.PUBLIC_URL + '/icons/EmptyBox.svg'} alt="Sunrise"></img>
      <div className="OverlayContent">
        <img style={{rotate:`${deg}deg`}} className="Arrow" src={process.env.PUBLIC_URL + '/icons/arrow.svg'} alt="Sunrise"></img>
        <h3>{deg}°</h3>
      </div>
    </div>
  );
}
