import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {

const [countries, setCountries] = useState([])
const [filter, setFilter] = useState('')
const [showCountry, setShowCountry] = useState(false)
const [countryFilter, setCountryFilter] = useState('')

const handleFilter = (event) => {
  //console.log(event)
  setFilter(event.target.value)
}

const handleShowCountry = (event) => {
  //console.log(event.target.parentElement.firstChild.textContent)
  setShowCountry(true)
  setCountryFilter(event.target.parentElement.firstChild.textContent)
  //console.log(showCountry)
}

const handleCloseCountry = (event) => {
  //console.log(event)
  setShowCountry(false)
  setCountryFilter('')
  setFilter('')
  //console.log(filter)
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
      return  <div key={displayCountries[0].name.common} onLoad={handleShowCountry}>
                      <Country 
                      name={displayCountries[0].name.common} 
                      capital={displayCountries[0].capital} 
                      area={displayCountries[0].area} 
                      languages={displayCountries[0].languages}
                      flag={displayCountries[0].flags.png}/>
                      <CloseCountry onclickFunction={handleCloseCountry} showcountry={showCountry}/>
              </div>
    } else {
      //{console.log(showCountry)}
      return displayCountries.map( country => <div key={country.name.common}><li>{country.name.common} <Button onclick={handleShowCountry} showcountry={showCountry}/></li></div>  )
    }
}


const filteredCountries = showCountry ? displayFilter(countries, countryFilter)  : displayFilter(countries,filter);


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

const CloseCountry = ({onclickFunction, showcountry}) => {
  return(
    <>
      <Button onclick={onclickFunction} showcountry={showcountry}  />
    </>
  )
}

const Button = ({onclick,showcountry}) => {
  return (
    <>
      <button onClick={onclick}>{showcountry ? 'Close' : 'Show'}</button>
    </>
  )
}

export default App;
