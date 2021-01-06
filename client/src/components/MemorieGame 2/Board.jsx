import React, {useState, useEffect} from 'react'
import Card from './Card'
import './Board.css'
//using hooks allows you to use state and other React features without writing a class
//let you always use functions instead of having to constantly
// switch between functions, classes, higher-order components, and render props.
//3 state ; cards ,chekers, completed
const Board = props => {
  const [cards/*state*/, setCards/*setState*/] = useState(props.cards/*initial state */)
  const [checkers/*store 2 open card  */, setCheckers] = useState([])
  const [completed/*store the type of cards that match in checkers array */, setCompleted] = useState([])
  const onCardClick = card => () => {
    //chekersfull compasation to check if we have two cards inside our array checkers
    //cardAlreadyInCheckers check if a card is in checkers
    if (checkersFull(checkers) || cardAlreadyInCheckers(checkers, card)) return
    //the state checkers dose not change immidiatly it needs to be saved in a new variable 
    //newChekers
    const newCheckers = [...checkers, card]
    setCheckers(newCheckers)
    //validateCheckers confirm that we have the same card 
    const cardsInCheckersMatched = validateCheckers(newCheckers)
    if (cardsInCheckersMatched) {
      setCompleted([...completed, newCheckers[0].type])
    }

    if (checkersFull(newCheckers)) {
      resetCheckersAfter(1000)
    }
    function validateCheckers(checkers){
      return checkers.length === 2 &&
      checkers[0].type === checkers[1].type
    }
    function cardAlreadyInCheckers(checkers, card){
      return checkers.length === 1 && checkers[0].id === card.id
    }
    function checkersFull(checkers){
      return checkers.length === 2
    }
    //wait some time so that the user can see the cards 
    function resetCheckersAfter(time) {
      setTimeout(() => {
        setCheckers([])
      }, time)
    }
  }
//make the cards changed when checkers or completed changed
  useEffect(() => {
    const newCards = cards.map(card => ({
      ...card,
      flipped:
        checkers.find(c => c.id === card.id) ||
        completed.includes(card.type),
    }))
    setCards(newCards)
  }, [checkers, completed])

  return (
    <div className="Board">
      {cards.map(card => (
        <Card {...card} onClick={onCardClick(card)} key={card.id} />
      ))}
    </div>
  )
}

export default Board