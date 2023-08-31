const Header = ({ course }) => {
    return (
      <div>
        <h1>{course}</h1>
      </div>
    )
}
  
const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => 
        <Part key={part.id} part={part.name} exercises={part.exercises} />
        )}
    </div>
  )
}

const Total = ({ parts }) => {
  const initialValue = 0
  const total = parts.reduce( (sum, part) => sum + part.exercises, initialValue)
  
  return (
    <p>
      <b>total of {total} exercises</b> 
    </p>
  )
}

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course =>
        <div key={course.id}>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts}/>
        </div>
      )}
    </div>
  )
}

export default Course