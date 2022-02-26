import React from 'react';
import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456' },
      { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Dan Abramov', number: '12-43-234345' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
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

  const handleFilter = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <p>Filter contacts with:</p><input value={filter} onChange={handleFilter}></input>
      <h4>Filter results:</h4>
      {filter === '' ? <p>No results - Type above to find people.</p> :
      persons.filter( person => person.name.toLowerCase().includes(filter.toLowerCase()) === true )
              .map( per => <div key={per.name}>{per.name} {per.number}</div> )}
      <form onSubmit={addPerson}>
        <h3>Add a contact</h3>
        <div>
          <p>name: <input value={newName} onChange={handleNameChange}/></p>
          <p>number: <input type="tel" value={newNumber} onChange={handleNumberChange}/></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <p>People on Phonebook</p>
      {persons.map( person => <div key={person.name}>{person.name} {person.number}</div> )}
    </div>
  )

}

/*if(person.name.includes(filter)) <div key={person.name}>{person.name} {person.number}</div>*/

export default App
