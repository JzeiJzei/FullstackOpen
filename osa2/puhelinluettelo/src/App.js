import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({filter, handleFilter, persons}) => (
  <>
    <p>Filter contacts with:</p><input value={filter} onChange={handleFilter}></input>
    <h4>Filter results:</h4>
    {filter === '' ? <p>No results - Type above to find people.</p> :
    persons.filter( person => person.name.toLowerCase().includes(filter.toLowerCase()) === true )
            .map( per => <div key={per.name}>{per.name} {per.number}</div> )}
  </>
)

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => (
  <>
    <form onSubmit={addPerson}>
      <div>
        <p>name: <input value={newName} onChange={handleNameChange}/></p>
        <p>number: <input type="tel" value={newNumber} onChange={handleNumberChange}/></p>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
)

const People = ({persons}) => (
  <>
    {persons.map( person => <div key={person.name}>{person.name} {person.number}</div> )}
  </>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const person = {
      name: newName,
      number: newNumber
    }

    if (persons.filter(obj => obj.name === person.name).length > 0) {
      alert(`${person.name} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(person))
      //console.log(event.target)
    }

    axios
      .post('http://localhost:3001/persons', person)
      .then( response => console.log(response))
      .catch( error => console.log(error))

    setNewNumber('')
    setNewName('')
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    //console.log(event.target.value)
    setFilter(event.target.value)
  }

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then( response => {
        //console.log(response)
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} persons={persons}/>
      <h3>Add a contact</h3>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <People persons={persons}/>
    </div>
  )
}

export default App
