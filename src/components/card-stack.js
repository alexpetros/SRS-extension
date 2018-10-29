import React, { Component } from 'react'
import Card from './info-card'

export default class CardStack extends Component {
  constructor(props) {
    super()

    this.state = {
      index: 0,
    }
  }

  // moveRight() {
  //   if (index < this.props.cards.length - 3) {
  //     this.setState({count: this.state.count + 1})
  //   }
  // }

  render() {
    const { cards } = this.props
    const { index } = this.state

    return (
      <div className="card-stack">
        <Card className="first-card" {...cards[index]} />
        <Card className="second-card" {...cards[index + 1]} />
        <Card className="third-card" {...cards[index + 2]} />
      </div>
    )
  }
}
