import React, { useState, useEffect } from 'react';
import Card from './Card'
import uuidv1 from 'uuid/v1'

const App = () => {
  const [cards, setCards] = useState([{id: 'testcard', title:'testcard'}])
  const [idBeingEdited, setIdBeingEdited] = useState(null)

  const handleNewNote = () => {
    let date = new Date(Date.now())
    let day = date.getDate()
    let month = date.getMonth() + 1

    setCards(prevCards => {
      return [...prevCards, {
        id: uuidv1(),
        title: `${month}/${day}`
      }]
    })
  }

  useEffect(() => {
    const handleClick = (e) => {
      let id = e.target.dataset.id
      if (id) { 
        setIdBeingEdited(id)
      } else if (e.target.name === 'input'){
        return
      } else {
        setIdBeingEdited(null)
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])


  return (
      <div className="container-fluid mx-0">
        <div className="row h-100">
          <div className="sidebar col-3 col-md-2">
            <div className="row justify-content-center pt-4">
              <button onClick={handleNewNote} className="btn btn-outline-primary">
                New List
              </button>
            </div>
          </div>
          <div className="board col-9 col-md-10 pt-3">
            <div className="row">
              {cards.map((card, index) => {
                return <Card 
                  cardId={card.id}
                  cardTitle={card.title} 
                  key={index}
                  cards={cards}
                  setCards={setCards}
                  idBeingEdited={idBeingEdited}
                  setIdBeingEdited={setIdBeingEdited}
                />
              })}
            </div>
          </div>
        </div>
      </div>
    )
}

export default App;
