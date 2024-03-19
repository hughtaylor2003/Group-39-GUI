import React from 'react';
import './Extras.css';

export default function Sunrise({data}) {
  return (
    <div className="OverlayContainer">
      <img className="OverlayImage" src={process.env.PUBLIC_URL + '/icons/SunRiseBox.svg'} alt="Sunrise"></img>
      <div className="OverlayContent">
        <div style={{width:'100%', height:'100%'}}>
        <h3 className='Morning'>8:30</h3>
        <h3 className='Evening'>3:20</h3>
      </div>
      </div>
    </div>
  );
}
