import React, { useState, useEffect } from 'react';
import Card from './Card'
import uuidv1 from 'uuid/v1'

const App = () => {
  const [cards, setCards] = useState([])
  const [todoBeingEdited, setTodoBeingEdited] = useState(null)

  const handleNewNote = () => {
    setCards(prevCards => {
      return [...prevCards, uuidv1()]
    })
  }

    useEffect(() => {
      const handleClick = (e) => {
        let id = e.target.getAttribute('todoid')
        if (id) { 
          setTodoBeingEdited(id)
        } else if (e.target.name === 'description'){
          return
        } else {
          setTodoBeingEdited(null)
        }
      }

      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }, [])


  return (
      <div className="container">
        <div className="sidebar">
          <button onClick={handleNewNote}>New Note</button>
        </div>
        <div className="board">
          {cards.map((cardId, index) => {
            return <Card 
              cardId={cardId} 
              key={index}
              setCards={setCards}
              todoBeingEdited={todoBeingEdited}
              setTodoBeingEdited={setTodoBeingEdited}
            />
          })}
        </div>
      </div>
    )
}

export default App;
