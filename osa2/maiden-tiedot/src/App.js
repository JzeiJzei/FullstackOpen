import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

const [countries, setCountries] = useState([])
const [filter, setFilter] = useState('')

const handleFilter = (event) => {
  console.log(event)
  setFilter(event.target.value)
}

const displayFilter = (countries, filter) => {

const displayCountries = 
    countries.filter( country => country.name.common.toLowerCase().includes(filter.toLowerCase()) === true )

    //console.log(displayCountries)
    if(filter === ''){
      return 'Type country name.'
    } else if (displayCountries.length > 10){
      return 'Too many matches, specify another filter.'
    } else if (displayCountries.length === 1) {
      return <Country name={displayCountries[0].name.common} 
                      capital={displayCountries[0].capital} 
                      area={displayCountries[0].area} 
                      languages={displayCountries[0].languages}
                      flag={displayCountries[0].flags.png}/>
    } else {
      return displayCountries.map( country => <li key={country.name.common}>{country.name.common}</li> )
    }
}

const filteredCountries = displayFilter(countries,filter)
//console.log(filteredCountries)

useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then( response => {
      //console.log(response)
      setCountries(response.data)
    })
    .catch(error => {
      console.log(error);
    })
}, [])

  return (
    <div>
      <p>Find countries</p>
      <input value={filter} onChange={handleFilter}></input>

      <h4>Filter:</h4>
      <ul>
        {filteredCountries}
      </ul>
      
    </div>
  );
}

const Country = ({name, capital, area, languages, flag}) => {
  


  return(
  <>
    {console.log(name)}
    <h1>{name}</h1>
    <img src={flag} alt={`${name}'s flag`}></img>
    <h5>Capital</h5>
    <p>{capital}</p>
    <h5>Area</h5>
    <p>{area}</p>

    <h5>Languages</h5>
    {console.log(languages)}
    <ul>{Object.keys(languages).map(key => <li key={key}>{languages[key]}</li>)}</ul>

  </>
  )
}

export default App;
