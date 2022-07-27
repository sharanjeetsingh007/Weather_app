import React from 'react'
import './CardForcast.css'
import moment from 'moment';


function CardForcast({ icon, day, temp }) {
    return (
        <div className='cardforcast'>
            <div className='forcast_label'>{moment(day).format('ddd')}</div>
            <img alt='weather' src={` http://openweathermap.org/img/wn/${icon}@2x.png`} />
            <h3>{Math.round(temp - 273.15)}&deg;</h3>
        </div>
    )
}

export default CardForcast