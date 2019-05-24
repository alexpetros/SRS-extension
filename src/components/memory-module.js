import React, { Component } from 'react'
import ContentCard from './content-card'
import { AnswerButtonRow, ConfirmationButtonRow } from './buttons'

const QUESTION_VIEW = 'QUESTION'
const SUCCESS_VIEW = 'SUCCESS'
const FAILURE_VIEW = 'FAILURE'

const FAILURE = 0.3
const SUCCESS = 0.7

class MemoryModule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: QUESTION_VIEW,
    }

    this.onYesClick = this.onYesClick.bind(this)
    this.onNoClick = this.onNoClick.bind(this)
    this.sendResponseAndReset = this.sendResponseAndReset.bind(this)
  }

  onYesClick() {
    this.setState({ view: SUCCESS_VIEW })
  }

  onNoClick() {
    this.setState({ view: FAILURE_VIEW })
  }

  sendResponseAndReset(performanceRating) {
    const { sendResponse } = this.props
    this.setState({ view: QUESTION_VIEW }, () => {
      sendResponse(performanceRating)
    })
  }

  render() {
    const { card } = this.props
    const { view } = this.state
    let buttonRow

    switch (view) {
      case QUESTION_VIEW:
        buttonRow = (
          <AnswerButtonRow
            onYesClick={this.onYesClick}
            onNoClick={this.onNoClick} />
        )
        break
      case SUCCESS_VIEW:
        buttonRow = (
          <ConfirmationButtonRow
            onClick={() => { this.sendResponseAndReset(SUCCESS) }} />
        )
        break
      case FAILURE_VIEW:
        buttonRow = (
          <ConfirmationButtonRow
            onClick={() => { this.sendResponseAndReset(FAILURE) }} />
        )
        break
      default:
        break
    }
    return (
      <div className="memory-module">
        <ContentCard
          content={card.content}
          answer={card.answer}
          displayAnswer={view !== QUESTION_VIEW}
          imageUrl={card.imageUrl} />
        {buttonRow}
      </div>
    )
  }
}

export default MemoryModule
