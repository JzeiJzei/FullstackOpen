import React from 'react';
 
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
        <Course course={course} />
      )}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  )
}

const Header = (props) => {
  return(
    <>
      <h2>{props.course}</h2>
    </>
  )
}

const Content = ({parts}) => {
  return(
    <>
      {parts.map((part, key) => 
        <Part part={part.name} exercises={part.exercises} key={key} />
      )}
    </>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((prev, part) => prev + part.exercises, 0)
  return(
    <>
      <h4>Number of exercises {total}</h4>
    </>
  )
}

const Part = (props) => {
  return(
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )
}


export default App;
