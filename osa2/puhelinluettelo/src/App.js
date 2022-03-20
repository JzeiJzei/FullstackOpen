import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios'
import notes from './services/notes';

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

const People = ({persons, deletePerson}) => (
  <>
    {persons.map( person => <div key={person.name}>{person.name} {person.number} <button id={person.id} name={person.name} onClick={deletePerson}>delete</button></div> )}
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
      number: newNumber,
      id: (persons.length + 1) // Add id key to avoid missing id on element
    }

    if (persons.filter(obj => obj.name === person.name).length > 0) {
        if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`) === true) {
        updatePerson(person)
      }
    } else {
      setPersons(persons.concat(person))

      axios
      .post('http://localhost:3001/persons', person)
      .then( response => console.log(response))
      .catch( error => console.log(error))
      //console.log(event.target)
    }

    setNewNumber('')
    setNewName('')
  }

  const updatePerson = async (person) => {
    let id = await notes.getIDbyName(person.name).then(res => {return res});
    const newDetails = {...person, id: id }
    await notes.update(id, newDetails)
        .then(res => console.log(res))
    await notes.getAll()
        .then(response => setPersons(response.data))
  }

  const deletePerson = async (event) => {

    //Delete resource after confirmation
    if(window.confirm(`Delete ${event.target.name}?`) === true){
      try{
        await notes.deleteResource(event.target.id)
              .then(res => console.log(res))
        //we need to wait for previous request to execute...
        notes.getAll()
              .then(response => setPersons(response.data))
      }catch (error){
        console.log(error)
      }
    }
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
      <People persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
