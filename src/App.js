import React, { useState, useEffect } from 'react';
import Card from './Card'
import uuidv1 from 'uuid/v1'

const App = () => {
  const [cards, setCards] = useState([])
  const [idBeingEdited, setIdBeingEdited] = useState(null)

  const handleNewNote = () => {
    let date = new Date(Date.now())
    let day = date.getDate()
    let month = date.getMonth() + 1

    setCards(prevCards => {
      return [...prevCards, {
        id: uuidv1(),
        title: `${month}/${day}`,
        hovered: false,
      }]
    })
  }

  const getCardClone = (id) => {
    let card = {
      ...cards.find(card => card.id === id)
    }

    return card
  }

  const getCardIndex = (id) => cards.findIndex(card => card.id === id)

  const handleDeleteCard = (cardId) => {
    setCards(prevCards => {
      return prevCards.filter(card => card.id !== cardId)
    })
  }

  const handleHoverOn = (cardId) => {
    setCardProperty(cardId, 'hover', true)
  }

  const handleHoverOff = (cardId) => {
    setCardProperty(cardId, 'hover', false)
  }

  const setCardProperty = (id, property, value) => {
    setCards(prevCards => {
      let newCards
      let index = getCardIndex(id)
      let card = getCardClone(id)

      card[property] = value

      newCards = prevCards.filter(card => card.id !== id)
      newCards.splice(index, 0, card)

      return newCards
    })
  }

  const handleCardChange = (id, value) => {
    setCardProperty(id, 'title', value)
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
            <div className="row justify-content-center mt-4">
              <button onClick={handleNewNote} className="btn btn-outline-primary">
                New List
              </button>
            </div>
            <div className="row justify-content-center mt-4">
              <h3>Lists</h3>
            </div>
            <div className="row justify-content-center">
              <ul className="list-group list-group-flush">
                {cards.map((card, index) => {
                  return <li key={index} className="list-group-item sidebar-list-item mx-auto"
                    onMouseEnter={() => handleHoverOn(card.id)}
                    onMouseLeave={() => handleHoverOff(card.id)}>
                      {card.title}
                      <button type="button" className="close close-li" aria-label="Close"
                        onClick={() => handleDeleteCard(card.id)}>
                          <span aria-hidden="true">&times;</span>
                       </button>
                    </li>
                })}
              </ul>
            </div>
          </div>
          <div className="board col-9 col-md-10 pt-3">
            <div className="row">
              {cards.map((card, index) => {
                return <Card 
                  cardId={card.id}
                  cardTitle={card.title}
                  cardHover={card.hover}
                  handleCardChange={handleCardChange}
                  handleDeleteCard={handleDeleteCard}
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
