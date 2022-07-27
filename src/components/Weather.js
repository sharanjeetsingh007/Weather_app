import React, { useState } from 'react'
import './Weather.css'
import moment from 'moment';


function Weather({ weatherData, country }) {

    // Creating Date instance and getting the time
    let date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes;
    let pmam = ampm

    // states 
    const [timeIs, setTimeIs] = useState(strTime)
    const [pmamIs, setPmamIs] = useState(pmam)


    // galling instance Date every second 
    setInterval(() => {

        let date = new Date();

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes;
        let pmam = ampm

        setTimeIs(strTime)
        setPmamIs(pmam)
    }, 1000)


    return (
        <div className='weather'>
            <div className='weather__main'>
                <div className='left__time__date'>
                    <h1 className='time__current'>{timeIs}<span>{pmamIs}</span></h1>
                    <h3>{moment().format('dddd, MMMM Do YYYY')}</h3>
                </div>
                <div className='right__location'>
                    <h1>{weatherData.name}</h1>
                    <h3>{country}</h3>
                </div>
            </div>
        </div>
    )
}

export default Weather;