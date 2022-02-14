import React from 'react';
import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {
  let all = good + neutral + bad;

  if(all > 0){
    return(
      <>
        <table>
          <thead>
            <tr>
              <th>Statistics</th>
            </tr>
          </thead>
          <tbody>
            <StatisticLine text="Good" value={good} />
            <StatisticLine text="Neutral" value={neutral} />
            <StatisticLine text="Bad" value={bad} />
            <StatisticLine text="All" value={all} />
            <StatisticLine text="Average" value={(good - bad)/all} />
            <StatisticLine text="Positive" value={((good/all)*100) + "%"} />
          </tbody>
        </table>
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

const StatisticLine = ({text, value}) => {
  return(
    <>
      <tr>
        <th>{text}</th>
        <td>{value}</td>
      </tr>
    </>
  )
}

const Button = ({text, func}) => {
  return(
    <>
      <button onClick={func}>{text}</button>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button func={()=>{setGood(good+1)}} text="Good" />
      <Button func={()=>{setNeutral(neutral+1)}} text="Neutral" />
      <Button func={()=>{setBad(bad+1)}} text="Bad"/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App