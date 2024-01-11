import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Phonebook from './components/Phonebook'
import numberService from './services/numbers'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
      numberService
        .getAll()
        .then(initialNumbers => {
          setPersons(initialNumbers)
        })
  }, [])
  
  const addNumber = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === newName)) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        numberService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              `Changed ${newName}'s number`
            )    
          })
          .catch(error => {
            setErrorMessage(
              `Information of ${newName} has already been removed from server`
            )
          })
      }
      return
    }
    numberService
      .add(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setErrorMessage(
          `Added ${newName}`
        )
      })
      .catch(error => {
        console.log(error.response.data)
        setErrorMessage(
          error.response.data.error
        )
      }
    )
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      numberService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setErrorMessage(
            `Deleted ${person.name}`
          )
        })
    }
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />

      <Filter onChange={handleFilterChange} />
      
      <h3>add a new</h3>

      <PersonForm 
        onSubmit={addNumber} 
        name={newName} 
        handleName={handleNameChange} 
        number={newNumber} 
        handleNumber={handleNumberChange} 
      />
      
      <h3>Numbers</h3>

      <Phonebook 
        persons={personsToShow} 
        deletePerson={deletePerson}
        />
    </div>
  )

}

export default App