import React, { Component } from 'react'

import { getUser } from '../api'

const DeckRow = (props) => {
  const { deckName } = props

  return <div>{deckName}</div>
}

export default class decksModule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // confirmDelete: null,
      decks: [],
    }
  }

  componentDidMount() {
    const { username } = this.props

    getUser(username).then((user) => {
      this.setState({ decks: user.decks })
    })
  }

  render() {
    const { decks } = this.state

    return (
      <div>
        {decks.map(deck => <DeckRow deckName={deck} key={deck} />)}
      </div>
    )
  }
}
