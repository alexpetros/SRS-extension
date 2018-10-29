import React from 'react'
import CardStack from './card-stack'

const testCards = [
  {
    title: 'Card #1',
    content: 'Airspeed velocity of an unladen swallow',
  },
  {
    title: 'Card #2',
    content: 'Airspeed velocity of an unladen swallow',
  },
  {
    title: 'Card #3',
    content: 'Airspeed velocity of an unladen swallow',
  },
  {
    title: 'Card #4',
    content: 'Airspeed velocity of an unladen swallow',
  },
]


const App = () => {
  return (
    <CardStack cards={testCards} />
  )
}

export default App
