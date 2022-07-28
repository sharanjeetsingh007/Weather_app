import { useEffect, useState } from 'react';
import './App.css';
import Forcast from './components/Forcast';
import Loader from './components/Loader';
import Weather from './components/Weather';




function App() {

  // States

  const [newLoader, setNewLoader] = useState(true);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [weatherData, setWeatherData] = useState("");
  const [forcastData, setForcastData] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [country, setCountry] = useState("");


  // console.log(photos, 'photos')

  useEffect(() => {
    //Function to call apis for weather, forcast and unsplash

    const weatehr = async () => {

      // todayWeather
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      })


      if (lat && long !== 0) {

        try {
          const PromiseAll = await Promise.all([
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metrics&appid=${process.env.REACT_APP_API_KEY}`),
            fetch(`https://api.unsplash.com/search/photos?query={landscape}&orientation=landscape&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`),
            fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&units=metrics&appid=${process.env.REACT_APP_API_KEY}`)
          ])

          const dataForTodayWeather = await PromiseAll[0].json()
          const dataForRandomImage = await PromiseAll[1].json()
          const dataForForcast = await PromiseAll[2].json()


          // Setting for todayWeathers
          setWeatherData(dataForTodayWeather)

          // Setting Random image
          const imageUrlsAre = dataForRandomImage.results.map((item) => item.urls.full)
          const randomImage = Math.floor(Math.random() * imageUrlsAre.length);
          setPhotos(imageUrlsAre[randomImage])

          // Setting for forcast weather
          // for getting country name
          if (dataForForcast && dataForForcast.city) {
            const coutntryForcast = dataForForcast.city.country;
            setCountry(coutntryForcast)
          }
          // for getting the forcast
          const arrayForcast = dataForForcast.list;
          if (arrayForcast) {
            let midday = []
            for (let i = 0; i < arrayForcast.length; i++) {
              let dates = arrayForcast[i].dt_txt.substring(10);
              let days = arrayForcast[i].dt_txt.slice(0, 10);
              let icon = arrayForcast[i].weather[0].icon;
              let temp = arrayForcast[i].main
              if ((dates.indexOf("12:00:00") > -1) === true) {
                midday.push({ temp, days, icon })
              }
            }
            midday.shift()
            setForcastData(midday)

          }


        }
        catch (err) {
          console.log(err);
          alert(err)
        };

      }

    }

    weatehr()
  }, [lat, long])

  const loadImage = () => {
    setNewLoader(false)
  }
  return (
    <div className="App">
      <div className='loader__app'
        style={{ display: newLoader ? "block" : "none" }}
      ><Loader /></div>
      <div className='image__wrapper'>
        <img alt='background' src={photos}
          loading="lazy"
          onLoad={loadImage}
        />
        <div className='overlay'>
        </div>
      </div>
      <div className='app__body'>
        <div className='today__weather'>
          {weatherData.cod === 200 ? <Weather weatherData={weatherData} photo={photos} country={country} forcastData={forcastData} /> : <div className='error_message'> No weather</div>}
        </div>

        <div className='forcast'>
          {weatherData.cod === 200 ? <Forcast weatherData={weatherData} forcastData={forcastData} /> : <div className='error_message'></div>}
        </div>
      </div>
    </div>
  );
}

export default App;
