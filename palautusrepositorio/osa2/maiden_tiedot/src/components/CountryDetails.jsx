const CountryDetails = ({ countries }) => {
    if (!countries || countries.length > 1 || countries.length === 0) {
        return null
    }

    const country = countries[0]
    
    return (
        <div>
            <h1>{country.name.common}</h1>
            <div>capital {country.capital[0]}</div>
            <div>area {country.area}</div>
            <h2>languages:</h2>
            <ul>
                {Object.values(country.languages).map(language =>
                    <li key={language}>{language}</li>
                )}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt} width="200" />
        </div>
    )
}

export default CountryDetails