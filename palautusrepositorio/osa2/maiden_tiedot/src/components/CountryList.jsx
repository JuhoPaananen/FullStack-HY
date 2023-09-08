const CountryList = ({ countries, setFilter }) => {
    const handleShowCountry = (country) => {
        setFilter(country.name.common)
    }

    if (!countries || countries.length === 1 || countries.length === 0) {
        return null
    }

    if (countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    }

    return (
        <div>       
            {countries.map(country =>
                <div key={country.name.common}>
                {country.name.common}
                <button onClick={() => handleShowCountry(country)}>show</button>
                </div>
        )}
        </div>
    )
}

export default CountryList
