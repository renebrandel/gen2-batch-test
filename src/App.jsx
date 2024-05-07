import { useState } from 'react'
import './App.css'
import { generateClient } from 'aws-amplify/data'

/**
 * @type {import('aws-amplify/data').Client<import('../amplify/data/resource').Schema>}
 */
const client = generateClient()


function App() {
  const [todos, setTodos] = useState([])

  return (
    <>
      <button onClick={async () => {
        const { data: todos } = await client.models.Todo.list()

        setTodos(todos)
      }}>Fetch todos</button>
      <button onClick={async () => {
        const { data, errors } = await client.mutations.createManyTodos({ authMode: 'apiKey'})
        console.log(data, errors)
      }}>Batch create todos</button>
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.content}</li>)}
      </ul>
    </>
  )
}

export default App
