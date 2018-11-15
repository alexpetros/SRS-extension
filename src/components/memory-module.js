import React, { Component } from 'react'
import ContentCard from './content-card'
import { AnswerButtonRow, ConfirmButtonRow } from './buttons'

class MemoryModule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayAnswer: false,
      activeYes: false,
      activeNo: false,
      activeConfirm: false,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {
    // listeners need to be document-wide
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  /** enable button press-down effect */
  handleKeyDown(event) {
    const { displayAnswer } = this.state
    let newState = this.state

    if (!displayAnswer && event.key === 'f') {
      newState = { activeYes: true }
    } else if (!displayAnswer && event.key === 'j') {
      newState = { activeNo: true }
    } else if (displayAnswer) {
      newState = { activeConfirm: true }
    }

    this.setState(newState)
  }

  /** remove press-down effect and call appropriate container method */
  handleKeyUp(event) {
    const { displayAnswer } = this.state
    const { onYesClick, onNoClick, onConfirmClick } = this.props
    let newState = this.state

    if (!displayAnswer && event.key === 'f') {
      newState = { activeYes: false }
      onYesClick()
    } else if (!displayAnswer && event.key === 'j') {
      newState = { activeNo: false, displayAnswer: true }
      onNoClick()
    } else if (displayAnswer) {
      newState = { activeConfirm: false, displayAnswer: false }
      onConfirmClick()
    }

    this.setState(newState)
  }

  render() {
    const { onYesClick, onConfirmClick, card } = this.props
    const { displayAnswer, activeYes, activeNo, activeConfirm } = this.state

    if (!card) {
      return (
        <div className="finished-message">All done!</div>
      )
    }

    let buttonRow
    if (displayAnswer) {
      buttonRow = (
        <ConfirmButtonRow
          onClick={onConfirmClick}
          active={activeConfirm} />
      )
    } else {
      buttonRow = (
        <AnswerButtonRow
          onYesClick={onYesClick}
          activeYes={activeYes}
          activeNo={activeNo} />
      )
    }

    return (
      <div className="memory-module">
        <ContentCard
          content={card.content}
          answer={card.answer}
          displayAnswer={displayAnswer} />
        {buttonRow}
      </div>
    )
  }
}

export default MemoryModule
