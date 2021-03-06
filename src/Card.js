import React, { useState, useRef, useEffect } from "react"
import uuidv1 from 'uuid/v1'

const Card = (props) => {
  const [isAddingTodo, setIsAddingTodo] = useState(false)
  const [todos, setTodos] = useState([])
  const editTitleInput = useRef(null)
  const addTodoInput = useRef(null)
  const editTodoInput = useRef(null)

  useEffect(() => {
    [editTitleInput, addTodoInput, editTodoInput].forEach((input) => {
      if (input.current) {
        input.current.focus()
      }
    })
  })

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

  const handleAddTodoKeypress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo()
    }
  }

  const handleCancelAddTodo = () => {
    setIsAddingTodo(false)
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

  const getTodoIndex = (id) => todos.findIndex(todo => todo.id === id)

  const handleSubmitEdit = (e) => {
    if (e.key === 'Enter') {
      props.setIdBeingEdited(null)
    }
  }

  const handleClick = (e, todoId) => {
    let name = e.target.getAttribute('name')

    if (name === 'editTodo') {
      props.setIdBeingEdited(todoId)
      return
    }
  }

  const handleTodoChange = (id, name, value) => {
    setTodos(prevTodos => {
      let newTodos
      let index = getTodoIndex(id)
      let todo = getTodoClone(id)

      if (name === 'completed') {
        todo.completed = !todo.completed
      }

      if (name === 'input') {
        todo.description = value
      }
      
      newTodos = prevTodos.filter(todo => todo.id !== id)
      newTodos.splice(index, 0, todo)

      return newTodos
    })
  }

  const handleChange = (e, id) => {
    let name = e.target.getAttribute('name')
    let type = e.target.dataset.type
    let value = e.target.value

    if (type === 'todo') {
      handleTodoChange(id, name, value)
    }

    if (type === 'card') {
      props.handleCardChange(id, value)
    }
  }

  return (
    <div className={"card col-12 col-sm-6 col-md-4 col-lg-3 d-flex p-3 " + (props.cardHover ? 'card-selected' : "")}>
      <button type="button" className="close close-card" aria-label="Close"
      onClick={() => props.handleDeleteCard(props.cardId)}>
        <span aria-hidden="true">&times;</span>
      </button>
      {props.idBeingEdited === props.cardId ?
      <input type="text" name="input" value={props.cardTitle} data-type="card"
      onKeyPress={handleSubmitEdit} ref={editTitleInput} className="w-50 mx-auto"
      onChange={(e) => handleChange(e, props.cardId)}/> :
      <h2 className="mx-auto" data-id={props.cardId}>
        {props.cardTitle}
      </h2>
      }
      <ul className="list-group list-group-flush mb-3">
        {todos.map((todo, index) => {
          return (<li key={index}
                    className={`list-group-item d-flex
                    align-items-center
                    ${todo.completed ? "completed" : undefined}`}>
                      <input type="checkbox" 
                      name="completed"
                      className="mr-2"
                      checked={todo.completed}
                      data-type="todo"
                      onChange={(e) => handleChange(e, todo.id)}>
                      </input>

                    {props.idBeingEdited === todo.id ?
                      <input type="text" name="input" value={todo.description} data-type="todo"
                      onKeyPress={handleSubmitEdit} ref={editTodoInput}
                      onChange={(e) => handleChange(e, todo.id)} className="w-100"/> :
                      <>
                        <span name="editTodo" data-id={todo.id}
                        onClick={(e) => handleClick(e, todo.id)}>
                          {todo.description}
                        </span>
                        <span className="ml-auto">
                          <i className="fas fa-trash" onClick={() => handleRemoveTodo(todo.id)}></i>
                        </span>
                      </>
                    }
                  </li>)
        })}
      </ul>
      {isAddingTodo ?
        <>
          <input type= "text" className="mt-auto mb-2" id={props.cardId} ref={addTodoInput}
            onKeyPress={handleAddTodoKeypress}/>
          <div className="mx-auto">
            <button onClick={handleAddTodo}
            className="mx-auto btn btn-outline-primary">
              Add Todo
            </button>
            <button onClick={handleCancelAddTodo}
            className="mx-auto btn btn-outline-primary">
              Cancel
            </button>
          </div>
        </> :
        <button className="mt-auto mx-auto btn btn-outline-primary" onClick={showAddTodoForm}>
          <i className="fas fa-plus"></i> Add Todo
        </button>
      }
    </div>
  )
}

export default Card