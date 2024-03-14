// Settings.js
import React, { useState} from 'react';
import './Settings.css'; // Importing the CSS file

export default function Settings({ isOpen, isClosed, onSubmit }) {
  const [suntimes, setsuntimes] = useState(false);
  const [humidity, sethumidity] = useState(false);
  const [uvi, setuvi] = useState(false);
  const [Farenhight, setFarenhight] = useState(false);
  
  const handleSubmit = () => {
    onSubmit({ suntimes, humidity, uvi, Farenhight});
  };

  const handleBackButtonClick = () => {
    isClosed();
  }



  return (
    <>
    {isOpen && (
       <div className="settings-container">
        <button onClick={handleBackButtonClick}>Back</button>
       <div>
         <label>
           <input type="checkbox" checked={suntimes} onChange={() => setsuntimes(!suntimes)} />
           Show Sunrise
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
       <button onClick={handleSubmit}>Submit</button>
     </div>

    )
    }
    </> 
  );
}
