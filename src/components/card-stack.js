import React, { Component } from 'react'
import Card from './info-card'

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

export default class CardStack extends Component {
  constructor(props) {
    super()
  }

  render() {
    const firstCardProps = testCards[0]

    return (
      <Card {...firstCardProps} />
    )
  }
}
