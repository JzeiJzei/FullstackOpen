import React from 'react';

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

export default Course