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
           <p>Show Suntimes</p>
           <input type="checkbox" checked={suntimes} onChange={() => setsuntimes(!suntimes)} />
         </label>
       </div>
       <div>
         <label>
           <p>Show Wind Direction</p>
           <input type="checkbox" checked={winddir} onChange={() => setwindir(!winddir)} />
         </label>
       </div>
       <div>
         <label>
           <p>Show UVI</p>
           <input type="checkbox" checked={uvi} onChange={() => setuvi(!uvi)} />
         </label>
       </div>
       <div>
         <label>
           <p>Farenhight</p>
           <input type="checkbox" checked={Farenhight} onChange={() => setFarenhight(!Farenhight)} />
         </label>
       </div>

       <div>
         <label>
           <p>Show Humidity</p>
           <input type="checkbox" checked={humidity} onChange={() => sethumidity(!humidity)} />
         </label>
       </div>

       <div>
         <label>
           <p>Show Wind Speed</p>
           <input type="checkbox" checked={windspeed} onChange={() => setwindspeed(!windspeed)} /> 
         </label>
       </div>

       <div>
         <label>
           <p>Show Probability Of Precipitation</p>
           <input type="checkbox" checked={pop} onChange={() => setpop(!pop)} />
         </label>
       </div>

       <div>
         <label>
           <p>Show Total Precipitation</p>
           <input type="checkbox" checked={rain} onChange={() => setrain(!rain)} />
         </label>
       </div>

       <div>
         <label>
           <p>Show Max And Min Temperature</p>
           <input type="checkbox" checked={temp} onChange={() => settemp(!temp)} />
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
