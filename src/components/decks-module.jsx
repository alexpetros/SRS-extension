import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'

import { getUser, deleteDeck, uploadDeck } from '../api'

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

    this.updateList = this.updateList.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.uploadFile = this.uploadFile.bind(this)
  }

  componentDidMount() {
    this.updateList()
  }

  onDeleteClick(deckName) {
    const { confirmDelete } = this.state
    const { username } = this.props

    // delete item and reset confirmation
    if (confirmDelete === deckName) {
      deleteDeck(username, deckName).then((res) => {
        this.updateList()
      })
    // otherwise just set the icon to confirm the deletion
    } else {
      this.setState({ confirmDelete: deckName })
    }
  }

  updateList() {
    const { username } = this.props
    return getUser(username).then((user) => {
      this.setState({ decks: user.decks, confirmDelete: null })
    })
  }

  uploadFile(event) {
    const { username } = this.props
    const file = event.target.files[0]
    const deckName = file.name.slice(0, -4)

    const data = new FormData()
    const config = { 'content-type': 'multipart/form-data', type: 'text/csv' }
    data.append('action', 'ADD')
    data.append('param', 0)
    data.append('secondParam', 0)
    data.append('file', file, config)

    uploadDeck(username, data, deckName).then((res) => {
      this.updateList()
    })
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
        <div className="add-deck">
          <input type="file" onChange={this.uploadFile} />
        </div>
      </div>
    )
  }
}
