import { useState, useEffect } from 'react'
import weatherService from '../services/weatherService'

const WeatherDetails = ({ countries }) => {
    const [weather, setWeather] = useState(null)

    const capital = countries && countries.length > 0
    ? countries[0].capital[0]
    : null

    useEffect(() => {
        weatherService
            .getWeather(capital)
            .then(initialWeather => {
                setWeather(initialWeather)
            })
            .catch(error => {
                setWeather(null)
            })
    }, [countries, capital])

    if (!countries || countries.length > 1 || !weather) {
        return null
    }

    return (
        <div>
            <h2>Weather in {capital}</h2>
            <div>temperature {weather.temperature} Celsius</div>
            <img src={weather.iconUrl} />
            <div>wind {weather.wind} m/s</div>
        </div>
    )
}

export default WeatherDetails