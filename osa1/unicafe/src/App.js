import React from 'react';
import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad;

  if(all > 0){
    return(
      <>
        <h2>Statistics</h2>
        <p>Good {good}</p> 
        <p>Neutral {neutral}</p> 
        <p>Bad {bad}</p>
        <p>All {all}</p>
        <p>Average {(good - bad)/all}</p>
        <p>Positive {(good/all)*100}%</p>
      </>
    )
  } else {
    return(
      <>
        <p>No feedback given.</p>
      </>
    )
  }
  
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={()=>{setGood(good+1)}}>good</button>
      <button onClick={()=>{setNeutral(neutral+1)}}>neutral</button>
      <button onClick={()=>{setBad(bad+1)}}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App