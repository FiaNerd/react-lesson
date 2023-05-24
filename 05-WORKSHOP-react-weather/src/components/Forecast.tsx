import React from 'react'
import forecastBanner from '../assets/images/forecast-banner.png'
import day from '../assets/images/day.svg'
import night from '../assets/images/night.svg'
import { ICurrentWeather } from '../types'

interface IProps {
    currentWeather: ICurrentWeather 
}


const Forecast: React.FC<IProps> = ({ currentWeather }) => {


        const now = Math.round(Date.now() / 1000);
    
        const banner = (now > currentWeather.sys.sunrise && now < currentWeather.sys.sunset) ?
        day
        : night


   
	return (
		<div id="forecast">
			<div className="card">

				<img src={banner} className="card-img-top" alt="Daytime, nighttime, daytime, nighttime"/>

				<div className="card-body">
					<h5 className="card-title" id="location">
						<span id="city">{currentWeather.name}</span>,
						<span id="country">{currentWeather.sys.country}</span>
					</h5>
					<p className="temp">
						<span id="temperature">{currentWeather.main.temp}</span>
						&deg;C
					</p>
					<p className="humidity">
						<span id="humidity">{currentWeather.main.humidity}</span> % humidity
					</p>
					<p className="wind">
						<span id="windspeed">{currentWeather.wind.speed}</span> m/s {currentWeather.wind.deg}&deg;
					</p>

					{/*
					<ul className="conditions">
						<li><img src="" title="CONDITION_MAIN" alt="CONDITION_MAIN">CONDITION_DESCRIPTION</li>
					</ul>

					<p className="text-muted small">
						<span>
							1970-01-01 13:37:00
						</span>
					</p>
					*/}
				</div>

			</div>
		</div>
	)
}

export default Forecast
