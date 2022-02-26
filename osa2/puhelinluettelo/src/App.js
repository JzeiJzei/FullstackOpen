import React from 'react';
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas', 
      number: '040-1231244'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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
      console.log(event.target)
    }

    setNewNumber('')
    setNewName('')
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          <p>name: <input value={newName} onChange={handleNameChange}/></p>
          <p>number: <input type="tel" value={newNumber} onChange={handleNumberChange}/></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map( person => <div key={person.name}>{person.name} {person.number}</div> )}
    </div>
  )

}

export default App
