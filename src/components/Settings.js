// Settings.js
import React, { useState} from 'react';
import './Settings.css'; // Importing the CSS file

export default function Settings({ isOpen, onSubmit }) {
  const [suntimes, setsuntimes] = useState(false);
  const [winddir, setwindir] = useState(false);
  const [uvi, setuvi] = useState(false);
  const [Farenhight, setFarenhight] = useState(false);

  const [humidity, sethumidity] = useState(false);
  const [windspeed, setwindspeed] = useState(false);
  const [pop, setpop] = useState(false);
  const [rain, setrain] = useState(false);
  const [temp, settemp] = useState(false);


  const handleSubmit = () => {
    onSubmit({ suntimes, winddir, uvi, Farenhight, humidity, windspeed, pop, rain, temp});
  };



  return (
    <>
    {isOpen && (
       <div className="settings-overlay">
       <div className="settings-container">
       <div>
         <label>
           <input type="checkbox" checked={suntimes} onChange={() => setsuntimes(!suntimes)} />
           Show Suntimes
         </label>
       </div>
       <div>
         <label>
           <input type="checkbox" checked={winddir} onChange={() => setwindir(!winddir)} />
           Show Wind Direction
         </label>
       </div>
       <div>
         <label>
           <input type="checkbox" checked={uvi} onChange={() => setuvi(!uvi)} />
           Show UVI
         </label>
       </div>
       <div>
         <label>
           <input type="checkbox" checked={Farenhight} onChange={() => setFarenhight(!Farenhight)} />
           Farenhight
         </label>
       </div>

       <div>
         <label>
           <input type="checkbox" checked={humidity} onChange={() => sethumidity(!humidity)} />
           Show Humidity 
         </label>
       </div>

       <div>
         <label>
           <input type="checkbox" checked={windspeed} onChange={() => setwindspeed(!windspeed)} />
           Show Wind Speed 
         </label>
       </div>

       <div>
         <label>
           <input type="checkbox" checked={pop} onChange={() => setpop(!pop)} />
           Show Probability Of Precipitation
         </label>
       </div>

       <div>
         <label>
           <input type="checkbox" checked={rain} onChange={() => setrain(!rain)} />
           Show Total Precipitation
         </label>
       </div>

       <div>
         <label>
           <input type="checkbox" checked={temp} onChange={() => settemp(!temp)} />
           Show Max And Min Temperature 
         </label>
       </div>


       <button onClick={handleSubmit}>Save Settings</button>
     </div>
     </div>
    )
    }
    </> 
  );
}
