import React from 'react';
import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array([1,3,4,6,2,5,7]))  //Set random positive values for testing

  function getInteger(min, max){
    return Math.floor(Math.random() * (max-min) ) + min;
  }

  function getMaxIndexOfArray (array) {
    let maxValue = array[0];
    let maxIndex = 0;

    for (let i = 0; i < array.length; i++) {
      if (array[i] > maxValue){
        maxIndex = i;
        maxValue = array[i];
      }
    }

    return maxIndex
  }

  const setRandomAnecdote = (random) => {
    setSelected(random);
  }

  const handleVote = () => {
      let copyPoints = [...points]
      copyPoints[selected] += 1;
      setPoints(copyPoints);
  }

  const mostPoints = getMaxIndexOfArray(points);
  

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <button onClick={handleVote}>Vote</button>
      <button onClick={() => setRandomAnecdote(getInteger(0,anecdotes.length))}>Anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostPoints]}</p>
      <p>has {points[mostPoints]} votes</p>
    </div>
  )
}

export default App