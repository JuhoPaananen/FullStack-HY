import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
const api_key = import.meta.env.VITE_SOME_KEY

const getWeather = (capital) => {
    const request = axios.get(`${baseUrl}?q=${capital}&appid=${api_key}&units=metric`)
    return request.then(response => {
        const data = response.data
        const temperature = data.main.temp
        const icon = data.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
        const wind = data.wind.speed

        return { temperature, iconUrl, wind }
    })
}

export default { getWeather }
