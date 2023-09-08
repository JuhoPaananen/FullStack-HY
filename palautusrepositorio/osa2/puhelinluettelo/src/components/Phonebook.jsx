const Phonebook = ({ persons, deletePerson }) => {
  return (
      <div>
        {persons.map(person =>
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </div>
        )}
      </div>
    )
  }

export default Phonebook