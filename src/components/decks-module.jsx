import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'

import { getUser } from '../api'

const DeckRow = (props) => {
  const { deckName, isConfirming, onDeleteClick } = props

  return (
    <div className="deck-row">
      <div>{deckName}</div>
      <FontAwesomeIcon
        icon={isConfirming ? faTrash : faMinus}
        onClick={() => { onDeleteClick(deckName) }} />
    </div>
  )
}

export default class decksModule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      confirmDelete: null,
      decks: [],
    }

    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentDidMount() {
    const { username } = this.props

    // get the user's profile in order to display decks
    getUser(username).then((user) => {
      this.setState({ decks: user.decks })
    })
  }

  onDeleteClick(deckName) {
    const { confirmDelete } = this.state

    if (confirmDelete) {
      // delete item and reset confirmation
      this.setState({ confirmDelete: null })
    } else {
      this.setState({ confirmDelete: deckName })
    }
  }

  render() {
    const { decks, confirmDelete } = this.state

    return (
      <div className="decks-module">
        <div className="title">Current Decks</div>
        <div className="deck-list">
          {
            decks.map(deck => (
              <DeckRow
                deckName={deck}
                key={deck}
                onDeleteClick={this.onDeleteClick}
                isConfirming={confirmDelete === deck} />))
          }
        </div>
      </div>
    )
  }
}
