import React from 'react'
import Board from './Board'
import backImg from '../MemorieGame/image/back.jpeg'
import dairyMilk from '../MemorieGame/image/dmilk.jpg'
import ferreroRocher from '../MemorieGame/image/ferreroRocher.jpg'
import galaxy from '../MemorieGame/image/galaxy.jpg'
import maistro from '../MemorieGame/image/maistro.jpg'
import milka from '../MemorieGame/image/milka.jpg'
import said from '../MemorieGame/image/said.png'
import twix from '../MemorieGame/image/twix.jpeg'
function Main() {
  const cards = buildCards()
  return (
    <div className="App">
      <Board cards={cards} />
    </div>
  )
}

export default Main
// the function build card we have an image obj that contain 7 keys ech key create 2 cards object
// the we use the reduce function to iterate though every key in that object ,
function buildCards() {
  let id = 0
  //we have 7 paire of imagise to work with
  const images = {dairyMilk, ferreroRocher, galaxy, maistro, milka, said, twix}
  const cards = Object.keys(images).reduce((result, item) => {
    //each card have an id ,front image to hold the image when the card is open 
    //backImg when the card is closed and flipped to check if the card is flipped or not 
    //with each key we call(getCard()) twice to make two objects 
     
    const getCard = () => ({
      id: id++,
      type: item,
      backImg,
      frontImg: images[item],
      flipped: false,
    })
    return [...result, getCard(), getCard()]
  }, [])
  return suffle(cards)
}
// because we cant have the same pic next to each other we need th shffule func
//to rendemly put the images 
//this function takes an array as a parameter an deturn an other one rendom 
//it's loope through an array and replace each item with a random one   
function suffle(arr) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    let randomIdx = Math.floor(Math.random() * len)
    let copyCurrent = {...arr[i]}
    let copyRandom = {...arr[randomIdx]}
    arr[i] = copyRandom
    arr[randomIdx] = copyCurrent
  }
  return arr
}