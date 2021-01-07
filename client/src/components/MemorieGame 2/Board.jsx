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
  const [completedCount, setcompletedCount] = useState(0)
  const [result, setresult] = useState("")
  
 const onCardClick = card => () => {
    //chekersfull compasation to check if we have two cards inside our array checkers
    //cardAlreadyInCheckers check if a card is in checkers
    if (checkersFull(checkers) || cardAlreadyInCheckers(checkers, card)) return
    //the state checkers dose not change immidiatly it needs to be saved in a new variable 
    //newChekers
    /*setchekersCount(chekersCount-5)*/
    setcompletedCount(completedCount-5)
    const newCheckers = [...checkers, card]
    setCheckers(newCheckers)
    //validateCheckers confirm that we have the same card 
    const cardsInCheckersMatched = validateCheckers(newCheckers)
    if (cardsInCheckersMatched) {
      setcompletedCount(completedCount+10)
      setCompleted([...completed, newCheckers[0].type])
      console.log(completed)
      
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
    function  completedFull(completed){
      return completed.length ===6
    }
    //wait some time so that the user can see the cards 
    function resetCheckersAfter(time) {
      setTimeout(() => {
        setCheckers([])
      }, time)
    }
    function score(){
      if(completedCount===-100){
        setresult(result+'you lost!')
      
      }else if (completedFull(completed)){
        setresult(result+"Awesome!, You won the game") 
      
      }
    }
    score()
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
  function restart(){
    setCards(props.cards)
    setCheckers([])
    setCompleted([])
    setcompletedCount(0)
    setresult("")
  }
  return (
    <div>
        <h2 className='completed'> score : {completedCount}</h2>
       
    <div className="Board">
      {cards.map(card => (
        <Card {...card} onClick={onCardClick(card)} key={card.id} />
      ))}
    </div>
    <button className='result' onClick={restart}>Play again</button>
    <h2 className='moves'>{result}</h2>
    </div>
  )
}

export default Board