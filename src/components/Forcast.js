import React from 'react'
import CardForcast from './CardForcast/CardForcast'
import './Forcast.css'




function Forcast({ weatherData, forcastData }) {
    return (
        <div className='forcast_com'>
            <div className='forcast__main'>
                <div className='left_today'>
                    {weatherData.weather.map((item, index) => {
                        return <img alt='weather' key={index} src={` http://openweathermap.org/img/wn/${item.icon}@2x.png`} />
                    })}
                    <div className='today_temp'>
                        <div className='forcast_label'>Today</div>
                        <h1>{Math.round(weatherData?.main?.temp - 273.15)}&deg;</h1>
                    </div>
                </div>
                <div className='right__forcast'>
                    {forcastData.map((data, index) => (
                        <CardForcast forcastData={forcastData} key={index} day={data.days} icon={data.icon} temp={data.temp.temp} />

                    ))}



                </div>

            </div>

        </div>
    )
}

export default Forcast