import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import CountryDetails from './components/CountryDetails'
import countriesService from './services/countriesService'
import WeatherDetails from './components/WeatherDetails'

const App = () => {
  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(null)

  useEffect(() => {
    countriesService
      .getAll()
      .then(initialCountries => {
        setCountries(initialCountries)
      })
  }, [])

  useEffect(() => {
    if (countries) {
      setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase())))
    }
  }, [filter, countries])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  
  return (
      <div>
        <Filter onChange={handleFilterChange} />
        <CountryList
          countries={filteredCountries}
          setFilter={setFilter}
        />
        <CountryDetails countries={filteredCountries} />
        <WeatherDetails countries={filteredCountries} />
      </div>
  )
}

  export default App
