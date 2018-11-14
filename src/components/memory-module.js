import React, { Component } from 'react'
import ContentCard from './content-card'
import { ButtonRow } from './buttons'

class MemoryModule extends Component {
  constructor(props) {
    super(props)

    this.state = {
      displayAnswer: false,
      activeYes: false,
      activeNo: false,
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  componentDidMount() {
    // listeners need to be document-wide
    document.addEventListener('keydown', this.handleKeyDown)
    document.addEventListener('keyup', this.handleKeyUp)
  }

  handleKeyDown(event) {
    const { setBlur } = this.props

    switch (event.key) {
      case 'f':
        this.setState({ activeYes: true })
        setBlur(false)
        break
      case 'j':
        this.setState({ activeNo: true })
        setBlur(true)
        break
      default: break
    }
  }

  handleKeyUp(event) {
    switch (event.key) {
      case 'f':
        this.setState({ activeYes: false })
        break
      case 'j':
        this.setState({ activeNo: false })
        break
      default: break
    }
  }

  render() {
    const { onYesClick, card } = this.props
    const { activeYes, activeNo, displayAnswer } = this.state

    return (
      <div className="memory-module">
        <ContentCard
          content={card.content}
          answer={card.answer}
          displayAnswer={displayAnswer} />
        <ButtonRow
          onYesClick={onYesClick}
          activeYes={activeYes}
          activeNo={activeNo} />
      </div>
    )
  }
}

export default MemoryModule
