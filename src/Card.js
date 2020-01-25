import React, { useState } from "react"
import uuidv1 from 'uuid/v1'

const Card = (props) => {
  const [isAddingTodo, setIsAddingTodo] = useState(false)
  const [todos, setTodos] = useState([])

  const showAddTodoForm = () => {
    setIsAddingTodo(true)
  }

  const handleAddTodo = () => {
    let input = document.getElementById(props.cardId).value
    setIsAddingTodo(false)

    setTodos(prevTodos => {
      return [...prevTodos, {
        description: input,
        completed: false,
        id: uuidv1(),
      }]
    })
  }

  const handleRemoveTodo = (todoId) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.id !== todoId)
    })
  }

  const getTodoClone = (id) => {
    let todo = {
      ...todos.find(todo => todo.id === id)
    }

    return todo
  }

  const handleSubmitEditTodo = (e) => {
    if (e.key === 'Enter') {
      props.setTodoBeingEdited(null)
    }
  }

  const getTodoIndex = (id) => todos.findIndex(todo => todo.id === id)

  const handleChange = (e, todoId) => {

    let name = e.target.getAttribute('name')
    let value = e.target.value

    if (name === 'editTodo') {
      props.setTodoBeingEdited(todoId)
      return
    }

    setTodos(prevTodos => {
      let newTodos
      let index = getTodoIndex(todoId)
      let todo = getTodoClone(todoId)

      if (name === 'completed') {
        todo.completed = !todo.completed
      }

      if (name === 'description') {
        todo.description = value
      }
      
      newTodos = prevTodos.filter(todo => todo.id !== todoId)
      newTodos.splice(index, 0, todo)

      return newTodos
    })
  }

  return (
    <div className="card">
      <button onClick={showAddTodoForm}>+</button>
      <ul>
        {todos.map((todo, index) => {
          return (<li key={index} className={todo.completed ? "completed" : undefined}>
                    <input type="checkbox" 
                    name="completed" 
                    checked={todo.completed}
                    onChange={(e) => handleChange(e, todo.id)}>
                    </input>

                    {props.todoBeingEdited === todo.id ?
                      <input type="text" name="description" value={todo.description}
                      onKeyPress={handleSubmitEditTodo} onChange={(e) => handleChange(e, todo.id)}/> :
                      <span name="editTodo" todoid={todo.id}
                      onClick={(e) => handleChange(e, todo.id)}>
                        {todo.description}
                      </span>}
                    <button onClick={() => handleRemoveTodo(todo.id)}>-</button>
                  </li>)
        })}
      </ul>
      {isAddingTodo &&
        <>
          <input type= "text" id={props.cardId}></input>
          <button onClick={handleAddTodo}>Add Todo</button><button>Cancel</button>
        </>
      }
      
    </div>
  )
}

export default Card