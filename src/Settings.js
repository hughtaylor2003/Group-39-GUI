// Settings.js
import React, { useState } from 'react';

export default function Settings({ onSubmit }) {
  const [suntimes, setsuntimes] = useState(false);
  const [humidity, sethumidity] = useState(false);
  const [uvi, setuvi] = useState(false);

  const handleSubmit = () => {
    onSubmit({ suntimes, humidity, uvi });
  };

  return (
    <div style={{ width: '300px', height: '300px', border: '1px solid black', padding: '20px' }}>
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
        ShowUVI
        </label>
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
