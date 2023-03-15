import React, {useState} from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&lang=fr&units=metric&appid=fa068a1ee4dc778c604e7b42f9e95585`

  const searchLocation = () => {
      axios.get(url)
           .then((response) => {
            setData(response.data)
            console.log(response.data)
           })
           setLocation('')
  }
  return (
    <div className="app">
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        placeholder= 'Entrer localisation'
        type="text" />
        <button onClick={searchLocation}>Envoyer</button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°c</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].description}</p> : null}
            </div>
          </div>
        </div>
        {data.name !== undefined && 
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°c</p> : null}
              <p>Ressenti</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}</p> : null}
              <p>Humidité</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} km/h</p> : null}
              <p>Vitesse du vent</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
