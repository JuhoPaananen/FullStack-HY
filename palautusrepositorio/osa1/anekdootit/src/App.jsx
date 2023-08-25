import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Display = ({ text, anecdote, votes }) => {
  if (text == 'Anecdote with most votes' && votes == 0) {
    return (
      <>
        <h1>{text}</h1>
        <p>No votes yet</p>
      </>
    )
  }
  
  return (
  <>
    <h1>{text}</h1>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [mostVotes, setMostVotes] = useState(0)

  const handleNext = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  
  const handleVote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    const indexOfMax = copy.indexOf(Math.max(...copy))
    setMostVotes(indexOfMax)
  }

  return (
    <div>
      <Display text="Anecdote of the day" anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNext} text="next anecdote" />
      <Display text="Anecdote with most votes" anecdote={anecdotes[mostVotes]} votes={points[mostVotes]} />
    </div>  
  )
}

export default App
